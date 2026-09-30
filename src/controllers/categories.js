// imports
import { getAllCategories,getCategoryName,updateCategoryAssignment,getCategoryTagByProjectId} from "../models/categories.js";
import { getServiceProjectsByCategoryId ,getProjectDetails} from "../models/project.js";

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

const showAssignCategoriesForm = async(req,res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const allCategories = await getAllCategories();
  const projectCategories = await getCategoryTagByProjectId(projectId);
  const title = 'Assign categories to project';
  res.render('assign-categories',{title,projectDetails,allCategories,projectCategories})
}

const processAssignCategoryForm = async(req,res)=> {
  const projectId = req.params.id;
  const categories = req.body.categories || []
  await updateCategoryAssignment(projectId,categories)
  req.flash('success',"Categories updated successfully")
  res.redirect(`/project/${projectId}`);
}
// exports
export {showCategoryPage,showCategoryServiceProjectPage,showAssignCategoriesForm,processAssignCategoryForm}