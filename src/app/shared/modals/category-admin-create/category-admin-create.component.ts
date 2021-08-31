import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';
import { UpdateUserService } from '../../services/update-user.service';

export interface UserData {
  id: string;
  name: string;
  photo: string;
}

@Component({
  selector: 'category-admin-create',
  templateUrl: './category-admin-create.component.html',
  styleUrls: ['./category-admin-create.component.scss'],
})
export class CategoryAdminCreateModalComponent implements OnInit, OnChanges {
  editUser: FormGroup;
  createCategory: FormGroup;
  fileName = "";
  photoUrl = "";
  formData = new FormData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    fb: FormBuilder,
    private toastService: ToastMessagesService,
    private dialogRef: MatDialogRef<CategoryAdminCreateModalComponent>
  ) {
    let {id, name, photo}=this.data||{id:'', name:'', photo:null};
    this.photoUrl = photo;
    console.log("🚀 ~ file: category-admin-create.component.ts ~ line 41 ~ CategoryAdminCreateModalComponent ~ this.photoUrl", this.photoUrl)

    this.createCategory = fb.group({
      id:[id||''],
      name: [name||'', Validators.required],
      photo: ['', this.data?null:Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes.data.currentValue);
  }

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    
    if (file) {
      this.fileName = file.name;
      this.formData.append('photo', file);
    }
  }

  saveClick(form: FormGroup) {
    if (form.valid) {
      this.formData.append('name', this.createCategory.value.name);
      this.formData.append('id', this.createCategory.value.id);
      this.dialogRef.close(this.formData);
      return;
    }
    this.toastService.showError('Error al guardar datos de categoría');
    return;
  }
}
