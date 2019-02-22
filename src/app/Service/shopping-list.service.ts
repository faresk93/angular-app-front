import {Injectable} from '@angular/core';
import {Ingredient} from '../Model/shopping/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // Ingredients Subject
  ingredientsSubject = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  public ingredients: Ingredient[] = [
    new Ingredient(1, 'Apples', 5),
    new Ingredient(2, 'Tomato', 10)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  // Method that emits ingredients subject
  emitIngredients() {
    this.ingredientsSubject.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // emit ingredientsSubject after adding ingredient
    this.emitIngredients();
  }

  editIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.emitIngredients();
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.emitIngredients();
  }

  getIngredient(id: number) {
    return this.getIngredients().find(
      (i) => {
        return i.id === id;
      }
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.emitIngredients();
  }
}
