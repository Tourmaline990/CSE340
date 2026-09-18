// imports
import { getAllProjects } from "../models/project.js";

// controller functions
const showProjectPage = async(req, res) => {
   const title =  'Service Projects';
   const projects = await getAllProjects();
   res.render('projects',{title,projects});
}

// exports
export {showProjectPage}