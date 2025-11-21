import { Component, inject, OnInit, signal } from '@angular/core';
import { MealsService } from '../../Services/meals.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-meals',
  imports: [RouterLink,RouterLinkActive,SlicePipe],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent implements OnInit {

  private readonly mealsService=inject(MealsService)
  private readonly activatedRoute=inject(ActivatedRoute)



    categories = signal<any[]>([]);
    meals =signal<any[]>([]);

    ngOnInit(): void {
      this.getAllCategories()
      this.getMealsByCategory()
    }

    getAllCategories():void{
      this.mealsService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res);
          
      this.categories.set(res.meals);
      console.log(this.categories());
      
        }
      })

  




    }

    getMealsByCategory():void{
      this.activatedRoute.paramMap.subscribe(

          (params)=>{
            const categoryName = params.get('categoryName');

            if(categoryName){
            this.mealsService.getMealsByCategory(categoryName).subscribe((res)=>{this.meals.set(res.meals)})
            console.log(this.meals());
            
            }
          }
        )



    }


}
