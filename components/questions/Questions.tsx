"use client";

import { FC, useState } from "react";
import styles from "./Questions.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Link from "next/link";
import { IQuestion } from "@/interfaces/IQuestion";
import { questionsAPI } from "@/services/Questions.service";
import Search from "@/components/search/Search";

interface QuestionProps {
  data: IQuestion[];
}

const Questions: FC<QuestionProps> = ({ data }) => {
  const [questions, setQuestions] = useState<IQuestion[]>(data);

  const [searchQuestions, { isLoading }] =
    questionsAPI.useSearchQuestionsMutation();

  const [listActive, setListActive] = useState(true);

  const countDoughnutData = () => {
    if (data) {
      let adoptionCounter = data.filter(
        (dataItem) =>
          dataItem.topic === "Adoption" || dataItem.topic === "Адопція"
      );
      let questionCounter = data.filter(
        (dataItem) =>
          dataItem.topic === "Question" || dataItem.topic === "Задати питання"
      );
      let helpCounter = data.filter(
        (dataItem) =>
          dataItem.topic === "Help" || dataItem.topic === "Допомогти притулку"
      );
      return [
        adoptionCounter.length,
        questionCounter.length,
        helpCounter.length,
      ];
    }
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const doughnutData = {
    labels: ["Adoption", "Question", "Help"],
    datasets: [
      {
        label: "Messages",
        data: countDoughnutData(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.main}>
      <div className={styles.tabs}>
        <div
          className={listActive ? `${styles.tab} ${styles.active}` : styles.tab}
          onClick={() => setListActive(true)}
        >
          List
        </div>
        <div
          className={
            !listActive ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => setListActive(false)}
        >
          Charts
        </div>
      </div>
      <div className={styles.questions}>
        {listActive ? (
          <div className={styles.questionsWrapper}>
            <h1 className={styles.title}>Questions</h1>
            <Search
              searchFunction={searchQuestions}
              setFunction={setQuestions}
              isLoading={isLoading}
            />
            <ul className={styles.items}>
              {questions &&
                questions.map((question) => (
                  <Link
                    href={"questions/" + question.id}
                    key={question.id}
                    className={styles.item}
                  >
                    <div className={styles.itemName}>{question.name}</div>
                    <div className={styles.itemMessage}>
                      <span>{question.topic}:</span> {question.message}
                    </div>
                    <div className={styles.itemDate}>{question.date}</div>
                  </Link>
                ))}
            </ul>
          </div>
        ) : (
          <div className={styles.chartWrapper}>
            <Doughnut data={doughnutData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
