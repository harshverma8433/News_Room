    const express = require("express")
    const cors = require("cors")
    const cookieParser = require("cookie-parser")
    const bodyParser = require('body-parser');

    const app = express()

    app.use(cors({
        origin: 'https://6675929c8132609a07471d7b--thunderous-cranachan-79ca4f.netlify.app',
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
