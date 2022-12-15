import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { authorizeAccessToken } from "src/lib/middlewares/authorizeAccessToken";
import {
  MiddlewareFunction,
  runMiddleware,
} from "src/lib/middlewares/runMiddleware";

export interface ReturnType {
  success: boolean;
  permissions: string[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );

      const permissions =
        (req as NextApiRequest & { user: { permissions: string[] } }).user
          ?.permissions || [];

      res.status(200).json({ success: true, permissions });
    } catch (e) {
      res.status(500).json({ error: "Failed to get permissions" });
    }
  }
}

export default withSentry(handler);
