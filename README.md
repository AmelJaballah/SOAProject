#EventSync — SOA Microservice Project
EventSync is a Service-Oriented Architecture (SOA) project designed to collect, store, and process user interaction events. It uses a REST API to receive events, stores them in MongoDB, and publishes them to an Apache Kafka topic for downstream analytics, content recommendation, or real-time processing.

Project Structure

SOAPROJECT/

├── rest-api/           # REST API server (port 3000)


├── grpc-server/        # gRPC recommendation microservice (port 9000)

├── graphql-server/     # GraphQL API gateway (port 4000)

├── consumer/           # Kafka consumer service to collect and store events

├── interface/          # HTML+JS frontend for manual testing

├── service/            # Kafka producer logic

├── model/              # MongoDB Mongoose models

├── config/             # MongoDB configuration file

├── routes/             # Modular route handlers

├── docker-compose.yml  # Docker setup for Kafka, Zookeeper, and MongoDB
 Features
 RESTful API for creating and tracking user events

 Input validation and error handling

 MongoDB storage using Mongoose models

 Kafka-based event streaming for scalable processing

 gRPC service for recommendation logic

 GraphQL API for unified client queries

 Docker-ready infrastructure

 Kafdrop UI for inspecting Kafka topics

Installation & Setup
1. Clone the repositor
git clone https://github.com/AmelJaballah/SOAPROJECT.git
cd SOAPROJECT
2. Run the services with Docker Compose
docker-compose up -d
Note: Ensure Docker and Docker Compose are installed on your system.

 Access Services
Service	URL	Description
REST API	http://localhost:3000	Receives user events
gRPC Server	grpc://localhost:9000	Handles internal recommendations
GraphQL Server	http://localhost:4000/graphql	Unified query interface
Kafdrop UI	http://localhost:9000	Inspect Kafka topics
MongoDB	mongodb://localhost:27017	Stores all user events

👩‍💻 Author
EventSync
Created by Amel Jaballah

