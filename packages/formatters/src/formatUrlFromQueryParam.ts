export const formatUrlFromQueryParam = (url: string) => {
  if (!url) return "";

  return encodeURI(decodeURIComponent(url));
};
