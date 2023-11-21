import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CognitoService } from './app-services/cognito.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private cognitoService: CognitoService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
