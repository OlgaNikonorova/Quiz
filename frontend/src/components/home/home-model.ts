import { HomeAPI } from "@/api/home-api";
import { QuizAPI } from "@/api/quiz-api";
import { AuthUtil } from "@/utils/auth-util";
import { QuizUtil } from "@/utils/quiz-util";

export interface Quiz {
  id: number;
  title: string;
  description: string;
  preview: string;
}

export class HomeModel {
  public async getQuizzes(): Promise<Quiz[]> {
    try {
      return HomeAPI.getQuizzes(AuthUtil.getToken());
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async openQuiz(quizId: number) {
    const lastQuestionId = await QuizAPI.getLastQuestionId(
      quizId,
      AuthUtil.getToken(),
    );

    QuizUtil.setQuizId(quizId);
    QuizUtil.setQuestionId(lastQuestionId);

    if (lastQuestionId === -1) {
      location.hash = "result";
    } else {
      location.hash = "quiz";
    }
  }
}
