import { LixsuAngular2Page } from './app.po';

describe('lixsu-angular2 App', function() {
  let page: LixsuAngular2Page;

  beforeEach(() => {
    page = new LixsuAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
