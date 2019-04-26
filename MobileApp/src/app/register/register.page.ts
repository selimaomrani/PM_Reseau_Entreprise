import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../services/AuthService/auth.service";
import { Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  username: string = "";
  password: string = "";
  cpassword: string = "";
  loginstatus;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  registerUser() {
    const user = {
      username: this.username,
      password: this.password,
      passwordconf: this.cpassword
    };

    this.authService.RegisterUser(user).subscribe(data => {
      this.loginstatus = data["message"];
      if (data["succes"]) {
        this.router.navigate(["login"]);
      }
    });
  }
}
