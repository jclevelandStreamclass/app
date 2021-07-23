import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { UpdateUserService } from '../../services/update-user.service';

export interface ConfirmationDataFile {
  title: string;
  optionNo: string;
  optionYes: string;
  file: string;
}

@Component({
  selector: 'app-upload-avatar-modal',
  templateUrl: './upload-avatar-modal.component.html',
  styleUrls: ['./upload-avatar-modal.component.scss'],
})
export class UploadAvatarModalComponent implements OnInit {
  fileName = '';
  @Input() requiredFileType!: string;

  formData = new FormData();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDataFile,
    private dialogRef: MatDialogRef<UploadAvatarModalComponent>
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];

    if (file) {
      this.fileName = file.name;

      console.log(file);
      this.formData.append('avatar', file);
    }
  }

  uploadAvatar(): void {
    if (this.fileName) {
      this.dialogRef.close(this.formData);
    }
  }
}
