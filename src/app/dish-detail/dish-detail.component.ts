import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { ActivatedRoute, Params } from '@angular/router';
import { DishServiceService } from '../dish-service.service';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { visibility ,expand, flyInOut} from '../animations/app.animation';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
               visibility(),
               expand(),
               flyInOut()
  ]
})
export class DishDetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
 dish: Dish;
 id: string;
 author: string;
 errMess: string;
 rating = 5;
 visibility = 'shown';
 comment: string;
 dishIds: string[];
  prev: string;
  next: string;

  dishcopy: Dish;
  commentForm: FormGroup;
  formErrors = {
    'comment': '',
    'author': ''
  };
  validationMessages = {
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    },
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    }
  };
  constructor(private route: ActivatedRoute, private location: Location
    , private dishService: DishServiceService, private fb: FormBuilder,@Inject('BaseUrl') private BaseURL) {
      this.createForm();
    }
    createForm() {
      this.commentForm = this.fb.group({
        rating : 5 ,
        comment : ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        author : ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
        date : ['']
      });
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
   this.onValueChanged();
    }
onValueChanged(data?: any ) {
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}
  ngOnInit() {
    // console.log(this.dish);
   // console.log(this.dish.comments);
   this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
  this.route.params.subscribe((params: Params) => {
     this.id = params['id'];
     this.visibility='hidden';
      this.dishService.getDish(this.id).subscribe(dishes => {this.dish = dishes;this.dishcopy = dishes;
        this.setPrevNext(dishes.id);this.visibility = 'shown';
      },errMess => this.errMess=<any>errMess );
     }

    );
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  onSubmit() {
    console.log(this.commentFormDirective);
    const date = new Date();
    const comment = {
      author : this.commentForm.value.author,
      rating : this.commentForm.value.rating,
      comment : this.commentForm.value.comment,
      date :  date.toDateString()
};
this.dishService.getDish(this.id).subscribe((dish) => {
dish.comments.push(comment);
this.dish = dish ;
});
this.dishcopy.comments.push(comment);
this.dishService.putDish(this.dishcopy)
.subscribe(dish => {
  this.dish = dish; this.dishcopy = dish;
},
errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
this.commentFormDirective.resetForm({
  rating: 5,
  comment: '',
  author: '',
  date: ''
});
this.rating = 5;
  }

}
