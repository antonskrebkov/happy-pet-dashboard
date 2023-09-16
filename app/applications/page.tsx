import Applications from "@/components/applications/Applications";
import { getApplications } from "@/services/getData.service";
import { FC } from "react";

const ApplicationsPage: FC = async () => {
  const data = await getApplications();

  return <Applications data={data.reverse()} />;
};
export default ApplicationsPage;
