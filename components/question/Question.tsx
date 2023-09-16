"use client";

import { FC } from "react";
import styles from "./Question.module.scss";
import Image from "next/image";
import { IQuestion } from "@/interfaces/IQuestion";
import { useRouter } from "next/navigation";
import trash from "/public/trash.svg";
import { questionsAPI } from "@/services/Questions.service";
import { useSession } from "next-auth/react";

interface QuestionProps {
  question: IQuestion;
}

const Question: FC<QuestionProps> = ({ question }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [deleteQuestion] = questionsAPI.useDeleteQuestionMutation();

  const handleDeleteQuestion = () => {
    deleteQuestion(question);
    router.back();
  };

  return (
    <div className={styles.main}>
      <div className={styles.handlers}>
        <button className={styles.back} onClick={() => router.back()}>
          Back to list
        </button>
        {session?.user?.name === "Admin" && (
          <button className={styles.delete} onClick={handleDeleteQuestion}>
            <Image src={trash} alt="" />
          </button>
        )}
      </div>
      <div className={styles.question}>
        {question && (
          <>
            <h1 className={styles.questionTitle}>Question</h1>
            <div className={styles.questionTop}>
              <ul className={styles.questionItems}>
                <li className={styles.questionItem}>
                  <span>Name: </span>
                  {question.name}
                </li>
                <li className={styles.questionItem}>
                  <span>Email: </span>
                  {question.email}
                </li>
                <li className={styles.questionItem}>
                  <span>Phone: </span>
                  {question.phone}
                </li>
                <li className={styles.questionItem}>
                  <span>Topic: </span>
                  {question.topic}
                </li>
              </ul>
              <div className={styles.questionDate}>{question.date}</div>
            </div>
            <div>
              <h1 className={styles.questionMessageTitle}>Message</h1>
              <div className={styles.questionMessage}>{question.message}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Question;
