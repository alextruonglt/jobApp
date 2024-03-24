import User from "../models/UserModel.js"
import { hashPassword, comparePassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/CustomErrors.js"
import bcrypt from "bcryptjs"
import { createJWT } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? "admin" : "user"

  // a random value that is added to the password before hashing
  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.status(201).json({ user })
}

export const login = async (req, res) => {
  // check if user exists
  // check if password is correct
  const user = await User.findOne({ email: req.body.email })

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials")

  const token = createJWT({ userId: user._id, role: user.role })

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  })

  res.status(200).json({ msg: "user logged in" })
}

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(200).json({ msg: "user logged out!" })
}
