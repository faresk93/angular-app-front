import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from '../../../Service/recipe.service';
import {Subscription} from 'rxjs';
import {Recipe} from '../../../Model/recipe/recipe.model';
import {ModalManager} from 'ngb-modal';
import {ActivatedRoute, Router} from '@angular/router';
import set = Reflect.set;

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: any[];
    recipesSubscription: Subscription;
    filteredString: string;

    constructor(
        private recipeService: RecipeService,
        private modalService: ModalManager,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.recipesSubscription = this.recipeService.recipesSubject.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
            }
        );
        this.recipeService.emitRecipesSubject();
        this.recipeService.fetchRecipes();

    }

    onNewRecipte() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.recipesSubscription.unsubscribe();
    }
}
