// imports
import { getAllCategories,getCategoryName,updateCategoryAssignment,getCategoryTagByProjectId,createNewCategory, updateCategory} from "../models/categories.js";
import { getServiceProjectsByCategoryId ,getProjectDetails} from "../models/project.js";
import { validationResult ,body} from "express-validator";


const categoryValidation = [
  body('category_name').trim().notEmpty().withMessage('Category name is required').isLength({min:3,max:100}).withMessage('Name should be between 3 and 100 characters')
]
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
     res.render('category',{title,categoryProjects,categoryName,id})
}

const showAssignCategoriesForm = async(req,res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const allCategories = await getAllCategories();
  const projectCategories = await getCategoryTagByProjectId(projectId);
  const title = 'Assign categories to project';
  res.render('assign-categories',{title,projectDetails,allCategories,projectCategories})
}

const processAssignCategoryForm = async(req,res) => {
  const projectId = req.params.id;
  const categories = req.body.categories || []
  await updateCategoryAssignment(projectId,categories)
  req.flash('success',"Categories updated successfully")
  res.redirect(`/project/${projectId}`);
}
const showNewCategoryPage = async(req,res) => {
   const title = 'Create New Category';
   res.render('new-category',{title})
}
const processNewCategoryPage = async(req,res)=> {
  const result = validationResult(req);
  if(!result.isEmpty()){
       result.array().forEach(err => {
          req.flash('error',err.msg)
       })
      return  res.redirect('/new-category')
  }
   const name = req.body.category_name;
   const categoryId = await createNewCategory(name);
   req.flash('success','category created successfully')
   res.redirect(`/category/${categoryId}`)
}
const showEditCategoryPage = async(req,res) => {
   const id = req.params.id;
   const categoryData = await getCategoryName(id)
   const title = 'Edit Category Details'
   res.render('edit-category',{title,categoryData,id})
}
const processEditCategoryPage = async(req,res) => {
   const id = req.params.id;
   const result = validationResult(req)
   if(!result.isEmpty()){
       result.array().forEach(err => {
        req.flash('error',err.msg)
       })
       return res.redirect(`/edit-category/${id}`)
   }
   const name = req.body.category_name;
   await updateCategory(id,name);
   req.flash("success","Category updated successfully");
   res.redirect(`/category/${id}`)
}
// exports
export {showCategoryPage,showCategoryServiceProjectPage,showAssignCategoriesForm,processAssignCategoryForm,showNewCategoryPage,
  processNewCategoryPage,categoryValidation,showEditCategoryPage,processEditCategoryPage
}