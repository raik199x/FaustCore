const OriginalWebSocket = window.WebSocket; // backup original websocket

namespace WebsocketListeners {
  let receive_listeners: Map<string, Tweaks> = new Map();
  let send_listeners: Map<string, Tweaks> = new Map();

  export function addReceiveListener(listener: Tweaks): boolean {
    if (receive_listeners.has(listener.getTweakName())) {
      return false;
    }

    receive_listeners.set(listener.getTweakName(), listener);
    return true;
  }

  export function removeReceiveListener(tweak_name: string | Tweaks): void {
    if (typeof tweak_name !== "string") {
      tweak_name = tweak_name.getTweakName();
    }

    receive_listeners.delete(tweak_name);
  }

  export function addSendListener(listener: Tweaks): boolean {
    if (send_listeners.has(listener.getTweakName())) {
      return false;
    }

    send_listeners.set(listener.getTweakName(), listener);
    return true;
  }

  export function removeSendListener(tweak_name: string | Tweaks): void {
    if (typeof tweak_name !== "string") {
      tweak_name = tweak_name.getTweakName();
    }

    send_listeners.delete(tweak_name);
  }

  export function triggerReceiveListener(data: any): void {
    for (let [_, value] of receive_listeners) {
      value.processReceivedWebsocketMessage(data);
    }
  }

  export function triggerSendListener(data: any): void {
    for (let [_, value] of send_listeners) {
      value.processSendedWebsocketMessage(data);
    }
  }
}
class PatchedWebSocket extends OriginalWebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);

    // redefining send method
    const originalSend = this.send;
    this.send = (data) => {
      originalSend.call(this, data);
      WebsocketListeners.triggerSendListener(data);
    };

    // redefining accept method
    this.addEventListener("message", (event) => {
      WebsocketListeners.triggerReceiveListener(event.data);
    });
  }
}

// Redefining global websocket with Faust patch
(window as any).WebSocket = PatchedWebSocket;
Object.defineProperties(window.WebSocket, {
  CONNECTING: { value: OriginalWebSocket.CONNECTING },
  OPEN: { value: OriginalWebSocket.OPEN },
  CLOSING: { value: OriginalWebSocket.CLOSING },
  CLOSED: { value: OriginalWebSocket.CLOSED },
});
