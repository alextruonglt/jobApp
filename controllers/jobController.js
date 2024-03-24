import "express-async-errors"
import Job from "../models/JobModel.js"

export const getAllJobs = async (req, res) => {
  // console.log(req)
  console.log(req.user)
  const jobs = await Job.find({ createdBy: req.user.userId })
  res.status(200).json({ jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const { company, position } = req.body
  const job = await Job.create(req.body)
  res.status(201).json({ job })
}

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id)

  res.status(200).json({ job })
}

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json({ job: updatedJob })
}

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id)

  res.status(200).json({ job: removedJob })
}
