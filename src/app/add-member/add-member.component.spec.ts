import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddMemberComponent } from "./add-member.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

describe("AddMemberComponent", () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMemberComponent],
      imports: [HttpClientModule, RouterModule, ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
