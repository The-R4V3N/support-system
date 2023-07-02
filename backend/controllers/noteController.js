const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

// @desc   Get notes for a ticket
// @route  GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user id from token
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    res.status(401)
    throw new Error('Invalid user ID')
  }

  if (!ticket.user.equals(req.user._id)) {
    res.status(401)
    throw new Error('Not authorized to view this ticket')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    res.status(401)
    throw new Error('Invalid user ID')
  }

  if (!ticket.user.equals(req.user._id)) {
    res.status(401)
    throw new Error('Not authorized to view this ticket')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
