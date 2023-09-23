const Note = require('../models/Notes');
const mongoose = require('mongoose');

// get dashboard
exports.dashboard = async(req, res) => {
    const locals = {
        title: "Dashboard",
        description: "The Best Notes App"
    }

    try {
        const notes = await Note.find({});
        res.render('dashboard/index', {
            userName: req.user.displayName,
            locals,
            notes,
            layout: '../views/layouts/dashboard'
        })
        console.log(notes);
    } catch (error) {
        console.log(error);
    }
}