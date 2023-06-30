import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const dispatch = useDispatch()

	const { user, isloading, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	const onChange = (e) =>
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))

	const onSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password,
		}

		dispatch(login(userData))
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please login to get support</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='email'
							name='email'
							value={email}
							required
							placeholder='Enter your email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							required
							placeholder='Enter a password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Login
