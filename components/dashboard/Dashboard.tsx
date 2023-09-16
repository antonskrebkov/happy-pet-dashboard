"use client";

import { FC, useState } from "react";
import styles from "./Dashboard.module.scss";
import { categoriesAPI } from "@/services/Categories.service";
import { ICategory } from "@/interfaces/ICategory";
import DotsLoader from "@/components/dots-loader/DotsLoader";
import { validateImageURL } from "@/utils/validation";
import { capitalizeInPlural } from "@/utils/categories";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import { IFriend } from "@/interfaces/IFriend";

interface IDougnutCount {
  [category: string]: number;
}

interface DashboardProps {
  friends: IFriend[];
  categories: ICategory[];
}

const Dashboard: FC<DashboardProps> = ({ friends, categories }) => {
  const { data: session } = useSession();

  const [createNewCategory, { isLoading }] =
    categoriesAPI.useCreateNewCategoryMutation();

  const [deleteCategory] = categoriesAPI.useDeleteCategoryMutation();

  const [isLinkWrong, setIsLinkWrong] = useState<boolean>(false);

  const [newCategory, setNewCategory] = useState<ICategory>({
    titleEN: "",
    titleUA: "",
    link: "/",
    imageLink: "",
  } as ICategory);

  const handleCreateNewCategory = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (validateImageURL(newCategory.imageLink)) {
      setIsLinkWrong(false);
      await createNewCategory(newCategory);
      setNewCategory({
        titleEN: "",
        titleUA: "",
        link: "/",
        imageLink: "",
      } as ICategory);
    } else {
      setIsLinkWrong(true);
    }
  };

  const countDoughnutData = () => {
    if (categories && friends) {
      let resultObject: IDougnutCount = {};
      let labels = [];
      let dataForLabels = [];
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < friends.length; j++) {
          if (categories[i].titleEN === friends[j].category) {
            if (resultObject.hasOwnProperty(categories[i].titleEN)) {
              resultObject[friends[j].category] += 1;
            } else {
              resultObject[friends[j].category] = 1;
            }
          }
        }
      }

      for (let key in resultObject) {
        labels.push(capitalizeInPlural(key));
        dataForLabels.push(resultObject[key]);
      }

      return { labels, dataForLabels };
    }
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const doughnutData = {
    labels: countDoughnutData()?.labels,
    datasets: [
      {
        label: "Pets in category",
        data: countDoughnutData()?.dataForLabels,
        backgroundColor: [
          "#de3f3f70",
          "#de8f3f70",
          "#dec43f70",
          "#a9de3f70",
          "#5ade3f70",
          "#3fde9970",
          "#3f97de70",
          "#3f47de70",
          "#743fde70",
          "#b43fde70",
          "#de3fae70",
          "#de3f5f70",
        ],
        borderColor: [
          "#de3f3f",
          "#de8f3f",
          "#dec43f",
          "#a9de3f",
          "#5ade3f",
          "#3fde99",
          "#3f97de",
          "#3f47de",
          "#743fde",
          "#b43fde",
          "#de3fae",
          "#de3f5f",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={styles.main}>
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.wrapper}>
          <div>
            <h2 className={styles.subtitle}>Create new pet category</h2>
            <form className={styles.form}>
              <label>
                <span>Title: </span>
                <input
                  className={styles.formInput}
                  type="string"
                  placeholder="e.g. cat"
                  value={newCategory.titleEN}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      titleEN: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <span>Title (UA): </span>
                <input
                  className={styles.formInput}
                  type="string"
                  placeholder="e.g. коти"
                  value={newCategory.titleUA}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      titleUA: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                {isLinkWrong && (
                  <span className={styles.formInputError}>!</span>
                )}
                <span>Image link: </span>
                <input
                  className={styles.formInput}
                  type="string"
                  placeholder="https://i.imgur.com/test.jpg"
                  value={newCategory.imageLink}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      imageLink: e.target.value,
                    })
                  }
                />
              </label>
              <button
                onClick={handleCreateNewCategory}
                className={
                  isLoading
                    ? `${styles.formCreate} ${styles.loading}`
                    : styles.formCreate
                }
              >
                {isLoading ? <DotsLoader /> : "Create"}
              </button>
            </form>
            <h3 className={styles.categoriesTitle}>Categories list</h3>
            <ul className={styles.categoriesList}>
              {categories &&
                categories.map((category) => (
                  <li key={category.id} className={styles.categoriesItem}>
                    <p>{capitalizeInPlural(category.titleEN)}</p>
                    {session?.user?.name === "Admin" && (
                      <button
                        className={styles.categoriesDelete}
                        onClick={() => {
                          deleteCategory(category);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.dashboardChart}>
            <h2 className={styles.subtitle}>Chart</h2>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
