import helmet from "helmet";

const applySecurityMiddlewares = (app) => {
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
      },
    })
  );
  app.use(helmet.hidePoweredBy());
};

export default applySecurityMiddlewares;
