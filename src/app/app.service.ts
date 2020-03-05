import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

const ParseHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: "root"
})
export class AppService {
  api = "http://localhost:8000/api";
  username: string;

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  async addMember(memberForm) {
    return this.http
      .post(`${this.api}/addMember`, { memberForm }, ParseHeaders)
      .pipe(catchError(this.handleError))
      .subscribe(data => {
        return data;
      });
  }
  //return member by id
  getMemberById(id) {
    return this.http
      .get(`${this.api}/getMember/${id}`)
      .pipe(catchError(this.handleError));
  }
  async editmember(memberForm) {
    return this.http
      .put(
        `${this.api}/editMember/${memberForm.id}`,
        { memberForm },
        ParseHeaders
      )
      .subscribe(data => {
        return data;
      });
  }
  deleteMemberById(id) {
    return this.http
      .delete(`${this.api}/deleteMember/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTeams() {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
