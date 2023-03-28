import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { switchMap } from 'rxjs/operators'
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  selectedContactId: number;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedContactId = params['id'];
    });

    if (this.selectedContactId) {
      this.apiService.getContactById(this.selectedContactId).subscribe(res => {
        this.contactForm.patchValue(res['result']);
      });
    }
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      id: new FormControl(null),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl(null),
      address: new FormControl('')
    });
  }

  onSubmit() {
    this.apiService.saveContact(this.contactForm.value).subscribe((res: any) => {
      this.router.navigateByUrl('contact-list');
    });
  }

}
