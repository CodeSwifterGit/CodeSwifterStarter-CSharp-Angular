import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { ToastMessageComponent } from './toast-message.component';

describe('ToastMessageComponent', () => {
  let component: ToastMessageComponent;
  let fixture: ComponentFixture<ToastMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} }
      ],
      imports: [ 
        MatSnackBarModule
      ],
      declarations: [ ToastMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
