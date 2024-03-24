import "express-async-errors"
import express from "express"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { nanoid } from "nanoid"
import cookieParser from "cookie-parser"

import { authenticateUser } from "./middleware/authMiddleware.js"

// Router
import authRouter from "./routes/authRouter.js"
import jobRouter from "./routes/jobRouter.js"
import userRouter from "./routes/userRouter.js"
import mongoose from "mongoose"

//Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"

dotenv.config()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(cookieParser())
app.use(express.json())

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" })
})

app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/auth", authRouter)

// Error Middleware

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}