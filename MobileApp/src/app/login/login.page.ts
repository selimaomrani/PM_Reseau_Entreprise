import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AuthService } from "../services/AuthService/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  loginStatus;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  loginUser() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.LoginUser(user).subscribe(data => {
      this.loginStatus = data["message"];
      if (data["succes"]) {
        localStorage.setItem("userId", data["userId"]);
      }
    });
  }
}
