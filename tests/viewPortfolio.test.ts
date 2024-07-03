import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PortfolioListPage } from '../pages/PortfolioListPage';

test.describe('View Portfolio Test with Evidence', () => {
  const url = 'http://capital.q4tech.com:7272/sfNetWebApp.Web_acmeus/';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('view portfolio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const portfolioListPage = new PortfolioListPage(page);

    // Step 1: Capture pre-login screenshot
    await page.screenshot({ path: 'test-results/1_preLogin.jpg' });

    // Step 2: Login
    await loginPage.ingresarCredenciales('testuser1@closeupus.com', 'testuser12024');
    await page.waitForTimeout(1000);

    // Step 3: Capture post-login screenshot
    await page.screenshot({ path: 'test-results/2_postLogin.jpg' });

    // Step 4: Navigate to Portfolios
    await dashboardPage.mouseOverToggleAside();
    await dashboardPage.clickMenuRelations();
    await dashboardPage.clickLinkPortfolios();
    await dashboardPage.moveMouseToCenter();

    // Step 5: Capture portfolios list screenshot
    await page.screenshot({ path: 'test-results/3_portfolios_list.jpg' });

    // Step 6: View Portfolio by name
    await page.waitForTimeout(2000);
    await portfolioListPage.clickPortfolioByName('ABDULKAREEM, ABDULLATEEF 07/');
    await page.screenshot({ path: 'test-results/4_portfolio_item.jpg' });

    // Step 7: Click View Portfolio by role and name
    await portfolioListPage.clickViewPortfolioByName(' View Portfolio');
    await page.screenshot({ path: 'test-results/5_view_portfolio.jpg' });

    // Verificar que la interacción fue exitosa, ajusta la verificación según tu aplicación
    //await expect(page).toHaveURL(/portfolio-view/);
  });
});
