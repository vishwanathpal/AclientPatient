import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SearchComponentsPage, SearchDeleteDialog, SearchUpdatePage } from './search.page-object';

const expect = chai.expect;

describe('Search e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let searchComponentsPage: SearchComponentsPage;
  let searchUpdatePage: SearchUpdatePage;
  let searchDeleteDialog: SearchDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Searches', async () => {
    await navBarPage.goToEntity('search');
    searchComponentsPage = new SearchComponentsPage();
    await browser.wait(ec.visibilityOf(searchComponentsPage.title), 5000);
    expect(await searchComponentsPage.getTitle()).to.eq('aClientPatientApp.search.home.title');
  });

  it('should load create Search page', async () => {
    await searchComponentsPage.clickOnCreateButton();
    searchUpdatePage = new SearchUpdatePage();
    expect(await searchUpdatePage.getPageTitle()).to.eq('aClientPatientApp.search.home.createOrEditLabel');
    await searchUpdatePage.cancel();
  });

  it('should create and save Searches', async () => {
    const nbButtonsBeforeCreate = await searchComponentsPage.countDeleteButtons();

    await searchComponentsPage.clickOnCreateButton();
    await promise.all([
      searchUpdatePage.setFirstNameInput('firstName'),
      searchUpdatePage.setLastNameInput('lastName'),
      searchUpdatePage.setImageUrlInput('imageUrl'),
      searchUpdatePage.setPhoneNumberInput('phoneNumber')
    ]);
    expect(await searchUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await searchUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await searchUpdatePage.getImageUrlInput()).to.eq('imageUrl', 'Expected ImageUrl value to be equals to imageUrl');
    expect(await searchUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    await searchUpdatePage.save();
    expect(await searchUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await searchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Search', async () => {
    const nbButtonsBeforeDelete = await searchComponentsPage.countDeleteButtons();
    await searchComponentsPage.clickOnLastDeleteButton();

    searchDeleteDialog = new SearchDeleteDialog();
    expect(await searchDeleteDialog.getDialogTitle()).to.eq('aClientPatientApp.search.delete.question');
    await searchDeleteDialog.clickOnConfirmButton();

    expect(await searchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
