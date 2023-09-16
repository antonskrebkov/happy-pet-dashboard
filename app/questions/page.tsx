import { FC } from "react";
import Questions from "@/components/questions/Questions";
import { getQuestions } from "@/services/getData.service";

const QuestionsPage: FC = async () => {
  const data = await getQuestions();

  return <Questions data={data.reverse()} />;
};

export default QuestionsPage;
