<?php

namespace App\Repository;

use App\Models\Pedido;

class PedidoRepository
{
    public function salvarPedido(Pedido $request)
    {
        $pedido = Pedido::firstOrCreate([
            'id' => $request['id'],
            'status' => $request['status'],
            'idCliente' => $request['idCliente'],
        ]);
        return $pedido;
    }
}
