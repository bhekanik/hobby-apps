import { Statistics } from "src/components/Statistics";
import { DashboardLayout } from "src/layouts/DashboardLayout";

export const Settings = () => {
  return (
    <DashboardLayout>
      <Statistics />
    </DashboardLayout>
  );
};

export default Settings;

export { getServerSideProps } from "src/lib/Chakra";
