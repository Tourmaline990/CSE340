// imports
import { getAllOrganizations,getOrganizationDetails,createOganization,updateOrganization } from "../models/organizations.js"
import { getProjectsByOrganizationId } from "../models/project.js";
import { body,validationResult } from "express-validator";

// validation logic
const organizationValidation = [
    body('name').trim().notEmpty().withMessage('organization name is required')
    .isLength({min:3,max:150}).withMessage('organization name must be between 3 and 150 characters'),
    body('description').trim().notEmpty().withMessage('organization description is required')
    .isLength({max:500}).withMessage('organization description cannot exceed 500 characters'),
    body('contactEmail').normalizeEmail().notEmpty().withMessage('contact email is required')
    .isEmail().withMessage('Please provide a valid email address')
]

// controller functions
const showOrganizationsPage = async(req, res) => {
   const organizations = await getAllOrganizations();
   const title = 'Our Partner Organizations';
   res.render('organizations',{title,organizations})
}

const showOrganizationDetailsPage = async(req,res) => {
    const organizationId = req.params.id;

    const organizationDetails = await getOrganizationDetails(organizationId);
    const organizationProjects = await getProjectsByOrganizationId(organizationId)

    const title = 'Organization Details'
    res.render('organization',{title,organizationDetails,organizationProjects})
}

const showNewOrganizationForm = async(req,res) => {
    const title = "Add New Organization";
    res.render("new-organization",{title})
}

const processNewOrganizationForm = async(req,res) => {

  const results = validationResult(req)
  if(!results.isEmpty()){
     results.array().forEach(error => {
        req.flash('error',error.msg)
     })
     return res.redirect('/new-organization')
  }
  const {name,description,contactEmail} = req.body
  const logo_filename = 'placeholder-logo.png';

  const organizationId = await createOganization(name,description,contactEmail,logo_filename)
  //set a success flash message
  req.flash('success','Organization added successfully');
  res.redirect(`/organization/${organizationId}`)
}

const showEditOrganizationForm = async(req,res) => {
    const id = req.params.id;
   const organizationDetails = await getOrganizationDetails(id);
   const title = 'Edit Organization Details';
   res.render('edit-organization',{title,organizationDetails})
}
const processEditOrganizationForm = async(req,res) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
     result.array().forEach(error => {
        req.flash('error',error.message)
     })
     return res.redirect(`/edit-organization/${id}`)
  }
  const id = req.params.id;
  const {name,description,contactEmail,logo_filename} = req.body;
 await updateOrganization(id,name,description,contactEmail,logo_filename)

  req.flash('success',"Successfully updated organization details")
  res.redirect(`/organization/${id}`)
}
// exports
export{ showOrganizationsPage,showOrganizationDetailsPage,showNewOrganizationForm,processNewOrganizationForm 
    ,organizationValidation,showEditOrganizationForm,
    processEditOrganizationForm
}