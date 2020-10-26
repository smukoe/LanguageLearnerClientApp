import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JapaneseWordFormModalComponent } from './japanese-word-form-modal.component';

describe('JapaneseWordFormModalComponent', () => {
  let component: JapaneseWordFormModalComponent;
  let fixture: ComponentFixture<JapaneseWordFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JapaneseWordFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JapaneseWordFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
