<?php

namespace App\Repository;

use App\Models\Pagamento;

class PagamentoRepository
{
    public function salvarPagamento($request)
    {
        $pagamento = Pagamento::create([
            'tipoPagamento' => $request['tipoPagamento'],
            'idPedido' => $request['idPedido'],
            'valorPagamento' => $request['valorPagamento'],
            'status' => $request['status']
        ]);
        return $pagamento;
    }
    public function alterarStatusPagamento($request)
    {
        $pagamento = Pagamento::find($request['id'])->update(['status' => 'Pagamento aprovado']);
        return $pagamento;
    }
}
