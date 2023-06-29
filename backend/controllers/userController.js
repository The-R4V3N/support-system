const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc   Register user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	// Validation checks for name, email, and password
	if (!name || !email || !password) {
		res.status(400)
		throw new Error('Please enter all fields')
	}

	// Check if user already exists
	const userExist = await User.findOne({ email })

	if (userExist) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create new user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	})

	// Send response
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc   Login user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	res.send('Login Route')
})

// Export functions
module.exports = {
	registerUser,
	loginUser,
}
