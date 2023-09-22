// get homepage

exports.home = async(req, res) => {
    const locals = {
        title: "Notes App",
        description: "The Best Notes App"
    }

    res.render("index", locals);
}