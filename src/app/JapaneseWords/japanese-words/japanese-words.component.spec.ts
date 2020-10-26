import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JapaneseWordsComponent } from './japanese-words.component';

describe('JapaneseWordsComponent', () => {
  let component: JapaneseWordsComponent;
  let fixture: ComponentFixture<JapaneseWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JapaneseWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JapaneseWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
