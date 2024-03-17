/* eslint-disable prettier/prettier */
export class CreatePedidoDto {
  id: number;
  status: string;
  idCliente: number;
}

export class UpdatePedidoDto {
  id?: number;
  status?: string;
  idCliente?: number;
}
