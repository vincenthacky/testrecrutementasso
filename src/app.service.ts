import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenue sur l’API d’Asso – le futur développeur retenu pour le poste';
  }
}
