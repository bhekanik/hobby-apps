import { Collections, Deal } from "types";
import { logger } from "../logger";
import { supabase } from "../supabaseClient";

export const getDeals = async (
  loggerMetadata: Record<string, unknown> = {}
): Promise<Deal[]> => {
  logger.info("Getting deals", loggerMetadata);
  const { data: deals, error } = await supabase.from(Collections.Deals).select(`
    *,
    press_release (
      *
    )
  `);

  if (error) throw error;

  const { data: companies_with_logos, error: companies_with_logos_error } =
    await supabase.from("company_with_logo").select(`*`);

  if (companies_with_logos_error) throw companies_with_logos_error;

  const newDeals = [];
  for (const deal of deals || []) {
    const { investors } = deal;

    const company =
      companies_with_logos?.find((company) => company.id === deal.company_id) ??
      null;

    if (company) {
      const {
        logo_id,
        logo_cloudinary_public_id,
        logo_url,
        logo_format,
        logo_original_filename,
        ...restOfCompany
      } = company;

      deal.company = {
        ...restOfCompany,
        logo: {
          id: logo_id,
          url: logo_url,
          cloudinary_public_id: logo_cloudinary_public_id,
          format: logo_format,
          original_filename: logo_original_filename,
        },
      };
    } else {
      deal.company = null;
    }

    deal.investors = JSON.parse(investors);

    newDeals.push(deal);
  }

  logger.info("Finished Getting deals", {
    ...loggerMetadata,
    deals: newDeals.length,
  });

  return newDeals;
};
