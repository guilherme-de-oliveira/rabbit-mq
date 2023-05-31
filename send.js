const amqp = require('amqplib/callback_api');

const queue = "product_inventory";

const msg = {
    item_id: "macbook",
    text: "This is a sample message to send receiver to check the ordered Item Availablility",
};

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {
        if (error1) throw error1;

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log("[x] Sent %s", msg)
    });

    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
});


