// imports
import { getAllOrganizations } from "../models/organizations.js"

// controller functions
const showOrganizationsPage = async(req, res) => {
   const organizations = await getAllOrganizations();
   const title = 'Our Partner Organizations'
   res.render('organizations',{title,organizations})
}

// exports
export{ showOrganizationsPage }