import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "../app.service";

@Component({
  selector: "app-add-member",
  templateUrl: "./add-member.component.html",
  styleUrls: ["./add-member.component.css"]
})
export class AddMemberComponent implements OnInit {
  title = "Add Member";
  success = false;
  angForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    jobTitle: new FormControl(),
    status: new FormControl(),
    team: new FormControl()
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      jobTitle: ["", Validators.required],
      status: ["", Validators.required],
      team: ["", Validators.required]
    });
  }
  addMember(firstName, lastName, jobTitle, status, team) {
    let id = Math.floor(Math.random() * 100 + 1);
    this.appService
      .addMember({
        id,
        firstName,
        lastName,
        jobTitle,
        status,
        team
      })
      .then(success => {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(["members"]);
        }, 3000);
      })
      .then(error => {
        console.log(error);
      });
  }
  ngOnInit() {}
}
