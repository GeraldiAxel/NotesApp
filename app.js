require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000 || process.env.PORT;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// static files
app.use(express.static("public"));

// templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// route
app.use("/", require("./server/routes/index"));

// 404 handler
app.get("*", (req, res) => {
    res.status(404).render('404');
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})