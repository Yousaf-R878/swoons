import { getAuth } from "firebase-admin/auth";

async function checkAuth(req, res, next) {
  const idToken = req.headers.authorization?.split(" ")[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("You are not authorized");
  }
}

export default { checkAuth };
