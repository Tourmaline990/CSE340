import db from './db.js';

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    RETURNING user_id, project_id
  `;
  const queryParams = [userId, projectId];
   const result = await db.query(query, queryParams);
   if(result.rows.length === 0){
    throw new Error("failed to add volunteer");
   }
   if(process.env.ENABLE_SQL_LOGGING === "true"){
    console.log(`Added volunteer with user_id: ${userId} to project_id: ${projectId}`);
   }
   console.log("Volunteer added:", result.rows[0]);
   return result.rows[0];
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    RETURNING user_id, project_id
  `;
  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);
  if(result.rows.length === 0){
    throw new Error("failed to remove volunteer");
  }
  if(process.env.ENABLE_SQL_LOGGING === "true"){
    console.log(`Removed volunteer with user_id: ${userId} from project_id: ${projectId}`);
  }
  console.log("Volunteer removed:", result.rows[0]);
  return result.rows[0];
};
const getProjectsByVolunteers = async(userId) => {
    const query = `
       SELECT projects.project_id, projects.title
       FROM projects
       JOIN volunteers 
       ON projects.project_id = volunteers.project_id
       WHERE volunteers.user_id = $1
    `;
    const queryParams = [userId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

export { addVolunteer,removeVolunteer,getProjectsByVolunteers };