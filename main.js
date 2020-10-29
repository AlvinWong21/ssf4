//load libraries
const express = require('express')
const handlebars = require('express-handlebars')

//configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000


//create an instance of express
const app = express()

//configure handlebars
app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

//configure app/route
app.get('/', 
    (req, resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.render('index')
    }
)

const cart = []

app.post('/',
    express.urlencoded({ extended: true }),
    (req, resp) => {
        cart.push(req.body)
        console.info(req.body)
        resp.status(201)
        resp.type('text/html')
        resp.render('index', {cart})
    }
)

//load statics
app.use(express.static(__dirname + '/static'))

//start application
app.listen(PORT, () => {
    console.info(`Application started at port ${PORT} on ${new Date()}`)
})