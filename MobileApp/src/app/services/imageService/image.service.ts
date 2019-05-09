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
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadCapture(data) {
    return this.http.post(
      "http://192.168.43.92:3000/photoApi/uploadImage",
      data
    );
  }

  refresh(user) {
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function(key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post("http://192.168.43.92:3000/com/setvar", httpParams, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }
}
