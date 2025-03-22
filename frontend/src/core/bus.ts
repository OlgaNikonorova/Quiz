export type BusListener = (data: any) => void | Promise<void>;

export class Bus {
  private readonly _listeners: Record<string, BusListener[]> = {};

  public on(event: string, callback: BusListener) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
    return () => {
      this.off(event, callback);
    };
  }

  public off(event: string, callback: BusListener) {
    const index = this._listeners[event]?.indexOf(callback as BusListener);

    if (index === -1) {
      return;
    }

    this._listeners[event]?.splice(index, 1);
  }

  public emit(event: string, data: any) {
    const listeners = this._listeners[event];
    if (!listeners) {
      return;
    }

    listeners.forEach((listener) => {
      listener(data);
    });
  }
}
