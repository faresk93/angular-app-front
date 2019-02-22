import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../Model/recipe/recipe.model';
import {RecipeService} from '../../../Service/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;
    id: number;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                const id = +params['id'];
                this.id = id;
                this.recipe = this.recipeService.getRecipe(id);
            }
        );

    }

    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe() {
        // this.router.navigate(['edit'], {relativeTo: this.route});
        this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    }

    onDelete() {
        this.recipeService.removeRecipe(this.id);

    }
}
