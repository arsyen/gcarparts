const carPartsCRUD = require('./api-handlers/carPart/crud');

const carBrandsHandlers = require('./api-handlers/lookups/brands');
const partCategoryHandlers = require('./api-handlers/lookups/partCategory');
const partSubCategoryHandlers = require('./api-handlers/lookups/partSubCategory');
const carModelHandlers = require('./api-handlers/carmodels/carmodel');
const requireIdentity = require('./middleware/requireIdentity');
const multer = require('multer');
const path = require('path');
const loginHandler = require('./api-handlers/auth/login')
const getImageById = require('./api-handlers/assets/getImage');
const fileUploadHandler= require('./api-handlers/fileUploadHandler');


const expressConfig = {
    configure: (app) => {

        app.get('/', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end/index.html'));
        });

        app.get('/catalog', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end/catalog.html'));
        });

        app.get('/contact', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end/contact.html'));
        });

        app.get('/admin', requireIdentity, async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end-admin/index.html'));
        });

        app.get('/admin-login', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end-admin/login.html'));
        });

        app.get('/admin/brands', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end-admin/brands.html'));
        });

        app.get('/admin/models', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end-admin/models.html'));
        });


        app.get('/admin/categories', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end-admin/categories.html'));
        });
        app.get('/admin/parts', async function (req, res) {
            res.sendFile(path.join(__dirname + '/front-end-admin/parts.html'));
        });

        //File upload
        app.post('/api/upload', [multer({ dest: './uploads/' }).single('file')], fileUploadHandler);

        //Car part routes
        app.get('/api/car-parts', carPartsCRUD.get);
        app.post('/api/car-parts', carPartsCRUD.add);
        app.delete('/api/car-parts/:id', carPartsCRUD.deletePart);
        app.put('/api/car-parts/:id', carPartsCRUD.update);

        app.get('/api/car-brands', carBrandsHandlers.getAll);
        app.post('/api/car-brands', carBrandsHandlers.add);
        app.put('/api/car-brands/:id', carBrandsHandlers.update);
        app.delete('/api/car-brands/:id', carBrandsHandlers.deleteBrand);

        app.get('/api/part-categories', partCategoryHandlers.getAll);
        app.post('/api/part-categories', partCategoryHandlers.add);
        app.put('/api/part-categories/:id', partCategoryHandlers.update);
        app.delete('/api/part-categories/:id', partCategoryHandlers.deleteCategory);

        app.get('/api/part-subcategories', partSubCategoryHandlers.getAll);
        app.post('/api/part-subcategories', partSubCategoryHandlers.add);

        app.get('/api/car-models', carModelHandlers.getAll);
        app.get('/api/car-models/:brandId', carModelHandlers.getByBrand);
        app.post('/api/car-models', carModelHandlers.add);
        app.put('/api/car-models/:id', carModelHandlers.update);
        app.delete('/api/car-models/:id', carModelHandlers.deleteModel);
 
        //User routes
        app.post('/api/admin/auth/login', loginHandler);

        //Images
        app.get('/api/assets/images/:imageId', getImageById);

      
    }
}

module.exports = expressConfig;

