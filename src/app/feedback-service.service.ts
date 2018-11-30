import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from './menu/shared/feedback';
import { baseURL } from './menu/shared/baseurl';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  constructor(private http: HttpClient, private error : ProcessHTTPMsgService)
   { }
onSubmit(feedback: Feedback)
{
  const header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.http.post<Feedback>(baseURL +'feedback', feedback,header).pipe(map(res=> res)).pipe(catchError(this.error.handleError));
}
}
