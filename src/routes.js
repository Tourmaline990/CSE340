import express from "express";
import { showHomePage } from "./controllers/index.js";
import { showCategoryPage,showCategoryServiceProjectPage,showAssignCategoriesForm,processAssignCategoryForm} from "./controllers/categories.js";
import { showOrganizationsPage } from "./controllers/organization.js";
import { showProjectPage,showProjectDetailsPage,showNewProjectForm,processNewProjectForm,projectValidation } from "./controllers/projects.js";
import { testErrorPage } from "./controllers/error.js";
import { showOrganizationDetailsPage,showNewOrganizationForm,processNewOrganizationForm,organizationValidation,
    showEditOrganizationForm,processEditOrganizationForm} from "./controllers/organization.js";

const router = express.Router();

router.get('/',showHomePage);
router.get('/categories',showCategoryPage);
router.get('/projects',showProjectPage);
router.get('/organizations',showOrganizationsPage);
router.get('/organization/:id',showOrganizationDetailsPage)
router.get('/project/:id',showProjectDetailsPage)
router.get('/category/:id',showCategoryServiceProjectPage)
router.get("/new-organization",showNewOrganizationForm)
router.post("/new-organization",organizationValidation,processNewOrganizationForm)
router.get('/edit-organization/:id',showEditOrganizationForm)
router.post('/edit-organization/:id',organizationValidation,processEditOrganizationForm)
router.get('/new-project',showNewProjectForm)
router.post('/new-project',projectValidation,processNewProjectForm)
router.get('/assign-categories/:id',showAssignCategoriesForm)
router.post('/assign-categories/:id',processAssignCategoryForm)

// error handler
router.get('/test-error',testErrorPage);

export default router;