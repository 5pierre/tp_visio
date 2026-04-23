Une entreprise souhaite automatiser le déploiement de son application web afin de gagner du temps et éviter les erreurs humaines.

 

Votre mission est de mettre en place une solution permettant de :

- Conteneuriser une application
- Automatiser les tests et le déploiement
- Déployer sur une machine virtuelle dans le cloud
- Utiliser Docker pour conteneuriser une application
- Utiliser Docker Compose pour gérer plusieurs services
- Déployer une application avec Kubernetes
- Mettre en place un pipeline CI/CD
- Gérer des variables d’environnement et des secrets
- Documenter un projet technique
Vous devez utiliser :

- Une application full stack (frontend + backend)
OU
- Deux services distincts (ex : API + base de données)
 

Contraintes :

- L’application doit fonctionner en local
- Elle doit exposer un endpoint (ex : /health)
- Les services doivent communiquer entre eux
Vous devez :

- Créer un Dockerfile pour chaque service
- Utiliser Docker Compose pour orchestrer les services
- Construire et lancer les conteneurs
 

Attendus :

- L’application fonctionne avec docker-compose up
- Les services communiquent correctement
- Les ports sont exposés correctement
 

Bonus :

- Multi-stage build
Vous devez :

- Créer une machine virtuelle (VM) sur un cloud de votre choix (Azure, AWS, GCP, etc… ).
- Installer Docker et Docker Compose sur la VM.
- Installer Kubernetes local sur la VM avec  Minikube ou K3s.
Vous devez :

- Déployer votre application dans Kubernetes
 
Attendus :

- L’application tourne dans le cluster Kubernetes (dans la VM)
Elle est accessible via l’IP de la VM
Vous devez mettre en place un pipeline avec :

GitHub Actions (ou gitlabCi, jenkins, ect …)
 
Pipeline attendu :
 

git push
  ↓
CI/CD
  ↓
1) Installation des dépendances
  ↓
2) Tests
  ↓
3) Build Docker
  ↓
4) Push image
  ↓
5) Déploiement sur la VM (SSH)
  ↓
6) Mise à jour Kubernetes

 

 

Contraintes :

- Pipeline automatique
- Échec si les tests échouent
- Déploiement sans action manuelle
Vous devez :

- Utiliser des variables d’environnement
- Ne jamais exposer de secrets dans le code
Vous devez fournir un README contenant :

- Description du projet
- Explication du pipeline CI/CD
- Étapes de déploiement
- Difficultés rencontrées
 
Vous devez fournir :

 

Un dépôt Git (code source, fichiers Kubernetes et Docker, pipeline, README, etc.).

 

Un rapport de projet contenant :

- Une présentation simple du contexte
- Les étapes réalisées avec des captures d’écran prouvant leur réalisation.
 
Dans le cas où vous n’avez pas pu aller jusqu’au bout, indiquez la dernière étape rencontrée avec l’erreur obtenue, puis expliquez le problème ainsi que les tentatives de correction.
 
Ce TP évalue autant votre capacité à réussir qu’à expliquer votre travail.
 
- Pas de rapport → non évalué
- Pas de preuves → pénalisation
Si vous le souhaitez, vous pouvez choisir l’un des bonus suivants :

- Cluster Kubernetes managé
- Monitoring avec :
   - Prometheus
   - Grafana
- Déploiement automatique de la Vm avec Terraform.