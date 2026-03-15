import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import helmet from "helmet";

import corsOptions from "./config/cors-options";
import { publicApiLimiter } from "./middlewares";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();

app.set("trust proxy", 1);

// --- MIDDLEWARE SETUP ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(publicApiLimiter);

// --- API ROUTES ---
// health check endpoint
app.get("/health", (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: "Server is healthy!",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

// register module routes
app.use(authRouter);

//  --- ERROR HANDLING ---
// catch-all for undefined routes (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {
	res.json({ message: "Not Found" });
	return;
});

export default app;
