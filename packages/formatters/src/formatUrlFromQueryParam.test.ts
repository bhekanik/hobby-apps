export const formatUrlFromQueryParam = (url: string) => {
  if (!url) return "";

  return encodeURI(decodeURIComponent(url));
};
import { describe, expect, it } from "vitest";

describe("formatInterval", () => {
  it("should return an empty string if the url is falsy", () => {
    expect(formatUrlFromQueryParam("")).toBe("");
  });

  it("should correctly format the url", () => {
    const url =
      "http://res.cloudinary.com/dealbase-africa/image/upload/f_auto,q_auto/l_fetch:aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGVhbGJhc2UtYWZyaWNhL2ltYWdlL3VwbG9hZC92MTY0OTExMjc3OS9tYXBzL2FmcmljYV9xMm00dnMucG5n/fl_layer_apply,g_north_west,h_406,w_464,x_700,y_200/co_black,l_text:Poppins_80_medium:%24383M/fl_layer_apply,g_north_west,x_2000,y_270/co_black,l_text:Poppins_80_medium:37/fl_layer_apply,g_north_west,x_2000,y_530/co_black,l_text:Poppins_80_medium:139/fl_layer_apply,g_north_west,x_2000,y_790/c_fit,co_black,l_text:Poppins_80_bold:Africa%20Fundraising%20Roundup,w_550/fl_layer_apply,g_north_west,x_150,y_230/co_black,l_text:Poppins_48:29%20Apr%252C%202022%20-%2029%20May%252C%202022/fl_layer_apply,g_north_west,x_420,y_693/co_black,l_text:Poppins_48:All/fl_layer_apply,g_north_west,x_450,y_843/h_630,w_1200/v1649422206/share_oex5it.jpg";
    expect(formatUrlFromQueryParam(url)).toBe(
      "http://res.cloudinary.com/dealbase-africa/image/upload/f_auto,q_auto/l_fetch:aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGVhbGJhc2UtYWZyaWNhL2ltYWdlL3VwbG9hZC92MTY0OTExMjc3OS9tYXBzL2FmcmljYV9xMm00dnMucG5n/fl_layer_apply,g_north_west,h_406,w_464,x_700,y_200/co_black,l_text:Poppins_80_medium:$383M/fl_layer_apply,g_north_west,x_2000,y_270/co_black,l_text:Poppins_80_medium:37/fl_layer_apply,g_north_west,x_2000,y_530/co_black,l_text:Poppins_80_medium:139/fl_layer_apply,g_north_west,x_2000,y_790/c_fit,co_black,l_text:Poppins_80_bold:Africa%20Fundraising%20Roundup,w_550/fl_layer_apply,g_north_west,x_150,y_230/co_black,l_text:Poppins_48:29%20Apr%252C%202022%20-%2029%20May%252C%202022/fl_layer_apply,g_north_west,x_420,y_693/co_black,l_text:Poppins_48:All/fl_layer_apply,g_north_west,x_450,y_843/h_630,w_1200/v1649422206/share_oex5it.jpg"
    );
  });
});
