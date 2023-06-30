import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	})

	const { name, email, password, passwordConfirm } = formData

	const onChange = (e) =>
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))

	const onSubmit = (e) => {
		e.preventDefault()

		if (password !== passwordConfirm) {
			toast.error('Passwords do not match')
		}
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							required
							placeholder='Enter your name'
							onChange={onChange}
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							id='passwordConfirm'
							name='passwordConfirm'
							value={passwordConfirm}
							required
							placeholder='Confirm password'
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

export default Register
