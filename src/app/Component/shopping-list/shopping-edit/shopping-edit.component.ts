import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../../Model/shopping/ingredient.model';
import {ShoppingListService} from '../../../Service/shopping-list.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  startedEditingSubscription = new Subscription();
  editMode = false;
  ingredient: Ingredient;
  index: number;
  @ViewChild('f') form: NgForm;

  constructor(private slService: ShoppingListService, private notifier: ToastrService) {
  }

  ngOnInit() {
    this.startedEditingSubscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.index = index;
        this.editMode = true;
        this.ingredient = this.slService.ingredients[index];
        this.form.form.patchValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const id = this.slService.getIngredients()[this.slService.getIngredients().length - 1].id + 1;
    const newIngredient = new Ingredient(id, form.value.name, form.value.amount);
    if (!this.editMode) {
      this.slService.addIngredient(newIngredient);
      // notification
      this.notifier.success('- ' + form.value.name, 'Ingredient added');
    } else {
      this.slService.editIngredient(this.index, newIngredient);
      // notification
      this.notifier.info('- ' + form.value.name, 'Ingredient updated');
    }
    form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete(index: number) {
    if (this.editMode) {
      this.slService.deleteIngredient(index);
      this.notifier.info('Ingredient deleted', 'Deletion Successful');
    } else {
      this.notifier.error('Please select an ingredient to delete', 'No Selection');
    }
    this.onClear();
  }
}
