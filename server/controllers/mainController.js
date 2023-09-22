// get homepage
exports.home = async(req, res) => {
    const locals = {
        title: "Notes App",
        description: "The Best Notes App"
    }

    res.render("index", locals);
}

// get aboutpage
exports.about = async(req, res) => {
    const locals = {
        title: "About - Notes App",
        description: "The Best Notes App"
    }

    res.render("about", locals);
}