"use client";

import { FC, useState } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dashboard from "public/dashboard.svg";
import dashboardActive from "public/dashboard-active.svg";
import questions from "public/questions.svg";
import questionsActive from "public/questions-active.svg";
import applications from "public/applications.svg";
import applicationsActive from "public/applications-active.svg";
import pets from "public/pets.svg";
import petsActive from "public/pets-active.svg";
import user from "/public/user.svg";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar: FC = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    {
      link: "/",
      title: "Dashboard",
      image: pathname === "/" ? dashboardActive : dashboard,
    },
    {
      link: "/questions",
      title: "Questions",
      image: pathname === "/questions" ? questionsActive : questions,
    },
    {
      link: "/applications",
      title: "Applications",
      image: pathname === "/applications" ? applicationsActive : applications,
    },
    {
      link: "/pets",
      title: "Pets",
      image: pathname === "/pets" ? petsActive : pets,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <Link
          href="https://happy-pet-next.vercel.app/en"
          className={styles.logo}
        >
          Happy pet
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.menuItems}>
            {menuItems.map((menuItem) => (
              <li key={menuItem.link} className={styles.menuItem}>
                <Link
                  href={menuItem.link}
                  className={
                    pathname === menuItem.link
                      ? `${styles.menuLink} ${styles.active}`
                      : styles.menuLink
                  }
                >
                  <Image
                    src={menuItem.image}
                    className={styles.menuLinkImage}
                    alt=""
                  />
                  {menuItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.profile}>
        {session ? (
          <>
            {session.user?.name !== "Admin" && (
              <p className={styles.profileLimitations}>
                Since you are not logged in as an administrator, your actions
                are limited!
              </p>
            )}
            <div className={styles.profileWrapper}>
              {session?.user?.image ? (
                <div className={styles.profileImageWrapper}>
                  <img
                    className={styles.profileImage}
                    src={session.user.image}
                    alt=""
                  />
                </div>
              ) : (
                <Image
                  className={styles.profileImagePlaceholder}
                  src={user}
                  alt=""
                />
              )}
              <div className={styles.profileName}>{session?.user?.email}</div>
              <div className={styles.profileInfo}>
                <div
                  className={styles.profileInfoButton}
                  onMouseEnter={() => setShowProfileInfo(true)}
                  onMouseLeave={() => setShowProfileInfo(false)}
                >
                  i
                </div>
                {showProfileInfo && (
                  <div className={styles.profileInfoContent}>
                    <p>{session?.user?.name}</p>
                    <p>{session?.user?.email}</p>
                  </div>
                )}
              </div>
            </div>
            <button
              className={styles.profileSignButton}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          </>
        ) : (
          <div className={styles.profileWrapper}>
            <div className={styles.profileName}>Not signed in</div>
            <button
              className={styles.profileSignButton}
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
