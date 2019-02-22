import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './Service/auth-guard.service';
import {AuthComponent} from './Component/auth/auth.component';
import {ShoppingListComponent} from './Component/shopping-list/shopping-list.component';
import {ArticlesComponent} from './Component/articles/articles.component';
import {NotFoundComponent} from './Component/not-found/not-found.component';
import {RecipesComponent} from './Component/recipes/recipes.component';
import {RecipeStartComponent} from './Component/recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './Component/recipes/recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './Component/recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
    {path: '', canActivate: [AuthGuardService], redirectTo: 'recipes', pathMatch: 'full'},
    {
        path: 'recipes', canActivate: [AuthGuardService], component: RecipesComponent, children: [
            {path: '', canActivate: [AuthGuardService], component: RecipeStartComponent},
            {path: 'new', canActivate: [AuthGuardService], component: RecipeEditComponent},
            {path: ':id', canActivate: [AuthGuardService], component: RecipeDetailComponent},
            {path: ':id/edit', canActivate: [AuthGuardService], component: RecipeEditComponent}
        ]
    },
    {path: 'auth', component: AuthComponent},
    {path: 'shopping-list', canActivate: [AuthGuardService], component: ShoppingListComponent},
    {path: 'articles', canActivate: [AuthGuardService], component: ArticlesComponent},
    {path: 'error-404', component: NotFoundComponent, data: {message: 'Page Not Found !'}},
    {path: '**', redirectTo: 'error-404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
