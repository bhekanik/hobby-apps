import { withSentry } from "@sentry/nextjs";
import cloudinary from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import "src/lib/cloudinary/cloudinary";
import { logger } from "src/lib/logger";
import { applyCommonMiddlewares } from "src/lib/middlewares/applyCommonMIddlewares";
import { authorizeAccessToken } from "src/lib/middlewares/authorizeAccessToken";
import {
  MiddlewareFunction,
  runMiddleware,
} from "src/lib/middlewares/runMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await applyCommonMiddlewares(req, res);
  const loggerMetadata = {
    traceId: req.headers["x-trace-id"],
    url: req.url,
    method: req.method,
  };
  await runMiddleware(
    req,
    res,
    authorizeAccessToken as unknown as MiddlewareFunction
  );

  const timestamp = Math.round(new Date().getTime() / 1000);
  const options = JSON.parse(req.body);

  // show the time stamp
  logger.info("Signing with timestamp", {
    ...loggerMetadata,
    timestamp,
    ...options,
  });

  // Get the signature using the Node.js SDK method api_sign_request
  const signature = await cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      ...(options || {}),
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
}

export default withSentry(handler);
