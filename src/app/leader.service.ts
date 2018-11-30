import { Injectable } from '@angular/core';
import { Leader } from './menu/shared/leader';
import { LEADERS } from './menu/shared/leaders';
import { Observable, of } from 'rxjs';
import { delay, catchError,map } from 'rxjs/operators';
import { baseURL } from './menu/shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
   // return of(LEADERS).pipe(delay(2000));
     }
     getLeader(id: string): Observable<Leader> {
      return this.http.get<Leader>(baseURL + 'leadership/'+ id ).pipe(catchError(this.processHTTPMsgService.handleError));
     // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
     getFeaturedLeader(): Observable<Leader> {
      return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
      //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
   }
}
