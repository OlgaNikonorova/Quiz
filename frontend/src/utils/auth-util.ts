import { AppStore } from "@/state/app-store";

export class AuthUtil {

  public static getToken(): string {
    let auth = AppStore.getState().authToken;

    if (!auth) {
      auth = localStorage.getItem("auth");
      if (!auth) {
        throw Error();
      }
      AppStore.setState({ authToken: auth });
    }

    return auth;

  }
  
  public static isAuthorized(): boolean {

    let isAuthorized = false;

    if (AuthUtil.getToken()) {
    isAuthorized = true;
    }

     return isAuthorized;
  }
  
  public static getUsername() { 
    let username = AppStore.getState().user;

    if (!username) {
      username = localStorage.getItem("user");
      if (!username) {
        throw Error();
      }
    }

  return username;

  }

}
