# Express Template
Ce projet pour les **BTS SIO (2e année)** du lycée Aristide Bergès (Isère) peut être utilisé pour démarrer un projet complet de CRUD pour une application.

## Prérequis
Le projet utilise les éléments suivants :
* Node.JS
* Express.JS
* EJS
* Mongoose
* JSDoc

## Installation
Les étapes d'installation sont :
* git clone https://github.com/droumanet/ExpressTemplate.git
* npm install
* node app.js


## MongoDB
Ce projet utilise une base de données 'Hopital' déjà utilisée lors d'une séance de cours précédente.
Si vous utilisez la base vue en cours, elle contiendra 2 collections : medecins et salles

medecins:
|nom | specialite | ville | CP | Telephone|
|--- | --- | --- | --- | ---|
|NORRIS | poingologue | TexasLand | 00000 | {fixe: "555-3345", mobile: ""}|

La base peut-être vide et ne pas contenir de collection, car MongoDB va créer les collections dynamiquement (lors de l'insertion de données).


## Fonctionnement
L'application utilise le design pattern MVC. Bien que ce ne soit pas nécessaire, le découpage est poussé à l'extrême.

### arborescence
Pour chaque partie (domaine ou fonction) de l'application On trouve donc un **routeur**, un **contrôleur**, un **modèle** et des **vue**.
L'arborescence est donc la suivante :
> Express-Template
  |__ controllers
  |__ docs
  |__ models
  |__ node_modules
  |__ public
  |__ views

### vues
Les vues sont écrites pour EJS, on trouve notamment :
* un entête : il contient notamment le **menu de navigation**, la partie HTML + HEAD
* un pied de page : il contient les mentions légales, la licence du logiciel, etc.
* les différentes vues qui importent l'entête et le pied de page

### contrôleurs
Les contrôleurs sont des fichiers JS ayant le nom de la fonction suivie de 'Ctrl'.
_Exemple : medecinsCtrl.js_

# Options
Le projet peut n'être utilisé qu'en partie. Cependant, les éléments suivants ont été ajoutés pour fournir un environnement complet

## documentation au format JSDoc
En utilisant la commande npm avec l'option --save-dev
> npm install --save-dev jsdoc

Puis en ajoutant un fichier de configuration spécifique à JSDoc :
> jsdoc.conf.json

Enfin, en utilisant la commande suivante pour "compiler" la documentation dans le répertoire docs
> node node_modules/jsdoc/jsdoc.js -r -c jsdoc.conf.json app.js


# Sécurisation
L'application contient une branche dédiée à la sécurisation, utilisant le protocole HTTPS, mais aussi le système de jeton JWT (et sa mémorisation côté client via un cookie httpOnly)
## Sécurisation des échanges
La mise en place d'HTTPS nécessite dans app.js
> const https = require('https')

et plus loin
> const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'))
> const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'))
> const options = { key, cert }

Le certificat sera généré par openssl ou en utilisant https://certificatetools.com

## Authentification
L'usage de JSON Web Token implique plusieurs frameworks :
* cors (module Cross Origin)
* morgan (module logs pour authentification)

Pour être plus proche d'une application de production, l'application utilise un fichier d'environnement exploitable avec le module 'dotenv'

## Cookie
Afin de permettre au client de stocker le token JWT, il existe plusieurs solutions. La solution retenue ici est un cookie inaccessible à JavaScript (côté client). Un cookie ne peut stocker que 4 Ko mais c'est amplement suffisant pour le token et quelques informations. Pour cela, il suffit de créer un cookie de type **httpOnly** et le navigateur enverra automatiquement le cookie à chaque requête (mais localement, aucune application ne pourra voir le cookie, avec notamment **document.cookie()**)

Pour gérer ces cookies, on ajoute donc le module **cookie-parser** (module de gestion de cookie)


