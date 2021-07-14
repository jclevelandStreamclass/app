import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/categories/interface/category.interface';
import { CategoriesService } from 'src/app/categories/services/categories.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  emailForm: FormGroup;
  categories!: Category[];

  @Output() sendEmail = new EventEmitter<string>();

  constructor(fb: FormBuilder, private categorySvc: CategoriesService) {
    this.emailForm = fb.group({
      email: [''],
    });
  }
  

  ngOnInit(): void {
    this.categorySvc.getCategory().subscribe(x => {this.categories = x});
    console.log(this.categories)
  }

  registerEmail(form: FormGroup): void {
    if (form.valid) {
      const userEmail = form.value.email;
      console.log(userEmail);
      this.sendEmail.emit(userEmail);
    }
  }
}
