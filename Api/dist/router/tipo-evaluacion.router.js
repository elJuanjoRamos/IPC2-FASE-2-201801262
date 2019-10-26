"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tipo_evaluacion_controller_1 = __importDefault(require("./../controller/tipo-evaluacion.controller"));
var tipoEvaluacion = express_1.Router();
tipoEvaluacion.get('/tipoevaluacion/:id', tipo_evaluacion_controller_1.default.getInstance().getAll);
tipoEvaluacion.post('/evaluacionsm', tipo_evaluacion_controller_1.default.getInstance().createSM);
tipoEvaluacion.post('/evaluacionvf', tipo_evaluacion_controller_1.default.getInstance().createVF);
exports.default = tipoEvaluacion;