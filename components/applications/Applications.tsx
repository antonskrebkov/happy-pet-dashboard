"use client";

import { FC, useState } from "react";
import styles from "./Applications.module.scss";
import { IApplication } from "@/interfaces/IApplication";
import Link from "next/link";
import Search from "@/components/search/Search";
import { applicationsAPI } from "@/services/Applications.service";

interface ApplicationsProps {
  data: IApplication[];
}

const Applications: FC<ApplicationsProps> = ({ data }) => {
  const [applications, setApplications] = useState<IApplication[]>(data);

  const [searchApplications, { isLoading }] =
    applicationsAPI.useSearchApplicationsMutation();

  return (
    <div className={styles.main}>
      <div className={styles.applications}>
        <div className={styles.applicationsWrapper}>
          <h1 className={styles.title}>Applications</h1>
          <Search
            searchFunction={searchApplications}
            setFunction={setApplications}
            isLoading={isLoading}
          />
          <ul className={styles.items}>
            {applications &&
              applications.map((application) => (
                <Link
                  href={"applications/" + application.id}
                  key={application.id}
                  className={styles.item}
                >
                  <div className={styles.itemName}>
                    {application.firstName} {application.surname}
                  </div>
                  <div className={styles.itemFriendsList}>
                    <span>Pets: </span>
                    {application.friends.map((friend) => (
                      <span key={friend.id}>
                        {application.friends.lastIndexOf(friend) ==
                        application.friends.length - 1
                          ? friend.name
                          : friend.name + ", "}
                      </span>
                    ))}
                  </div>
                  <div className={styles.itemDate}>{application.date}</div>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Applications;
