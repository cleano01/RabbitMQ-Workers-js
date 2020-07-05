let amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", function (err, conn) {
  /*criação de um novo canal*/
  conn.createChannel(function (err, ch) {
    /*nome do canal*/
    let channel_name = "hello";

    /*passando o nome da fila para conexão do RabbitMQ*/
    ch.assertQueue(channel_name, { durable: false });

    ch.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    /*19 a 24: escutando a fila que 
    foi mencionada na linha 7 e 
    processando ela*/
    ch.consume(
      channel_name,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
