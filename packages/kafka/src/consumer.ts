import type { Consumer, Kafka, Producer } from "kafkajs";

type topic = {
    topicName: string,
    handler: (message: any) => Promise<void>
}

export const createConsumer = (kafka: Kafka, groupId: string) => {
    const consumer: Consumer = kafka.consumer({ groupId });
    const connect = async () => {
        await consumer.connect();
        console.log("kafka consumer connected", groupId)
    };



    const subscribe = async (topics: topic[]) => {
        await consumer.subscribe({
            topics: topics.map((topic) => topic.topicName),
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const topicConfig = topics.find((t) => t.topicName === topic);
                    if (topicConfig) {
                        const value = message.value?.toString();
                        if (value) {
                            await topicConfig.handler(JSON.parse(value));
                        }
                    }
                } catch (error) {
                    console.log("error processing message in cosumer", error);
                }
            },
        });
    };



    const disconnect = async () => {
        await consumer.disconnect();
    };

    return { connect, subscribe, disconnect }
}