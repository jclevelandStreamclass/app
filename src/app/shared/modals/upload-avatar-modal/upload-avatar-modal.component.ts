import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  @ViewChild('login') spinner!: ElementRef;

  formData = new FormData();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDataFile,
    private dialogRef: MatDialogRef<UploadAvatarModalComponent>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];

    if (file) {
      this.fileName = file.name;
      this.formData.append('avatar', file);
    }
  }

  uploadAvatar(): void {
    if (this.fileName) {
      this.dialogRef.close(this.formData);
    }
  }
}
