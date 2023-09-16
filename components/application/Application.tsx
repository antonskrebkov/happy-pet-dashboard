"use client";

import { FC } from "react";
import styles from "./Application.module.scss";
import Image from "next/image";
import trash from "/public/trash.svg";
import { useRouter } from "next/navigation";
import { IApplication } from "@/interfaces/IApplication";
import { applicationsAPI } from "@/services/Applications.service";
import { useSession } from "next-auth/react";

interface ApplicationProps {
  application: IApplication;
}

const Application: FC<ApplicationProps> = ({ application }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [deleteApplication] = applicationsAPI.useDeleteApplicationMutation();

  const handleDeleteApplication = () => {
    deleteApplication(application);
    router.back();
  };

  return (
    <div className={styles.main}>
      <div className={styles.handlers}>
        <button className={styles.back} onClick={() => router.back()}>
          Back to list
        </button>
        {session?.user?.name === "Admin" && (
          <button className={styles.delete} onClick={handleDeleteApplication}>
            <Image src={trash} alt="" />
          </button>
        )}
      </div>
      <div className={styles.application}>
        {application && (
          <>
            <h1 className={styles.applicationTitle}>Application</h1>
            <div className={styles.applicationTop}>
              <ul className={styles.applicationItems}>
                <li className={styles.applicationItem}>
                  <span>Name: </span>
                  {`${application.firstName} ${application.surname}`}
                </li>
                <li className={styles.applicationItem}>
                  <span>Age: </span>
                  {application.age}
                </li>
                <li className={styles.applicationItem}>
                  <span>City: </span>
                  {application.city}
                </li>
                <li className={styles.applicationItem}>
                  <span>Email: </span>
                  {application.email}
                </li>
                <li className={styles.applicationItem}>
                  <span>Phone: </span>
                  {application.phone}
                </li>
                <li className={styles.applicationItem}>
                  <span>Total: </span>
                  {`${application.sum} UAH`}
                </li>
              </ul>
              <div className={styles.applicationDate}>{application.date}</div>
            </div>
            <div>
              <div>
                <h2 className={styles.applicationPets}>Pets</h2>
                <ul className={styles.applicationPetsItems}>
                  {application.friends.map((friend, index) => (
                    <li className={styles.applicationPetsItem} key={index}>
                      <p className={styles.applicationPetsText}>
                        <span>{friend.name}</span>
                      </p>
                      <p className={styles.applicationPetsText}>
                        {friend.category}
                      </p>
                      <p className={styles.applicationPetsText}>
                        {`${friend.price} UAH`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Application;
