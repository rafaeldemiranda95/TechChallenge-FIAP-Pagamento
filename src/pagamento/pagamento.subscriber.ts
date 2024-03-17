// src/pagamento/pagamento.subscriber.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { PagamentoService } from './pagamento.service';

@Injectable()
export class PagamentoSubscriber implements OnModuleInit {
    private pubSubClient = new PubSub();

    constructor(private readonly pagamentoService: PagamentoService) { }

    onModuleInit() {
        this.listenForPedidoCriadoMessages();
    }

    private listenForPedidoCriadoMessages() {
        const subscriptionName = process.env.SUBSCRIPTION_NAME;
        const subscription = this.pubSubClient.subscription(subscriptionName);

        subscription.on('message', message => {
            console.log('Recebida mensagem:', message.data.toString());
            const pedidoData = JSON.parse(message.data.toString());

            message.ack();
        });

        subscription.on('error', error => {
            console.error('Erro ao receber mensagem:', error);
        });
    }
}
