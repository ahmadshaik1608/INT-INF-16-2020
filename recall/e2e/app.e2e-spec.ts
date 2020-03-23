import { RecallPage } from './app.po';

describe('recall App', function() {
  let page: RecallPage;

  beforeEach(() => {
    page = new RecallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
