import { Injectable, Inject } from '@nestjs/common';

//import { ConfigService } from '@nestjs/config';
//importamos el ConfigType para manejar una configuracion tipada
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],

    //private configService: ConfigService,

    //Inyectamos Config
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    //console.log(this.tasks);
    //traemos dinamicamente nuestro API_KEY y DATABASE_NAME
    //const apiUrl = this.configService.get('API_KEY');

    //llamamos al api key con tipado seguro
    const apiUrl = this.configService.apiKey;

    //const databaseName = this.configService.get('DATABASE_NAME');

    //llamamos al nombre de la BD con tipado seguro
    const databaseName = this.configService.database.name;
    const databasePort = this.configService.database.port;
    return `Hello World! ${apiUrl} ${databaseName} ${databasePort}`;
  }
}
