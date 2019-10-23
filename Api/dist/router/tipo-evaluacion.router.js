"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tipoEvaluacion_controller_1 = __importDefault(require("./../controller/tipo-evaluacion.controller"));
var tipoEvaluacion = express_1.Router();
tipoEvaluacion.get('/evaluacionsm', tipoEvaluacion_controller_1.default.getInstance().getAllSM);
tipoEvaluacion.get('/evaluacionsm/:id', tipoEvaluacion_controller_1.default.getInstance().getSingleSM);
tipoEvaluacion.post('/evaluacionsm', tipoEvaluacion_controller_1.default.getInstance().createSM);
tipoEvaluacion.delete('/evaluacionsm/:id', tipoEvaluacion_controller_1.default.getInstance().deleteSM);
tipoEvaluacion.get('/evaluacionvf', tipoEvaluacion_controller_1.default.getInstance().getAllVF);
tipoEvaluacion.get('/evaluacionvf/:id', tipoEvaluacion_controller_1.default.getInstance().getSingleVF);
tipoEvaluacion.post('/evaluacionvf', tipoEvaluacion_controller_1.default.getInstance().createVF);
tipoEvaluacion.delete('/evaluacionvf/:id', tipoEvaluacion_controller_1.default.getInstance().deleteVF);

exports.default = tipoEvaluacion;