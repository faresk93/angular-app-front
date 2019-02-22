import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../Model/shopping/ingredient.model';
import {ShoppingListService} from '../../Service/shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private ingredientsSubscription: Subscription;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingredientsSubscription = this.slService.ingredientsSubject.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  onEditIngredient(index: number) {
     this.slService.startedEditing.next(index);
  }
}
