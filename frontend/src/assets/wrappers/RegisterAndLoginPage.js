// RegisterAndLoginPage.js (as a styled-component or CSS module)
import styled from "styled-components"

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	align-items: center;

	.logo {
		display: block;
		margin: 0 auto;
		margin-bottom: 1.38rem;
	}

	.form {
		max-width: 400px;
		border-top: 5px solid var(--primary-500);
		padding: 2rem;
		box-shadow: var(--shadow-2);
		border-radius: var(--border-radius);
		background-color: var(--white);
	}

	h4 {
		text-align: center;
		margin-bottom: 1.38rem;
	}

	p {
		margin-top: 1rem;
		text-align: center;
		line-height: 1.5;
	}

	.btn {
		margin-top: 1rem;
	}

	.member-btn {
		color: var(--primary-500);
		letter-spacing: var(--letter-spacing);
		margin-left: 0.25rem;
	}

	.error {
		color: var(--red-dark);
		font-size: 0.875rem;
		margin-top: 0.5rem;
		text-align: center;
	}
`
export default Wrapper
