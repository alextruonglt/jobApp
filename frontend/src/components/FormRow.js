// FormRow.js
const FormRow = ({ type, name, labelText, value, onChange }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className="form-input"
				required
			/>
		</div>
	)
}

export default FormRow
