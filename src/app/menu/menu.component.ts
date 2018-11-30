import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from './shared/dish';
import { DishServiceService } from '../dish-service.service';
import { flyInOut,expand } from '../animations/app.animation';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
  dishes: Dish[] ;
  selectedDish: Dish;
  errMess: string;
  constructor(private dishService: DishServiceService , @Inject('BaseUrl') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,  errmess => this.errMess = <any>errmess);
  }
onSelected(dish: Dish) {
  this.selectedDish = dish;
}
}
