export const formatUrlFromQueryParam = (url) => {
    if (!url)
        return "";
    return encodeURI(decodeURIComponent(url));
};
//# sourceMappingURL=formatUrlFromQueryParam.js.map