/* eslint-disable new-cap */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = new multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/houses', HouseController.index);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.put(
  '/houses/:house_id',
  upload.single('thumbnail'),
  HouseController.update
);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboards', DashboardController.show);

routes.get('/reserves', ReserveController.index);
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.delete('/reserves/cancel', ReserveController.destroy);

export default routes;