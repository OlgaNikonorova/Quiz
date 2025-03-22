import { View } from "@/core/view";
import { Quiz } from "./home-model";

export interface HomeViewProps {
  quizzes: Quiz[];
  username: string;
}

export class HomeView extends View<HomeViewProps> {
  private get _quizzes() {
    return document.querySelectorAll(`.quiz`);
  }

  public template(props: HomeViewProps) {
    return `

      <div class="home-container">
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

        <div class = "quizzes">
          <h3>Лучшие онлайн-тесты этой недели</h3>
          <div class = "quizzes__container" id="quizzes-container">
            ${this.renderQuizzes(props.quizzes)}
          </div>
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

  public override bindListeners() {
    this._quizzes.forEach((quiz) =>
      quiz.addEventListener("click", async () => {
        const quizId = quiz.getAttribute("data-id");
        this.bus.emit("quizClicked", quizId);
      }),
    );

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
      console.log("Menu button clicked");
      menu.style.transform = "translateX(0)";
    });

    closeButton.addEventListener("click", () => {
      menu.style.transform = "translateX(100%)";
    });
  }

  private renderQuizzes(quizzes: Quiz[]): string {
    return quizzes
      .map((quiz) => {
        const previewUrl =
          quiz.preview === "https://placehold.co/600x400"
            ? "https://avatars.mds.yandex.net/i?id=a94dd8776b37d56cf6fd0dcaba1fd834_l-9229750-images-thumbs&n=13"
            : quiz.preview;

        return `
          <div class="quiz" data-id="${quiz.id}" style="background-image: url('${previewUrl}'); background-size: cover; background-position: center;">
            <h5>${quiz.title}</h5>
            <p>${quiz.description}</p>
            <div class="quiz-info">
              <div class = "quiz-logo">Quizmaster</div>
              <img src="././././public/images/eye.svg">
              <span>100</span>
            </div>
          </div>
        `;
      })
      .join("");
  }
}
