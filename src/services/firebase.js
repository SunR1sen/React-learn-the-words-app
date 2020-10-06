import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import firebaseConfig from "./firebaseConfig";

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = firebase.auth();
        this.database = firebase.database();
        this.userUid = null;
    }

    setUserUid = (uid) => (this.userUid = uid);

    signOut = () => this.auth.signOut();

    createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`);
}

export default Firebase;