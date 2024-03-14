<?php

namespace App\Http\Controllers;

use App\Service\PagamentoService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PagamentoController extends Controller
{
    protected $pagamentoService;
    public function __construct(PagamentoService $pagamentoService)
    {
        $this->pagamentoService = $pagamentoService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate(
                [
                    'valorPagamento' => 'required|numeric',
                    'tipoPagamento' => 'required|string|in:credito,debito,pix,dinheiro',
                    'idPedido' => 'required|integer',
                    'idCliente' => 'required|integer',
                    'statusPedido' => 'required|string',
                ],
                [
                    'valorPagamento.required' => 'O campo valorPagamento é obrigatório.',
                    'valorPagamento.numeric' => 'O campo valorPagamento deve ser numérico.',
                    'tipoPagamento.required' => 'O campo tipoPagamento é obrigatório.',
                    'tipoPagamento.string' => 'O campo tipoPagamento deve ser um texto.',
                    'tipoPagamento.in' => 'O tipo de pagamento selecionado é inválido. As opções válidas são: crédito, débito, pix, dinheiro.',
                    'idPedido.required' => 'O campo idPedido é obrigatório.',
                    'idPedido.integer' => 'O campo idPedido deve ser um número inteiro.',
                    'idCliente.required' => 'O campo idCliente é obrigatório.',
                    'idCliente.integer' => 'O campo idCliente deve ser um número inteiro.',
                    'statusPedido.required' => 'O campo statusPedido é obrigatório.',
                    'statusPedido.string' => 'O campo statusPedido deve ser um texto.',
                ]
            );

            $pagamento =  $this->pagamentoService->salvarPagamento($validatedData);

            return response()->json(['success' => 'Pagamento realizado com sucesso.', 'data' => $pagamento], 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $pagamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $pagamento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $pagamento)
    {
        //
    }
}
