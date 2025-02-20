class TweakMenu extends AbstractMenuItem {
  constructor() {
    super();
  }

  private getScrollableArea(screen_height: number): HTMLDivElement {
    const scrollableDiv = document.createElement("div");

    scrollableDiv.style.height = (screen_height / 3).toString() + "px";
    scrollableDiv.style.overflow = "auto";
    scrollableDiv.style.border = "1px solid #ccc";
    scrollableDiv.style.padding = "10px";
    scrollableDiv.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    scrollableDiv.style.borderRadius = "10px";
    scrollableDiv.style.marginBottom = "20px";

    return scrollableDiv;
  }

  private getTweakNameColor(tweak: Tweaks): string {
    if (tweak.isEnabled()) {
      return "green";
    }
    return "white";
  }

  private buildDivUponTweak(): HTMLDivElement[] {
    const result: HTMLDivElement[] = [];

    for (let iter: number = 0; iter < loaded_tweaks.length; iter++) {
      const entry: HTMLDivElement = document.createElement("div");
      entry.style.display = "flex";
      entry.style.flexDirection = "row";
      entry.style.alignItems = "center";
      entry.style.justifyContent = "flex-start";
      entry.style.borderRadius = "6px";
      entry.style.border = "2px solid rgba(230, 224, 203, 0.6)";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = loaded_tweaks[iter].getTweakName();
      checkbox.style.marginLeft = "10px";
      checkbox.style.marginRight = "10px";
      checkbox.checked = loaded_tweaks[iter].isEnabled();
      checkbox.addEventListener("change", (event: Event) => {
        const target = event.target as HTMLInputElement;
        target.checked ? loaded_tweaks[iter].enable() : loaded_tweaks[iter].disable();
      });

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerText = checkbox.id;
      label.style.fontSize = "21px";
      label.style.color = this.getTweakNameColor(loaded_tweaks[iter]);

      entry.appendChild(checkbox);
      entry.appendChild(label);
      result.push(entry);
    }

    return result;
  }

  protected composeMainDiv(): HTMLDivElement {
    const result: HTMLDivElement = document.createElement("div");

    // resizing
    const resolution: number[] = getScreenResolution();
    result.style.position = "fixed";
    result.style.width = (resolution[0] / 2.5).toString() + "px";
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
    window_name.innerText = "Меню твиков";

    // TODO: add macros for resolution results (or even better, return a struct)
    const scroll_area: HTMLDivElement = this.getScrollableArea(resolution[1]);
    const div_tweaks = this.buildDivUponTweak();
    for (let iter: number = 0; iter < div_tweaks.length; iter++) {
      scroll_area.appendChild(div_tweaks[iter]);
    }

    result.appendChild(window_name);
    result.appendChild(scroll_area);
    result.appendChild(MenuButtonsFactory.buildButton("Close", () => this.removeElement()));

    return result;
  }
}
