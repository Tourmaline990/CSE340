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
// get all service projects that belongs to a category
const getServiceProjectsByCategoryId = async (categoryId) => {
    const query = `
         SELECT projects.project_id,title
          FROM projects
            JOIN service_category 
               ON projects.project_id = service_category.project_id
                 JOIN categories
                   ON service_category.category_id = categories.category_id
          WHERE categories.category_id = $1;
      `
      const queryParams = [categoryId]
      const result = await db.query(query,queryParams)
      return result.rows;
}
const getUpcomingProjects = async (number_of_projects) => {
   const query = `
     SELECT project_id,title,projects.description,project_date,location,organization.organization_id,name
     FROM projects
     JOIN organization 
         ON projects.organization_id = organization.organization_id
     WHERE project_date >= CURRENT_DATE
     ORDER BY project_date ASC
     LIMIT $1;
   `
   const queryParams = [number_of_projects]
   const result = await db.query(query,queryParams)
   return result.rows;
}
const getProjectDetails = async (id) => {
   const query = `
    SELECT project_id,title,projects.description,project_date,location,organization.organization_id,name
    FROM projects
    JOIN organization
        ON projects.organization_id = organization.organization_id
    WHERE project_id = $1
   `
   const queryParams = [id]
   const result = await db.query(query,queryParams)
   return result.rows
}


export {getAllProjects,getProjectsByOrganizationId,getUpcomingProjects,getProjectDetails,getServiceProjectsByCategoryId}