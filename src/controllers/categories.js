// imports
import { getAllCategories,getCategoryName,getCategoryTagByProjectId } from "../models/categories.js";
import { getServiceProjectsByCategoryId } from "../models/project.js";

//  controller functions
const showCategoryPage = async(req,res) => {
     const title = 'Categories';
     const categories = await getAllCategories();
     res.render('categories',{title,categories})
}

const showCategoryServiceProjectPage = async(req,res) => {
     const id = req.params.id;
     const categoryProjects = await getServiceProjectsByCategoryId(id);
     const categoryName = await getCategoryName(id)
     const title = categoryName.length > 0? categoryName[0].category_name : 'Category Projects';
     res.render('category',{title,categoryProjects,categoryName})
}
// export
export {showCategoryPage,showCategoryServiceProjectPage}