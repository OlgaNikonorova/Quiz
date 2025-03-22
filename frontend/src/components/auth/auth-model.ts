import { AuthAPI } from "@/api";
import { ErrorMessages } from "@/api/error-messages";
import { AppStore } from "@/state/app-store";

export interface LoginRequest {
  username: string | undefined;
  password: string | undefined;
}

export interface RegisterRequest {
  username: string | undefined;
  password: string | undefined;
}

export class AuthModel {
  private _errorMessage: string = "";

  public async login(loginRequest: LoginRequest) {
    if (!loginRequest.username || !loginRequest.password) {
      this._errorMessage = ErrorMessages.INVALID_INPUT;
      return;
    }

    try {
      const auth = await AuthAPI.login(loginRequest);
      localStorage.setItem("auth", auth);
      localStorage.setItem("user", loginRequest.username);
      AppStore.setState({
        authToken: auth,
        user: loginRequest.username,
      });

      location.hash = "";
    } catch (error) {
      this.handleError(error);
    }
  }

  public async register(registerRequest: RegisterRequest) {
    if (!registerRequest.username || !registerRequest.password) {
      this._errorMessage = ErrorMessages.INVALID_INPUT;
      return;
    }

    try {
      const auth = await AuthAPI.register(registerRequest);
      localStorage.setItem("auth", auth);
      localStorage.setItem("user", registerRequest.username);
      AppStore.setState({
        authToken: auth,
        user: registerRequest.username,
      });

      location.hash = "";
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error instanceof Error) {
      try {
        const errorData = JSON.parse(error.message);
        const status = errorData.status;

        switch (status) {
          case 401:
            this._errorMessage = ErrorMessages.UNAUTHORIZED;
            break;
          case 409:
            this._errorMessage = ErrorMessages.ACCOUNT_EXISTS;
            break;
          default:
            this._errorMessage = ErrorMessages.DEFAULT_ERROR_MESSAGE;
        }
      } catch (e) {
        this._errorMessage = ErrorMessages.DEFAULT_ERROR_MESSAGE;
      }
    } else {
      this._errorMessage = ErrorMessages.DEFAULT_ERROR_MESSAGE;
    }
  }

  public get errorMessage() {
    return this._errorMessage;
  }
}
