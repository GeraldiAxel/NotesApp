
const Note = require('../models/Notes');
const mongoose = require('mongoose');

// get dashboard
exports.dashboard = async (req, res) => {

    let perPage = 12;
    let page = req.query.page || 1;
  
    const locals = {
      title: "Dashboard",
      description: "Free NodeJS Notes App.",
    };
  
    try {
        const notes = await Note.aggregate([
            { 
                $sort: { 
                    createdAt: -1 
                } 
            },
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(req.user.id) 
                } 
            },
            {
                $project: {
                    title: { $substr: ["$title", 0, 30] },
                    body: { $substr: ["$body", 0, 100] },
                },
            },
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
  
        const count = await Note.count();
    
        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "../views/layouts/dashboard",
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        console.log(error);
    }
};

// get specific note
exports.dashboardViewNote = async (req, res) => {
    const note = await Note.findById({ _id: req.params.id })
    .where({user: req.user.id}).lean();
    if(note){
        res.render('dashboard/view-notes', {
            noteID: req.params.id, 
            note, 
            layout: '../views/layouts/dashboard'
        });
    } 
    else{
        res.send("Something went wrong");
    }
}

// update note
exports.dashboardUpdateNote = async (req, res) => {
    try {
        await Note.findOneAndUpdate(
            {_id: req.params.id},
            {title: req.body.title, body: req.body.body}
            ).where( { user: req.user.id});

            res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

// delete note
exports.dashboardDeleteNote = async (req, res) => {
    try {
        await Note.deleteOne({_id: req.params.id}).where({user:req.user.id});
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}