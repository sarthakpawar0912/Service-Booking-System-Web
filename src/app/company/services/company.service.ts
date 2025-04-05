import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  postAd(adDTO:any):Observable<any>{
  const userId=UserStorageService.getUserId();
  return this.http.post(BASIC_URL+`api/company/ad/${userId}`,adDTO,{
   headers:this.createAuthorizationHeader()
  }) 
  }

  getAllAdsByUserId():Observable<any>{
    const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`api/company/ads/${userId}`,{
     headers:this.createAuthorizationHeader()
    }) 
    }

    getAdById(adId:any): Observable<any>{
      return this.http.get(BASIC_URL+`api/company/ad/${adId}`,{
        headers : this.createAuthorizationHeader()
      });
    }

    updateId(adId:any,adDTO:any):Observable<any>{
      return this.http.put(BASIC_URL+`api/company/ad/${adId}`,adDTO,{
        headers : this.createAuthorizationHeader()
      });
    }

    deleteAd(adId:any):Observable<any>{
      return this.http.delete(BASIC_URL+`api/company/ad/${adId}`,{
        headers : this.createAuthorizationHeader()
      });
    }
    
    getAllAdBookings(): Observable<any> {
      const companyId = UserStorageService.getUserId();
      return this.http.get(`${BASIC_URL}api/company/bookings/${companyId}`, {
        headers: this.createAuthorizationHeader()
      });
    }
  
    changeBookingStatus(bookingId: number, status: string): Observable<any> {
      console.log('Requesting:', `${BASIC_URL}api/company/bookings/${bookingId}/${status}`); // Debug
      return this.http.get(`${BASIC_URL}api/company/bookings/${bookingId}/${status}`, {
        headers: this.createAuthorizationHeader()
      });
    }
 
  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders:HttpHeaders=new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer '+UserStorageService.getToken()
    )
  }
  
}