import { TestBed } from '@angular/core/testing';

import { BlogsAndUserService } from './blogs-and-user.service';

describe('BlogsAndUserService', () => {
  let service: BlogsAndUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsAndUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
