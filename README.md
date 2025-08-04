# Employee REST API with MongoDB

A Node.js + Express.js microservice deployed on Kubernetes (GKE) and backed by a MongoDB StatefulSet for storing employee data.

---

## 📘 Requirement Understanding

Build a lightweight REST API to store and retrieve employee data using MongoDB. The system should be containerized, deployed in Kubernetes (Google Kubernetes Engine), and publicly accessible via Ingress.

## 📎 Assumptions

- MongoDB will be used as the backend data store.
- MongoDB credentials (`admin` / `admin123` provider here as plain text for Evaluators) are stored as a Kubernetes secret.
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

## 🛠️ Setup & Deployment

### 1. Install dependencies

```bash
npm install
```

Update `index.js` connection string if testing locally:

```js
const uri = "mongodb://admin:admin123@localhost:27017/?authSource=admin";
```

### 3. Run the server

```bash
node index.js
```

The API will be accessible at: `http://localhost:3000`

---

## 📬 API Endpoints

### ➕ POST /employees/add

Create a new employee record

```json
{
  "name": "Alice",
  "empCode": "E101",
  "mobile": "234234324"
}
```

### 📥 GET /employees

Retrieve all employees

---

## 🐳 Docker Instructions

Build and run locally:

```bash
docker build -t employee-api .
docker run -p 3000:3000 employee-api
```

---

## ☸️ Kubernetes Deployment

### 1. Push Docker image to DockerHub

```bash
docker tag employee-api your-dockerhub/employee-api
docker push your-dockerhub/employee-api
```

### 2. Apply manifests

```bash
kubectl apply -f employee-api-deployment.yaml
kubectl apply -f employee-api-service.yaml
kubectl apply -f employee-api-ingress.yaml
```

Access the API via the configured domain in your Ingress.

---

## 🧪 Example curl

```bash
curl -X POST http://your-domain/employees   -H "Content-Type: application/json"   -d '{"name": "John", "empCode": "E123"}'

curl http://your-domain/employees
```

---
