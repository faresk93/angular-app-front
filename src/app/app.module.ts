import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './Component/header/header.component';
import {ShoppingListComponent} from './Component/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './Component/shopping-list/shopping-edit/shopping-edit.component';
import {NotFoundComponent} from './Component/not-found/not-found.component';
import {BasicHighlightDirective} from './Directives/basic-highlight.directive';
import {DropdownDirective} from './Directives/dropdown.directive';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ArticlesComponent} from './Component/articles/articles.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';
import {AuthComponent} from './Component/auth/auth.component';
import {HttpConfigInterceptor} from './Interceptor/httpconfig.interceptor';
import {MatDialogModule} from '@angular/material';
import {CanDeactivateGuard} from './Service/can-deactivate-guard.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ShortenPipe} from './Pipes/shorten.pipe';
import {FilterPipe} from './Pipes/filter.pipe';
import {NgxSpinnerModule} from 'ngx-spinner';
import {RecipesComponent} from './Component/recipes/recipes.component';
import {RecipeStartComponent} from './Component/recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './Component/recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './Component/recipes/recipe-edit/recipe-edit.component';
import {RecipeItemComponent} from './Component/recipes/recipe-list/recipe-item/recipe-item.component';
import {RecipeListComponent} from './Component/recipes/recipe-list/recipe-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        NotFoundComponent,
        BasicHighlightDirective,
        DropdownDirective,
        ArticlesComponent,
        AuthComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
        ShortenPipe,
        FilterPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        AgGridModule.withComponents([]),
        MatDialogModule,
        AngularFontAwesomeModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
        CanDeactivateGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
