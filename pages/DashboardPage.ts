import { Page } from 'playwright';

export class DashboardPage {
  private page: Page;

  // Localizadores Elementos web
  private toggleAside = 'xpath=//body/div[3]/div[1]/div[1]/div[1]/div[1]/span[1]/*[1]';
  private menuRelations = 'xpath=//span[@id="menu_relations"]';
  private linkPortfolios = 'xpath=//a[@id="menu_relations_5"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Acciones
  async mouseOverToggleAside(): Promise<void> {
    await this.page.hover(this.toggleAside);
  }

  async moveMouseToCenter(): Promise<void> {
    const viewportSize = this.page.viewportSize();
    if (!viewportSize) {
      throw new Error('Viewport size is not defined');
    }

    const elementBox = await this.page.locator(this.toggleAside).boundingBox();
    if (!elementBox) {
      throw new Error('Element box is not defined');
    }

    await this.page.mouse.move(
      viewportSize.width / 2 - elementBox.x,
      viewportSize.height / 2 - elementBox.y
    );
  }

  async clickMenuRelations(): Promise<void> {
    await this.page.click(this.menuRelations);
  }

  async clickLinkPortfolios(): Promise<void> {
    await this.page.click(this.linkPortfolios);
  }
}
