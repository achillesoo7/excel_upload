const express = require('express');
const FileUpload = require('../../service/file_upload');

const upload = require('../../config/multer');

module.exports = function () {

    let Router = express.Router();

    // Router.get('/test', (req, res) => {
    //     res.send('Hello world of passionate programmers');
    // });

    Router.get('/file_upload', (req, res) => {
        res.render('index');
    });

    Router.post('/file_upload', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: "Sorry its an internal server error"
                });
            }
            FileUpload.processFile(req.file, req.body.chips).then((resp) => {
               res.render('excel', {
                   data: resp
               });
            }).catch((err) => {
                res.status(500).json({
                    status: 500,
                    message: "Sorry its an internal server error",
                    error: err
                });
            });
        });
    });

    return Router;
}