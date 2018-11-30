import { TestBed, inject } from '@angular/core/testing';

import { DishServiceService } from './dish-service.service';

describe('DishServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DishServiceService]
    });
  });

  it('should be created', inject([DishServiceService], (service: DishServiceService) => {
    expect(service).toBeTruthy();
  }));
});
