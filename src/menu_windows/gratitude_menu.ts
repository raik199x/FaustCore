class GratitudeMenu extends AbstractMenuItem {
  constructor() {
    super();
  }

  private getScrollableArea(screen_height: number): HTMLDivElement {
    const scrollableDiv = document.createElement("div");

    scrollableDiv.style.height = (screen_height / 4).toString() + "px";
    scrollableDiv.style.overflow = "auto";
    scrollableDiv.style.border = "1px solid #ccc";
    scrollableDiv.style.padding = "10px";
    scrollableDiv.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    scrollableDiv.style.borderRadius = "10px";
    scrollableDiv.style.marginBottom = "20px";

    return scrollableDiv;
  }

  protected composeMainDiv(): HTMLDivElement {
    const result: HTMLDivElement = document.createElement("div");

    // resizing
    const resolution: number[] = getScreenResolution();
    result.style.position = "fixed";
    result.style.width = (resolution[0] / 3).toString() + "px";
    result.style.height = "fit-content";

    // Centering block
    result.style.top = "50%";
    result.style.left = "50%";
    result.style.transform = "translate(-50%, -50%)";

    // Cosmetics
    result.style.padding = "20px";
    result.style.backgroundColor = "rgba(0, 0, 0, 0.75)"; // transparent black
    result.style.borderRadius = "10px";
    result.style.textAlign = "center";
    result.style.backdropFilter = "blur(5px)";
    result.style.zIndex = "9999";

    const window_name: HTMLHeadElement = document.createElement("h2");
    window_name.style.color = "white";
    window_name.style.marginBottom = "20px";
    window_name.innerText = "Благодарности";

    const scroll_area: HTMLDivElement = this.getScrollableArea(resolution[1]);

    const gratitude_block = document.createElement("div");
    gratitude_block.style.color = "white";
    gratitude_block.style.fontSize = "16px";
    gratitude_block.innerText =
      "Спасибо тебе, игрок, за то что даёшь проекту шанс на жизнь.\nТак же спасибо ребятами ждущим альфа-тест сюжетного твика. Ваша поддержка заставляла проект жить.\n\n Спасибо, TRIOLA.\nСпасибо, makter.";

    result.appendChild(window_name);
    result.appendChild(scroll_area);
    scroll_area.appendChild(gratitude_block);
    result.appendChild(MenuButtonsFactory.buildButton("Close", () => this.removeElement()));

    return result;
  }
}
