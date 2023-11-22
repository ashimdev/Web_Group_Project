import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  constructor(private http: HttpClient) { }

  // Method to upload a video using the signed URL
  public uploadVideoUsingSignedURL(signedURL: string, videoFile: any): Observable<any> {
    const headers = {
      'Content-Type': videoFile.type
    };

    return this.http.put(signedURL, videoFile, { headers: headers });
  }
}
