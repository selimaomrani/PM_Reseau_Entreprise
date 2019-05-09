import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { AuthService } from "../services/AuthService/auth.service";
import { ImageService } from "../services/imageService/image.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  loginStatus;
  msg;
  imageStatus;
  constructor(
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit() {}

  loginUser() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.LoginUser(user).subscribe(data => {
      this.msg = this.loginStatus;
      this.loginStatus = data["message"];
      if (data["succes"]) {
        this.msg = this.loginStatus + " wait a moment please";
        localStorage.setItem("productId", data["productId"]);
        const user = {
          productId: localStorage.getItem("productId")
        };
        this.imageService.refresh(user).subscribe(data => {
          this.imageStatus = data["message"];
          if (data["succes"]) {
            setTimeout(() => {
              //this.ngOnInit();
              this.router.navigate(["test"]);
            }, 8000);
          }
        });
      }
    });
  }
  register() {
    this.router.navigate(["register"]);
  }
}
