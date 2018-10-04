const file_upload = require('./file_upload/index');


exports.mountAPI = function(app){
    app.use('/app', file_upload());
}