import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import app from "./Config";

const auth = getAuth(app);

export function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUpFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function googleSignInFirebase() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function facebookSigIinFirebase() {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
}

export function gitHubSignInFirebase() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

export function signOutFirebase() {
  return signOut(auth);
}
