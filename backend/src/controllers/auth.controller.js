import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.modal.js";
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from "../errors/customErrors.js";
import{createJWT} from '../utils/tokenUtils.js';
export const register = async (req, res) => {
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    const createdUser = await User.findById(user._id).select('-password -__v');
    res.status(StatusCodes.CREATED).json({ createdUser, msg: 'user created' });

};


export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');


    const token = createJWT({ userId: user._id, role: user.role });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })

    res.status(StatusCodes.OK).json({msg : "Login successful"});
};

export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // expires: new Date(Date.now()),
        sameSite: 'strict',
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};