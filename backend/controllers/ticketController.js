const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const User = require('../models/userModel')

const Ticket = require('../models/ticketModel')

// @desc   Get user tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user id from token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user._id })

  res.status(200).json(tickets)
})

// @desc   Get user ticket
// @route  GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user id from token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    res.status(401)
    throw new Error('Invalid user ID')
  }

  if (!ticket.user.equals(req.user._id)) {
    res.status(401)
    throw new Error('Not authorized to view this ticket')
  }

  res.status(200).json(ticket)
})

// @desc   Get new ticket
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  // Get user id from token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
    status: 'Open',
  })

  res.status(201).json(ticket)
})

// @desc   Delete ticket
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user id from token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    res.status(401)
    throw new Error('Invalid user ID')
  }

  if (!ticket.user.equals(req.user._id)) {
    res.status(401)
    throw new Error('Not authorized to view this ticket')
  }

  await ticket.deleteOne()

  res.status(200).json({ success: true, message: 'Ticket deleted' })
})

// @desc   Update ticket
// @route  PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user id from token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    res.status(401)
    throw new Error('Invalid user ID')
  }

  if (!ticket.user.equals(req.user._id)) {
    res.status(401)
    throw new Error('Not authorized to view this ticket')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
}
