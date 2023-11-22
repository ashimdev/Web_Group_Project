import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailUploadService {
  constructor(private http: HttpClient) { }

  uploadThumbnailUsingSignedURL(signedURL: string, thumbnailFile: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': thumbnailFile.type
    });

    return this.http.put(signedURL, thumbnailFile, { headers });
  }
}
