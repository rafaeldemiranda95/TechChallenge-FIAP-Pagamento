/* eslint-disable prettier/prettier */

import { Pagamento } from 'src/pagamento/pagamento.entity/pagamento.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  idCliente: number;

  @OneToMany(() => Pagamento, (pagamento) => pagamento.pedido, {
    cascade: true, // permite operações em cascata
  })
  pagamentos: Pagamento[];
}
