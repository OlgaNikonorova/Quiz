import { Presenter } from "@/core/presenter";
import { ResultView } from "./result-view";
import { ResultModel } from "./result-model";
import { QuizUtil } from "@/utils/quiz-util";
import { AuthUtil } from "@/utils/auth-util";

export class ResultPresenter extends Presenter<ResultView, ResultModel> {
  public async init() {
    try {
      const quizId = QuizUtil.getQuizId()!;
      const resultData = await this.model.getQuizResult(quizId);
      const username = AuthUtil.getUsername();
      
      let message = '';

      if (resultData.percentage < 60) {
        message = 'Есть к чему стремиться!';
      } else if (resultData.percentage >= 60) {
        message = 'Неплохо!';
      } else if (resultData.percentage >= 71) {
        message = 'Хороший результат!';
      } else if (resultData.percentage >= 85) {
        message = 'Отличный результат!';
      }

      this.view.init({resultData, username, message});
    } catch (error) {
      console.error(error);
    }
  }
}