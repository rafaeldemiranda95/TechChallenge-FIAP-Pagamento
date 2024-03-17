/* eslint-disable prettier/prettier */
import { Pedido } from 'src/pedido/pedido.entity/pedido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor: number;

  @Column()
  tipo: string;

  @Column()
  status: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.pagamentos)
  pedido: Pedido;
}
