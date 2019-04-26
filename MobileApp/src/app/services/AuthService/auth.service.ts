import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  RegisterUser(user) {
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function(key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post("http://localhost:3000/auth/register", httpParams, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  LoginUser(user) {
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function(key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post("http://localhost:3000/auth/login", httpParams, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }
}
