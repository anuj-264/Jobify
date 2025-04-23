import { StatusCodes } from "http-status-codes";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.modal.js";
import cloudinary from "cloudinary";
import { promises as fs } from 'fs';


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }).select('-password -__v');
    res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
}

export const updateUser = async (req, res) => {
    const newUser = { ...req.body };

    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser).select('-password -__v');

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ msg: "updated user"});
}