import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteRestaurantService } from './favorite-restaurant.service';

describe('FavoriteRestaurantService', () => {
  let service: FavoriteRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteRestaurantService],
    }).compile();

    service = module.get<FavoriteRestaurantService>(FavoriteRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
