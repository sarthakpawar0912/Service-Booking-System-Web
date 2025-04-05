import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-create-ad',
  standalone:false,
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss'],
})


export class CreateAdComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  onFileSelected(event: any){ // Explicitly type the event
   this.selectedFile=event.target.files[0];
   this.previewImage();
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  postAd(): void {
   // Check if form is valid
   if (this.validateForm.invalid) {
    this.notification.error('ERROR', 'Please fill all required fields', { nzDuration: 5000 });
    return;
  }

  const formData: FormData = new FormData();

  // Only append the file if it exists
  if (this.selectedFile) {
    formData.append('img', this.selectedFile);
  }

  // Use proper form control names and provide fallback values for null
  formData.append('serviceName', this.validateForm.get('serviceName')?.value ?? '');
  formData.append('description', this.validateForm.get('description')?.value ?? '');
  formData.append('price', this.validateForm.get('price')?.value ?? '');

  this.companyService.postAd(formData).subscribe(
    res => {
      this.notification.success('SUCCESS', `Ad Posted Successfully..!`, { nzDuration: 5000 });
      this.router.navigateByUrl('/company/ads');
    },
    error => {
      this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
    }
  );
}
}