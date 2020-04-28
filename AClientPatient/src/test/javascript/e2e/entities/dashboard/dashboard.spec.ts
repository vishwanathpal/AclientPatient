import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DashboardComponentsPage, DashboardDeleteDialog, DashboardUpdatePage } from './dashboard.page-object';

const expect = chai.expect;

describe('Dashboard e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dashboardComponentsPage: DashboardComponentsPage;
  let dashboardUpdatePage: DashboardUpdatePage;
  let dashboardDeleteDialog: DashboardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dashboards', async () => {
    await navBarPage.goToEntity('dashboard');
    dashboardComponentsPage = new DashboardComponentsPage();
    await browser.wait(ec.visibilityOf(dashboardComponentsPage.title), 5000);
    expect(await dashboardComponentsPage.getTitle()).to.eq('aClientPatientApp.dashboard.home.title');
  });

  it('should load create Dashboard page', async () => {
    await dashboardComponentsPage.clickOnCreateButton();
    dashboardUpdatePage = new DashboardUpdatePage();
    expect(await dashboardUpdatePage.getPageTitle()).to.eq('aClientPatientApp.dashboard.home.createOrEditLabel');
    await dashboardUpdatePage.cancel();
  });

  it('should create and save Dashboards', async () => {
    const nbButtonsBeforeCreate = await dashboardComponentsPage.countDeleteButtons();

    await dashboardComponentsPage.clickOnCreateButton();
    await promise.all([dashboardUpdatePage.setNameInput('name'), dashboardUpdatePage.setSurnameInput('surname')]);
    expect(await dashboardUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await dashboardUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    await dashboardUpdatePage.save();
    expect(await dashboardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dashboardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Dashboard', async () => {
    const nbButtonsBeforeDelete = await dashboardComponentsPage.countDeleteButtons();
    await dashboardComponentsPage.clickOnLastDeleteButton();

    dashboardDeleteDialog = new DashboardDeleteDialog();
    expect(await dashboardDeleteDialog.getDialogTitle()).to.eq('aClientPatientApp.dashboard.delete.question');
    await dashboardDeleteDialog.clickOnConfirmButton();

    expect(await dashboardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
