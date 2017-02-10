import { NextFunction, Request, Response, Router } from "express";



/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/test", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
    router.post("/",(req:Request,res:Response, next: NextFunction)=>
    {
      new IndexRoute().pos(req,res,next);
      console.log(req.body);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    //super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    
    res.json({message: "Welcome to the Tour of Heros"});
  }
  public pos(req: Request, res: Response, next: NextFunction)
  {
    res.json({message:"Mwahahah"});
  }
}