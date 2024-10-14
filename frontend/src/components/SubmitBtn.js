// SubmitBtn.js
const SubmitBtn = ({ formBtn, disabled }) => {
	return (
		<button
			type="submit"
			className={`btn btn-block ${formBtn && "form-btn"}`}
			disabled={disabled}
		>
			Submit
		</button>
	)
}

export default SubmitBtn
