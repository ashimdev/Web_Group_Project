import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {

    private _user: User | undefined | null;

	constructor(private http: HttpClient) { }

	public Login(user: User) {
		return this.http.post<User>(`${environment.apiURL}/login`, user)
        .pipe(
            tap((user: User) => this._user = user)
        );
	}

	public GetAccessToken(): string | undefined{
		return this._user?.token;
	}

	public Logout() {
		this._user = null;
	}
}
