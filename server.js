import "express-async-errors"
import express from "express"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { nanoid } from "nanoid"
import jobRouter from "./routes/jobRouter.js"
import mongoose from "mongoose"

dotenv.config()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

app.post("/", (req, res) => {
  console.log(req)
  res.json({ message: "Data received", data: req.body })
})

app.use("/api/v1/jobs", jobRouter)

// Error Middleware

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ msg: "something went wrong" })
})

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
