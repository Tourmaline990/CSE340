import express from "express";
import { showHomePage } from "./controllers/index.js";
import { showCategoryPage } from "./controllers/categories.js";
import { showOrganizationsPage } from "./controllers/organization.js";
import { showProjectPage } from "./controllers/projects.js";
import { testErrorPage } from "./controllers/error.js";
import { showOrganizationDetailsPage } from "./controllers/organization.js";

const router = express.Router();

router.get('/',showHomePage);
router.get('/categories',showCategoryPage);
router.get('/projects',showProjectPage);
router.get('/organizations',showOrganizationsPage);
router.get('/organization/:id',showOrganizationDetailsPage)

// error handler
router.get('/test-error',testErrorPage);

export default router;