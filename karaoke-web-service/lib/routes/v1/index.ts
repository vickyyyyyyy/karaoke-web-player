import express from 'express';
import httpStatus from 'http-status-codes';
import data from './data/index';
import { addUser, getUsers } from './users/index';

const router = express.Router();

router.get('/v1/status', (_req, res) => res.sendStatus(httpStatus.OK));
router.get('/v1/data', (_req, res) => res.status(httpStatus.OK).json(data()));
router.get('/v1/users', (_req, res) =>
  res.status(httpStatus.OK).json(getUsers())
);

router.post('/v1/users', (req, res) => {
  console.log('/v1/users', req.body);

  addUser(req.body.user);

  return res.status(201).json(req.body.user);
});

export default router;
