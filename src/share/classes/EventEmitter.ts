type Listener = (...args: any[]) => void;

export default class EventEmitter {
  private _eventListeners: Map<string | symbol, Listener[]> = new Map();

  on(eventName: string | symbol, listener: Listener) {
    if (!this._eventListeners.has(eventName)) {
      this._eventListeners.set(eventName, []);
    }
    this._eventListeners.get(eventName)!.push(listener);
  }

  off(eventName: string | symbol, listener: (...args: any[]) => void) {
    const listeners = this._eventListeners.get(eventName);
    if (!listeners) return;
    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener) {
        listeners.splice(i--, 1);
      }
    }
  }

  emit(eventName: string | symbol, ...args: any) {
    const listeners = this._eventListeners.get(eventName);
    if (!listeners) return;

    listeners.forEach((listener) => listener.apply(this, args));
  }
}
