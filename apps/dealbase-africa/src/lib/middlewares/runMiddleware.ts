import { NextApiRequest, NextApiResponse } from "next";

export type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: (...args: unknown[]) => unknown
) => void;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
