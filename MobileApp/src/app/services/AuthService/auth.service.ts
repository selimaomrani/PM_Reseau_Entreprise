import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams
} from "@angular/common/http";
//import { GlobalProvider } from "src/app/app.component";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {
    //console.log(this.provider.ipAdress);
  }

  RegisterUser(user) {
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function(key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post(
      "http://192.168.43.92:3000/auth/register",
      httpParams,
      {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      }
    );
  }

  LoginUser(user) {
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function(key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post("http://192.168.43.92:3000/auth/login", httpParams, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }
}
