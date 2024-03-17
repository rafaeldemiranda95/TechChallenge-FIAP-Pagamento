import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.entity/pagamento.entity';
import { Pedido } from 'src/pedido/pedido.entity/pedido.entity';
import { PedidoService } from 'src/pedido/pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Pedido])], // Importa o TypeOrmModule com a entidade Produto
  providers: [PagamentoService, PedidoService],
  controllers: [PagamentoController],
})
export class PagamentoModule {}
