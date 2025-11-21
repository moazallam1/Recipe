import { Routes } from '@angular/router';
import { MealLayoutComponent } from './Components/meal-layout/meal-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/meal-layout/meal-layout.component').then(
        (m) => m.MealLayoutComponent
      ),

    children: [
      { path: '', redirectTo: 'category/all', pathMatch: 'full' },
      {
        path: 'category/:categoryName',
        loadComponent: () =>
          import('./Components/meals/meals.component').then(
            (m) => m.MealsComponent
          ),
      },
      {
        path: 'mealdetails/:mealId',
        loadComponent: () =>
          import('./Components/meal-details/meal-details.component').then(
            (m) => m.MealDetailsComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./Components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
