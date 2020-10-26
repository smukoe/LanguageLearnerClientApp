import { TestBed } from '@angular/core/testing';

import { JapaneseWordService } from './japanese-word.service';

describe('JapaneseWordService', () => {
  let service: JapaneseWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JapaneseWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
