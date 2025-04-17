import { Request, Response } from 'express';
import { TSignIn, TUser } from './auth.interface';
import { UserServices } from './auth.service';
import { UserModel } from './auth.model';
import catchAsync from '../../utils/catcgAsync';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { userValidationSchema } from './auth.validation';
import config from '../../config';

const SignUp = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body; // Correctly assigning `user` to be of type `TUser`
    const zodParsedata = userValidationSchema.parse(user);

    // Check if a user with the same email already exists
    const isExistuser = await UserModel.findOne({ email: user.email });

    if (isExistuser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'User already exists with this email',
      });
    }

    const result = await UserServices.createUser(zodParsedata);

    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No data found',
        data: {},
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the user',
      error: err instanceof Error ? err.message : 'Unknown error', // Include error message
    });
  }
};

const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: TSignIn = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 404,
        message: 'Invalid email or password',
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        statusCode: 404,
        message: 'Invalid email or password',
      });
    }

    // Call signIn with user information to get the access token
    const { accessToken, refreshToken } = await UserServices.signIn(email, password);

    // Generate refresh token


    // Set the refresh token as a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'none', // Allow cross-origin requests
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Expire in 1 year
    });

    // Send response
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: accessToken, // Include access token in response
    });
  } catch (err) {
    console.error('Error during sign-in:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred during sign-in',
    });
  }
};

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // Extract the refreshToken from cookies
  const { refreshToken } = req.cookies;
  console.log('refreshToken', refreshToken);
  if (!refreshToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Refresh token not found. Please login again.',
    });
  }

  try {
    // Call the service to refresh the token
    const result = await UserServices.refreshToken(refreshToken);

    // Send the new access token
    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Refresh token is retrieved successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Invalid or expired refresh token. Please login again.',
    });
  }
});

const getUserFromDb = async (req: Request, res: Response) => {
  try {
    const userId = req.body._id; // Assuming you're attaching user ID to req.user after authentication
    const user = await UserServices.getUser(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'An error occurred while retrieving the user',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};
const getAdminFromDb = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id; // Assuming you're attaching user ID to req.user after authentication
    const user = await UserServices.getAdmin(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'An error occurred while retrieving the user',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};


export const AuthControllers = {
  SignUp,
  SignIn,
  refreshToken,
  getUserFromDb,
  getAdminFromDb
};
