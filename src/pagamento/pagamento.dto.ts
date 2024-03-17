/* eslint-disable prettier/prettier */
export class CreatePagamentoDto {
  readonly valor: number;
  readonly tipo: string;
  readonly status: string;
  readonly idPedido: number;
  readonly idCliente: number;
}

export class UpdatePagamentoDto {
  readonly valor?: number;
  readonly tipo?: string;
  readonly status?: string;
  readonly idPedido?: number;
  readonly idCliente?: number;
}
