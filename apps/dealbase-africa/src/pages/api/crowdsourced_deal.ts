// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { db } from "src/lib/db";
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
import { Collections } from "types";

export interface CrowdsourcedDeal {
  id: number;
  created_at: string;
  email: string;
  company_name: string;
  press_release_link: string;
  press_release_date: Date | string;
  sector: string;
  stage: string;
  industry: string;
  investor: string;
  amount: number;
  additional_info: string;
}

export interface ReturnType {
  success: boolean;
  crowdsourced_deals?: CrowdsourcedDeal[];
  crowdsourced_deal?: CrowdsourcedDeal;
  crowdsouced_deal_id?: string;
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
      const { body } = req;

      logger.info("Saving Crowdsourced Deal", { ...loggerMetadata, body });
      const data = await db.create(Collections.CrowdsourcedDeals, body);

      logger.info("Finished Saving Crowdsouced Deal", loggerMetadata);

      res.status(200).json({ success: true, crowdsourced_deal: data });
    }

    if (req.method === "PATCH") {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );
      const checkPermissions = createCheckPermissionsMiddleware([
        "edit:crowdsourced_deals",
      ]);
      await runMiddleware(req, res, checkPermissions);

      const {
        body: { ...updateData },
      } = req;

      logger.info("Updating Crowdsourced Deal", loggerMetadata);
      const data = await db.update(Collections.CrowdsourcedDeals, updateData);

      logger.info("Finished Updating Crowdsourced Deal", loggerMetadata);

      res.status(200).json({ crowdsourced_deal: data });
    }

    if (req.method === "DELETE") {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );
      const checkPermissions = createCheckPermissionsMiddleware([
        "delete:crowdsourced_deals",
      ]);
      await runMiddleware(req, res, checkPermissions);

      const {
        body: { id },
      } = req;

      logger.info("Deleting Crowdsouced Deal", loggerMetadata);
      const data = await db.delete(Collections.CrowdsourcedDeals, id);

      logger.info("Finished Deleting Crowdsouced Deal", loggerMetadata);

      res.status(200).json({ data });
    }

    if (req.method === "GET") {
      await runMiddleware(
        req,
        res,
        authorizeAccessToken as unknown as MiddlewareFunction
      );
      const checkPermissions = createCheckPermissionsMiddleware([
        "read:crowdsourced_deals",
      ]);
      await runMiddleware(req, res, checkPermissions);

      logger.info("Getting Crowdsouced Deal", loggerMetadata);
      const { data: crowdsourced_deals, error } = await supabase
        .from(Collections.CrowdsourcedDeals)
        .select("*");

      if (error) throw error;

      logger.info("Finished Getting Crowdsourced Deal", loggerMetadata);

      res.status(200).json({
        success: true,
        crowdsourced_deals,
        total: crowdsourced_deals?.length,
      });
    }
  } catch (e) {
    handleApiError(e as ErrorCommon, res, req);
  }
}

export default withSentry(handler);
