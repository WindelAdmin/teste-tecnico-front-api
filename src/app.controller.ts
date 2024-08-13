import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async hello() {
    return 'Olá, seja bem vindo a API de receitas!';
  }
}
