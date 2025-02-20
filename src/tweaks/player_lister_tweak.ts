/// <reference path="./tweak_interface.ts" />

type PlayerInfo = {
  id: number;
  color: string;
  name: string;
};

class PlayerLister extends Tweaks {
  protected name: string;
  protected sever_side: boolean;
  protected is_enabled: boolean;

  // Class variables
  private main_div: HTMLDivElement;
  private player_list_div: HTMLDivElement;
  private is_dragging: boolean;
  private offset_x: number;
  private offset_y: number;
  private players_on_location: Map<number, PlayerInfo>;

  constructor() {
    super();

    this.name = "Отображать меню с игроками на локации";
    this.sever_side = false;
    this.is_enabled = false;

    // Init main div
    this.main_div = this.initPlayerListBlock();
    this.main_div.style.display = "none"; // Hiding window
    document.body.appendChild(this.main_div);

    // sub div will remain empty
    this.player_list_div = document.createElement("div");
    this.player_list_div.style.padding = "20px";
    this.main_div.appendChild(this.player_list_div);

    this.is_dragging = false;
    this.offset_x = 0;
    this.offset_y = 0;
    this.players_on_location = new Map();
  }

  public enable(): void {
    this.is_enabled = true;
    this.main_div.style.display = "block";
    WebsocketListeners.addReceiveListener(this);
    display_notification("Для обновления списка перезайдите на локацию.");
  }

  public disable(): void {
    this.is_enabled = false;
    this.main_div.style.display = "none";
    WebsocketListeners.removeReceiveListener(this);

    // Clearing info
    this.players_on_location.clear();
    this.updatePlayerList();
  }

  /**
   * @brief Parses user json entry from websocket
   *
   * @param user json info
   * @return PlayerInfo: parsed data
   */
  private parseSocketUserData(user: any): PlayerInfo {
    const result: PlayerInfo = {
      id: user.id,
      name: user.name,
      color: user.color,
    };

    return result;
  }

  public processReceivedWebsocketMessage(websocket_event_data: any): void {
    try {
      const parsedData = JSON.parse(websocket_event_data);
      switch (parsedData.reason) {
        case MessageReason.user_join:
          const user: PlayerInfo = this.parseSocketUserData(parsedData.user);
          this.players_on_location.set(user.id, user);
          break;
        case MessageReason.node_data:
          this.players_on_location.clear();
          const users = parsedData.users;
          if (!Array.isArray(users)) {
            return;
          }
          users.forEach((user) => {
            user = this.parseSocketUserData(user);
            this.players_on_location.set(user.id, user);
          });
          break;
        case MessageReason.user_leave:
          this.players_on_location.delete(parsedData.id);
          break;
        default:
          return;
      }

      this.updatePlayerList();
    } catch (error) {
      console.error(error);
    }
  }
  public processSendedWebsocketMessage(websocket_event_data: any): void {}

  private updatePlayerList(): void {
    this.player_list_div.innerHTML = ""; // Clearing list

    for (const [key, value] of this.players_on_location) {
      const player_entry: HTMLParagraphElement = document.createElement("p");
      player_entry.style.color = "#" + value.color;
      player_entry.innerText = key.toString() + " " + value.name;
      // player_entry.style.marginLeft = "10px";

      this.player_list_div.appendChild(player_entry);
    }
  }

  private initPlayerListBlock(): HTMLDivElement {
    const movableDiv = document.createElement("div");

    movableDiv.style.position = "fixed";
    movableDiv.style.top = "100px";
    movableDiv.style.left = "100px";
    movableDiv.style.width = "fit-content";
    movableDiv.style.height = "fit-content";
    movableDiv.style.backdropFilter = "blur(5px)";
    movableDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    movableDiv.style.cursor = "grab";
    movableDiv.style.borderRadius = "10px";
    movableDiv.style.zIndex = "9990";

    const window_name: HTMLHeadElement = document.createElement("h3");
    window_name.style.color = "white";
    window_name.innerText = "На локации:";
    window_name.style.marginLeft = "5px";
    window_name.style.marginRight = "5px";
    window_name.style.marginTop = "5px";
    movableDiv.appendChild(window_name);

    // Enabling element moving
    movableDiv.addEventListener("mousedown", (event: MouseEvent) => {
      this.is_dragging = true;
      this.offset_x = event.clientX - movableDiv.getBoundingClientRect().left;
      this.offset_y = event.clientY - movableDiv.getBoundingClientRect().top;

      // removing selection while holding
      event.preventDefault();
    });

    document.addEventListener("mousemove", (event: MouseEvent) => {
      if (this.is_dragging) {
        movableDiv.style.left = `${event.clientX - this.offset_x}px`;
        movableDiv.style.top = `${event.clientY - this.offset_y}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      this.is_dragging = false;
    });

    // Adding element to page
    document.body.appendChild(movableDiv);

    return movableDiv;
  }
}

//TODO: must be a better way of doing this
const player_lister_tweak: PlayerLister = new PlayerLister();
