class EventBus {
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = new EventTarget();
  }

  on(event: string, callback: (event: Event) => void) {
    this.eventTarget.addEventListener(event, callback);
  }

  off(event: string, callback: (event: Event) => void) {
    this.eventTarget.removeEventListener(event, callback);
  }

  emit(event: string, detail?: any) {
    this.eventTarget.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

const eventBus = new EventBus();
export default eventBus;
