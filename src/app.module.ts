/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PedidoModule } from './pedido/pedido.module';
import { Pagamento } from './pagamento/pagamento.entity/pagamento.entity';
import { Pedido } from './pedido/pedido.entity/pedido.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // ou outro banco de dados
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'), // o operador '+' converte a string para número
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities:  [Pagamento, Pedido],
        // outras configurações necessárias...
      }),
    }),
    PagamentoModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
