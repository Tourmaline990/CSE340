import db from "./db.js";

const getAllProjects = async () => {
   
    const query =   `
      SELECT name,title,projects.description,project_date
        FROM organization
           JOIN projects
               ON projects.organization_id = organization.organization_id
    `
    const result = await db.query(query)
    return result.rows;
}

const getProjectsByOrganizationId = async(organization_id) => {
   const query = `
     SELECT project_id,organization_id,title,description,location,project_date
     FROM projects
     WHERE organization_id = $1
     ORDER BY project_date;
   `
   const queryParams = [organization_id];
   const result = await db.query(query, queryParams);
   return result.rows;
}
// project_id
// title
// description
// date
// location
// organization_id
// organization_name

// const getUpcomingProjects = async(number_of_projects) => {
//    const query = `
//       SELECT project_id,organization_id,title,description,location,project_date,name
//       FROM projects
//       JOIN organization ON projects.organization_id = organization.organization_id
//       WHERE project_date >= CURRENT_DATE
//       ORDER BY project_date
//       LIMIT $1
//    `
// }


export {getAllProjects,getProjectsByOrganizationId}