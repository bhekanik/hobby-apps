import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import "src/lib/cloudinary/cloudinary";
import { isProd } from "src/lib/config";
import { ErrorCommon, handleApiError } from "src/lib/handleApiError";
import { logger } from "src/lib/logger";
import { applyCommonMiddlewares } from "src/lib/middlewares/applyCommonMIddlewares";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyCommonMiddlewares(req, res);
    const loggerMetadata = {
      traceId: req.headers["x-trace-id"],
      url: req.url,
      method: req.method,
    };

    const linkDef = JSON.parse(req.body);

    logger.info("Starting URL shortening", {
      ...loggerMetadata,
    });

    const apikey = process.env.REBRANDLY_API_KEY as string;

    const headers = {
      "Content-Type": "application/json",
      apikey,
    };

    const endpoint = "https://api.rebrandly.com/v1/links";

    const linkRequest = {
      ...linkDef,
    };

    if (isProd) {
      linkRequest.domain = { fullName: "s.dealbase.africa" };
    }

    const response = await fetch(endpoint, {
      method: "post",
      headers: headers,
      body: JSON.stringify(linkRequest),
    });

    const link = await response.json();

    logger.info("Done shortening URL", {
      ...loggerMetadata,
      shortUrl: link.shortUrl,
    });

    res.statusCode = 200;
    res.json({ link });
  } catch (e) {
    handleApiError(e as ErrorCommon, res, req);
  }
}

export default withSentry(handler);
