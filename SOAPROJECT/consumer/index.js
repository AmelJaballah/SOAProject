const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'reco-group' });

const runConsumer = async () => {
  let connected = false;
  let retries = 0;
  const maxRetries = 10;
  while (!connected && retries < maxRetries) {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: 'events', fromBeginning: true });
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          // Handle message
        },
      });
      connected = true;
      console.log('Consumer connected and running');
    } catch (err) {
      retries++;
      console.error(`Kafka consumer connection failed (attempt ${retries}):`, err.message);
      await new Promise(res => setTimeout(res, 3000)); // Wait before retrying
    }
  }
  if (!connected) {
    console.error('Failed to connect Kafka consumer after several attempts.');
    process.exit(1);
  }
};

runConsumer();