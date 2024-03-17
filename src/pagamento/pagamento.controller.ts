/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './pagamento.dto';
import { Pagamento } from './pagamento.entity/pagamento.entity';

@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  async create(
    @Body() createPedidoDto: CreatePagamentoDto,
  ): Promise<Pagamento> {
    return this.pagamentoService.create(createPedidoDto);
  }
}
