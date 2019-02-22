import {Injectable} from '@angular/core';
import {Recipe} from '../Model/recipe/recipe.model';
import {Subject} from 'rxjs';
import {Ingredient} from '../Model/shopping/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    url = 'http://127.0.0.1:8000/';
    // recipes: Recipe[] = [
    //     new Recipe(
    //         1,
    //         'Recipe 1',
    //         'Testing',
    //         'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,h_436,q_auto/v1/hellofresh_s3/image/enchiladas-aux-legumes-1a1102aa.jpg',
    //         [
    //             new Ingredient(3, 'Fries', 20),
    //             new Ingredient(4, 'Fish', 2)
    //         ]
    //     ),
    //     new Recipe(
    //         2,
    //         'Recipe 2',
    //         'Testing',
    //         'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    //         [
    //             new Ingredient(5, 'Meat', 20),
    //             new Ingredient(6, 'Chicken', 2)
    //         ]
    //     ),
    //     new Recipe(
    //         3,
    //         'Recipe 3',
    //         'Testing',
    //         'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/IMG_1105.jpg',
    //         [
    //             new Ingredient(7, 'Meat', 20)
    //         ]
    //     )
    // ];
    recipes: Recipe[] = [];
    recipesSubject = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService, private location: Location, private notifier: ToastrService, private http: HttpClient) {
        this.emitRecipesSubject();
    }

    emitRecipesSubject() {
        this.recipesSubject.next(this.recipes.slice());
    }

    getRecipe(id: number) {
        return this.recipes.find(
            (r) => id === r.id
        );
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        recipe.id = this.recipes[this.recipes.length - 1].id + 1;
        this.recipes.push(recipe);
        this.emitRecipesSubject();

        // backend
        const uri = this.url + 'api/add_recipe';
        this.http.post(uri, recipe).subscribe(
            () => {
                console.log('recipe added');
            },
            (error) => {
                console.log(error);
            }
        );
    }

    updateRecipe(id: number, newRecipe: Recipe) {
        newRecipe.id = id;
        const index = this.recipes.indexOf(this.getRecipe(id));
        this.recipes[index] = newRecipe;
        this.emitRecipesSubject();

        // backend
        const uri_update = 'api/update_recipe/' + id;
        this.http.put(this.url + uri_update, newRecipe).subscribe(
            () => {
                console.log('recipe updated');
            }
        );
    }

    removeRecipe(id: number) {
        const index = this.recipes.indexOf(this.getRecipe(id));
        this.recipes.splice(index, 1);
        this.emitRecipesSubject();
        this.location.back();
        this.notifier.error('Recipe Deleted', 'Deletion Successful');
    }

    fetchRecipes() {
        const uri = 'api/get_recipes';
        this.http.get(this.url + uri).subscribe(
            (recipes: any) => {
                this.recipes = recipes;
                this.emitRecipesSubject();
            }
        );
    }

    fetchRecipe(id: number) {
        const uri = 'api/get_recipe/' + id;
        this.http.get(this.url + uri).subscribe(
            (recipe: Recipe) => {
                console.log('recipe fetched');
                return recipe;
            }
        );
    }
}
