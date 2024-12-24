import { Test, TestingModule } from '@nestjs/testing';
import { PastOrdersController } from './past-orders.controller';

describe('PastOrdersController', () => {
  let controller: PastOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PastOrdersController],
    }).compile();

    controller = module.get<PastOrdersController>(PastOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
