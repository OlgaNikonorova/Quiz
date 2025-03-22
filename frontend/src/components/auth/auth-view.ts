import { TargetElementType, View } from "@/core/view";
import "./auth.module.css";

export interface AuthViewProps {
  errorMessage?: string;
}

export enum AuthType {
  LOGIN = "login",
  REGISTER = "register",
}

export class AuthView extends View<AuthViewProps> {
  private get _authButton() {
    return document.getElementById("auth__button");
  }

  private get _authTypeSwitch() {
    return document.getElementById("auth__type-switch");
  }

  private get _authInputs() {
    return Array.from(
      document.querySelectorAll(".text-input-auth")!,
    ) as HTMLInputElement[];
  }

  private get _errorMessage() {
    return document.getElementById("auth__card-warning");
  }

  private _authType: AuthType;

  constructor(
    protected readonly targetElement: TargetElementType,
    protected readonly replace = false,
  ) {
    super(targetElement, replace);
    this._authType = AuthType.LOGIN;
  }

  public template({ errorMessage }: AuthViewProps) {

    return `
      <div class="auth-container">
        <header class= "auth__navbar">
          <h4>Quizmaster</h4> 
          <a href="">Войти</a>    
        </header>

        <div class= "homepage">
          <div class="homepage__info">
            <div class = "homepage__text">
              <h2>Узнайте больше нового о себе и своих интересах</h2>
              <p> 
                QuizMaster - это приложение для прохождения викторин.
                Проходите различные викторины, проверяйте свои знания и веселитесь!
              </p>
            </div>  
            <img src="public/images/home.png"/>
          </div>

          <div class="auth__form">
            ${this.getAuthCard({ errorMessage })}
          </div>
        </div>
    `;
  }

  public updateErrorMessage({ errorMessage }: AuthViewProps) {
    if (errorMessage) {
      this._authInputs.forEach(
        (i) => (i.style.borderColor = "var(--primary-red)"),
      );
      this._errorMessage!.style.display = "block";
      this._errorMessage!.textContent = errorMessage;
    } else {
      this._authInputs.forEach(
        (i) => (i.style.borderColor = "var(--secondary-forms-stroke)"),
      );
      this._errorMessage!.style.display = "none";
    }
  }

  public enableAuthButton() {
    this._authButton?.removeAttribute("disabled");
  }

  public disableAuthButton() {
    this._authButton?.setAttribute("disabled", "");
  }

  public override bindListeners() {
    const emitInputsTyped = () => {
      const isEmpty = this.isEmptyInputs(this._authInputs);
      this.bus.emit("typed", { isEmpty });
    };

    this._authInputs?.forEach((input) => {
      input.addEventListener("input", emitInputsTyped);
    });

    this._authButton?.addEventListener("click", async () => {
      const username = this._authInputs.find(
        (i) => i.id === "auth__username",
      )?.value;

      const password = this._authInputs.find(
        (i) => i.id === "auth__password",
      )?.value;

      this.disableAuthButton();

      this.bus.emit(`${this._authType.toString()}Clicked`, {
        username,
        password,
      });
    });

    this._authTypeSwitch?.addEventListener("click", async () => {
      switch (this._authType) {
        case AuthType.LOGIN:
          this._authType = AuthType.REGISTER;
          break;
        case AuthType.REGISTER:
          this._authType = AuthType.LOGIN;
          break;
      }
      this.init({ errorMessage: "" });
    });
  }

  private getAuthCard({ errorMessage }: AuthViewProps): string {
    switch (this._authType) {
      case AuthType.LOGIN:
        return `
          <div class="auth__card">
            <h3>Вход</h3>
            <p class = "auth__type-text">Нет аккаунта? <a id="auth__type-switch" href="#auth">Регистрация</a></p>

            <p id = "auth__card-warning" class = "warning">
              ${errorMessage}
            </p>

            <div class="auth__inputs">
              <label for="auth-username">Эл. почта</label>
              <input type="text" name="username" class = "text-input-auth" id="auth__username" placeholder="example@mail.com">
              <label for="auth-username">Пароль</label>
              <input type="password" name="password" class = "text-input-auth" id="auth__password" placeholder="password">
            </div>
          
            <button type="button" class="enter-button" disabled id="auth__button">Войти</button>
          </div>`;

      case AuthType.REGISTER:
        return `
          <div class="auth__card">
            <h3>Регистрация</h3>
            <p class = "auth__type-text">Уже есть аккаунт? <a id="auth__type-switch" href="#auth">Вход</a></p>

            <p id = "auth__card-warning" class = "warning">
              ${errorMessage}
            </p>

            <div class="auth__inputs">
              <label class="text-label--auth" for="auth__username">Эл. почта</label>
              <input class = "text-input-auth" type="text" name="username" id="auth__username" placeholder="example@mail.com">
              <label class="text-label--auth" for="auth__password">Пароль</label>
              <input class = "text-input-auth" type="password" name="password" id="auth__password" placeholder="password">
            </div>
            
            <button type="button" class="enter-button" disabled id="auth__button">Зарегистрироваться</button>
          </div>`;
    }
  }

  private isEmptyInputs(inputs: HTMLInputElement[]): boolean {
    return inputs.reduce((isEmpty, input) => {
      return isEmpty || input.value.trim() === "";
    }, false);
  }
}
