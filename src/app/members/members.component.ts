import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.css"]
})
export class MembersComponent implements OnInit {
  members = [];
  newMember = {};
  constructor(
    public appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.newMember = {
        firstName: params["firstName"],
        lastName: params["lastName"],
        jobTitle: params["jobTitle"],
        team: params["team"],
        status: params["status"]
      };
    });
  }
  getMembers() {
    this.appService.getMembers().subscribe(member => {
      this.members = member;
    });
  }
  ngOnInit() {
    this.getMembers();
  }

  goToAddMemberForm() {
    this.router.navigate(["/addMember"]);
  }

  editMemberByID(id: number) {
    this.router.navigate(["editMember/" + id]);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMemberById(id).subscribe(() => {
      alert("successfully deleted member");
      this.getMembers();
    });
  }
}
