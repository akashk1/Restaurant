import { Component, OnInit, Inject } from '@angular/core';
import { DishServiceService } from '../dish-service.service';
import { PromotionService } from '../promotion.service';
import { Dish } from '../menu/shared/dish';
import { Promotion } from '../menu/shared/promotion';
import { Leader } from '../menu/shared/leader';
import { LeaderService } from '../leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [expand(),flyInOut()]
})
export class HomeComponent implements OnInit {
dish: Dish;
promotion: Promotion;
leader: Leader;
leaderErrMess: string;
promotionErrMess: string;
errMess: string;
  constructor(private dishService: DishServiceService, private promotionService: PromotionService, private leaderService: LeaderService,
    @Inject('BaseUrl') private BaseURL) { }

  ngOnInit() {
     this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errMess => this.errMess= <any>errMess);
 this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmess => this.promotionErrMess= <any>errmess);
  this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader,errmess => this.leaderErrMess= <any> errmess);
  }

}
