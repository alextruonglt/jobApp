import FormRow from "../components/FormRow"
import FormRowSelect from "../components/FormRowSelect"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { useLoaderData } from "react-router-dom"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants"
import { Form, useNavigation, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"
import SubmitBtn from "../components/SubmitBtn"

export const loader = async ({ params }) => {
	try {
		const { data } = await customFetch.get(`/jobs/${params.id}`)
		return data
	} catch (error) {
		toast.error(error.response.data.msg)
		return redirect("/dashboard/all-jobs")
	}
}

export const action = async ({ request, params }) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)

	try {
		await customFetch.patch(`/jobs/${params.id}`, data)
		toast.success("Job edited successfully")
		return redirect("/dashboard/all-jobs")
	} catch (error) {
		toast.error(error.response.data.msg)
		return error
	}
}

const EditJob = () => {
	const { job } = useLoaderData()

	return (
		<Wrapper>
			<Form method="post" className="form">
				<h4 className="form-title">edit job</h4>
				<div className="form-center">
					<FormRow type="text" name="position" defaultValue={job.position} />
					<FormRow type="text" name="company" defaultValue={job.company} />
					<FormRow
						type="text"
						labelText="job location"
						name="jobLocation"
						defaultValue={job.jobLocation}
					/>
					<FormRowSelect
						labelText="job status"
						name="jobStatus"
						defaultValue={job.jobStatus}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						name="jobType"
						labelText="job type"
						defaultValue={job.jobType}
						list={Object.values(JOB_TYPE)}
					/>
					<FormRow
						type="text"
						name="jobURL"
						labelText="Job URL"
						defaultValue={job.jobURL || "No URL provided"}
					/>
					<FormRow
						type="textarea" // Use textarea for job description
						name="jobDescription"
						labelText="Job Description"
						defaultValue={job.jobDescription || "No description available"}
					/>
					<SubmitBtn formBtn />
				</div>
			</Form>
		</Wrapper>
	)
}

export default EditJob
