import { View } from "@/core/view";
import { Question } from "./quiz-model";

export interface QuizViewProps {
  username: string;
  question: Question;
  questionNumber: number;
  questionsCount: number;
}

export class QuizView extends View<QuizViewProps> {
  private get _submitButton() {
    return document.getElementById("question__submit-button");
  }

  private get _answers() {
    return Array.from(
      document.querySelectorAll(".question__answer"),
    ) as HTMLElement[];
  }

  private get _prevButton() {
    return document.getElementById("question__prev-button");
  }

  public template(props: QuizViewProps) {
    return `
      <div class = "quiz-container">

        <header class="navbar">
          <button class="navigation__hamburger-button">
            <img
              src="././././public/images/hamburger-icon.svg"
            />
          </button>
          
          <a href="#" class = "button-blue">Quizmaster</a> 
          <div class="navigation__menu-wrapper">
            <button class="navigation__menu-close-button">
              <img src="././././public/images/close-button.svg" />
            </button> 

            <div class = "navigation-links">
              <div class = "navigation-brand">
                <a href="">Узнать больше</a>
                <a href="">Поддержка</a>
              </div>
              <div class = "navigation-profile">
                <div class = "navigation__user">
                  <div class = "navigation__user-image"><img src = "././././public/images/user.svg"></div>
                  <a href="">${props.username}</a>
                </div> 
                <a href="#auth" class = "button-red">Выйти</a> 
              </div>
            </div>
          </div>     
        </header>

        <div id="question" class = "question">
          ${this.renderQuestionCard(props)}
        </div>

        <footer class="footer">
          <h4>Quizmaster</h4> 
          <div class="footer__links">
            <a href="">Контакты</a>
            <a href="">Конфиденциальность</a>
            <a href="">Политика сайта</a> 
          </div>   
        </footer>
      </div> 
    `;
  }

  private renderQuestionCard(props: QuizViewProps): string {
    const question = props.question;
    const imageHtml = question.image
      ? `<img class = "img question__image" src="${question.image}">`
      : "";
    const prevButtonHtml =
      props.questionNumber > 1
        ? '<div id="question__prev-button"><img src="././././public/images/arrow-left.svg"></div>'
        : "";
    const answerDisabledAttr = question.userAnswer !== undefined ? "disabled" : "";
    const submitDisabledAttr = question.userAnswer !== undefined ? "" : "disabled";
    return `
          ${imageHtml}
          <h4>${question.question}</h4>
          <div class = "question__info-container">
            <ul class="question__answers">
              ${question.answers
                .map((a, index) => {
                  const isAnswered = question.userAnswer === index;
                  let status = "";
                  if (isAnswered) {
                    status = question.isUserAnswerCorrect
                      ? "question__answer--correct"
                      : "question__answer--incorrect";
                  }
                  return `
                    <li class="question__answer ${status}" data-index="${index}" ${answerDisabledAttr}>
                      <div class = "question__answer-mark"></div>
                      <p>${a}</p>
                    </li>
                  `;
                })
                .join("")}
            </ul>
            <div class = "buttons-container">
              <p class="question__number">Вопрос ${props.questionNumber}/${props.questionsCount}</p>
              ${prevButtonHtml}
              <button type="button" class="enter-button" id="question__submit-button" ${submitDisabledAttr}>Далее</button>
            </div>
          </div>
    `;
  }

  public override bindListeners() {
    this._submitButton?.addEventListener("click", async () => {
      this.bus.emit("submitButtonClicked", {});
    });

    this._prevButton?.addEventListener("click", async () => {
      this.bus.emit("prevButtonClicked", {});
    });

    this._answers?.forEach((answer) => {
      answer.addEventListener("click", async () => {
        if (answer.getAttribute("disabled") !== null) return;
        const index = Number(answer.getAttribute("data-index"));
        this.bus.emit("answerClicked", index);
      });
    });

    const handleMenuStyleChange = (
      e: MediaQueryListEvent | MediaQueryList,
    ): void => {
      const menu: HTMLElement = document.querySelector(
        ".navigation__menu-wrapper",
      )!;
      if (e.matches) {
        menu.style.transform = "translateX(100%)";
      } else {
        menu.style.transform = "none";
      }
    };

    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");

    handleMenuStyleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMenuStyleChange);

    const menu: HTMLElement = document.querySelector(
      ".navigation__menu-wrapper",
    )!;
    const menuButton: HTMLElement = document.querySelector(
      ".navigation__hamburger-button",
    )!;
    const closeButton: HTMLElement = document.querySelector(
      ".navigation__menu-close-button",
    )!;

    menuButton.addEventListener("click", () => {
      menu.style.transform = "translateX(0)";
    });

    closeButton.addEventListener("click", () => {
      menu.style.transform = "translateX(100%)";
    });
  }

  public setAnswerStatus(answerIndex: number, isCorrect: boolean) {
    this._answers
      .find((a) => Number(a.getAttribute("data-index")) === answerIndex)
      ?.classList.add(
        isCorrect == true
          ? "question__answer--correct"
          : "question__answer--incorrect",
      );
  }

  public disableAnswers() {
    this._answers.forEach((a) => a.setAttribute("disabled", ""));
  }

  public enableSubmitButton() {
    this._submitButton?.removeAttribute("disabled");
  }

  public disableSubmitButton() {
    this._submitButton?.setAttribute("disabled", "");
  }
}
