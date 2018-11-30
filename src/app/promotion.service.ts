import { Injectable } from '@angular/core';
import { Promotion } from './menu/shared/promotion';
import { PROMOTIONS} from './menu/shared/promotions';
import { Observable, of } from 'rxjs';
import {delay, catchError,map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from './menu/shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,private error : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions/').pipe(catchError(this.error.handleError));
    //return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable< Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/'+ id).pipe(catchError(this.error.handleError));
   // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotion => promotion[0]))
    .pipe(catchError(this.error.handleError));
   // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
}
}
