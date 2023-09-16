import { FC } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { getCategories, getPets } from "@/services/getData.service";

const DashboardPage: FC = async () => {
  const pets = await getPets();
  const categories = await getCategories();

  return <Dashboard friends={pets} categories={categories} />;
};
export default DashboardPage;
