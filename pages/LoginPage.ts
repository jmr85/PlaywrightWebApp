import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  // Elementos web
  private txtUserName = 'input#txtUserName';
  private txtPassword = 'input#txtUserPassword';
  private btnLogin = 'button#btnLogin';

  constructor(page: Page) {
    this.page = page;
  }

  // Acciones
  async ingresarCredenciales(email: string, password: string): Promise<void> {
    await this.page.fill(this.txtUserName, email);
    await this.page.fill(this.txtPassword, password);
    await this.page.click(this.btnLogin);
  }
}
