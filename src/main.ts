/// <reference path="./menu_windows/faust_core_menu.ts" />

class Application {
  protected fcore_menu: FaustCoreMenu;

  constructor() {
    this.fcore_menu = new FaustCoreMenu();
    this.fcore_menu.addElement();
  }
}

const app = new Application();
