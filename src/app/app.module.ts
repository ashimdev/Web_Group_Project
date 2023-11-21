// Angular Imports
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Prime NG Imports
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ListboxModule } from 'primeng/listbox';
// Component Declarations
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

// Helpers
import { UrlSanitizerPipe } from './url-sanitizer.pipe';
import { AuthInterceptor } from './app-interceptors/auth-interceptor';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPlaylistPageComponent } from './video-playlist-page/video-playlist-page.component';
import { VideoListPageComponent } from './video-list-page/video-list-page.component';
import { UserListPageComponent } from './user-list-page/user-list-page.component';
import { VideoEditPageComponent } from './video-edit-page/video-edit-page.component';
import { VideoPlaylistEditPageComponent } from './video-playlist-edit-page/video-playlist-edit-page.component';
import { UserEditPageComponent } from './user-edit-page/user-edit-page.component';
import { LearningVideosComponent } from './learning-videos/learning-videos.component';
import { LearningVideoItemsComponent } from './learning-video-items/learning-video-items.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [
        AppComponent,
        AppTopbarComponent,
        NotfoundComponent,
        HomeComponent,
        AboutMeComponent,
        ContactComponent,
        UrlSanitizerPipe,
        LoginComponent,
        VideoPlayerComponent,
        VideoPlaylistPageComponent,
        VideoListPageComponent,
        UserListPageComponent,
        VideoEditPageComponent,
        VideoPlaylistEditPageComponent,
        UserEditPageComponent,
        LearningVideosComponent,
        LearningVideoItemsComponent,
        SignUpComponent
    ],
    imports: [
        // Angular Imports
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,

        // Prime NG Imports
        DividerModule,
        StyleClassModule,
        PanelModule,
        ButtonModule,
        ImageModule,
        CardModule,
        InputTextModule,
        InputMaskModule,
        InputTextareaModule,
        TooltipModule,
        TableModule,
        ToastModule,
        ConfirmPopupModule,
        PasswordModule,
        DropdownModule,
        MenuModule,
        ConfirmDialogModule,
        ListboxModule
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, 
        MessageService, 
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
