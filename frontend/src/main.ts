import { Router } from "./core/router";
import { AuthModel } from "./components/auth/auth-model";
import { HomeView } from "./components/home/home-view";
import { HomePresenter } from "./components/home/home-presenter";
import { AuthPresenter } from "./components/auth/auth-presenter";
import { AuthView } from "./components/auth/auth-view";
import { HomeModel } from "./components/home/home-model";
import { QuizModel } from "./components/quiz/quiz-model";
import { QuizView } from "./components/quiz/quiz-view";
import { QuizPresenter } from "./components/quiz/quiz-presenter";
import { ResultView } from "./components/result/result-view";
import { ResultPresenter } from "./components/result/result-presenter";
import { ResultModel } from "./components/result/result-model";


const initAuthPage = () => {
  const model = new AuthModel();
  const view = new AuthView("#main", false);
  const presenter = new AuthPresenter(view, model);

  return presenter;
};

const initHomePage = () => {
  const model = new HomeModel();
  const view = new HomeView("#main", false);
  const presenter = new HomePresenter(view, model);

  return presenter;
};

const initQuizPage = () => {
  const model = new QuizModel();
  const view = new QuizView("#main", false);
  const presenter = new QuizPresenter(view, model);

  return presenter;
};

const initResultsPage = () => {
  const model = new ResultModel();
  const view = new ResultView("#main", false);
  const presenter = new ResultPresenter(view, model);

  return presenter;
};


const routes = {
  "/": initHomePage,
  auth: initAuthPage,
  quiz: initQuizPage,
  result: initResultsPage
};

document.addEventListener("DOMContentLoaded", () => {
  new Router(routes);
  
});
