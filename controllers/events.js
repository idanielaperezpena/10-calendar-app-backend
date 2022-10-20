const { response, request } = require('express')
const Event = require('../models/Event')


const getEvents = async (req, res = response) => {
    try {
        const events = await Event.find()
            .populate('user', 'name')

        return res.status(200).json({
            ok: true,
            events
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Contact the system administrator',

        })
    }
}

const newEvent = async (req, res = response) => {

    const event = new Event(req.body)

    try {
        event.user = req.uid
        const eventSaved = await event.save()
        return res.status(200).json({
            ok: true,
            event: eventSaved
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Contact the system administrator',

        })
    }
}

const updateEvent = async (req = request, res = response) => {
    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Event not found',

            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'Forbidden action',

            })
        }

        const eventToUpdate = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, eventToUpdate, { new: true })


        return res.status(200).json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Contact the system administrator',

        })
    }
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Event not found',

            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'Forbidden action',

            })
        }

        await Event.findByIdAndDelete(eventId)

        return res.status(200).json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Contact the system administrator',

        })
    }
}

module.exports = {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}