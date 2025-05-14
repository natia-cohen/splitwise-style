export const SHOW_MSG = 'show-msg';

type Listener<T = any> = (data: T) => void;

function createEventEmitter() {
  const listenersMap: Record<string, Listener[]> = {};

  return {
    on(evName: string, listener: Listener) {
      listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener];
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(func => func !== listener);
      };
    },
    emit(evName: string, data?: any) {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach(listener => listener(data));
    },
  };
}

export const eventBus = createEventEmitter();

export interface UserMsg {
  txt: string;
  type: 'success' | 'error';
}

export function showUserMsg(msg: UserMsg) {
  eventBus.emit(SHOW_MSG, msg);
}

export function showSuccessMsg(txt: string) {
  showUserMsg({ txt, type: 'success' });
}

export function showErrorMsg(txt: string) {
  showUserMsg({ txt, type: 'error' });
}


declare global {
  interface Window {
    showUserMsg: typeof showUserMsg;
  }
}

window.showUserMsg = showUserMsg;
