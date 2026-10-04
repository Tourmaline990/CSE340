import express from "express";
import { showHomePage } from "./controllers/index.js";
import { showCategoryPage,categoryValidation,showCategoryServiceProjectPage,showAssignCategoriesForm,processAssignCategoryForm,showNewCategoryPage,processNewCategoryPage, showEditCategoryPage, processEditCategoryPage} from "./controllers/categories.js";
import { showOrganizationsPage } from "./controllers/organization.js";
import { showProjectPage,showProjectDetailsPage,showNewProjectForm,processNewProjectForm,projectValidation,showEditProjectForm,processEditProjectForm} from "./controllers/projects.js";
import { testErrorPage } from "./controllers/error.js";
import { showOrganizationDetailsPage,showNewOrganizationForm,processNewOrganizationForm,organizationValidation,
    showEditOrganizationForm,processEditOrganizationForm} from "./controllers/organization.js";
import { userValidation,showUserRegistrationForm,processUserRegistrationForm, showLoginPage,processLogOut,processLoginForm, requireLogin, showDashboard,
    requireRole
 } from "./controllers/users.js";

const router = express.Router();

router.get('/',showHomePage);
router.get('/categories',showCategoryPage);
router.get('/projects',showProjectPage);
router.get('/organizations',showOrganizationsPage);
router.get('/organization/:id',showOrganizationDetailsPage)
router.get('/project/:id',showProjectDetailsPage)
router.get('/category/:id',showCategoryServiceProjectPage)
router.get("/new-organization",requireRole('admin'),showNewOrganizationForm)
router.post("/new-organization",requireRole('admin'),organizationValidation,processNewOrganizationForm)
router.get('/edit-organization/:id',requireRole('admin'),showEditOrganizationForm)
router.post('/edit-organization/:id',requireRole('admin'),organizationValidation,processEditOrganizationForm)
router.get('/new-project',requireRole('admin'),showNewProjectForm)
router.post('/new-project',requireRole('admin'),projectValidation,processNewProjectForm)
router.get('/assign-categories/:id',requireRole('admin'),showAssignCategoriesForm)
router.post('/assign-categories/:id',requireRole('admin'),processAssignCategoryForm)
router.get('/edit-project/:id',requireRole('admin'),showEditProjectForm)
router.post('/edit-project/:id',requireRole('admin'),processEditProjectForm)
router.get('/new-category',requireRole('admin'),showNewCategoryPage)
router.post('/new-category',requireRole('admin'),categoryValidation,processNewCategoryPage)
router.get('/edit-category/:id',requireRole('admin'),showEditCategoryPage)
router.post('/edit-category/:id',requireRole('admin'),categoryValidation,processEditCategoryPage)
router.get('/register',showUserRegistrationForm)
router.post('/register',userValidation,processUserRegistrationForm)
router.get('/login',showLoginPage)
router.post('/login',processLoginForm)
router.get('/logout',processLogOut)

// protected route
router.get('/dashboard',requireLogin,showDashboard)
// error handler
router.get('/test-error',testErrorPage);

export default router;