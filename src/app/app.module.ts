import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";

import { AppService } from "./app.service";

import { AppComponent } from "./app.component";
import { BannerComponent } from "./banner/banner.component";
import { MemberDetailsComponent } from "./member-details/member-details.component";
import { MembersComponent } from "./members/members.component";
import { LoginComponent } from "./login/login.component";
import { AddMemberComponent } from "./add-member/add-member.component";
import { EditMemberComponent } from "./edit-member/edit-member.component";

// We may be missing a route...
const ROUTES = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "members",
    component: MembersComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "addMember",
    component: AddMemberComponent
  },
  {
    path: "editMember/:id",
    component: EditMemberComponent
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    MemberDetailsComponent,
    MembersComponent,
    LoginComponent,
    AddMemberComponent,
    EditMemberComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
