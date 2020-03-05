import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { EditMemberComponent } from "./edit-member.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";

describe("EditMemberComponent", () => {
  let component: EditMemberComponent;
  let fixture: ComponentFixture<EditMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditMemberComponent],
      imports: [
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: [Router, ActivatedRoute],
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
