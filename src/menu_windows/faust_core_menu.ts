/// <reference path="./menu_interface.ts" />
/// <reference path="../menu_button_factory.ts" />
/// <reference path="./tweaks_menu.ts" />
/// <reference path="./gratitude_menu.ts" />

class FaustCoreMenu extends AbstractMenuItem {
  private tweak_menu: TweakMenu;
  private gratitude_menu: GratitudeMenu;

  constructor() {
    super();

    this.tweak_menu = new TweakMenu();
    this.gratitude_menu = new GratitudeMenu();

  }

  protected composeMainDiv(): HTMLDivElement {
    const result: HTMLDivElement = document.createElement("div");

    // positioning
    result.style.position = "absolute";
    result.style.left = "50%";
    result.style.top = "5%";
    result.style.transform = "translate(-50%, -50%)";

    // reshaping
    result.style.width = "fit-content";
    result.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    result.style.color = "white";
    result.style.zIndex = "9990";
    result.style.borderRadius = "10px";
    result.style.textAlign = "center";
    result.style.backdropFilter = "blur(5px)";

    // element positioning
    result.style.display = "flex";
    result.style.flexDirection = "row";
    result.style.alignItems = "center";
    result.style.justifyContent = "flex-start";
    result.style.gap = "20px";
    result.style.padding = "10px";

    const window_name: HTMLElement = document.createElement("h2");
    window_name.style.fontWeight = "bold";
    window_name.style.color = "white";
    window_name.innerText = "Faust Core";

    result.appendChild(window_name);
    result.appendChild(MenuButtonsFactory.buildButton("Твики", () => this.tweak_menu.addElement()));
    result.appendChild(MenuButtonsFactory.buildButton("?", () => this.gratitude_menu.addElement()));

    return result;
  }
}
