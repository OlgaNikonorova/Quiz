export type StoreListener<T extends object> = (state: T) => void;

export class State<T extends object> {
  private _state: T;
  private _listeners: StoreListener<T>[];

  constructor(initialState: T) {
    this._state = initialState;
    this._listeners = [];
  }

  getState() {
    return this._state;
  }

  setState(newState: Partial<T>) {
    this._state = { ...this._state, ...newState };
    this._listeners.forEach((listener) => listener(this._state));
  }

  subscribe(listener: StoreListener<T>) {
    this._listeners.push(listener);

    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(listener: StoreListener<T>) {
    const index = this._listeners.indexOf(listener);

    if (index === -1) {
      return;
    }

    this._listeners.splice(index, 1);
  }
}
