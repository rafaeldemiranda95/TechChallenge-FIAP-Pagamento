/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PedidoModule } from './pedido/pedido.module';
import { Pagamento } from './pagamento/pagamento.entity/pagamento.entity';
import { Pedido } from './pedido/pedido.entity/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'pagamento',
      autoLoadEntities: true,
      synchronize: true, // Use apenas em desenvolvimento
      entities: [Pagamento, Pedido],
    }),
    PagamentoModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
