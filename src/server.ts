import * as bodyParser from "body-parser"
import * as express from "express"
import * as logger from "morgan"
import * as path from "path"
import * as passport from "passport"

import errorHandler = require("errorhandler");

export class Server {
    public app: express.Application;
    public static bootstrap(): Server {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.api();
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
  * @method api
  */
    routes() {

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