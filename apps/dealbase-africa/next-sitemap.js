const siteUrl =
  process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production"
    ? "https://dealbase.africa"
    : "https://dealbase-africa.vercel.app";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/signin" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/signin"],
};
