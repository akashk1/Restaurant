import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../menu/shared/leader';
import { LeaderService } from '../leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:[ expand(),flyInOut()]
})
export class AboutComponent implements OnInit {
    leaders: Leader[];
    errMess: string;
  constructor(private leaderService: LeaderService,@Inject('BaseUrl') private BaseURL) { }

  ngOnInit() {
  this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders,errMess=>this.errMess=<any>errMess );
  }

}
