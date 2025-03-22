import { Bus } from "./bus";

export type TargetElementType = string | Element;

export abstract class View<TProps extends object> {
  protected $el?: Element;

  protected bus = new Bus();

  constructor(
    protected readonly targetElement: TargetElementType,
    protected readonly replace = false,
  ) {
    this.$el =
      typeof targetElement === "string"
        ? (document.querySelector(targetElement) as Element)
        : targetElement;
  }

  public init(templateProps: TProps) {
    if (!this.$el) {
      throw "Root element for component is undefined";
    }

    const newElement = document.createElement("div");
    newElement.innerHTML = this.template(templateProps).trim();
    const newNode = newElement.firstChild;

    if (!newNode || newElement.children.length > 1) {
      throw "Template must have only one child";
    }

    if (this.replace) {
      this.$el.replaceWith(newNode);
      this.$el = newNode as Element;
    } else {
      this.$el.innerHTML = newElement.innerHTML;
    }

    this.bindListeners();
  }

  public abstract template(templateProps: TProps): string;

  public destroy() {
    if (!this.$el) {
      return;
    }

    if (this.replace) {
      this.$el.remove();
    } else {
      this.$el.innerHTML = "";
    }
  }

  public bindListeners() {}

  public get on() {
    return this.bus.on.bind(this.bus);
  }
}
