import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const requestUrl = new URL(request.url);
    const url = requestUrl.searchParams.get("url");

    const res = await fetch(url as string);
    const data = await res.text();

    const imageMetaTag = data.match(
      /<meta[^>]+property=['"]og:image['"][^>]+>/
    );
    const descriptionMetaTag = data.match(
      /<meta[^>]+property=['"]og:description['"][^>]+>/
    );

    const image = imageMetaTag?.[0]
      .match(/content=['"]([^'"]+)['"]/)?.[0]
      .match(/['"]([^'"]+)['"]/)?.[0]
      .replace(/['"]/g, "");
    const description = descriptionMetaTag?.[0]
      .match(/content=['"]([^'"]+)['"]/)?.[0]
      .match(/['"]([^'"]+)['"]/)?.[0]
      .replace(/['"]/g, "");

    return json({ image, description });
  } catch (error) {
    console.log("unfurl error:", error);
    return json({ fetchError: error });
  }
};
