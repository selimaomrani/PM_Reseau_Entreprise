import { Component, OnInit } from "@angular/core";
import { ImageService } from "../services/imageService/image.service";
@Component({
  selector: "app-testing",
  templateUrl: "./testing.component.html",
  styleUrls: ["./testing.component.scss"]
})
export class TestingComponent implements OnInit {
  src =
    "http://192.168.43.92:3000/uploads/capture" +
    localStorage.getItem("productId") +
    ".JPEG";
  refreshStatus;
  constructor(private imageService: ImageService) {}

  ngOnInit() {}

  onFileSelected(event) {
    const Img = <File>event.target.files[0];
    const fd = new FormData();

    if (Img != null) {
      const userId = localStorage.getItem("userId");

      fd.append(
        "capture",
        Img,
        userId + "." + event.target.files[0].name.split(".").pop()
      );
      fd.append("userId", userId);
      this.imageService.uploadCapture(fd).subscribe(data => {
        console.log(data);
        if (data["succes"]) {
          window.location.reload();
        }
      });
    }
  }

  refresh() {
    const user = {
      productId: localStorage.getItem("productId")
    };
    this.imageService.refresh(user).subscribe(data => {
      this.refreshStatus = data["message"];
      if (data["succes"]) {
        setTimeout(() => {
          //this.ngOnInit();
          window.location.reload();
        }, 8000);
      }
    });
  }
}
