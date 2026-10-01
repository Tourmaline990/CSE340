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
const assignCategoryToProject = async(projectId,categoryId) => {
  const query = `
   INSERT INTO service_category (project_id,category_id)
   VALUES
   ($1,$2)
  `
  const queryParams = [projectId,categoryId]
   await db.query(query,queryParams)
}
const updateCategoryAssignment =  async(projectId,categoryIds) => {
   const deleteQuery = `
     DELETE FROM service_category
     WHERE project_id = $1
   `
   const deleteQueryParams = [projectId]
   await db.query(deleteQuery,deleteQueryParams)
   for (const categoryId of categoryIds) {
     await assignCategoryToProject(projectId,categoryId)
   }
}
const createNewCategory = async(category_name) => {
    const query = `
      INSERT INTO categories(category_name)
      VALUES ($1)
      RETURNING category_id
    `
    const queryParams = [category_name]
    const result = await db.query(query,queryParams)
    if(result.rows.length === 0){
       throw new Error("Failed to create category")
    }
    if(process.env.ENABLE_SQL_LOGGING === true){
       console.log("created category with id:",result.rows[0].category_id)
    }
    return result.rows[0].category_id;
}

const updateCategory = async(category_id,category_name) => {
  const query = `
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
    RETURNING category_id 
  `
  const queryParams  = [category_name,category_id]
  const result = await db.query(query,queryParams)
  if(result.rows.length === 0){
   throw new Error('failed to update category')
  }
  if(process.env.ENABLE_SQL_LOGGING === true){
   console.log("updated category with id:",result.rows[0].category_id)
  }
  return result.rows[0].category_id
}
export {getAllCategories,getCategoryTagByProjectId,getCategoryName,updateCategoryAssignment,
   createNewCategory,updateCategory
}