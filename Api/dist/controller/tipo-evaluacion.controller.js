"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var TipoEvaluacionController = /** @class */ (function() {
    function TipoEvaluacionController() {


        //EVALUACIONES FALSO Y VERDADERO
        this.getAllVF = function(req, res) {
            var query = "\n            SELECT * FROM EVALUACIONVF\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getSingleVF = function(req, res) {
            var query = "\n            SELECT * FROM EVALUACIONVF WHERE idEvaluacionVF = ?\n        ";
            var id = req.params.id;
            mysql_1.default.sendQuery(query, id, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data[0]);
                }
            });
        };
        this.createVF = function(req, res) {
            var query = "\n  CALL SP_CreateEvaluacionVF(?, ?, ?);\n        ";
            var body = {
                idDetalleEvaluacion: req.body.idDetalleEvaluacion,
                pregunta: req.body.pregunta,
                respuesta: req.body.respuesta
            };
            mysql_1.default.sendQuery(query, [body.idDetalleEvaluacion, body.pregunta, body.respuesta], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
        this.deleteVF = function(req, res) {
            var id = req.params.id;
            var query = "\n     SP_EliminarEvaluacionVF(?);\n        ";
            mysql_1.default.sendQuery(query, id, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };

        //EVALUACIONES SELECCION MULTIPLE
        this.getAllSM = function(req, res) {
            var query = "\n            SELECT * FROM EVALUACIONSM\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getSingleSM = function(req, res) {
            var query = "\n            SELECT * FROM EvaluacionSM WHERE idEvaluacionSM = ?\n        ";
            var id = req.params.id;
            mysql_1.default.sendQuery(query, id, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data[0]);
                }
            });
        };
        this.createSM = function(req, res) {
            var query = "\n  CALL SP_CreateEvaluacionVF(?, ?, ?);\n        ";
            var body = {
                idDetalleEvaluacion: req.body.idDetalleEvaluacion,
                pregunta: req.body.pregunta,
                respuesta1: req.body.respuesta1,
                respuesta2: req.body.respuesta2,
                respuesta3: req.body.respuesta3,
                correcta: req.body.correcta
            };
            mysql_1.default.sendQuery(query, [body.idDetalleEvaluacion, body.pregunta, body.respuesta1, body.respuesta2, body.respuesta3, body.correcta], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
        this.deleteSM = function(req, res) {
            var id = req.params.id;
            var query = "\n     SP_EliminarEvaluacionSM(?);\n        ";
            mysql_1.default.sendQuery(query, id, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
    }
    TipoEvaluacionController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return TipoEvaluacionController;
}());
exports.default = TipoEvaluacionController;