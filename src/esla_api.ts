namespace MessageReason {
  export const user_join: string = "userJoin";
  export const user_leave: string = "userLeave";
  export const node_data: string = "nodeData";
  export const time_update: string = "serverTimecode";
  export const client_move: string = "clientMove";
}

function getScreenResolution(): number[] {
  const resolutions: number[][] = [
    [1920, 1080],
    [1792, 1008],
    [1664, 936],
    [1536, 864],
    [1408, 792],
    [1280, 720],
    [1152, 648],
    [1024, 576],
    [896, 504],
    [768, 432],
    [640, 360],
    [512, 288],
    [384, 216],
  ];
  const screen_width: number = window.innerWidth;
  const screen_height: number = window.innerHeight;
  let selected_resolution;
  for (let index in resolutions) {
    let resolution = resolutions[index];
    if (resolution[0] <= screen_width && resolution[1] <= screen_height) {
      selected_resolution = resolution;
      break;
    }
  }
  if (!selected_resolution) {
    console.error("screen too small " + screen_width + "x" + screen_height);
    selected_resolution = resolutions[resolutions.length - 1];
  }
  return selected_resolution;
}

function display_notification(text: string): void {
  const elements = document.querySelectorAll("#notify");
  if (elements.length > 0 && elements[0].parentElement) {
    elements[0].parentElement.removeChild(elements[0]);
  }

  const text_bubble = document.createElement("div");
  text_bubble.id = "notify";
  text_bubble.innerHTML = text;

  text_bubble.style.animationName = "hide";
  text_bubble.style.animationDelay = "2s";
  text_bubble.style.animationDuration = "0.5s";
  text_bubble.style.animationFillMode = "forwards";
  text_bubble.style.zIndex = "9999";

  document.body.appendChild(text_bubble);
  text_bubble.addEventListener("animationend", () => {
    text_bubble.remove();
  });
}
