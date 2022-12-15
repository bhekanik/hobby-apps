import { captureException, withSentry } from "@sentry/nextjs";
import { handleApiError } from "src/lib/handleApiError";
import { logger } from "src/lib/logger";
import * as URL from "url";

// Change host appropriately if you run your own Sentry instance.
const sentryHost = "o1198116.ingest.sentry.io";

// Set knownProjectIds to an array with your Sentry project IDs which you
// want to accept through this proxy.
const knownProjectIds = ["/6320724"];

async function handler(req, res) {
  const loggerMetadata = {
    url: req.url,
    method: req.method,
  };

  try {
    const envelope = req.body;
    const pieces = envelope.split("\n");

    const header = JSON.parse(pieces[0]);
    logger.info("Processing Sentry Telemetry Request", loggerMetadata);

    const { host, path } = URL.parse(header.dsn);
    const projectId = path.endsWith("/") ? path.slice(0, -1) : path;
    logger.info("Checking parameters", {
      ...loggerMetadata,
      host,
      path,
      projectId,
    });
    if (host !== sentryHost) {
      throw new Error(`invalid host: ${host}`);
    }

    if (!knownProjectIds.includes(projectId)) {
      throw new Error(`invalid project id: ${projectId}`);
    }

    const url = `https://${sentryHost}/api/${projectId}/envelope/`;
    const response = await fetch(url, {
      method: "POST",
      body: envelope,
    });
    const data = await response.json();

    logger.info("Sentry Telemetry Request Complete", {
      ...loggerMetadata,
      data,
    });
    return res.status(200).json(data);
  } catch (e) {
    logger.info("Sentry Telemetry Request Error", loggerMetadata);
    captureException(e);
    handleApiError(e, res, req);
    return res.status(400).json({ status: "invalid request" });
  }
}

export default withSentry(handler);
