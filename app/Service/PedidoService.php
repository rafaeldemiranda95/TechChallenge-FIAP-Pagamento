<?php

namespace App\Service;

use App\Models\Pedido;
use App\Repository\PedidoRepository;

class PedidoService
{
    protected $pedidoRepository;
    public function __construct(PedidoRepository $pedidoRepository)
    {
        $this->pedidoRepository = $pedidoRepository;
    }
    public function salvarPedido($request)
    {
        $novoPedido = Pedido::make([
            'id' => $request['idPedido'],
            'status' => $request['statusPedido'],
            'idCliente' => $request['idCliente'],
        ]);
        $pedido = $this->pedidoRepository->salvarPedido($novoPedido);
        return $pedido;
    }
}
