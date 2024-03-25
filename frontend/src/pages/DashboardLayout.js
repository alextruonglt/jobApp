import {
  Outlet,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom"

import Wrapper from "../assets/wrappers/Dashboard"
import Navbar from "../components/Navbar"
import BigSidebar from "../components/BigSidebar"
import SmallSidebar from "../components/SmallSidebar"
import { checkDefaultTheme } from "../App"
import { useState, createContext, useContext } from "react"
import customFetch from "../utils/customFetch"

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user")
    return data
  } catch (error) {
    return redirect("/")
  }
}

const DashboardContext = createContext()
const DashboardLayout = () => {
  const { user } = useLoaderData()

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    console.log("logout user")
  }
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
