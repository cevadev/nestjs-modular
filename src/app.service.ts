import { Injectable, Inject } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private configService: ConfigService,
  ) {}
  getHello(): string {
    //console.log(this.tasks);
    //traemos dinamicamente nuestro API_KEY y DATABASE_NAME
    const apiUrl = this.configService.get('API_KEY');
    const databaseName = this.configService.get('DATABASE_NAME');
    return `Hello World! ${apiUrl} ${databaseName}`;
  }
}
