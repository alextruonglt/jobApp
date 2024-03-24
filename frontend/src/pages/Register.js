import { Form, redirect, useNavigation, Link } from "react-router-dom"
import FormRow from "../components/FormRow"
import Logo from "../components/Logo"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/auth/register", data)
    toast.success("Registration successful")
    return redirect("/login")
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  const navigation = useNavigation()
  console.log(navigation)
  const isSubmitting = navigation.state === "submitting"
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />

        <FormRow type="password" name="password" />

        <button type="submit" disabled={isSubmitting} className="btn btn-block">
          {isSubmitting ? "submitting..." : "submit"}
        </button>
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
