# Pós Tech - Software Architecture

## TechChallenge

### TURMA 2SOAT

#### Grupo 21

349463 - Airton Patrocínio da Silva Junior  
349308 - Rafael de Miranda

### Links:

[Miro](https://miro.com/app/board/uXjVMGvVfHc=/)  
[Serviço Pedidos](https://github.com/rafaeldemiranda95/TechChallenge-FIAP-Pedido)  
[Serviço Pagamento](https://github.com/rafaeldemiranda95/TechChallenge-FIAP-Pagamento)  
[Serviço Produção](https://github.com/rafaeldemiranda95/TechChallenge-FIAP-Producao)

## DER

### Pedido
![DER Pedido](https://drive.google.com/uc?export=view&id=1VOiPoPBS4KlVW23kBxQvHUFMTQJipVcO)
### Pagamento
![DER Pagamento](https://drive.google.com/uc?export=view&id=1LgIFuB2nzXEp11W0HDIVZjNkvypaC26U)
### Produção
![DER Produção](https://drive.google.com/uc?export=view&id=1GDQLaGSrUdG3pPLw1DBA7dXA2wTbeYO5)

### API

| Endpoint                                            | Método | Parâmetros                                                                                     |
| --------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| `localhost:3000/pagamento`                          | POST   | `{"valor": number,"tipo": string,"status": string,"idPedido": number,"idCliente": number}`     |

## SAGA

### SAGA Coreografado

![Saga coreografada](https://drive.google.com/uc?export=view&id=1RhAyyuoNi-uWRiJ6XWubc3Mjw0hjqhRW)

### Justificativa

A escolha entre o padrão Saga Coreografado e o padrão Saga Orquestrado depende de várias considerações sobre a natureza do sistema, a equipe de desenvolvimento, as preferências arquiteturais e as metas de escalabilidade e manutenção. Para o sistema de pedidos de uma lanchonete que envolve micro serviços de pedidos, pagamentos e produção, a opção pelo padrão Saga Coreografado pode ser justificada pelos seguintes motivos:

1. **Desacoplamento**  
   **Justificativa:** O padrão coreografado promove um alto nível de desacoplamento entre os serviços, uma vez que não depende de um coordenador central para gerenciar as transações. Cada serviço é autônomo, responsável por publicar e consumir eventos independentemente. Isso é particularmente vantajoso em um ambiente onde os serviços têm responsabilidades claramente definidas, como montar pedidos, processar pagamentos e gerenciar a produção.
2. **Flexibilidade e Evolutividade**  
   **Justificativa:** À medida que o sistema evolui, novos serviços podem ser facilmente integrados à saga coreografada simplesmente assinando os eventos existentes ou emitindo novos. Isso facilita a adição de novos recursos, como serviços de notificação ou logística, sem a necessidade de reconfigurar um orquestrador central.
3. **Escalabilidade**  
   **Justificativa:** A abordagem coreografada permite que cada serviço escale independentemente com base em sua carga de trabalho específica, o que é ideal para um sistema de lanchonete que pode experimentar variações significativas na demanda. A ausência de um orquestrador central reduz o risco de gargalos e pontos de falha únicos.
4. **Resiliência**  
   **Justificativa:** Em um sistema coreografado, a falha de um serviço não paralisa o sistema inteiro, já que os serviços são desacoplados. Cada serviço pode implementar sua própria lógica de tratamento de erros e compensação, contribuindo para uma maior resiliência do sistema como um todo.
5. **Simplificação de Desenvolvimento e Manutenção**  
   **Justificativa:** Evitar a complexidade de manter um orquestrador central simplifica o desenvolvimento e a manutenção. Os desenvolvedores podem se concentrar na lógica de negócios de seus respectivos serviços sem se preocupar com a implementação e manutenção de um componente centralizado adicional. Isso pode acelerar o desenvolvimento e facilitar a manutenção a longo prazo.

#### Conclusão

Embora o padrão Saga Coreografado traga seus próprios desafios, como a complexidade na rastreabilidade de eventos e na garantia de consistência eventual, esses aspectos são gerenciáveis com as ferramentas e práticas adequadas. Para o sistema de pedidos de uma lanchonete, a escolha pelo padrão coreografado alinha-se bem com a necessidade de flexibilidade, escalabilidade, desacoplamento e resiliência, tornando-o uma escolha sólida em detrimento do padrão Saga Orquestrado.
