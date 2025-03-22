import { Presenter } from "@/core/presenter";
import { HomeView } from "./home-view";
import { HomeModel } from "./home-model";
import { AuthUtil } from "@/utils/auth-util";

export class HomePresenter extends Presenter<HomeView, HomeModel> {
  public async init() {
    let username = AuthUtil.getUsername();
    const quizzes = await this.model.getQuizzes();
    this.view.init({ quizzes, username });

    this.view.on("quizClicked", this.onQuizClick.bind(this));
  }

  public async onQuizClick(quizId: number) {
    await this.model.openQuiz(quizId);
  }
}
