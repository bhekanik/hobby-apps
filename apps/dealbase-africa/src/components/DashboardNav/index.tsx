import { Box } from "@chakra-ui/react";
import { DashboardNavItem } from "./DashboardNavItem";

const dashboardNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/dashboard",
    as: "/dashboard/dashboard",
  },
  {
    label: "Deals",
    href: "/dashboard/deals",
    as: "/dashboard/deals",
  },
  {
    label: "Companies",
    href: "/dashboard/companies",
    as: "/dashboard/companies",
  },
  {
    label: "Investors",
    href: "/dashboard/investors",
    as: "/dashboard/investors",
  },
  {
    label: "Crowdsourced Deals",
    href: "/dashboard/crowdsourced-deals",
    as: "/dashboard/crowdsourced-deals",
  },
  {
    label: "Subscribers",
    href: "/dashboard/subscribers",
    as: "/dashboard/subscribers",
  },
  {
    label: "Gallery",
    href: "/dashboard/gallery",
    as: "/dashboard/gallery",
  },
];

export const DashboardNav = () => {
  return (
    <Box
      as="nav"
      w="full"
      display="flex"
      flexDir="column"
      alignItems="left"
      justifyContent="space-between"
      overflow="auto"
    >
      {dashboardNavItems.map((item) => (
        <DashboardNavItem {...item} key={item.label} />
      ))}
    </Box>
  );
};
