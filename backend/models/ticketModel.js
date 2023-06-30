const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			trim: true,
			ref: 'User',
		},
		product: {
			type: String,
			required: [true, 'Please eselect a product'],
			enum: ['iPhone', 'MacBook Pro', 'AirPods', 'Apple Watch', 'iPad'],
		},
		desccription: {
			type: String,
			required: [true, 'Please enter a description of the issue'],
            trim: true,
            maxLength: [2000, 'Description cannot exceed 2000 characters'],
		},
		status: {
			type: String,
            enum: ['Open', 'In Progress', 'Closed'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Ticket', ticketSchema)
