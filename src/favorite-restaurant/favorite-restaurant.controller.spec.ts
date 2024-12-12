import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteRestaurantController } from './favorite-restaurant.controller';

describe('FavoriteRestaurantController', () => {
  let controller: FavoriteRestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteRestaurantController],
    }).compile();

    controller = module.get<FavoriteRestaurantController>(FavoriteRestaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
