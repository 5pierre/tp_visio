# TP Intégration & Déploiement – Application Full Stack

## Description du projet

Application web full stack composée de :
- **Backend** : API Node.js/Express exposant `/health` et `/db-health`
- **Frontend** : Page HTML statique servie par Nginx
- **Base de données** : PostgreSQL 15

L'ensemble est conteneurisé avec Docker, orchestré localement via Docker Compose, déployé dans Kubernetes (Minikube sur Azure VM) et automatisé via GitHub Actions.

---

## Structure du projet

```
.
├── backend/
│   ├── src/
│   │   ├── index.js          # API Express
│   │   └── index.test.js     # Tests Jest
│   ├── Dockerfile            # Multi-stage build
│   └── package.json
├── frontend/
│   ├── index.html
│   └── Dockerfile
├── k8s/
│   ├── secret.yml            # Secrets Kubernetes (base64)
│   ├── deployment.yml        # Backend + DB
│   └── frontend.yml          # Frontend
├── .github/
│   └── workflows/
│       └── main.yml          # Pipeline CI/CD
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Lancer en local

### Prérequis
- Docker & Docker Compose installés

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/TON_USERNAME/projet_final_integration_deploiement
cd projet_final_integration_deploiement

# 2. Créer le fichier .env à partir de l'exemple
cp .env.example .env
# Éditer .env avec tes valeurs si besoin

# 3. Lancer tous les services
docker-compose up --build

# 4. Tester
curl http://localhost:3000/health
# → {"status":"ok","timestamp":"..."}

# Frontend accessible sur http://localhost:8080
```

---

## Pipeline CI/CD

```
git push origin main
        │
        ▼
┌──────────────┐
│  1. Tests    │  npm install + npm test (Jest)
│              │  ❌ Échec → pipeline stoppé
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│  2. Build & Push    │  docker build backend + frontend
│     Docker          │  docker push → DockerHub
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  3. Déploiement     │  SSH sur VM Azure
│     Azure VM        │  kubectl set image (rolling update)
└─────────────────────┘
```

### Secrets GitHub à configurer (Settings → Secrets)

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Ton pseudo DockerHub |
| `DOCKERHUB_TOKEN` | Token d'accès DockerHub |
| `VM_IP` | IP publique de la VM Azure |
| `VM_USER` | Utilisateur SSH de la VM |
| `VM_PASSWORD` | Mot de passe SSH de la VM |

---

## Déploiement Kubernetes (sur la VM Azure)

### Installation de Minikube (une seule fois)

```bash
# Docker (si pas déjà installé)
sudo apt update && sudo apt install -y docker.io
sudo usermod -aG docker $USER && newgrp docker

# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -sL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Démarrer le cluster
minikube start --driver=docker
```

### Déploiement de l'application

```bash
# 1. Remplacer DOCKERHUB_USERNAME dans les fichiers k8s par ton pseudo
sed -i 's/DOCKERHUB_USERNAME/ton_pseudo/g' k8s/deployment.yml k8s/frontend.yml

# 2. Appliquer les manifests dans l'ordre
kubectl apply -f k8s/secret.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/frontend.yml

# 3. Vérifier que tout tourne
kubectl get pods
kubectl get services

# 4. Accéder à l'application
# Backend  : http://IP_VM:30000/health
# Frontend : http://IP_VM:30001
```

> **Note** : Pour que les NodePorts soient accessibles depuis l'extérieur, ouvrir les ports 30000 et 30001 dans le Network Security Group Azure.

---

## Difficultés rencontrées

- **Port frontend** : Le frontend utilise Nginx (port 80 dans le conteneur), pas Node.js. Les fichiers Kubernetes ont été corrigés en conséquence (targetPort: 80).
- **Secrets en base64** : Les valeurs dans `secret.yml` doivent être encodées avec `echo -n "valeur" | base64`. Ne jamais committer le `.env` réel.
- **Minikube + VM Azure** : Minikube démarre avec `--driver=docker` car on est sans interface graphique. Il faut s'assurer que l'utilisateur est dans le groupe `docker`.
- **Rolling update Kubernetes** : Le pipeline utilise `kubectl set image` + `kubectl rollout status` pour mettre à jour les pods sans interruption de service.