import { HTTP_STATUS } from "@repo/shared";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import { corsOptions, logger } from "./config";
import { ApiError, ApiResponse } from "./lib";
import { errorHandler, publicApiLimiter } from "./middlewares";
import { authRouter } from "./modules/auth";

const app: Application = express();

app.set("trust proxy", 1);

// --- MIDDLEWARE SETUP ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(publicApiLimiter);
app.use(
  morgan("tiny", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }),
);

// --- API ROUTES ---
// health check endpoint
app.get("/health", (req: Request, res: Response) => {
  return res.status(HTTP_STATUS.OK).json({
    ...new ApiResponse(HTTP_STATUS.OK, "Server is healthy!"),
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// register module routes
app.use("/api/auth", authRouter);

//  --- ERROR HANDLING ---
// catch-all for undefined routes (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route not found: ${req.originalUrl}`));
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

export default app;
