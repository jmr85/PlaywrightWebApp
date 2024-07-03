import { Page } from 'playwright';

export class PortfolioListPage {
  private page: Page;

  // Localizadores Elementos web

  // Item de cartera
  // 'xpath=//strong[contains(text(),'ALFANO, AGOSTINO')]'
  private itemPortfolio = 'xpath=/html/body/div[3]/div/div[2]/div[2]/div[2]/div/div[4]/div/div[2]/div/div[1]/strong';
  // boton acciones del listado, de filtro y demas
  private dropdownActions = 'button#dropdownActions';
  // boton ver detalle cartera
  private btnViewPortfolio = 'xpath=//button[text()="View Portfolio"]';


  // WebView Frame del Relation
  private webviewFrame = '#webviewFrame';
  // Menu actions de la cartera
  private actionsLink = ' Actions';
  // Boton Visita Face to face call
  private faceToFaceCallLink = 'Face to Face Call (MD)';
  // Boton Cerrar Visita 
  private closeButton = ' Close';
  
  constructor(page: Page) {
    this.page = page;
  }

  // Acciones
  async clickItemPortfolio(): Promise<void> {
    await this.page.waitForSelector(this.itemPortfolio, { state: 'visible', timeout: 20000 });
    await this.page.click(this.itemPortfolio);
  }

  async clickPortfolioByName(name: string): Promise<void> {
    await this.page.getByText(name).click();
  }

  async clickDropdownActions(): Promise<void> {
    await this.page.click(this.dropdownActions);
  }

  async clickViewPortfolio(): Promise<void> {
    await this.page.click(this.btnViewPortfolio);
  }

  async clickViewPortfolioByName(name: string): Promise<void> {
    await this.page.getByRole('button', { name }).click();
  }

    // New actions
    async clickActionsLink(): Promise<void> {
      const frame = this.page.frameLocator(this.webviewFrame);
      await frame.getByRole('link', { name: this.actionsLink }).click();
    }
  
    async clickFaceToFaceCallLink(): Promise<void> {
      const frame = this.page.frameLocator(this.webviewFrame);
      await frame.getByRole('link', { name: this.faceToFaceCallLink }).click();
    }
  
    async clickCloseButton(): Promise<void> {
      await this.page.getByRole('button', { name: this.closeButton }).click();
    }
  
    async handleDialog(callback: (message: string) => void): Promise<void> {
      this.page.once('dialog', dialog => {
        const message = dialog.message();
        callback(message);
        dialog.dismiss().catch(() => {});
      });
    }
  
    async performActions(): Promise<void> {
      await this.clickActionsLink();
      
      this.handleDialog((message) => {
        console.log(`Dialog message: ${message}`);
      });
      
      await this.clickFaceToFaceCallLink();
      await this.clickCloseButton();
    }
}
