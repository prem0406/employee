# Employee REST API with MongoDB

This is a simple Node.js + Express.js REST API that connects to a MongoDB database to manage employee records. It allows creating and retrieving employee entries in a `company` database and `employee` collection.

---

## 📦 Features

- REST API with Express.js
- Uses native MongoDB driver (`mongodb`)
- Connects to MongoDB deployed in **Google Kubernetes Engine (GKE)**
- Supports basic `POST` and `GET` operations
- Ready for Docker + Kubernetes deployment

---

## 📁 Project Structure

```
employee-api/
├── index.js              # Main app file
├── mongo.js
├── package-lock.json
├── package.json
├── Dockerfile
└── README.md
```

---

## 🔧 Prerequisites

- Node.js (v18 or later)
- Docker
- Kubernetes cluster (e.g. GKE)
- `kubectl` configured
- MongoDB running in Kubernetes with:
  - DB: `company`
  - Collection: `employee`
  - Auth: `admin` / `admin123` (Stored in GKE secrets)

---

## 🚀 Running the App Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Update MongoDB URI in `index.js` if needed:

```js
const uri = "mongodb://admin:admin123@localhost:27017/?authSource=admin";
```

### 3. Run the API server

```bash
node index.js
```

The app runs on:  
`http://localhost:3000`

---

## 📬 API Endpoints

### ➕ `POST /employees/add`

Create a new employee record.

#### Request body:

```json
{
  "name": "Alice",
  "empCode": "E101",
  "mobile": "77777777"
}
```

### 📥 `GET /employees`

Retrieve all employee records.

---

## 🐳 Docker Setup

### Build the image:

```bash
docker build -t employee-api .
```

### Run locally:

```bash
docker run -p 3000:3000 employee-api
```

---

## ☸️ Kubernetes Deployment

1. Push the Docker image to a registry (e.g., Docker Hub):

```bash
docker tag employee-api your-dockerhub-username/employee-api
docker push your-dockerhub-username/employee-api
```

2. Create a deployment + service YAML (`employee-api-deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: employee-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: employee-api
  template:
    metadata:
      labels:
        app: employee-api
    spec:
      containers:
        - name: api
          image: your-dockerhub-username/employee-api
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: employee-api-service
spec:
  selector:
    app: employee-api
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

3. Apply to cluster:

```bash
kubectl apply -f employee-api-deployment.yaml
```

---

## 🧪 Example `curl` Usage

```bash
curl -X POST http://localhost:3000/employees   -H "Content-Type: application/json"   -d '{"name": "John", "empCode": "E123"}'

curl http://localhost:3000/employees
```

---

## 📝 Notes

- MongoDB must be accessible either through Kubernetes networking or via `localhost:27017` if port-forwarded.
- Data is stored in:  
  **DB:** `company`  
  **Collection:** `employee`  
  **Fields:** `name`, `empCode`, `mobile`

---
