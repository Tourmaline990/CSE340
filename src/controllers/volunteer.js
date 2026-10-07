import { addVolunteer,removeVolunteer } from "../models/volunteer.js";

const volunteerForProject = async(req,res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;
    try {
        await addVolunteer(userId, projectId);
        req.flash('success', 'You have successfully volunteered for this project!');
        res.redirect(`/dashboard`);
    } catch (error) {
        console.error("Error occurred while adding volunteer:", error);
        req.flash('error', 'An error occurred while volunteering. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
}

const removeVolunteerForProject = async(req,res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;
    try{
        await removeVolunteer(userId, projectId);
        req.flash('success', 'You have successfully removed your volunteer status for this project.');
        res.redirect(`/dashboard`);
    }
    catch(error){
        console.error("Error occurred while removing volunteer:", error);
        req.flash('error', 'An error occurred while removing volunteer. Please try again.');
        res.redirect(`/project/${projectId}`);
    }
}   

export {volunteerForProject,removeVolunteerForProject}