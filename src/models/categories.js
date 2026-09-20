import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT category_id,category_name
     FROM categories
  `
  const result = await db.query(query);
  return result.rows;
};
const getCategoryName = async(categoryId) => {
   const query = `
     SELECT category_name
       FROM categories
      WHERE category_id = $1;
   `
   const queryParams = [categoryId];
   const result = await db.query(query,queryParams)
   return result.rows;
}
  

const getCategoryTagByProjectId = async(projectId) => {
   const query  = `
       SELECT categories.category_id,categories.category_name
          FROM service_category
             JOIN categories
                ON service_category.category_id = categories.category_id
          WHERE project_id = $1
   `
   const queryParams = [projectId]
   const result = await db.query(query,queryParams)
   return result.rows;
}
export {getAllCategories,getCategoryTagByProjectId,getCategoryName}