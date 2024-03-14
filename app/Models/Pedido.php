<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = ['id', 'status', 'idCliente'];

    public $timestamps = true;

    // Relacionamento Pedido->Pagamento (um para muitos)
    public function pagamentos()
    {
        return $this->hasMany(Pagamento::class, 'idPedido');
    }
}
