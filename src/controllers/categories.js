// imports
import { getAllCategories } from "../models/categories.js";

//  controller functions
const showCategoryPage = async(req,res) => {
     const title = 'Categories';
     const categories = await getAllCategories();
     res.render('categories',{title,categories})
}

// export
export {showCategoryPage}