import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorCommon, handleApiError } from "src/lib/handleApiError";
import { logger } from "src/lib/logger";
import { applyCommonMiddlewares } from "src/lib/middlewares/applyCommonMIddlewares";
import { supabase } from "src/lib/supabaseClient";
import { Collections } from "types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await applyCommonMiddlewares(req, res);
    const loggerMetadata = {
      traceId: req.headers["x-trace-id"],
      url: req.url,
      method: req.method,
    };

    if (req.method === "GET") {
      logger.info("Getting deals", loggerMetadata);
      const { data: deals, error } = await supabase.from(Collections.Deals)
        .select(`
          *,
          company (
            *,
            logo (
              *
            )
          ),
          press_release (
            *
          )
        `);

      const newDeals = [];
      for (const deal of deals || []) {
        const { investors } = deal;

        deal.investors = JSON.parse(investors);

        newDeals.push(deal);
      }

      if (error) throw error;

      logger.info("Finished Getting deals", loggerMetadata);

      res
        .status(200)
        .json({ success: true, deals: newDeals, total: newDeals?.length });
    }
  } catch (e) {
    handleApiError(e as ErrorCommon, res, req);
  }
}

export default withSentry(handler);
