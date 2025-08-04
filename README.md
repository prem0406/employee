# Employee REST API with MongoDB

A Node.js + Express.js microservice deployed on Kubernetes (GKE) and backed by a MongoDB StatefulSet for storing employee data.

---

## 📘 Requirement Understanding

Build a lightweight REST API to store and retrieve employee data using MongoDB. The system should be containerized, deployed in Kubernetes (Google Kubernetes Engine), and publicly accessible via Ingress.

## 📎 Assumptions

- MongoDB will be used as the backend data store.
- MongoDB credentials are stored as a Kubernetes secret.
- The database and collection used are:
  - DB: `company`
  - Collection: `employee`
- Each employee entry has fields:
  - `name` (string)
  - `empCode` (string)
  - `mobile` (string)
- Public access is managed through Kubernetes Ingress, not LoadBalancer.

## 🌐 Solution Overview

- REST API built with Node.js and Express.js
- MongoDB is deployed via a Kubernetes StatefulSet for persistence
- REST API is Exposed via Kubernetes Ingress with an internal `ClusterIP` service
- Uses the `mongodb` npm package for database connection
- The app includes endpoints to add and fetch employee data

### Project Structure

```
employee-api/
├── index.js              # Main application logic
├── mongo.js
├── package-lock.json
├── package.json
├── Dockerfile
├── employee-api-configmap.yaml
├── employee-api-deployment.yaml
├── employee-api-service.yaml
├── employee-api-ingress.yaml
└── README.md
```

---

## 📊 Justification for the Resources Utilized

| Resource                  | Justification                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **MongoDB StatefulSet**   | Ensures stable network identity and persistent volume claims for database durability |
| **Secrets**               | Used for managing sensitive credentials securely                                     |
| **ClusterIP Service**     | Allows internal access from Ingress Controller                                       |
| **Ingress**               | Cleaner, cost-effective way to expose service with domain mapping                    |
| **Express.js**            | Lightweight, minimal overhead web framework ideal for microservices                  |
| **MongoDB Native Driver** | Avoids ORM overhead; ideal for small projects and direct operations                  |

---

## 📬 API Endpoints

### ➕ POST /employee/add

Create a new employee record

```json
{
  "name": "Alice",
  "empCode": "E101",
  "mobile": "234234324"
}
```

### 📥 GET /employee

Retrieve all employees

---

## 🐳 Docker Instructions

Pull and run locally:

```bash
docker pull pr3mkumar/employee-api:v3

docker run -p 3000:3000 pr3mkumar/employee-api:v3
```

---

## ☸️ Kubernetes Deployment

## 1. Apply manifests (MongoDB)

Replace 'usename' and 'password' with yours.

```bash
kubectl create secret generic mongodb-secret \
  --from-literal=MONGO_INITDB_ROOT_USERNAME=username \
  --from-literal=MONGO_INITDB_ROOT_PASSWORD=password
```

```bash
kubectl apply -f mongo-headless-service.yaml
kubectl apply -f mongo-statefulset.yaml
kubectl apply -f mongo-service.yaml
```

## 2. Apply manifests (API)

```bash
kubectl apply -f employee-api-configmap.yaml
kubectl apply -f employee-api-deployment.yaml
kubectl apply -f employee-api-service.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f employee-api-ingress.yaml
```

---

## 3. Github link

https://github.com/prem0406/employee

## 4. Docker hub link

https://hub.docker.com/repository/docker/pr3mkumar/employee-api/general

---

## 5. 🧪 Example curl

Replace 'your-domain' with employee-api-ingress IP Address or domain name mapped to it.

```bash
curl -X POST http://your-domain/employee/add   -H "Content-Type: application/json"   -d '{"name": "John", "empCode": "E123", "mobile": "99999999"}'

curl http://your-domain/employee
```
