import { Test, TestingModule } from '@nestjs/testing';
import { PlanRepositoryService } from './plan-repository.service';

describe('PlanRepositoryService', () => {
  let service: PlanRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanRepositoryService],
    }).compile();

    service = module.get<PlanRepositoryService>(PlanRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
