# 📌 Projet 3 — Remise Semaine 1  
## Choix du sujet et planification  
### Sujet : Comparaison entre PocketBase (self-hosted sur AWS) et Supabase (cloud non–self-hosted)

## 1. Présentation du sujet choisi

Pour ce projet, j’ai choisi d’explorer et de comparer deux technologies Backend-as-a-Service modernes :

- **PocketBase**, un backend minimaliste, self-hosted, basé sur un unique exécutable Go et une base de données SQLite.  
- **Supabase**, une plateforme cloud complète, non self-hosted, construite autour de PostgreSQL, incluant Auth, Realtime, Storage et Edge Functions.

### Pourquoi ce sujet ?
Ces deux technologies remplissent des rôles similaires (authentification, base de données, API, realtime), mais leur **philosophie, leur architecture, leurs coûts et leurs modes d’hébergement sont radicalement différents** :

- PocketBase : **self-hosted**, simple, léger, très économique, tournant aisément sur AWS (EC2, Lightsail).  
- Supabase : **cloud-first**, robuste, scalable, coûteux à opérer soi-même, mais très puissant grâce à PostgreSQL et son écosystème complet.

Cette comparaison permettra de démontrer :
- comment l’hébergement influence les fonctionnalités, les performances et les coûts,
- dans quels contextes PocketBase ou Supabase deviennent plus appropriés,
- et comment le choix d’une technologie change selon les besoins d’un projet.

---

## 2. Projet pratique prévu : PocketTasks

Pour appuyer la comparaison technique, je vais réaliser un petit prototype appelé **PocketTasks**, un gestionnaire de tâches multi-utilisateurs.

### 🌐 Version PocketBase (self-hosted sur AWS)
- Déploiement sur AWS Lightsail ou EC2
- Base SQLite gérée localement
- Auth PocketBase
- CRUD des tâches
- Realtime via WebSocket intégré
- Règles de sécurité PocketBase
- Monitoring minimal (CloudWatch)

### ☁️ Version Supabase (cloud non-self-hosted)
- Auth Supabase (email, OTP)
- PostgreSQL + Row Level Security
- API PostgREST
- Realtime basé sur replication PostgreSQL
- Storage Supabase pour fichiers
- Fonctions Edge (optionnel)
- Zéro configuration serveur (géré par Supabase)

L’objectif est ensuite de comparer les deux versions sur :
- facilité de développement  
- coûts  
- performances  
- scalabilité  
- niveau de sécurité  
- contraintes d’hébergement  

---

## 3. Axes principaux de comparaison

### 3.1 Hébergement  
- PocketBase : self-hosted → contrôle total, responsabilité totale  
- Supabase : cloud-hosted → infrastructure gérée, coûts plus élevés

### 3.2 Architecture  
- PocketBase : binaire unique + SQLite (monolithique)  
- Supabase : cluster de micro-services + PostgreSQL (distribué)

### 3.3 Coûts  
- PocketBase sur AWS : **5–7$ / mois** (EC2 micro / Lightsail)  
- Supabase cloud : **0–25$ / mois en testing**, puis **49$–300$ selon l’usage**  
- → C’est un élément clé du projet

### 3.4 Performances  
- PocketBase : très rapide localement, mais limité en charge d’écriture  
- Supabase : performant, pensé pour charge élevée

### 3.5 Sécurité  
- PocketBase : configuration manuelle AWS (TLS, firewall, SG, backups)  
- Supabase : sécurisation gérée (TLS auto, RLS Postgres, backups automatiques)

### 3.6 Scalabilité  
- PocketBase : aucune scalabilité horizontale (SQLite)  
- Supabase : scalable via PostgreSQL + réplicas

---

## 4. Plan de travail (5 semaines)

### **Semaine 1 — Choix + planification**
- lecture documentation PocketBase & Supabase  
- analyse des différences d’hébergement  
- rédaction de ce document  
- création du dépôt GitHub  
- début journal de bord

### **Semaine 2 — Exploration technique**
- déploiement PocketBase sur AWS  
- tests SQLite + realtime  
- exploration Supabase cloud  
- tests PostgreSQL + RLS  
- documentation des découvertes

### **Semaine 3 — Développement du prototype PocketTasks**
- Auth + CRUD + realtime dans PocketBase  
- Auth + CRUD + realtime dans Supabase  
- premières comparaisons techniques

### **Semaine 4 — Analyse critique**
- performance AWS vs cloud  
- sécurité AWS vs cloud  
- coûts détaillés  
- limites perçues  
- scénarios d’utilisation recommandés

### **Semaine 5 — Rapport + démonstration**
- rédaction du rapport (3–5 pages)  
- préparation de la démonstration  
- finalisation du journal de bord  
- mise à jour finale du GitHub

---

## 5. Utilisation prévue de l’IA

L’intelligence artificielle (ChatGPT) sera utilisée pour :

### Recherche
- comparer PocketBase et Supabase  
- résumer documentations officielles  
- clarifier les architectures cloud

### Développement
- générer du code SvelteKit  
- créer des règles de sécurité  
- automatiser tests API

### Documentation
- structurer le rapport  
- améliorer le README  
- synthétiser les différences techniques et économiques

### Analyse critique
- identifier limites de SQLite vs PostgreSQL  
- simuler scénarios de scalabilité  
- valider mes comparaisons techniques

Toutes les interactions pertinentes avec l’IA seront consignées dans le journal de bord.

---

## 6. Dépôt GitHub

Dépôt du projet :  
https://github.com/KiwiBunnyLuv/Exploration_PocketBase.git

---

## 7. Conclusion

Ce projet permettra d’explorer en profondeur deux approches modernes du Backend-as-a-Service :

- **PocketBase self-hosted sur AWS** : minimaliste, rapide, économique, idéal pour MVP et projets légers.  
- **Supabase cloud non-self-hosted** : robuste, sécurisé, scalable, conçu pour des applications complètes.

Cette comparaison offre un excellent terrain pour une analyse technique, économique et critique, tout en montrant concrètement comment le choix d’un backend influence les coûts et l’architecture d’un projet réel.

