import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';


const BASIC_URL="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllAds(): Observable<any>{
    return this.http.get(BASIC_URL+`api/client/ads`,{
      headers : this.createAuthorizationHeader()
    });
  }


  searchAdByName(name: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/search/${encodeURIComponent(name)}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  getAdDetailsByAdId(adId:any): Observable<any>{
    return this.http.get(BASIC_URL+`api/client/ad/${adId}`,{
      headers : this.createAuthorizationHeader()
    });
  }

  bookService(bookDTO: any): Observable<any> {
    console.log('Sending booking request with DTO:', bookDTO); // Log the payload
    return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyBookings(): Observable<any>{
    const userId=UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`api/client/my-bookings/${userId}`,{
      headers : this.createAuthorizationHeader()
    });
  }
  giveReview(reviewDTO: any): Observable<any> {
    // Ensure all required fields are present and valid
    if (!reviewDTO.userId || !reviewDTO.bookId || isNaN(reviewDTO.bookId)) {
        return throwError(() => new Error('Invalid booking data. Please try again.'));
    }

    // Convert all numbers to ensure proper type
    const payload = {
        ...reviewDTO,
        rating: Math.round(Number(reviewDTO.rating)),
        userId: Number(reviewDTO.userId),
        bookId: Number(reviewDTO.bookId)
    };

    // Validate rating range
    if (payload.rating < 1 || payload.rating > 5) {
        return throwError(() => new Error('Rating must be between 1 and 5'));
    }

    return this.http.post(BASIC_URL + `api/client/review`, payload, {
        headers: this.createAuthorizationHeader()
    }).pipe(
        catchError(error => {
            console.error('API Error:', error);
            // Extract server error message if available
            const serverError = error.error?.message || error.error?.error;
            return throwError(() => new Error(serverError || 'Failed to submit review'));
        })
    );
}

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders:HttpHeaders=new  HttpHeaders();
      return authHeaders.set(
        'Authorization',
        'Bearer '+UserStorageService.getToken()
      )
  }
}
