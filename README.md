# 📘 README.md — EasyProject API

## 📌 Présentation du projet

**EasyProject** est une API REST moderne développée avec **NestJS** et **PostgreSQL**.

### 🎯 Fonctionnalités principales
L'API gère :
- ✅ **Gestion des utilisateurs** (création, consultation avec filtres)
- ✅ **Gestion des transactions** (création, consultation paginée avec filtres)
- ✅ **Connexion PostgreSQL distante** (hébergée sur Neon)
- ✅ **Standardisation des réponses HTTP** (format Laravel-like)
- ✅ **Documentation Swagger intégrée**
- ✅ **Validation stricte** des données d'entrée
- ✅ **Gestion d'erreurs en français**
- ✅ **Pagination enrichie** avec métadonnées complètes

---

## 🧰 Stack technique

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Node.js** | v18+ | Runtime JavaScript |
| **NestJS** | v11 | Framework backend TypeScript |
| **TypeORM** | v0.3 | ORM pour PostgreSQL |
| **PostgreSQL** | - | Base de données (Neon Cloud) |
| **Swagger** | v7 | Documentation API automatique |
| **Jest** | v30 | Framework de tests |
| **ESLint** | v9 | Linting du code |
| **Prettier** | v3 | Formatage du code |

---

## 📂 Structure du projet

```
src/
├── common/                     # Utilitaires partagés
│   ├── constants/              # Énumérations (statuts)
│   ├── filters/                # Filtres d'exceptions
│   ├── interceptors/           # Intercepteurs de réponses
│   ├── interfaces/             # Interfaces TypeScript
│   ├── pipes/                  # Pipes de validation
│   └── utils/                  # Utilitaires (ResponseUtil)
├── config/                     # Configuration base de données
│   └── database.config.ts      # Config TypeORM
├── modules/                    # Modules métier
│   ├── users/                  # Gestion utilisateurs
│   │   ├── dto/                # DTOs de validation
│   │   ├── entities/           # Entités TypeORM
│   │   ├── users.controller.ts # Contrôleur REST
│   │   ├── users.service.ts    # Logique métier
│   │   └── users.module.ts     # Module NestJS
│   └── transactions/           # Gestion transactions
│       ├── dto/                # DTOs de validation
│       ├── entities/           # Entités TypeORM
│       ├── transactions.controller.ts
│       ├── transactions.service.ts
│       └── transactions.module.ts
├── main.ts                     # Point d'entrée
└── app.module.ts              # Module principal
```

---

## ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

