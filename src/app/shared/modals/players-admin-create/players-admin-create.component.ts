import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';

export interface UserData {
  id: string;
  name: string;
  photo: string;
  bio: string;
  job: string;
}

@Component({
  selector: 'players-admin-create',
  templateUrl: './players-admin-create.component.html',
  styleUrls: ['./players-admin-create.component.scss'],
})
export class PlayerAdminCreateModalComponent implements OnInit, OnChanges {
  editUser: FormGroup;
  createCategory: FormGroup;
  fileName = "";
  photoUrl = "";
  formData = new FormData();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    fb: FormBuilder,
    private toastService: ToastMessagesService,
    private dialogRef: MatDialogRef<PlayerAdminCreateModalComponent>
  ) {
    let {id, name, photo,bio,job}=this.data||{id:'', name:'', photo:null,bio:'',job:''};
    this.photoUrl = photo;
    this.createCategory = fb.group({
      id:[id||''],
      name: [name||'', Validators.required],
      photo: ['', this.data?null:Validators.required],
      bio: [bio||'', this.data?null:Validators.required],
      job: [job||'', this.data?null:Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

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
      this.formData.append('bio', this.createCategory.value.bio);
      this.formData.append('job', this.createCategory.value.job);
      this.dialogRef.close(this.formData);
      return;
    }
    this.toastService.showError('Error al guardar datos de categoría');
    return;
  }
}
