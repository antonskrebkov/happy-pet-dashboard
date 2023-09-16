import { FC } from "react";
import { IQuestion } from "@/interfaces/IQuestion";
import Question from "@/components/question/Question";
import { getQuestionById, getQuestions } from "@/services/getData.service";

interface QuestionPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const questions: IQuestion[] = await getQuestions();

  return questions.map((question) => ({
    slug: question.id,
  }));
}

const QuestionPage: FC<QuestionPageProps> = async ({ params: { id } }) => {
  const question = await getQuestionById(id);

  return <Question question={question} />;
};
export default QuestionPage;
