import { AuthUtil } from "@/utils/auth-util";
import { Presenter } from "./presenter";
import { View } from "./view";

type RouterPresenter = Presenter<View<object>, any>;

type Route = () => RouterPresenter;

export class Router {
  private activeRoute: RouterPresenter | null = null;

  constructor(private readonly routes: Record<string, Route>) {
    window.addEventListener("hashchange", () => this.renderRoute());
    window.addEventListener("DOMContentLoaded", () => this.renderRoute());
  }

  getRoute() {
    return location.hash.slice(1) || "/";
  }

  renderRoute() {
    this.checkAuth(); 

    if (this.activeRoute) {
      this.activeRoute.destroy();
    }

    const path = this.getRoute();
    const route = this.routes[path];

    if (!route) {
      console.error(`Route ${path} not found`);
      return;
    }

    const presenter = route();

    presenter.init();
    this.activeRoute = presenter;
  }

  private checkAuth() {
    try {
      AuthUtil.getToken();
    } catch (error) {
      location.hash = "auth";
    }
  }
}
