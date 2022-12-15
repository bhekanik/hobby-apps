import { db } from "src/lib/db/supabase";
import { logger } from "src/lib/logger";
import { supabase } from "src/lib/supabaseClient";
import { Collections, DatabaseDeal, Deal } from "types";

export async function createDeals(
  deals: (Omit<Deal, "investors"> & { investors: string })[],
  loggerMetadata: Record<string, unknown>
): Promise<(DatabaseDeal | null)[]> {
  const { data: databaseLogos } = await supabase
    .from(Collections.Logos)
    .select("*");

  const logosMap = databaseLogos?.reduce((acc, logo) => {
    acc[logo.original_filename] = logo;
    return acc;
  }, {});

  const dealsPromises = [];

  for await (const deal of deals) {
    const {
      id,
      created_at,
      company: { id: _, created_at: cca, logo, ...remainingCompany },
      investors,
      press_release,
      ...remainingDeal
    } = deal;

    const existingLogo = logosMap[logo?.original_filename ?? ""];

    let savedLogo;
    if (!remainingCompany.logo_id) {
      if (existingLogo) {
        logger.info("Logo Already exists", {
          ...loggerMetadata,
          logo: existingLogo,
        });

        savedLogo = await db.update(
          Collections.Logos,
          { ...existingLogo, ...logo },
          existingLogo.id
        );
      } else {
        if (logo) {
          logger.info("Saving New Logo", {
            ...loggerMetadata,
            logo: logo,
          });

          savedLogo = await db.create(Collections.Logos, logo);
        }
      }
    }

    logger.info("Checking if Company Already exists", {
      ...loggerMetadata,
      company: remainingCompany,
    });

    const { data: existingCompany } = await supabase
      .from(Collections.Companies)
      .select("*")
      .eq("name", remainingCompany.name.trim())
      .single();

    let savedCompany;
    if (existingCompany) {
      logger.info("Company Already exists", {
        ...loggerMetadata,
        company: existingCompany,
      });

      const updatedCompany = await db.update(
        Collections.Companies,
        {
          ...existingCompany,
          ...remainingCompany,
        },
        existingCompany.id
      );

      savedCompany = updatedCompany;
    } else {
      const newCompany = {
        ...remainingCompany,
      };

      if (savedLogo) {
        newCompany.logo_id = savedLogo.id;
      }

      logger.info("Saving New Company", {
        ...loggerMetadata,
        company: newCompany,
      });

      savedCompany = await db.create(Collections.Companies, newCompany);
    }

    let savedPressRelease;
    if (press_release?.link || press_release?.date !== "Invalid Date") {
      logger.info("Checking if Press Release Already exists", {
        ...loggerMetadata,
        press_release: press_release,
      });

      const { data: existingPressRelease } = await supabase
        .from(Collections.PressReleases)
        .select("*")
        .eq("link", press_release.link ?? "")
        .single();

      if (existingPressRelease) {
        logger.info("Press Release Already exists", {
          ...loggerMetadata,
          press_release: existingPressRelease,
        });

        savedPressRelease = await db.update(
          Collections.PressReleases,
          {
            ...existingPressRelease,
            ...press_release,
          },
          existingPressRelease.id
        );
      } else {
        const newPressRelease = {
          ...press_release,
          company_id: savedCompany?.id,
        };

        logger.info("Saving New Press Release", {
          ...loggerMetadata,
          press_release: newPressRelease,
        });
        savedPressRelease = await db.create(
          Collections.PressReleases,
          newPressRelease
        );
      }
    }

    const investorsArray = Array.isArray(investors)
      ? investors
      : JSON.parse(investors) || [];

    let savedInvestors: string[] = [];
    const investorPromises = [];
    if (investorsArray) {
      for await (const investor of investorsArray) {
        const { data: existingInvestor } = await supabase
          .from(Collections.Investors)
          .select("name")
          .eq("name", investor.trim())
          .single();

        if (existingInvestor) {
          logger.info("Investor already exists", {
            ...loggerMetadata,
            investor,
            existingInvestor: existingInvestor.name,
            newInvestor: investor.trim().toLowerCase().replace(/\s/g, ""),
          });
          savedInvestors = [...savedInvestors, existingInvestor.name];
        } else if (investor.trim() !== "") {
          logger.info("Saving New Investor", {
            ...loggerMetadata,
            investor: investor.trim(),
          });
          investorPromises.push(
            db.create(Collections.Investors, {
              name: investor.trim(),
            })
          );
        }
      }
    }
    const newSavedInvestors = await Promise.all(investorPromises);
    savedInvestors = [
      ...savedInvestors,
      ...newSavedInvestors.map((i) => i.name),
    ];

    const dealToSave: Omit<DatabaseDeal, "id" | "company"> & {
      id?: number;
    } = {
      ...remainingDeal,
      company_id: savedCompany?.id,
      investors: JSON.stringify(savedInvestors),
      press_release_id: null,
    };

    if (savedPressRelease) {
      dealToSave.press_release_id = savedPressRelease?.id;
    }

    if (id) {
      logger.info("Updating Deal", {
        ...loggerMetadata,
        updatedDeal: { ...dealToSave, id },
      });
      dealsPromises.push(
        db.update(Collections.Deals, dealToSave, id as number)
      );
    } else {
      logger.info("Saving New Deal", { ...loggerMetadata, dealToSave });
      dealsPromises.push(db.create(Collections.Deals, dealToSave));
    }

    logger.info("Finished Saving Deal", loggerMetadata);
  }

  const savedDeals = await Promise.all(dealsPromises);

  return savedDeals;
}
