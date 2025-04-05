import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-all-ads',
  standalone: false,
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss'
})

export class AllAdsComponent {

  ads:any;
  constructor(private companyServices:CompanyService,
    private notification:NzNotificationService
  ){}
  
    ngOnInit()
    {
      this.getAllAdsByuserId();
    }
    getAllAdsByuserId(){
      this.companyServices.getAllAdsByUserId().subscribe(res=>{
        this.ads=res;})
      }


  updateImg(img: any){
    return 'data:image/jpeg;base64,'+img;
  }

deleteAd(adId:any){
  this.companyServices.deleteAd(adId).subscribe(res=>{
this.notification.success('SUCCESS',`AD Deleted Successfully`,{nzDuration:5000});
this.getAllAdsByuserId();
  })
}

 }
  