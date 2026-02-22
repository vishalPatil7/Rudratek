import { Router } from 'express';
import {
  listProjects,
  getProject,
  createProject,
  updateProjectStatus,
  deleteProject,
} from '../controllers/projects.js';

const router = Router();

router.get('/', listProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.patch('/:id/status', updateProjectStatus);
router.delete('/:id', deleteProject);

export default router;
