import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    jobStatus: {
        type: String,
        enum: Object.values(JOB_STATUS), //convert obj values to array
        default: JOB_STATUS.PENDING,

    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE), //convert obj values to array
        default: JOB_TYPE.FULL_TIME,

    },
    jobLocation: {
        type: String,
        default: 'my city',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // reference to the User model


    }

}, {
    timestamps: true,
});

// Pre-save hook to convert createdAt and updatedAt to IST
jobSchema.pre('save', function (next) {
    const ISTOffset = 330; // IST is UTC +5:30
    this.createdAt = dayjs(this.createdAt).utcOffset(ISTOffset).toDate();
    this.updatedAt = dayjs(this.updatedAt).utcOffset(ISTOffset).toDate();
    next();
});

// Pre-update hook to convert updatedAt to IST
jobSchema.pre('findOneAndUpdate', function (next) {
    const ISTOffset = 330; // IST is UTC +5:30
    this._update.updatedAt = dayjs().utcOffset(ISTOffset).toDate();
    next();
});

export const Job = mongoose.model('Job', jobSchema);