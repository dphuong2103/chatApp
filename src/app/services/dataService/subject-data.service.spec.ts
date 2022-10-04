import { TestBed } from '@angular/core/testing';

import { SubjectDataService } from './subject-data.service';

describe('SubjectDataService', () => {
  let service: SubjectDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
