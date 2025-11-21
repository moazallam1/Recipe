import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealsService } from '../../Services/meals.service';

@Component({
  selector: 'app-meal-details',
  imports: [],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.scss'
})
export class MealDetailsComponent  implements OnInit {


  private readonly mealsService=inject(MealsService)
  private readonly activatedRoute=inject(ActivatedRoute)

   mealDetails = signal<any[]>([])

  ngOnInit(): void {
    this.getmealDetails()
  }

  getmealDetails():void{

    this.activatedRoute.paramMap.subscribe(

          (params)=>{
            const mealId = params.get('mealId');

            if(mealId){
            this.mealsService.getMealDetails(mealId).subscribe(
              (res)=>{
                console.log(res);
                this.mealDetails.set(res.meals);
              }
            )
            
            }
          }
        )

  }
  
getIngredients(meal: any) {
  const ingredients: any[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure
      });
    }
  }

  return ingredients;
}





}
