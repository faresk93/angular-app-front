import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../Service/recipe.service';
import {Recipe} from '../../../Model/recipe/recipe.model';
import {Location} from '@angular/common';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

    id: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private location: Location) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.editMode = params['id'] != null;
                    // initialize form
                    this.initForm();
                }
            );
        this.recipeService.fetchRecipes();
    }

    initForm() {
        let recipeName = '';
        let recipeimage_path = '';
        let recipeDescription = '';
        let recipeIngredients = this.formBuilder.array([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeimage_path = recipe.image_path;
            recipeDescription = recipe.description;
            // ingredients
            if (recipe['ingredients']) {
                for (const ingredient of recipe.ingredients) {
                    const newIngredient = this.formBuilder.group({
                        id: ingredient.id,
                        name: [ingredient.name, Validators.required],
                        amount: [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
                    });
                    recipeIngredients.push(newIngredient);
                    console.log(newIngredient);
                }
            }
        }
        this.recipeForm = this.formBuilder.group({
            name: [recipeName, [Validators.required]],
            image_path: [recipeimage_path, [Validators.required]],
            description: [recipeDescription, [Validators.required]],
            ingredients: recipeIngredients
        });
    }

    onSubmit() {
        const recipe: Recipe = this.recipeForm.value;
        if (this.editMode) {
            this.recipeService.fetchRecipes();
            this.recipeService.updateRecipe(this.id, recipe);
        } else {
            this.recipeService.addRecipe(recipe);
        }
        this.location.back();
    }

    getIngredients(): FormArray {
        return this.recipeForm.get('ingredients') as FormArray;
    }

    onAddIngredient() {
        const newIngredient = this.formBuilder.group({
            name: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
        });
        this.getIngredients().push(newIngredient);
    }

    onRemoveIngredient(index: number) {
        this.getIngredients().removeAt(index);
    }

    cancel() {
        this.location.back();
    }
}
