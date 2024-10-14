import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa"
import { Link, Form } from "react-router-dom"
import Wrapper from "../assets/wrappers/Job"
import JobInfo from "./JobInfo"
import day from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { useState } from "react" // Use state for toggling description visibility
day.extend(advancedFormat)

const Job = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	jobStatus,
	jobDescription, // Add jobDescription to props
	jobURL, // Add jobURL to props
}) => {
	const [showDescription, setShowDescription] = useState(false) // Manage visibility of description
	const date = day(createdAt).format("MMM Do, YYYY")

	return (
		<Wrapper>
			<header>
				<div className="main-icon">{company.charAt(0)}</div>
				<div className="info">
					<h5>{position}</h5>
					<p>{company}</p>
					{jobURL && jobURL !== "No URL provided" && (
						<a href={jobURL} target="_blank" rel="noreferrer">
							{jobURL}
						</a>
					)}
				</div>
			</header>
			<div className="content">
				<div className="content-center">
					<JobInfo icon={<FaLocationArrow />} text={jobLocation} />
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={jobType} />
					<div className={`status ${jobStatus}`}>{jobStatus}</div>
				</div>

				<footer className="actions">
					<Link to={`../edit-job/${_id}`} className="btn edit-btn">
						Edit
					</Link>
					<Form method="post" action={`../delete-job/${_id}`}>
						<button type="submit" className="btn delete-btn">
							Delete
						</button>
					</Form>
					{jobDescription && jobDescription !== "No description available" && (
						<button
							type="button"
							className="btn description-btn" // Add this class for consistent styling
							onClick={() => setShowDescription(!showDescription)}
						>
							{showDescription ? "Hide Description" : "Show Description"}
						</button>
					)}
				</footer>

				{showDescription && (
					<div className="job-description">
						<p>{jobDescription}</p>
					</div>
				)}
			</div>
		</Wrapper>
	)
}

export default Job
