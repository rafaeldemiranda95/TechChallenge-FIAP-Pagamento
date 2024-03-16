<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PublishPubSubMessage extends Command
{
    // Topicos
    // techchallenge-fiap-producao
    // techchallenge-fiap-pagamento
    // techchallenge-fiap-pedido
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:publish-pub-sub-message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
