import njwt from 'njwt';
import config from "../config/app.js";

export function encodeToken(tokenData) {
  return njwt.create(tokenData, config.appSecret).compact();
}

export function decodeToken(token) {
  return njwt.verify(token, config.appSecret).body;
}

// This express middleware attaches `userId` to the `req` object if a user is
// authenticated. This middleware expects a JWT token to be stored in the
// `Access-Token` header.
export const jwtAuthenticationMiddleware = (req, res, next) => {
  const token = req.header('Access-Token');
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;

    if (users.find(user => user.id === userId)) {
      req.userId = userId;
    }
  } catch (e) {
    return next();
  }

  next();
};

// This middleware stops the request if a user is not authenticated.
export async function isAuthenticatedMiddleware(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
  // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimLeft();
    }
    if (token) {
        njwt.verify(token, config.appSecret, (err, decoded) => {
            if (err) {
            return res.send({
                success: false,
                message: 'Token is not valid'
            });
            } else {
            req.decoded = decoded;
            next();
            }
        });
    }
    if(!token) {
      res.status(401);
      return res.send({ error: 'Please attach a bearer token' });
    }
}

