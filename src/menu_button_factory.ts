class MenuButtonsFactory {
  static buildButton(text: string, on_click: (event: MouseEvent) => void): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement("button");

    button.style.borderRadius = "10px";
    button.style.border = "2px solid rgba(3, 55, 170, 0.8)";
    button.style.backgroundColor = "rgba(3, 55, 170, 0.8)";
    button.style.color = "white";
    button.style.padding = "5px 10px";
    button.style.fontSize = "14px";
    button.innerText = text;

    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "white";
      button.style.color = "rgba(3, 55, 170, 0.8)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "rgba(3, 55, 170, 0.8)";
      button.style.color = "white";
    });

    button.addEventListener("mousedown", on_click);

    return button;
  }
}
