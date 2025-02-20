abstract class AbstractMenuItem {
  protected main_div: HTMLDivElement;
  protected is_added: boolean = false;
  protected is_hidden: boolean = false;

  protected abstract composeMainDiv(): HTMLDivElement;

  constructor() {
    this.main_div = document.createElement("div");
  }

  public addElement(): void {
    if (this.is_added) {
      return;
    }
    this.main_div = this.composeMainDiv();
    document.body.appendChild(this.main_div);
    this.is_added = true;
  }

  public removeElement(): void {
    if (!this.is_added) {
      return;
    }
    this.main_div.remove();
    this.is_added = false;
  }

  public hideElement(): void {
    if (!this.is_added) {
      return;
    }
    this.main_div.style.display = "none";
    this.is_hidden = true;
  }

  public unhideElement(): void {
    if (!this.is_added) {
      return;
    }
    this.main_div.style.display = "block";
    this.is_hidden = false;
  }

  public isShown() {
    return this.is_added;
  }

  public isHidden() {
    return this.is_hidden;
  }
}
