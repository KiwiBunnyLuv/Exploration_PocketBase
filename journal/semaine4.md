🗓️ Semaine 4 — du 17/11 au 24/11
👤 Nom : Samit Sabah Adelyar
📅 Date de rédaction : 26/11/2025

## Tâches réalisées

- Mise en place d’un CRUD fonctionnel en Svelte capable d’interagir autant avec PocketBase qu’avec Supabase.
- Connexion et configuration des deux backends, incluant la création de la table `tasks` dans Supabase (PostgreSQL) et PocketBase (collection SQLite).
- Tests de l'API des deux plateformes pour assurer une cohérence des opérations (create, read, update, delete).
- Résolution de plusieurs bugs liés à la communication entre Svelte, PocketBase et Supabase.

## Apprentissages faits avec l’aide de l’IA

- Compréhension approfondie des différences opérationnelles entre PocketBase (self-hosted) et Supabase (cloud non self-hosted), notamment concernant les API, la gestion des permissions et les flux CRUD.
- L’IA a aidé à structurer un CRUD réutilisable pour deux backends distincts, en clarifiant comment mutualiser le code Svelte.
- Support technique pour résoudre des erreurs de modules Svelte, d’imports et de configurations.
- Explications sur les API Rules de PocketBase, nécessaires pour sécuriser correctement la collection `tasks`.

## Difficultés rencontrées

- Configuration complexe des API Rules de PocketBase, demandant plusieurs ajustements pour éviter les accès non autorisés.
- Problèmes de modules Svelte entraînant des erreurs de build et des comportements inattendus.
- Harmonisation des schémas entre PocketBase et Supabase pour rendre le CRUD compatible sur les deux plateformes.

## Objectifs pour la semaine suivante

- Finaliser la comparaison technique entre PocketBase et Supabase (sécurité, performances, ergonomie).
- Documenter les solutions trouvées pour réutiliser un même CRUD sur deux backends différents.
- Préparer le rapport final et organiser les sections pour la démonstration.
- Stabiliser le prototype PocketTasks pour les tests finaux.