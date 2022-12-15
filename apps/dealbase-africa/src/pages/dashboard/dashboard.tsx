import { Statistics } from "src/components/Statistics";
import { Summaries } from "src/components/Summaries";
import { useFilteredDeals } from "src/hooks/useFilteredDeals";
import { DashboardLayout } from "src/layouts/DashboardLayout";

export const Dashboard = () => {
  useFilteredDeals();

  return (
    <DashboardLayout>
      <Statistics flexDir="row" w="full" />
      <Summaries />
    </DashboardLayout>
  );
};

export default Dashboard;

export { getServerSideProps } from "src/lib/Chakra";
