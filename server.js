import express from "express"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { nanoid } from "nanoid"
import jobRouter from "./routes/jobRouter.js"

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

const port = process.env.PORT || 510
0
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`)
})
