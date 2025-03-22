import { Presenter } from "@/core/presenter";
import { AuthView } from "./auth-view";
import { AuthModel } from "@/components/auth/auth-model";

export class AuthPresenter extends Presenter<AuthView, AuthModel> {
  private _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private _passwordRegex = /^.{8,}$/;

  public init() {
    this.view.init({ errorMessage: this.model.errorMessage });

    this.view.on("loginClicked", this.onLoginClick.bind(this));
    this.view.on("registerClicked", this.onRegisterClick.bind(this));
    this.view.on("typed", ({ isEmpty }) => {
      if (isEmpty) this.view.disableAuthButton();
      else this.view.enableAuthButton();

      this.view.updateErrorMessage({ errorMessage: undefined });
    });
  }

  public async onLoginClick({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    if (!this.isValidEmail(username)) return;
    await this.model.login({ username, password });
    this.view.updateErrorMessage({ errorMessage: this.model.errorMessage });
    setTimeout(() => {
      this.view.enableAuthButton();
    }, 1500);
  }

  public async onRegisterClick({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    if (!this.isValidEmail(username) || !this.isValidPassword(password)) return;
    await this.model.register({ username, password });
    this.view.updateErrorMessage({ errorMessage: this.model.errorMessage });
    setTimeout(() => {
      this.view.enableAuthButton();
    }, 1500);
  }

  private isValidEmail(email: string): boolean {
    if (!this._emailRegex.test(email)) {
      this.view.updateErrorMessage({
        errorMessage: "Некорректный формат почты",
      });
      return false;
    }
    return true;
  }

  private isValidPassword(password: string) {
    if (!this._passwordRegex.test(password)) {
      this.view.updateErrorMessage({errorMessage: "Длина пароля должна быть не менее 8 символов"})
      return false;
    }
    return true
  }
}
