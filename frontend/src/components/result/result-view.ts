import { View } from "@/core/view";
import { QuizResult } from "./result-model";

export interface QuizResultProps {
  resultData: QuizResult;
  username: string;
  message: string;
}

export class ResultView extends View<QuizResultProps> {
  public template(props: QuizResultProps): string {
    return `
      <div class="result">
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
        <div class = "result__container">
          <div class = "result__image"><img src = "././././public/images/result.png"></div>
          <div class = "result__text-container">
            <p >${props.resultData.percentage} %</p>
            <p class = "result__message">${props.message}</p>
            <p>Вы ответили на ${props.resultData.score} из ${props.resultData.total} вопросов.</p>
          </div>
          <button class="enter-button home-button"  type = "button" onclick = "location.hash = ''">На главную</button>
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

  public bindListeners(): void {
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
}
