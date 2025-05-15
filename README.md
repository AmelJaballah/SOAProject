# SOAProject 
EventSync

EventSync is a microservice project that collects user interaction events via a RESTful API, stores them in MongoDB, and publishes them to an Apache Kafka topic for downstream processing, analytics, or machine learning-based recommendations.

Overview

+-------------------+          POST/PUT/GET          +-----------------+
|  Frontend Client  |  <-------------------------->  |  REST API (Node)|
|  (HTML/Postman)   |                                |                 |
+-------------------+                                +--------+--------+
                                                             |
                                            Validate + Save to MongoDB
                                                             |
                                                             v
                                               +-------------+--------------+
                                               |         MongoDB            |
                                               | (Event stored for history) |
                                               +-------------+--------------+
                                                             |
                                       Also publish event to Kafka topic via producer
                                                             |
                                                             v
                                                 +-----------+------------+
                                                 |     Kafka (Broker)     |
                                                 | Topic: 'events'        |
                                                 +-----------+------------+
                                                      Kafka consumer
                                                             
                                           

Features

RESTful API for event creation, update, deletion, and querying

Input validation and consistent error handling

MongoDB storage of user events

Kafka-based event publishing for decoupled processing

Docker-ready architecture

Kafdrop UI for Kafka topic inspection

 Docker & Setup

Run with Docker Compose

docker-compose up -d

Access Services

API Server: http://localhost:3000

Kafdrop UI: http://localhost:9000

MongoDB: mongodb://localhost:27017

Notes:
Ensure MongoDB is running before API requests.

Use Postman or a browser to test REST endpoints.

Kafka topic used: events.

All events are both stored and broadcast for processing.


Author

EventSync by Amel Jaballah
