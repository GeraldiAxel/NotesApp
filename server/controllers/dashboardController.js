
const Note = require('../models/Notes');
const Group = require('../models/Groups');
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
                    updatedDate: -1 
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

        const groups = await Group.find({});
  
        const count = await Note.count();
    
        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            groups,
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
            {title: req.body.title, body: req.body.body, updatedDate: Date.now()}
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

// create note
exports.dashboardCreateNote = async (req, res) => {
    res.render('dashboard/create', {
        layout: '../views/layouts/dashboard'
    });
}

// add notes to db
exports.dashboardAddNote = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Note.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

// get search notes
exports.dashboardSearch = async (req, res) => {
    try {
        res.render('dashboard/search', {
            searchResults: '',
            layout: '../views/layout/dashboard'
        })
    } catch (error) {
        console.log(error);
    }
}

// post search notes
exports.dashboardSearchSubmit = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchTrimmed = searchTerm.replace(/^[a-zA-Z0-9]/g, "");
        const searchResults = await Note.find({
            $or: [
                {title: {$regex: new RegExp(searchTrimmed, 'i')}},
                {body: {$regex: new RegExp(searchTrimmed, 'i')}},
            ]
        }).where({user: req.user.id});

        res.render('dashboard/search', {
            searchResults,
            layout: '../views/layouts/dashboard'
        });
    } catch (error) {
        console.log(error);
    }
}

//create group
exports.dashboardCreateGroup = async (req, res) => {
    res.render('dashboard/createGroup', {
        layout: '../views/layouts/dashboard'
    });
}

//add group
exports.dashboardAddGroup = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Group.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}