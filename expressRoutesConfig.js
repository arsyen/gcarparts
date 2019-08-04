const carPartHandlers = require('./api-handlers/carPart/index');
const authHandlers = require('./api-handlers/auth/index');
const requireIdentity = require('./middleware/requireIdentity');
const requireRoles = require('./middleware/requireRoles');
const multer = require('multer');
const path = require('path');


const expressConfig = {
    configure: (app) => {

        app.get('/', async function (req, res) {
                res.sendFile(path.join(__dirname + '/front-end/index.html'));
        });

        app.get('/admin', async function (req, res) {
                res.sendFile(path.join(__dirname + '/front-end-admin/index.html'));
        });

        //File upload
        //app.post('/api/upload', multer({ dest: './uploads/' }).single('file'), fileUploadHandler);


        //Car part routes
        // app.get('/api/car-parts', requireIdentity, schemaHandlers.getAll);
        // app.post('/api/schema', requireIdentity, schemaHandlers.add);
        // app.get('/api/schema/:schemaName', requireIdentity, schemaHandlers.getByName);
        // app.delete('/api/schema/:schemaName', requireIdentity, schemaHandlers.deleteByName);
        // app.put('/api/schema/:schemaName', requireIdentity, schemaHandlers.update);

        //User routes
        //app.post('/api/admin/auth/login', authHandlers.login);
    }
}

module.exports = expressConfig;

