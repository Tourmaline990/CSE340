import { validationResult,body } from "express-validator";
import { createUser, authenticateUser} from "../models/users.js";
import bcrypt from 'bcrypt';

const userValidation = [
   body('name').trim().notEmpty().withMessage('Name is required.').
   isLength({max:100}).withMessage('Name must be below 100 characters'),
   body('email').trim().notEmpty().normalizeEmail().withMessage('Email is required')
   .isEmail().withMessage('Please provide a valid email address').isLength({max:100})
   .withMessage('email must be below 100 characters'),
   body('password').trim().notEmpty().withMessage('Password is required')
]
const showUserRegistrationForm = (req,res) => {
    const title = 'Register';
    res.render('register',{title})
}

const processUserRegistrationForm = async(req,res) => {
    const result = validationResult(req)
    if(!result.isEmpty()){
        result.array().forEach(err => {
            req.flash("error",err.msg)
        })
        return res.redirect('/register') 
    }
    try {
        const {name,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt)
        console.log(passwordHash)
        const userId = await createUser(name,email,passwordHash)
        req.flash('success','Registration successful! Please log in!')
       res.redirect('/') //

    } catch (error) {
         console.log("an error ecccured",error)
         req.flash("error","An error occured during registration. Please try again.");
         res.redirect('/register')
    }
    
}

const showLoginPage = async(req,res) => {
   res.render('login',{title:"Login"})
}

const processLoginForm = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await authenticateUser(email,password);
        if(!user){
          req.flash("error",'Invalid email or password');
          return res.redirect('/login')
        }
        req.session.user = user;
        if(res.locals.NODE_ENV === 'development'){
            console.log('user logged in', user);
        }
        req.flash('success','Login successful!')
        res.redirect("/dashboard")   
    } catch (error) {
       req.flash('error','An error occured. Please try again.')
        return res.redirect('/login') 
    }
}


const processLogOut = async(req,res) => {
    if(req.session.user){
      delete req.session.user;
    }
   req.flash("success",'logout successful')
   res.redirect('/login')
}

const requireLogin =  async(req,res,next) => {
    if(!req.session.user){
      req.flash('warning','Please login to continue');
      return res.redirect('/login')
    }
    next()
}

const showDashboard = (req,res) => {
   const {name,email} = req.session.user;
   const title  = 'Dashboard'
   res.render('dashboard',{name,email,title})
}

const requireRole = (role) => {
   return function(req,res,next){
     if(!req.session.user || !req.session){
          req.flash('error',"Please log in to continue");
          return res.redirect('/login');
     }
      if(req.session.user.role_name !== role){
        req.flash("error",'You do not have permission to access this page');
         return res.redirect('/')
      }
      return next();
      
   }
}
export {processUserRegistrationForm,showUserRegistrationForm,userValidation,
    processLoginForm,processLogOut,showLoginPage,requireLogin,showDashboard,
    requireRole
}