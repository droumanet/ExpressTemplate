import jwt from 'jsonwebtoken'

const authentificationRights = {
  checkCookieJWT(req, res, next) {
    const SECRET = 'AppKey'
    const token = req.cookies?.access_token		// Vérifie que res.cookies existe (évite une erreur)

    if (!token) {
      return res.render('main', { message: 'Erreur : le token n’existe pas.' })
    }

    try {
      const decoded = jwt.decode(token)
      console.log("Contenu token", decoded, decoded.exp)
      if (decoded?.exp) {
        console.log('Expiration :', new Date(decoded.exp * 1000).toLocaleString());
        console.log('En UTC :', new Date(decoded.exp * 1000).toISOString());
      }

      const data = jwt.verify(token, SECRET)
      console.log("Vérification :",data)
      return next()
    } catch {
      console.log('Token invalide ou expiré')
      return res.render('main', { message: 'Erreur : veuillez vous authentifier.'})
    }
  },
}

export default authentificationRights