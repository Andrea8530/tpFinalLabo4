import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicsComponent } from './add-medics.component';

describe('AddMedicsComponent', () => {
  let component: AddMedicsComponent;
  let fixture: ComponentFixture<AddMedicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMedicsComponent]
    });
    fixture = TestBed.createComponent(AddMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
