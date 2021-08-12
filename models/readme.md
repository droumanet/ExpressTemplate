# Express Template
Ce projet pour les BTS SIO du lycée Aristide Bergès (Isère) peut être utilisé pour démarrer un projet complet de CRUD pour une application.

Il utilise les éléments suivants :
* Node.JS
* Express.JS
* EJS
* Mongoose
* Body-parser

## Installation
Les étapes d'installation sont :
* git clone https://github.com/droumanet/ExpressTemplate.git
* npm install
* node app.js

## Fonctionnement
L'application utilise le design pattern MVC. Bien que ce ne soit pas nécessaire, le découpage est poussé à l'extrème.

On trouve donc un routeur par parties de l'application, un contrôleur, un modèle et une vue.

Les vues sont écrites pour EJS, on trouve notamment :
* un entête : il contient notamment le **menu de navigation**, la partie HTML + HEAD
* un pied de page : il contient les mentions légales, la licence du logiciel, etc.
* les différentes vues qui importent l'entête et le pied de page


