import "express-async-errors"
import express from "express"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { nanoid } from "nanoid"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"

import { authenticateUser } from "./middleware/authMiddleware.js"

// Router
import authRouter from "./routes/authRouter.js"
import jobRouter from "./routes/jobRouter.js"
import userRouter from "./routes/userRouter.js"
import mongoose from "mongoose"

// Public
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"

//Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"

dotenv.config()
const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())

app.use(express.static(path.resolve(__dirname, "./frontend/build")))
app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/auth", authRouter)

// For production. Pointing everyhing to index
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
})

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
