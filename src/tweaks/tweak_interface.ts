const loaded_tweaks: Tweaks[] = [];

abstract class Tweaks {
  protected abstract name: string;
  protected abstract sever_side: boolean;
  protected abstract is_enabled: boolean;

  constructor() {
    loaded_tweaks.push(this);
  }

  public abstract enable(): void;
  public abstract disable(): void;

  // Must be defined if tweak depends on messages from websocket
  public abstract processReceivedWebsocketMessage(websocket_event_data: any): void;
  public abstract processSendedWebsocketMessage(websocket_event_data: any): void;

  public getTweakName(): string {
    return this.name;
  }

  public isServerSide(): boolean {
    return this.sever_side;
  }

  public isEnabled(): boolean {
    return this.is_enabled;
  }
}
