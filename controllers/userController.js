import User from "../models/UserModel.js"
import Job from "../models/JobModel.js"

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(200).json({ user: userWithoutPassword })
}

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(200).json({ users, jobs })
}

export const updateUser = async (req, res) => {
  // In case password is in the body for any reason
  const obj = { ...req.body }
  delete obj.password
  console.log(obj)
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)
  res.status(200).json({ msg: "update user" })
}