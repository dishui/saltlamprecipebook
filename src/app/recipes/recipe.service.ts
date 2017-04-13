import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Ingredient } from '../shared/ingredient';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Regular Salt Lamp', 'Nature Shaped', 'http://www.indusclassic.com/images/natural-mini-dark_m.jpg', [
      new Ingredient('Block Salt', 10),
      new Ingredient('wooden base', 25)
    ]),
    new Recipe('Oval Salt Lamp', 'Ball Shaped', 'https://www.saltlamps-r-us.co.uk/wp-content/uploads/2015/07/Globe-Night-Light-Globe-Salt-Lamp-with-Plastic-Feet.jpg',[]),
    new Recipe('Bowl of Salt', 'a bowl of salt sat on a bulb', 'http://ep.yimg.com/ay/yhst-52764417431445/bowl-of-fire-salt-lamp-1.gif', [])
  ];
 
  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    }); //use put to overwrite, use post to do new key
    return this.http.put('https://saltlampreipebook.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://saltlampreipebook.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
