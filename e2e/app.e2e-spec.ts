import { RecipeBookModulePage } from './app.po';

describe('recipe-book-module App', function() {
  let page: RecipeBookModulePage;

  beforeEach(() => {
    page = new RecipeBookModulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
