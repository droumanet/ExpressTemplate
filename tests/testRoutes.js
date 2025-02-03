// importer les bibliothèques pour exécuter les tests
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Importer l'application Express
const expect = chai.expect;

chai.use(chaiHttp);

describe('Routes', () => {
  it('devrait rendre la page index.ejs', (done) => {
    chai.request(app)
      .get('/') // Tester la route GET /
      .end((err, res) => {
        expect(res).to.have.status(200); // Vérifier que le statut est 200
        expect(res.text).to.include('Bienvenue'); // Vérifier que la réponse contient du texte de la page EJS
        done();
      });
  });

  it('devrait retourner une erreur 404 pour une route inexistante', (done) => {
    chai.request(app)
      .get('/route-inexistante') // Tester une route qui n'existe pas
      .end((err, res) => {
        expect(res).to.have.status(404); // Vérifier que le statut est 404
        done();
      });
  });
});