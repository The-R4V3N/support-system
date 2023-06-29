const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name'],
			trim: true,
			maxLength: [100, 'Name cannot exceed 100 characters'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			unique: true,
			trim: true,
			maxLength: [100, 'email cannot exceed 100 characters'],
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
			minLength: [6, 'Password must be at least 6 characters'],
			match: [
				/^(?=.*[!@#$%^&*])/,
				'Password must contain at least one special character (!@#$%^&*)',
			],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
