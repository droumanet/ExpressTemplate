# Express Template
Ce projet pour les **BTS SIO (2e année)** du lycée Aristide Bergès (Isère) peut être utilisé pour démarrer un projet complet de CRUD pour une application.

## Prérequis
Le projet utilise les éléments suivants :
* Node.JS
* Express.JS
* EJS
* Mongoose
* JSDoc

## MySQL
Il faut créer une base de données 'cabinet_Medical'.
Elle contient la table medecin

medecins:
|nom | specialite | ville | CP | Telephone|
|--- | --- | --- | --- | ---|
|NORRIS | poingologue | TexasLand | 00000 | {fixe: "555-3345", mobile: ""}|

Voici la requête SQL pour créer la base et quelques médecins (jeu de données)
```
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS cabinet_medical
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cabinet_medical;

-- Création de la table medecins
CREATE TABLE IF NOT EXISTS medecins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    specialite VARCHAR(255),
    ville VARCHAR(255),
    CP INT,
    telephone_fixe VARCHAR(20),
    telephone_mobile VARCHAR(20)
) ENGINE=InnoDB;

USE cabinet_medical;
INSERT INTO medecins (nom, specialite, ville, CP, telephone_fixe, telephone_mobile) VALUES
('HOUSE', 'Médecine interne / Diagnostic', 'PRINCETON', 8540, '01.23.45.67.89', '06.12.34.56.78'),
('GRISSOM', 'Médecine légale', 'LAS VEGAS', 75000, '01.98.76.54.32', '06.98.76.54.32'),
('SHEPHERD', 'Neurochirurgie', 'SEATTLE', 69000, '04.56.78.90.12', '07.56.78.90.12'),
('WATSON', 'Médecine générale', 'LONDRES', 75001, '01.11.22.33.44', '06.11.22.33.44'),
('BECKETT', 'Médecine légale', 'LOS ANGELES', 13000, '04.22.33.44.55', '06.22.33.44.55'),
('FRANKENSTEIN', 'Chirurgie expérimentale', 'GENEVE', 74100, '04.50.11.22.33', '06.50.11.22.33'),
('STRANGE', 'Neurochirurgie', 'NEW YORK', 75002, '01.44.55.66.77', '07.44.55.66.77'),
('MALLARD', 'Médecine légale', 'WASHINGTON', 75003, '01.66.77.88.99', '06.66.77.88.99'),
('CUDDY', 'Endocrinologie / Administration', 'PRINCETON', 8540, '01.23.45.67.90', '06.23.45.67.90'),
('BAILEY', 'Chirurgie générale', 'SEATTLE', 69001, '04.56.78.90.13', '07.56.78.90.13'),
('GREY', 'Chirurgie générale', 'SEATTLE', 69002, '04.56.78.90.14', '07.56.78.90.14'),
('WILSON', 'Oncologie', 'PRINCETON', 8541, '01.23.45.67.91', '06.23.45.67.91'),
('DOOGIE HOWSER', 'Pédiatrie', 'LOS ANGELES', 13001, '04.22.33.44.56', '06.22.33.44.56'),
('QUINN', 'Médecine légale (Rome antique)', 'ROME', 0, '39.06.123.456', '39.33.123.456'),
('PHLOX', 'Médecine spatiale', 'ENTERPRISE', 0, 'N/A', '00.00.00.00.00');
```


## Installation
Les étapes d'installation sont :
* git clone https://github.com/droumanet/ExpressTemplate.git
* npm install
* node app.js

Vérifier que l'application se lance et accède à la base de données


## Fonctionnement
L'application utilise le design pattern MVC. Bien que ce ne soit pas nécessaire, le découpage est poussé à l'extrême.

### arborescence
Pour chaque partie (domaine ou fonction) de l'application On trouve donc un **routeur**, un **contrôleur**, un **modèle** et des **vue**.
L'arborescence est donc la suivante :
```
Express-Template
  |__ controllers
  |__ docs
  |__ models
  |__ node_modules
  |__ public
  |__ views
  
```

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

## Authentification


