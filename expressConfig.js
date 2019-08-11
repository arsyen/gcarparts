const cors = require('cors');
const identityParser = require('./middleware/identityResolver');
const bodyParser = require('body-parser');
const identityResolver = require('./middleware/identityResolver');
const expressRoutesConfig = require('./expressRoutesConfig');
const cookieParser = require('cookie-parser')

const expressConfig = {
    configure: (app) => {

        app.set('port', process.env.PORT || 8080);
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(identityParser);
        app.use(identityResolver);
        app.use(cors({
            origin: function (origin, callback) {
                //For now allow all origins
                return callback(null, true);
                if (!origin) return callback(null, true);

                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg = `The CORS policy for this site does not allow access from the specified Origin.`;

                    return callback(new Error(msg), false);
                }

                return callback(null, true);
            }
        }));

        expressRoutesConfig.configure(app);
    }
}

module.exports = expressConfig;

