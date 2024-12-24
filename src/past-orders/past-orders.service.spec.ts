import { Test, TestingModule } from '@nestjs/testing';
import { PastOrdersService } from './past-orders.service';

describe('PastOrdersService', () => {
  let service: PastOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PastOrdersService],
    }).compile();

    service = module.get<PastOrdersService>(PastOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
