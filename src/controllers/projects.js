// imports
import { getUpcomingProjects,getProjectDetails,createProject} from "../models/project.js";
import { getCategoryTagByProjectId } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";
import { body,validationResult } from "express-validator";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
    body('title').trim().notEmpty().withMessage('Project title is required').
    isLength({min:3,max:200}).withMessage('project title must be between 3 and 200 characters'),
    body('description').trim().notEmpty().withMessage('Project description is required').isLength({max:1000}).
    withMessage('project description must be lesser than 1000 characters'),
    body('location').trim().notEmpty().withMessage('Location detail is required').isLength({max:200}).
    withMessage('location should be below 200 characters'),
    body('project_date').notEmpty().withMessage('Date is required').isISO8601().
    withMessage('Date must be a valid date format'),
    body('organization_id').notEmpty().withMessage('organization detail is required').isInt().withMessage('organization must be a valid integer')
]
// controller functions

const showProjectPage = async(req, res) => {
   const title =  'Upcoming Service Projects';
   const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
   res.render('projects',{title,projects});
}

const showProjectDetailsPage = async (req,res) => {
   const projectId = req.params.id;
   const projectDetails = await getProjectDetails(projectId);
   const projectCategoryTags = await getCategoryTagByProjectId(projectId)
   const title = projectDetails.length > 0 ? projectDetails[0].title : 'Project Details';
   res.render('project',{title,projectDetails,projectCategoryTags})
}

const showNewProjectForm = async(req,res) => {
   const organizations = await getAllOrganizations()
   const title = 'New Service Project';
   res.render('new-project',{title,organizations});
}

const processNewProjectForm = async(req,res) => {
   const result = validationResult(req)
   if(!result.isEmpty()){
     result.array().forEach(err => req.flash('error',err.msg))
     return res.redirect('/new-project')
   }
    const {organization_id,title,description,location,project_date} = req.body;
    try {
       const projectId = await createProject(organization_id,title,description,location,project_date)    
          req.flash('success','service project created successfully')
          res.redirect(`/project/${projectId}`)
    } catch (error) {
      req.flash('error',  'There was an error creating the service project')
      console.log("error creating service project",error)
      res.redirect('/new-project')
    }
}
// exports
export {showProjectPage,showProjectDetailsPage,showNewProjectForm,processNewProjectForm,projectValidation}