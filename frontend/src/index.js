import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

fetch("/api/v1/test")
  .then((res) => res.json())
  .then((data) => console.log(data))

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
