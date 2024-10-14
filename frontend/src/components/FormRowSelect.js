const FormRowSelect = ({ name, labelText, list, defaultValue, onChange }) => {
	const toTitleCase = (str) => {
		return str.replace(/\b\w/g, (char) => char.toUpperCase()).replace("-", " ")
	}

	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select
				name={name}
				id={name}
				className="form-select"
				onChange={onChange}
				defaultValue={defaultValue}
			>
				{list.map((itemValue) => {
					return (
						<option key={itemValue} value={itemValue}>
							{toTitleCase(itemValue)}
						</option>
					)
				})}
			</select>
		</div>
	)
}

// Export the component at the bottom
export default FormRowSelect
