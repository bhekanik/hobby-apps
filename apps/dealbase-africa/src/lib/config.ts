export const isProd = process.env.NODE_ENV === "production";
export const isProdDeployEnv =
  process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production";
export const baseUrl = isProdDeployEnv
  ? "https://dealbase.africa"
  : "https://dealbase-africa.vercel.app";
