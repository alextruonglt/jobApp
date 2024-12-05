import { useState, useEffect } from "react"
import FormRow from "../components/FormRow"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { useOutletContext } from "react-router-dom"
import { Form } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import SubmitBtn from "../components/SubmitBtn"

export const action = async ({ request }) => {
	const formData = await request.formData()

	const file = formData.get("avatar")
	if (file && file.size > 500000) {
		toast.error("Image size too large")
		return null
	}

	try {
		await customFetch.patch("/users/update-user", formData)
		toast.success("Profile updated successfully")
	} catch (error) {
		toast.error(error?.response?.data?.msg)
	}
	return null
}

const Profile = () => {
	const { user } = useOutletContext()

	// Initialize state with empty values
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		email: "",
		location: "",
	})

	// Update state when `user` becomes available
	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				lastName: user.lastName || "",
				email: user.email || "",
				location: user.location || "",
			})
		}
	}, [user])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	if (!user) {
		return <div>Loading...</div>
	}

	return (
		<Wrapper>
			<Form method="post" className="form" encType="multipart/form-data">
				<h4 className="form-title">Profile</h4>
				<div className="form-center">
					{/* Avatar upload */}
					<div className="form-row">
						<label htmlFor="avatar" className="form-label">
							Select an image file (max 0.5 MB):
						</label>
						<input
							type="file"
							id="avatar"
							name="avatar"
							className="form-input"
							accept="image/*"
						/>
					</div>
					{/* Controlled Form Fields */}
					<FormRow
						type="text"
						name="name"
						labelText="First Name"
						value={formData.name}
						onChange={handleChange}
					/>
					<FormRow
						type="text"
						name="lastName"
						labelText="Last Name"
						value={formData.lastName}
						onChange={handleChange}
					/>
					<FormRow
						type="email"
						name="email"
						labelText="Email"
						value={formData.email}
						onChange={handleChange}
					/>
					<FormRow
						type="text"
						name="location"
						labelText="Location"
						value={formData.location}
						onChange={handleChange}
					/>
					{/* Submit Button */}
					<SubmitBtn formBtn />
				</div>
			</Form>
		</Wrapper>
	)
}

export default Profile
