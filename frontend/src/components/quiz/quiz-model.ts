import { QuizAPI } from "@/api/quiz-api";
import { AuthUtil } from "@/utils/auth-util";

export interface Question {
  id: number;
  question: string;
  answers: string[];
  image: string | null;
  userAnswer?: number;
  isUserAnswerCorrect?: boolean;
}

export class QuizModel {
  private _questions: Question[] = [];
  private _questionIndex: number = -1;

  public async initQuizQuestions(quizId: number) {
    try {
      this._questions = await QuizAPI.getQuestions(
        quizId,
        AuthUtil.getToken()!,
      );
      this._questionIndex =
        (await QuizAPI.getLastQuestionId(quizId, AuthUtil.getToken()!)) -
        Math.min(...this._questions.map((q) => q.id));
    } catch (error) {
      console.log(error);
    }
  }

  public getCurrentQuestion(): Question | undefined {
    if (this._questionIndex !== -1) {
      return this._questions[this._questionIndex];
    }
    return undefined;
  }

  public setPreviousIndex() {
    if (this._questionIndex > 0) {
      this._questionIndex--;
    }
  }

  public setNextIndex() {
    if (this._questionIndex < this._questions.length) {
      this._questionIndex++;
    } else {
      this._questionIndex = -1;
    }
  }

  public getQuestionsCount() {
    return this._questions.length;
  }

  public getCurrentQuestionNumber() {
    return this._questionIndex + 1;
  }

  public updateAnswerStatus(answerIndex: number, result: boolean) {
    const currentQuestion = this._questions[this._questionIndex];
    currentQuestion.userAnswer = answerIndex;
    currentQuestion.isUserAnswerCorrect = result;
  }

  public async getLastQuestionId(quizId: number): Promise<number> {
    try {
      if (this._questionIndex === -1) {
        this._questionIndex = await QuizAPI.getLastQuestionId(
          quizId,
          AuthUtil.getToken()!,
        );
      }
      return this._questionIndex;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  public async answerQuestion(
    questionId: number,
    answerIndex: number,
  ): Promise<boolean> {
    try {
      const result = await QuizAPI.answerQuestion(
        questionId,
        answerIndex,
        AuthUtil.getToken()!,
      );
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
