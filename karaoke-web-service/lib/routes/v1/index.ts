import express from "express";
import httpStatus from "http-status-codes";
import data from "./data/index";

const router = express.Router();

router.get("/v1/status", (_req, res) => res.sendStatus(httpStatus.OK));
router.get("/v1/data", (_req, res) => res.status(httpStatus.OK).json(data()));

export default router;
