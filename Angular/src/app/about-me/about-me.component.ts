import { Component } from '@angular/core';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {

    public get DescriptionText(): string {
        return `Our video learning platform offers a wide range of expert-led courses, accessible anytime, anywhere. With engaging video content and interactive features, learning becomes enjoyable and effective. Progress tracking and personalized recommendations cater to your individual needs, empowering you to achieve your educational goals. Embrace the future of education and start your learning journey with us today.`;
    }

    public get IntroText(): string {
        return `A complete learning platform.`;
    }

}
