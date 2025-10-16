import { Kafka, logLevel } from "kafkajs";
import fs from "fs";

export const createKafkaClient = (service: string) => {
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
        if (!process.env.KAFKA_SERVICE_URI) {
            throw new Error('KAFKA_SERVICE_URI is required in production');
        }
        const serviceUri = new URL(process.env.KAFKA_SERVICE_URI);

        return new Kafka({
            clientId: service,
            brokers: [serviceUri.host],
            ssl: {
                rejectUnauthorized: true,
                ca: [fs.readFileSync("./certs/ca.pem", "utf-8")],
            },
            sasl: {
                mechanism: 'plain',
                username: serviceUri.username, // avnadmin
                password: serviceUri.password, // your password
            },
            logLevel: logLevel.INFO,
            retry: {
                initialRetryTime: 100,
                retries: 8,
            },
        });
    }

    return new Kafka({
        clientId: service,
        brokers: ["localhost:19092", "localhost:19093", "localhost:19094"]  // run docker-compose file in development 
    })
}


