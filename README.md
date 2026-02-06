# coderhouse-backend3 (Entrega Final)

Proyecto Backend con Express + MongoDB Atlas (Mongoose) + Arquitectura por capas + Swagger + Tests + Docker.

## Requisitos
- Node.js 18+ (recomendado 20)
- MongoDB Atlas
- (Opcional) Docker Desktop

## Configuración

1) Instalar dependencias

npm install

2) Crear .env en la raíz del proyecto

    PORT=8080
    MONGO_URL="mongodb+srv://coderhouse_user:coderhouse_pwd@cluster0.g4iuo.mongodb.net/?appName=Cluster0" \coderhouse-backend3


## Ejecutar en local

npm run dev

Health check:

GET http://localhost:8080/health

Swagger (Users)

GET http://localhost:8080/api/docs


## Endpoints principales

# Users

GET /api/users

POST /api/users

# Pets

GET /api/pets

GET /api/pets/:id

POST /api/pets

PUT /api/pets/:id

DELETE /api/pets/:id

# Adoptions

GET /api/adoptions

GET /api/adoptions/:id

POST /api/adoptions

DELETE /api/adoptions/:id

# Tests (adoption.router.js)

npm test

## Docker
Imagen en DockerHub

https://hub.docker.com/r/
acostaml/coderhouse-backend3

# Build

docker build -t acostaml/coderhouse-backend3:latest .

# Run
docker run -p 8080:8080 \
  -e PORT=8080 \
  -e MONGO_URL="mongodb+srv://coderhouse_user:coderhouse_pwd@cluster0.g4iuo.mongodb.net/?appName=Cluster0" \
  coderhouse-backend3" \
  acostaml/coderhouse-backend3:latest

## Notas

Si el :id no es un ObjectId válido, el API responde: El id no es un ObjectId valido.
