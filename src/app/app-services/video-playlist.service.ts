// app-services/video-playlist.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoPlaylist } from '../interfaces/video-playlsit.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoPlaylistService {
  private apiUrl = 'https://5bx253evpk.execute-api.us-east-1.amazonaws.com/dev/videoPlaylist';

  constructor(private http: HttpClient) { }

  getVideoPlaylists(): Observable<VideoPlaylist[]> {
    return this.http.get<VideoPlaylist[]>(this.apiUrl);
  }

  createVideoPlaylist(videoPlaylist: VideoPlaylist): Observable<VideoPlaylist> {
    return this.http.post<VideoPlaylist>(this.apiUrl, videoPlaylist);
  }

  updateVideoPlaylist(videoPlaylistID: string, videoPlaylist: VideoPlaylist): Observable<VideoPlaylist> {
    const url = `${this.apiUrl}/${encodeURIComponent(videoPlaylistID)}`;
    return this.http.put<VideoPlaylist>(url, videoPlaylist);
  }

  deleteVideoPlaylist(videoPlaylistID: string): Observable<void> {
    const url = `${this.apiUrl}/${encodeURIComponent(videoPlaylistID)}`;
    return this.http.delete<void>(url);
  }
}
