import { AppStore } from "@/state/app-store";

export class QuizUtil {
  public static setQuizId(quizId: number) {
    localStorage.setItem("quizId", quizId.toString());
    AppStore.setState({ quizId: quizId });
  }

  public static setQuestionId(questionId: number) {
    localStorage.setItem("questionId", questionId.toString());
    AppStore.setState({ questionId: questionId });
  }

  public static getQuizId(): number | null {
    const quizId = AppStore.getState().quizId;

    if (!quizId) {
      return Number(localStorage.getItem("quizId"));
    }

    return quizId;
  }

  public static getQuestionId(): number | null {
    const questionId = AppStore.getState().questionId;

    if (!questionId) {
      return Number(localStorage.getItem("questionId"));
    }

    return questionId;
  }
}
