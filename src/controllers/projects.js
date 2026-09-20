// imports
import { getUpcomingProjects,getProjectDetails} from "../models/project.js";
import { getCategoryTagByProjectId } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;
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

// exports
export {showProjectPage,showProjectDetailsPage}