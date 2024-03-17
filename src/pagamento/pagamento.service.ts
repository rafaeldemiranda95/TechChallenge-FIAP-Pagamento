/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.entity/pagamento.entity';
import { Repository } from 'typeorm';
import { CreatePagamentoDto } from './pagamento.dto';
import { PedidoService } from 'src/pedido/pedido.service';
import { CreatePedidoDto } from 'src/pedido/pedido.dto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    private readonly pedidoService: PedidoService,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const createPedidoDto =
      this.transformarParaCreatePedidoDto(createPagamentoDto);
    await this.pedidoService.create(createPedidoDto);
    // Buscar o pedido associado
    const pedido = await this.pedidoService.findOne(
      createPagamentoDto.idPedido,
    );
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }

    // Criar o pagamento já associando o pedido
    const pagamento = this.pagamentoRepository.create({
      ...createPagamentoDto,
      pedido, // Aqui associamos o pedido ao pagamento
    });

    return this.pagamentoRepository.save(pagamento);
  }

  private transformarParaCreatePedidoDto(
    createPagamentoDto: CreatePagamentoDto,
  ): CreatePedidoDto {
    const { idPedido: id, status, idCliente } = createPagamentoDto;

    return { id, status, idCliente };
  }
}
