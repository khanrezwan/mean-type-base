import { UserApi } from './routes/user';
import * as mongoose from 'mongoose';
import * as bodyParser from "body-parser"
import * as express from "express"
import * as logger from "morgan"
import * as path from "path"
import * as passport from "passport"
import methodOverride = require("method-override");

import errorHandler = require("errorhandler");

//routes
import { IndexRoute } from "./routes/index"
//interfaces
import { IUser } from './interfaces/user';
//models
import { IUserModel } from './models/user';
import { IModel } from './models/model';
//schemas
import { userSchema } from "./schemas/user"; //import userSchema

export class Server {
    public app: express.Application;
    public model: IModel;
    
    public static bootstrap(): Server {
        return new Server();
    }
    constructor() {
        //instance defaults
        this.model = Object(); //initialize this to an empty object

        this.app = express();
        this.config();
        this.configdb();
        this.routes();
        this.api();
    }
    /**
     * Configure Databse
     * @class Server
     * @method configDB
     */
    configdb() {
        const MONGODB_CONNECTION: string = "mongodb://localhost:27017/testDB";
        //use q promises
        global.Promise = require("q").Promise;
        (<any>mongoose).Promise = global.Promise;
        //connect to mongoose
        let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
        //create models
        this.model.user = connection.model<IUserModel>("User", userSchema);

    }
    /**
   * Configure application
   *
   * @class Server
   * @method config
   */
    config() {

        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //use logger middlware
        this.app.use(logger("dev"));

        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use override middlware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());

    }
    /**
  * Create router
  *
  * @class Server
  * @method routes
  * @returns void
  */
    routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        //UserRoute
        UserApi.create(router, this.model.user);

        //use router middleware
        this.app.use(router);
    }

    /**
    * Create REST API routes
    *
    * @class Server
    * @method api
    */
    api() {

    }
}