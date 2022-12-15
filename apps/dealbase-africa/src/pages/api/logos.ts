// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "src/lib/db/supabase";
import { ErrorCommon, handleApiError } from "src/lib/handleApiError";
import { logger } from "src/lib/logger";
import { applyCommonMiddlewares } from "src/lib/middlewares/applyCommonMIddlewares";
import { authorizeAccessToken } from "src/lib/middlewares/authorizeAccessToken";
import { createCheckPermissionsMiddleware } from "src/lib/middlewares/checkPermissions";
import {
  MiddlewareFunction,
  runMiddleware,
} from "src/lib/middlewares/runMiddleware";
import { supabase } from "src/lib/supabaseClient";
import { Collections, Logo } from "types";

export interface ReturnType {
  success: boolean;
  logos?: Logo[];
  logo?: Logo;
  logoId?: string;
  error: unknown;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyCommonMiddlewares(req, res);
    const loggerMetadata = {
      traceId: req.headers["x-trace-id"],
      url: req.url,
      method: req.method,
    };

    if (req.method === "POST") {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );
      const { body: logos } = req;

      logger.info("Checking if logo exists", loggerMetadata);

      const filters = logos
        .map((logo: Logo) => {
          return `original_filename.eq.${logo.original_filename}`;
        })
        .join(",");

      const { data, error } = await supabase
        .from(Collections.Logos)
        .select("original_filename")
        .or(filters);

      if (error) throw error;

      const logosToSave = logos.filter((logo: Logo) => {
        return !data.find(
          (logoToSave: Logo) =>
            logoToSave.original_filename === logo.original_filename
        );
      });

      logger.info("Saving Logo", loggerMetadata);

      const savedLogo = await db.createMany(Collections.Logos, logosToSave);

      logger.info("Finished Saving Logo", {
        ...loggerMetadata,
      });

      res.status(200).json({ success: true, logo: savedLogo });
    }

    if (req.method === "PATCH") {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );
      const checkPermissions = createCheckPermissionsMiddleware(["read:deals"]);
      await runMiddleware(req, res, checkPermissions);

      const { body: logo } = req;

      let savedLogo;
      if (logo?.url || logo?.cloudinary_public_id) {
        logger.info("Saving Logo", loggerMetadata);
        savedLogo = await db.update(Collections.Logos, logo);

        logger.info("Finished Saving Logo", {
          ...loggerMetadata,
        });
      }

      res.status(200).json({ savedLogo });
    }

    if (req.method === "DELETE") {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );
      const checkPermissions = createCheckPermissionsMiddleware(["read:deals"]);
      await runMiddleware(req, res, checkPermissions);

      const {
        body: { id },
      } = req;

      logger.info("Deleting Logo", loggerMetadata);

      const data = await db.delete(Collections.Logos, id);

      logger.info("Finished Deleting Logo", loggerMetadata);

      res.status(200).json({ data });
    }

    if (req.method === "GET") {
      logger.info("Getting Logos", loggerMetadata);
      const { data: logos, error } = await supabase
        .from(Collections.Logos)
        .select("*");

      if (error) throw error;

      logger.info("Finished Getting Logos", loggerMetadata);

      res.status(200).json({ success: true, logos, total: logos?.length });
    }
  } catch (e) {
    handleApiError(e as ErrorCommon, res, req);
  }
}

export default withSentry(handler);
