import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Bienvenue sur l’API d’Asso – le futur développeur retenu pour le poste"', () => {
      expect(appController.getHello()).toBe(
        'Bienvenue sur l’API d’Asso – le futur développeur retenu pour le poste',
      );
    });
  });
});
