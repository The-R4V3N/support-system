const asyncHandler = require('express-async-handler')

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

	res.send('Register Route')
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
