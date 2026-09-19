// imports
import { getAllOrganizations,getOrganizationDetails } from "../models/organizations.js"
import { getProjectsByOrganizationId } from "../models/project.js";

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
// exports
export{ showOrganizationsPage,showOrganizationDetailsPage }