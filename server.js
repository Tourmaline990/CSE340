import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production'
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// middlewares

app.use(express.static(path.join(__dirname,"public")))
// ejs as templating engine
app.set('view engine', 'ejs');
// templates location
app.set('views', path.join(__dirname,'src/views'));


app.use((req, res, next) => {
    if(NODE_ENV === 'development') {
        console.log('request logger middleware')
        console.log(`${req.method} ${req.url}`)
    }
    next()
})

app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next()
})

app.use(router);

app.use((req, res, next) => {
   const error = new Error('Page not found')
   error.status = 404
   next(error)
})

app.use((err,req,res,next)=>{
   // log error details for debugging
   console.error('error occured',err.message)
   console.error('stack trace',err.stack)

   // determine status and template
   const status = err.status || 500;
   const template = status === 404 ? '404' : '500';

   // prepare data for the template
   const context = {
    title: status === 404 ? 'Page Not Found' : 'Internal Server Error',
    error: err.message,
    stack: err.stack
   }

    // render the appropirate error template
    res.status(status).render(`errors/${template}`,context)
})

app.listen(PORT,async()=> {
    try {
        await testConnection()
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
    console.log(`Server is running at http://127.0.0.1:${PORT}`)
    console.log(`Environment: ${NODE_ENV}`)
})

