<?php

namespace App\Service;

use App\Models\Pagamento;
use App\Models\Pedido;
use App\Repository\PagamentoRepository;

class PagamentoService
{
    protected $pagamentoRepository;
    protected $pedidoService;
    public function __construct(PagamentoRepository $pagamentoRepository, PedidoService $pedidoService)
    {
        $this->pagamentoRepository = $pagamentoRepository;
        $this->pedidoService = $pedidoService;
    }
    private function processarPagamento(Pagamento $request)
    {
        $request->status = "Pagamento aprovado";
        $pagamentoAtualizado  = $this->alterarStatusPagamento($request);
        return $pagamentoAtualizado;
    }
    public function salvarPagamento($request)
    {
        $pedido = $this->pedidoService->salvarPedido($request);
        if ($pedido) {
            $novoPagamento = Pagamento::make([
                'status' => "processando",
                'tipoPagamento' => $request['tipoPagamento'],
                'valorPagamento' => $request['valorPagamento'],
                'idPedido' => $pedido['id']
            ]);
            $pagamento = $this->pagamentoRepository->salvarPagamento($novoPagamento);
            $response = $this->processarPagamento($pagamento);
            return $pagamento;
        }
        return $pedido;
    }
    public function alterarStatusPagamento(Pagamento $request)
    {
        $pagamento = $this->pagamentoRepository->alterarStatusPagamento($request);
        return $pagamento;
    }
}
