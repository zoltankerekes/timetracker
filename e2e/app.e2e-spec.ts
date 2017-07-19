import { TimetrackerPage } from './app.po';

describe('timetracker App', () => {
  let page: TimetrackerPage;

  beforeEach(() => {
    page = new TimetrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
