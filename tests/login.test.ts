import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navegar a la página de inicio de sesión
  await page.goto('http://capital.q4tech.com:7272/sfNetWebApp.Web_acmeus/');

  // Ingresar credenciales y hacer login
  await loginPage.ingresarCredenciales('testuser1@closeupus.com', 'testuser12024');

  // Verificar que el login fue exitoso, ajusta la verificación según tu aplicación
  await expect(page).toHaveURL('http://capital.q4tech.com:7272/sfNetWebApp.Web_acmeus/#/webviewModule/view/18');
});
