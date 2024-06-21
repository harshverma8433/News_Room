    const express = require("express")
    const cors = require("cors")
    const cookieParser = require("cookie-parser")
    const bodyParser = require('body-parser');

    const app = express()

    app.use(cors({
        origin: 'https://66759dc6ff107ba0903e532a--effervescent-llama-08e2f5.netlify.app',
        credentials: true
    }));

    app.use(cookieParser())
    app.use(bodyParser.json());

    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    app.use("/" , require("./routes/user.route.js"))
    app.use("/" , require("./routes/article.route.js"))
    app.use("/" , require("./routes/comment.route.js"))
    
    module.exports = app;
