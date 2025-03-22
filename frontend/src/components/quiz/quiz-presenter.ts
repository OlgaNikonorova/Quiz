import { Presenter } from "@/core/presenter";
import { QuizView } from "./quiz-view";
import { QuizModel } from "./quiz-model";
import { QuizUtil } from "@/utils/quiz-util";
import { AuthUtil } from "@/utils/auth-util";

export class QuizPresenter extends Presenter<QuizView, QuizModel> {

  public async init() {
    await this.model.initQuizQuestions(QuizUtil.getQuizId()!);

    this.initQuizPage();

    this.view.on("submitButtonClicked", this.onSubmitClick.bind(this));
    this.view.on("answerClicked", this.onAnswerClick.bind(this));
    this.view.on("prevButtonClicked", this.onPrevClick.bind(this));
  }

  private initQuizPage() {
    const question = this.model.getCurrentQuestion();
    const questionsCount = this.model.getQuestionsCount();
    const questionNumber = this.model.getCurrentQuestionNumber();
    const username = AuthUtil.getUsername();

    if (question == undefined) {
      return;
    }

    this.view.init({ username, question, questionNumber, questionsCount });
  }

  private async onSubmitClick() {
    this.model.setNextIndex();
    const question = this.model.getCurrentQuestion();

    if (question === undefined) {
      location.hash = "result";
    } else {
      QuizUtil.setQuestionId(question.id);
      this.initQuizPage();
    }
  }

  private async onAnswerClick(answerIndex: number) {
    const result = await this.model.answerQuestion(
      QuizUtil.getQuestionId()!,
      answerIndex,
    );
    this.model.updateAnswerStatus(answerIndex, result);
    this.view.setAnswerStatus(answerIndex, result);
    this.view.disableAnswers();
    this.view.enableSubmitButton();
  }

  private async onPrevClick() {
    this.model.setPreviousIndex();
    this.initQuizPage();
    this.view.enableSubmitButton();
  }
}