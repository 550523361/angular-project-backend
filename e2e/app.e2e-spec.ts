import { TableListDemoPage } from './app.po';

describe('table-list-demo App', () => {
  let page: TableListDemoPage;

  beforeEach(() => {
    page = new TableListDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
