import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';

//importamos nuestro archivo de configuracion
import config from './config';

//importamos JOI
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      //de acuerdo a la variable de entorno en el package.json cargará el archivo de entorno indicado
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      //cargamos nuestra configuracion
      load: [config],
      //indicamos que el ConfigModule estará disponible para todos los modulos y servicios en la app
      isGlobal: true,
      //indicamos que vamos hacer una validacion de esquema
      validationSchema: Joi.object({
        //indicamos lo que queremos validar, la app funcionara solo si se pasan las propiedades especificadas
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
