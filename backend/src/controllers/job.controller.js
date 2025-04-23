import { Job } from "../models/job.model.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import dayjs from "dayjs";

// GET ALL JOBS
// GET ALL JOBS


export const getAllJobs = async (req, res) => {
  const {
    search,
    jobType,
    jobStatus,
    sort = 'newest',
    page = 1,
    limit = 8,
  } = req.query;

  // Build the query object
  let queryObject = {};

  // Search by position or company (case insensitive)
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  //  Filter by jobStatus
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }

  //  Filter by jobType
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  //  Role check — regular users can only see their own jobs
  if (req.user.role !== 'admin') {
    queryObject.createdBy = req.user.userId;
  }

  //  Create a Mongoose query
  let result = Job.find(queryObject);

  // Sorting
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  if (sortOptions[sort]) {
    result = result.sort(sortOptions[sort]);
  }

  // Pagination setup
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 8;
  const skip = (pageNumber - 1) * limitNumber;

  result = result.skip(skip).limit(limitNumber);

  //  Execute the query
  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limitNumber);

  // Send the response
  res.status(StatusCodes.OK).json({
    totalJobs,
    numOfPages,
    currentPage: pageNumber,
    jobs,
  });
};

// CREATE JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // add the userId to the job object
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'Job created', job });
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true // return the updated job  instead of the old one , by default it returns the old one
  });

  res.status(StatusCodes.OK).json({ msg: 'Job updated', job });
};
// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  await Job.findByIdAndDelete(id);


  res.status(StatusCodes.OK).json({ msg: 'Job deleted' });
};




// export const showStats = async (req, res) => {
//     const userId =  new Types.ObjectId(req.user.userId);// convert the userId to ObjectId type 

//     let stats = await Job.aggregate([
//         { $match: { createdBy: userId } },
//         { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
//     ]);

//     stats = stats.reduce((acc, curr) => {
//         const { _id: title, count } = curr;
//         acc[title] = count;
//         return acc;
//     }, {});

//     const defaultStats = {
//         pending: stats.pending || 0,
//         interview: stats.interview || 0,
//         declined: stats.declined || 0,
//     };

//     let monthlyApplications = await Job.aggregate([
//         { $match: { createdBy: userId } },
//         {
//             $group: {
//                 _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
//                 count: { $sum: 1 },
//             },
//         },
//         { $sort: { '_id.year': -1, '_id.month': -1 } },
//         { $limit: 6 },
//     ]);

//     monthlyApplications = monthlyApplications
//         .map((item) => {
//             const {
//                 _id: { year, month },
//                 count,
//             } = item;

//             const date = day()
//                 .month(month - 1)
//                 .year(year)
//                 .format('MMM YY');
//             return { date, count };
//         })
//         .reverse();

//     res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
// };
export const showStats = async (req, res) => {
  const userId = req.user.userId;
  const isAdmin = req.user.role === 'admin';

  let stats;
  let monthlyApplications;

  // 🔍 Step 1: Aggregate stats based on role
  if (isAdmin) {
    stats = await Job.aggregate([
      { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    monthlyApplications = await Job.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);
  } else {
    stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);
  }

  // 🧮 Step 2: Format defaultStats as an object
  const defaultStats = stats.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  // 📊 Step 3: Convert monthlyApplications to array of {date, count}
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = dayjs()
        .month(month - 1) // dayjs months are 0-indexed
        .year(year)
        .format('MMM YY'); // e.g., "Apr 25"

      return { date, count };
    })
    .sort((a, b) => {
      return dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1;
    });

  // 📤 Step 4: Return as response
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};