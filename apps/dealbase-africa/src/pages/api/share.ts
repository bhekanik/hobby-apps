import { withSentry } from "@sentry/nextjs";
import { v2 as cloudinary } from "cloudinary";
import { format } from "date-fns";
import { countryList } from "fixtures";
import { formatInterval } from "formatters";
import { NextApiRequest, NextApiResponse } from "next";
import "src/lib/cloudinary/cloudinary";
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

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    });

    const dealflow = JSON.parse(req.body);

    logger.info("Creating Cloudinary Image", {
      ...loggerMetadata,
      dealflow,
    });

    const countryListMap = countryList.reduce<Record<string, string>>(
      (acc, country: { name: string; code: string }) => {
        acc[country.name] = country.code;
        return acc;
      },
      {}
    );

    cloudinary.api.resources_by_context(
      "country",
      dealflow.filter.country[0] === "Africa" ||
        dealflow.filter.country.length > 1
        ? "Africa"
        : dealflow.filter.country[0].toLowerCase().replace(" ", "-"),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      function (error, result) {
        if (error) {
          handleApiError(error, res, req);
        }

        const url =
          result.resources[0]?.secure_url ||
          "https://res.cloudinary.com/dealbase-africa/image/upload/v1649112779/maps/africa_q2m4vs.png";

        const publicId = "v1649422206/share_oex5it.jpg";

        try {
          const cloudinaryUrl = cloudinary.url(publicId, {
            width: 1200,
            height: 630,
            transformation: [
              {
                fetch_format: "auto",
                quality: "auto",
              },
              {
                overlay: {
                  url,
                },
              },
              {
                flags: "layer_apply",
                width: 464,
                height: 406,
                gravity: "north_west",
                x: 700,
                y: 200,
              },
              {
                color: "black",
                overlay: {
                  font_family: "Poppins",
                  font_weight: "medium",
                  font_size: "80",
                  text: dealflow.value,
                },
              },
              {
                flags: "layer_apply",
                gravity: "north_west",
                x: 2000,
                y: 270,
              },
              {
                color: "black",
                overlay: {
                  font_family: "Poppins",
                  font_weight: "medium",
                  font_size: "80",
                  text: dealflow.deals.toString(),
                },
              },
              {
                flags: "layer_apply",
                gravity: "north_west",
                x: 2000,
                y: 530,
              },
              {
                color: "black",
                overlay: {
                  font_family: "Poppins",
                  font_weight: "medium",
                  font_size: "80",
                  text: dealflow.investors.toString(),
                },
              },
              {
                flags: "layer_apply",
                gravity: "north_west",
                x: 2000,
                y: 790,
              },
              {
                color: "black",
                width: 550,
                crop: "fit",
                overlay: {
                  font_family: "Poppins",
                  font_weight: "bold",
                  font_size: "80",
                  text: `${
                    dealflow.filter.country.length > 1
                      ? [
                          ...dealflow.filter.country.filter(
                            (_: string, index: number) => {
                              return [0, 1, 2].includes(index);
                            }
                          ),
                          "...",
                        ]
                          .map((country: any) => {
                            if (country === "...") return "...";
                            return countryListMap[country] ?? "";
                          })
                          .join(", ")
                      : dealflow.filter.country
                  } Fundraising Roundup`,
                },
              },
              {
                flags: "layer_apply",
                gravity: "north_west",
                x: 150,
                y: 230,
              },
              {
                color: "black",
                overlay: {
                  font_family: "Poppins",
                  font_size: "48",
                  text: dealflow.filter.dateRange
                    ? formatInterval({
                        start: new Date(dealflow.filter.dateRange.start),
                        end: new Date(dealflow.filter.dateRange.end),
                      }) || "No date"
                    : `01 Jan, 2021 - ${format(new Date(), "dd LLL, yyyy")}`,
                },
              },
              {
                flags: "layer_apply",
                gravity: "north_west",
                x: 420,
                y: 693,
              },
              {
                color: "black",
                overlay: {
                  font_family: "Poppins",
                  font_size: "48",
                  text: dealflow.filter.stage,
                },
              },
              {
                flags: "layer_apply",
                gravity: "north_west",
                x: 450,
                y: 843,
              },
            ],
          });

          logger.info("Done Creating Cloudinary Image", {
            ...loggerMetadata,
            dealflow,
          });

          res.statusCode = 200;
          res.json({ imageUrl: cloudinaryUrl });
        } catch (error) {
          handleApiError(error as Error, res, req);
        }
      }
    );
  } catch (e) {
    handleApiError(e as ErrorCommon, res, req);
  }
}

export default withSentry(handler);
