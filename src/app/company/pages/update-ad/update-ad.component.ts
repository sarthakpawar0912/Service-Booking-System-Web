import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { CompanyService } from "../../services/company.service";

@Component({
  selector: 'app-update-ad',
  standalone: false,
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss'
})

export class UpdateAdComponent {
 
  adId: any;
  validateForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  imgChanged = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.adId = this.activatedRoute.snapshot.params['id'];
    this.initializeForm();
    this.fetchAdDetails();
  }

  private initializeForm(): void {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  private fetchAdDetails(): void {
    this.companyService.getAdById(this.adId).subscribe(
      (res) => {
        this.validateForm.patchValue(res);
        if (res.returnedImg) {
          this.existingImage = `data:image/jpeg;base64,${res.returnedImg}`;
        }
      },
      (error) => {
        this.notification.error('Error', 'Failed to load ad details.', { nzDuration: 5000 });
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imgChanged = true;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  updateAd(): void {
    if (!this.validateForm.valid) {
      this.notification.warning('Warning', 'Please fill in all required fields.', { nzDuration: 5000 });
      return;
    }

    const formData = new FormData();
    formData.append('serviceName', this.validateForm.get('serviceName')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    if (this.imgChanged && this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.companyService.updateId(this.adId, formData).subscribe(
      () => {
        this.notification.success('Success', 'Ad updated successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads');
      },
      (error) => {
        this.notification.error('Error', error.error || 'Failed to update ad.', { nzDuration: 5000 });
      }
    );
  }
}