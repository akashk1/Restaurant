import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../menu/shared/feedback';
import { FeedbackServiceService } from '../feedback-service.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { expand, flyInOut } from '../animations/app.animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:[expand(),flyInOut()]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  feedbackForm: FormGroup;
  feedback: Feedback;
  Result: Feedback ;
  show =false;
  loader=true;
  contactType = ContactType;
  constructor(private fb: FormBuilder,private feedService: FeedbackServiceService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.loader = false;
    this.feedback = this.feedbackForm.value;
    const feed ={
      firstname : this.feedback.firstname,
      lastname : this.feedback.lastname,
      telnum : this.feedback.telnum,
      email : this.feedback.email,
      agree : this.feedback.agree,
      contacttype: this.feedback.contacttype,
      message: this.feedback.message
    }

this.feedService.onSubmit(feed).subscribe(res =>
  {
      this.loader= true;
    this.Result = new Feedback();
    this.Result.firstname= res.firstname;
    this.Result.lastname= res.lastname;
    this.Result.telnum= res.telnum;
    this.Result.email= res.email;
    this.Result.agree= res.agree;
    this.Result.contacttype= res.contacttype;
    this.Result.message= res.message;
 //   console.log(this.Result);
   this.show =true;
    setTimeout(() =>
    {
     
      this.show=false;
      
    // console.log(this.Result+" "+ this.show);
    },5000);
    //this.show =false;
  });
  

  
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
