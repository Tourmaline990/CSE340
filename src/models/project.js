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

export {getAllProjects}