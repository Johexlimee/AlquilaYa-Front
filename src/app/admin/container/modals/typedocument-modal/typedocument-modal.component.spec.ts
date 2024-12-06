import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedocumentModalComponent } from './typedocument-modal.component';

describe('TypedocumentModalComponent', () => {
  let component: TypedocumentModalComponent;
  let fixture: ComponentFixture<TypedocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypedocumentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypedocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
