<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagamento extends Model
{
    use HasFactory;

    protected $table = 'pagamentos';

    protected $fillable = ['status', 'tipoPagamento', 'valorPagamento', 'idPedido'];

    public $timestamps = true;

    // Relacionamento Pagamento->Pedido (muitos para um)
    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'idPedido');
    }
}
