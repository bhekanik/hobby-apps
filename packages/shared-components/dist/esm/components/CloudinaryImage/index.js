var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Image } from "cloudinary-react";
export const CloudinaryImage = (_a) => {
    var { publicId, imageWidth, alt, imageHeight, radius, crop } = _a, rest = __rest(_a, ["publicId", "imageWidth", "alt", "imageHeight", "radius", "crop"]);
    return (_jsx(Box, Object.assign({ p: 2 }, rest, { children: _jsx(Image, { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, alt: alt, publicId: publicId, width: imageWidth, height: imageHeight, crop: crop || "fill", radius: radius }) })));
};
//# sourceMappingURL=index.js.map