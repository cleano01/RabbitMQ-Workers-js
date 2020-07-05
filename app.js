let amq = require("amqplib/callback_api");

/*conexão com o RabbitMQ*/
amq.connect("amqp://localhost:5672", function (err, conn) {
  /*criação de um novo canal*/
  conn.createChannel(function (err, ch) {
    /*nome do canal*/
    let channel_name = "hello";

    /*mensagem defaut para ser enviada*/
    let msg = "Hello World 123";

    /*passando o nome da fila para conexão do RabbitMQ*/
    ch.assertQueue(channel_name, { durable: false });

    /*O RabbitMQ trabalha com Buffer, estou passando a msg para 
    ele e para qual fila ela deve ser enviada*/

    for (let index = 0; index < 100; index++) {
      ch.sendToQueue(channel_name, new Buffer.from(msg + "-" + "" + index));
    }

    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
