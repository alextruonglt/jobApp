const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			{type === "textarea" ? (
				<textarea
					id={name}
					name={name}
					className="form-textarea"
					defaultValue={defaultValue}
					onChange={onChange}
					rows="3" // Set default rows
				/>
			) : (
				<input
					type={type}
					id={name}
					name={name}
					className="form-input"
					defaultValue={defaultValue}
					onChange={onChange}
					required
				/>
			)}
		</div>
	)
}

export default FormRow
