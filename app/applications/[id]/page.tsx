import Application from "@/components/application/Application";
import { IApplication } from "@/interfaces/IApplication";
import {
  getApplications,
  getApplicationById,
} from "@/services/getData.service";
import { FC } from "react";

interface ApplicationPageProps {
  params: { id: string };
}

export const generateStaticParams = async () => {
  const applications: IApplication[] = await getApplications();

  return applications.map((application) => ({
    slug: application.id,
  }));
};

const ApplicationPage: FC<ApplicationPageProps> = async ({
  params: { id },
}) => {
  const data = await getApplicationById(id);

  return <Application application={data} />;
};
export default ApplicationPage;
