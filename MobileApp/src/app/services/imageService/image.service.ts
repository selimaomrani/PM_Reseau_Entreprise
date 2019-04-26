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
    return this.http.post("http://localhost:3000/photoApi/uploadImage", data);
  }
}