### 📋 Logiciels requis
- **Node.js ≥ 18** 👉 [https://nodejs.org](https://nodejs.org)
- **npm** (installé automatiquement avec Node.js)
- **Accès Internet** (base de données PostgreSQL hébergée sur Neon)

### ✅ Vérification de l'installation
```bash
node -v    # Doit afficher v18.x ou supérieur
npm -v     # Doit afficher v9.x ou supérieur
```

---

## 📥 Installation du projet

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/vincenthacky/testrecrutementasso.git
cd easyproject
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

> ⚠️ **En cas de problème** : Vérifiez que Node.js et npm sont correctement installés et respectent les versions minimales requises (Node.js v18+, NestJS v11).

---

## 🔐 Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet :

```bash
PORT=3000
DATABASE_URL=<URL_FOURNIE_PAR_EMAIL>
```

> 👉 **Important** : L'URL de la base de données PostgreSQL sera fournie par email pour des raisons de sécurité.  
> 👉 **Simplicité** : Le projet utilise `DATABASE_URL` pour simplifier la configuration de la base de données.

---

## 🗄️ Base de données

- **Type** : PostgreSQL
- **Hébergement** : [Neon](https://neon.tech) (Cloud PostgreSQL)
- **Configuration** : SSL requis avec `channel_binding`

### 📊 Schéma de base de données

#### Table `users`
| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL PRIMARY KEY | Identifiant unique |
| nom | VARCHAR(100) | Nom utilisateur |
| email | VARCHAR(255) UNIQUE | Email unique |
| telephone | VARCHAR(20) | Numéro téléphone |
| created_at | TIMESTAMP | Date création |
| updated_at | TIMESTAMP | Date modification |

#### Table `transactions`
| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL PRIMARY KEY | Identifiant unique |
| user_id | INTEGER | Référence utilisateur |
| montant | DECIMAL(10,2) | Montant transaction |
| statut | ENUM | Statut (en_attente, validee, echouee, annulee) |
| date | TIMESTAMP | Date transaction |
| created_at | TIMESTAMP | Date création |
| updated_at | TIMESTAMP | Date modification |

---

## ▶️ Lancer le projet

### 🛠️ Mode développement (recommandé)
```bash
npm run start:dev
```

**Avantages :**
- ✅ Hot reload activé
- ✅ Logs détaillés
- ✅ Surveillance automatique des fichiers

### 🚀 Mode production
```bash
npm run build
npm run start:prod
```

---

## 🌐 Accès à l'API

### 🌍 URL principale
👉 **http://localhost:3000**

> 💡 **Redirection automatique** : Vous serez directement redirigé vers la documentation Swagger. C'est volontaire pour faciliter l'accès au travail réalisé dans le cadre de ce test technique.

### 📖 Documentation Swagger

**Swagger est activé automatiquement** sur plusieurs routes :

| URL | Description |
|-----|-------------|
| **http://localhost:3000/** | Route principale |
| **http://localhost:3000/api/docs** | Route classique |
| **http://localhost:3000/api/swagger** | Route alternative |
| **http://localhost:3000/api/documentation** | Route descriptive |
| **http://localhost:3000/documentations** | Route courte |

**Fonctionnalités Swagger :**
- 🧪 **Tester les endpoints** directement
- 👁️ **Visualiser les DTOs** et validation
- 📋 **Comprendre la structure** des réponses
- 🔍 **Explorer les filtres** et pagination
- 📚 **Exemples concrets** pour chaque endpoint

---

## 🚀 Endpoints disponibles

### 👤 **Utilisateurs**

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **POST** | `/users` | Créer un utilisateur |
| **GET** | `/users` | Liste paginée avec filtres |

**Filtres disponibles :**
- `nom` : Recherche partielle par nom
- `email` : Recherche partielle par email  
- `telephone` : Recherche partielle par téléphone
- `page` : Numéro de page (défaut: 1)
- `limit` : Éléments par page (défaut: 10)

### 💰 **Transactions**

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **POST** | `/transactions` | Créer une transaction |
| **GET** | `/transactions` | Liste paginée avec filtres |

**Filtres disponibles :**
- `statut` : Filtrer par statut (en_attente, validee, echouee, annulee)
- `page` : Numéro de page (défaut: 1)
- `limit` : Éléments par page (défaut: 10)

### 📊 **Format des réponses**

Toutes les réponses suivent le format standardisé Laravel-like :

```json
{
  "success": true,
  "status_code": 200,
  "message": "Liste des utilisateurs récupérée avec succès",
  "data": [...],
  "pagination": {
    "total": 50,
    "per_page": 10,
    "current_page": 1,
    "last_page": 5,
    "from": 1,
    "to": 10
  }
}
```

---

## 🧪 Tests



### 📊 Tests avec couverture
```bash
npm run test:cov
```

### 🎯 Tests end-to-end
```bash
npm run test:e2e
```

### 🔄 Tests en mode watch
```bash
npm run test:watch
```

---

## 🧹 Qualité du code

### 🔍 Lint (vérification du code)
```bash
npm run lint
```

### 🎨 Formatage automatique
```bash
npm run format
```

### 🏗️ Build du projet
```bash
npm run build
```

---

## 🔧 Fonctionnalités techniques avancées

### 🛡️ **Validation stricte**
- **class-validator** pour tous les DTOs
- **Validation globale** avec pipes personnalisés
- **Messages d'erreur en français**

### 🔄 **Gestion des réponses**
- **Intercepteur global** pour standardiser les réponses
- **Filter d'exceptions** avec traduction français
- **Format Laravel-like** cohérent

### 📄 **Pagination enrichie**
- **Métadonnées complètes** (total, pages, etc.)
- **Tri par date** (plus récent en premier)
- **Filtres dynamiques** sur tous les champs

### 🔗 **Relations TypeORM**
- **User → Transactions** (1:N)
- **Eager loading** des relations
- **Cascade delete** configuré

---

## 🚨 Dépannage (pour vous aidez en cas d'erreur)

### ❌ Erreur de connexion base de données
- Vérifiez votre connexion Internet
- Assurez-vous que l'URL de base de données est correcte dans `.env`

### ❌ Port déjà utilisé
```bash
# Changer le port dans .env
PORT=3001
```

### ❌ Erreurs TypeScript
```bash
npm run build
```

### ❌ Problèmes de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 👤 Auteur

**Projet réalisé par Asso**  
📧 Contact : [votre-email@example.com]  
📅 Dans le cadre d'un test technique backend NestJS

---

## ✅ Commandes utiles (récapitulatif)

| Commande | Description |
|----------|-------------|
| `npm install` | Installer les dépendances |
| `npm run start:dev` | Lancer en mode développement |
| `npm run build` | Build de production |
| `npm run start:prod` | Lancer en production |
| `npm run test` | Lancer les tests |
| `npm run lint` | Vérifier la qualité du code |
| `npm run format` | Formater le code |

---

## 🎯 Points clés du projet

✅ **Architecture modulaire** par fonctionnalité  
✅ **Séparation stricte** des responsabilités  
✅ **Validation complète** des données  
✅ **Gestion d'erreurs robuste**  
✅ **Documentation automatique**  
✅ **Code TypeScript strict**  
✅ **Pagination et filtres avancés**  
✅ **Réponses standardisées**  
✅ **Base de données cloud**  
✅ **Tests intégrés**  

---

## 🔗 Ressources utiles

- [Documentation NestJS](https://nestjs.com)
- [Documentation TypeORM](https://typeorm.io)
- [Documentation Swagger](https://swagger.io/docs)
- [Documentation Neon PostgreSQL](https://neon.tech/docs)

---

**🚀 l’API d’Asso – le futur développeur retenu pour ce poste !**