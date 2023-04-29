import { registerOrganization } from './../controller/organization.controller';
import express from 'express';

const router = express.Router();

router.route('/organization/new').post(registerOrganization);

export const organizationRouter = router;
