import { useState } from "react"
import { Form, Link, redirect } from "react-router-dom"
import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"
import SubmitBtn from "../components/SubmitBtn"

// Server-side form submission handler (action)
export const action = async ({ request }) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)

	// Check if passwords match
	if (data.password !== data.confirmPassword) {
		toast.error("Passwords do not match")
		return null
	}

	try {
		await customFetch.post("/auth/register", data)
		toast.success("Registration successful")
		return redirect("/login")
	} catch (error) {
		toast.error(error?.response?.data?.msg)
		return error
	}
}

const Register = () => {
	// State for client-side validation of passwords
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [passwordError, setPasswordError] = useState("")

	// Handle password change
	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	// Handle confirm password change
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value)
		if (password !== e.target.value) {
			setPasswordError("Passwords do not match")
		} else {
			setPasswordError("")
		}
	}

	// No custom submit function needed, allow the form to submit normally
	return (
		<Wrapper>
			<Form method="post" className="form">
				<Logo />
				<h4>Register</h4>
				<FormRow type="text" name="name" />
				<FormRow type="text" name="lastName" labelText="last name" />
				<FormRow type="text" name="location" />
				<FormRow type="email" name="email" />

				<FormRow
					type="password"
					name="password"
					value={password}
					onChange={handlePasswordChange}
				/>
				<FormRow
					type="password"
					name="confirmPassword"
					labelText="confirm password"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
				/>

				{/* Display error if passwords don't match */}
				{passwordError && <p className="error">{passwordError}</p>}

				<SubmitBtn formBtn disabled={!!passwordError} />

				<p>
					Already a member?
					<Link to="/login" className="member-btn">
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	)
}

export default Register
