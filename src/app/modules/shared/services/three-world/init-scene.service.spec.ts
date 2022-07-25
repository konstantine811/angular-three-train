import { TestBed } from '@angular/core/testing';

import { InitSceneService } from './init-scene.service';

describe('InitSceneService', () => {
  let service: InitSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
