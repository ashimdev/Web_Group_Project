import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './app-guards/auth.guard';
import { VideoPlaylistPageComponent } from './video-playlist-page/video-playlist-page.component';
import { VideoListPageComponent } from './video-list-page/video-list-page.component';
import { UserListPageComponent } from './user-list-page/user-list-page.component';
import { VideoEditPageComponent } from './video-edit-page/video-edit-page.component';
import { VideoPlaylistEditPageComponent } from './video-playlist-edit-page/video-playlist-edit-page.component';
import { UserEditPageComponent } from './user-edit-page/user-edit-page.component';
import { LearningVideosComponent } from './learning-videos/learning-videos.component';
import { LearningVideoItemsComponent } from './learning-video-items/learning-video-items.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: 'aboutMe', component: AboutMeComponent },
            { path: 'contact', component: ContactComponent },
            {
                path: 'learningVideos',
                children: [
                    { path: '', component: LearningVideosComponent },
                    { path: ':videoPlaylistID', component: LearningVideoItemsComponent }
                ]
            },
            {
                path: 'setting', canActivate: [AuthGuard],
                children: [
                    {
                        path: 'video',
                        children: [
                            { path: '', component: VideoListPageComponent }
                        ]
                    },
                    {
                        path: 'videoPlaylist',
                        children: [
                            { path: '', component: VideoPlaylistPageComponent },
                            { path: 'create', component: VideoPlaylistEditPageComponent },
                            {
                                path: ':videoPlaylistID/uploadVideo', component: VideoEditPageComponent
                            }
                        ]
                    },
                    {
                        path: 'user',
                        children: [
                            { path: '', component: UserListPageComponent },
                            { path: 'create', component: UserEditPageComponent }
                        ]
                    }
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
