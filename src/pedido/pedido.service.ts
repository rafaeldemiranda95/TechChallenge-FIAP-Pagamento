/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Pedido } from './pedido.entity/pedido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePedidoDto } from './pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepository.create(createPedidoDto);
    return this.pedidoRepository.save(pedido);
  }

  async findOne(id: number): Promise<Pedido | undefined> {
    return this.pedidoRepository.findOne({ where: { id } });
  }
}
