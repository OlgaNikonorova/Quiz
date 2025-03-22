import { View } from "./view";

export abstract class Presenter<V extends View<object>, M> {
  constructor(
    protected readonly view: V,
    protected readonly model: M,
  ) {}

  public abstract init(): void | Promise<void>;

  public destroy() {
    this.view.destroy();
  }
}
