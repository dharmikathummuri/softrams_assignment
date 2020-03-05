import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AppService } from "../app.service";
@Component({
  selector: "app-edit-member",
  templateUrl: "./edit-member.component.html",
  styleUrls: ["./edit-member.component.css"]
})
export class EditMemberComponent implements OnInit {
  title = "Add Member";
  success = false;
  angForm: FormGroup;
  id = "";
  formdata = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private route: ActivatedRoute
  ) {}
  createForm(formData) {
    this.angForm = this.fb.group({
      firstName: [formData.firstName, Validators.required],
      lastName: [formData.lastName, Validators.required],
      jobTitle: [formData.jobTitle, Validators.required],
      status: [formData.status, Validators.required],
      team: [formData.team, Validators.required]
    });
  }
  editMember(id, firstName, lastName, jobTitle, status, team) {
    this.appService
      .editmember({
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
      });
  }
  ngOnInit() {
    this.route.params.subscribe(params => (this.id = params.id));
    this.appService.getMemberById(this.id).subscribe(data => {
      this.formdata = data;
      this.createForm(this.formdata);
    });
  }
}
