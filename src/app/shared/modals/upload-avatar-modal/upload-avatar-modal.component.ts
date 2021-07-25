import { HttpClient } from '@angular/common/http';
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
  @ViewChild('login') spinner!: ElementRef;

  formData = new FormData();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDataFile,
    private dialogRef: MatDialogRef<UploadAvatarModalComponent>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  addSpinner() {
    const spinner = this.renderer.createElement('div');
    this.renderer.addClass(spinner, 'spinner');
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>    
    `;
    this.renderer.appendChild(this.spinner.nativeElement, spinner);
  }

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
      this.addSpinner();
      setTimeout(() => {
        this.dialogRef.close(this.formData);
      }, 1000);
    }
  }
}
