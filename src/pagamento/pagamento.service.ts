/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagamento } from './pagamento.entity/pagamento.entity';
import { Repository } from 'typeorm';
import { CreatePagamentoDto } from './pagamento.dto';
import { PedidoService } from 'src/pedido/pedido.service';
import { CreatePedidoDto } from 'src/pedido/pedido.dto';
import { PubSub } from '@google-cloud/pubsub';

@Injectable()
export class PagamentoService implements OnModuleInit {
  private pubSubClient: PubSub;
  private subscriptionName = process.env.SUBSCRIPTION_PEDIDO_REALIZADO || 'subscription-pedido-realizado';

  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    private readonly pedidoService: PedidoService,
  ) {
    this.pubSubClient = new PubSub({
        // opcional: especificar credenciais aqui
        // keyFilename: 'path/to/your/credentials-file.json',
    });
  }

  async onModuleInit() {
    this.listenForPagamentoEnviadoMessages();
  }

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const createPedidoDto =
      this.transformarParaCreatePedidoDto(createPagamentoDto);
    await this.pedidoService.create(createPedidoDto);
    // Buscar o pedido associado
    const pedido = await this.pedidoService.findOne(
      createPagamentoDto.idPedido,
    );
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }

    // Criar o pagamento já associando o pedido
    const pagamento = this.pagamentoRepository.create({
      ...createPagamentoDto,
      pedido, // Aqui associamos o pedido ao pagamento
    });

    const savedPagamento = await this.pagamentoRepository.save(pagamento)

    // Enviar mensagem para o tópico do Pub/Sub
    await this.publishPagamentoAprovado(savedPagamento);

    return savedPagamento;
  }

  private transformarParaCreatePedidoDto(
    createPagamentoDto: CreatePagamentoDto,
  ): CreatePedidoDto {
    const { idPedido: id, status, idCliente } = createPagamentoDto;

    return { id, status, idCliente };
  }

  private async publishPagamentoAprovado(pagamento: Pagamento) {
    const topicName = process.env.TOPIC_APPROVED_PAYMENT; // Assegure-se de que esta variável de ambiente está configurada
    const dataBuffer = Buffer.from(JSON.stringify(pagamento));

    try {
      const messageId = await this.pubSubClient.topic(topicName).publishMessage({
        data: dataBuffer,
    });
      console.log(`Mensagem ${messageId} publicada para o tópico ${topicName}`);
    } catch (error) {
      console.error(`Erro ao publicar mensagem: ${error.message}`);
    }
  }

  private async publishPagamentoNaoAutorizado(CreatePedidoDto: CreatePedidoDto) {
    const topicName = process.env.TOPIC_PAYMENT_FAILED; // Assegure-se de que esta variável de ambiente está configurada
    const dataBuffer = Buffer.from(JSON.stringify(CreatePedidoDto));

    try {
      const messageId = await this.pubSubClient.topic(topicName).publishMessage({
        data: dataBuffer,
    });
      console.log(`Mensagem ${messageId} publicada para o tópico ${topicName}`);
    } catch (error) {
      console.error(`Erro ao publicar mensagem: ${error.message}`);
    }
  }

  private listenForPagamentoEnviadoMessages() {
    const subscription = this.pubSubClient.subscription(this.subscriptionName);

    subscription.on('message', async message => {
      console.log('Recebida mensagem:', message.data.toString());
      const createPagamentoData: CreatePagamentoDto = JSON.parse(message.data.toString());

      await this.create(createPagamentoData);
      message.ack();
    });

    subscription.on('error', error => {
      console.error('Erro ao receber mensagem:', error);
    });
  }
}
