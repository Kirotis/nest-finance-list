import { Test, TestingModule } from '@nestjs/testing';
import { LogRepositoryService } from './log-repository.service';

describe('LogRepositoryService', () => {
  let service: LogRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogRepositoryService],
    }).compile();

    service = module.get<LogRepositoryService>(LogRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
