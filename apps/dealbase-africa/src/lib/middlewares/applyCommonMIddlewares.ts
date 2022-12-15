import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "./runMiddleware";

export async function applyCommonMiddlewares(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors());
  await runMiddleware(req, res, helmet());
  await runMiddleware(req, res, morgan("tiny"));
}
