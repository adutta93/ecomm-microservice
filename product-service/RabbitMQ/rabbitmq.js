const amqp = require('amqplib');

var connection, channel;

async function MQConnect(){
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer)
    channel = await connection.createChannel()
    await channel.assertQueue('PRODUCT')
}

module.exports = {
 MQConnect
}