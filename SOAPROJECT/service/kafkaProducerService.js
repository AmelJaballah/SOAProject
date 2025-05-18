const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({ clientId: 'rest-api', brokers: ['localhost:9092'] });
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});


const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka producer connected');
  } catch (err) {
    console.error('Failed to connect Kafka producer', err);
    process.exit(1);
  }
};

const publishEvent = async (event) => {
  try {
    await producer.send({
      topic: 'events',
      messages: [{ value: JSON.stringify(event) }],
    });
  } catch (err) {
    console.error('Failed to publish event', err);
    throw err;
  }
};

const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka producer disconnected');
  } catch (err) {
    console.error('Failed to disconnect Kafka producer', err);
  }
};

connectProducer();

// Optional: handle graceful shutdown
process.on('SIGINT', async () => {
  await disconnectProducer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectProducer();
  process.exit(0);
});

module.exports = { publishEvent };
