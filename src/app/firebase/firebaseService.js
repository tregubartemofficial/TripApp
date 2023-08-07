import firebase from './config'
import "firebase/compat/auth";

const db = firebase.firestore();

export function listenToTripsFromFirestore(callback) {
  return db.collection("trips").onSnapshot(
    (snapshot) => {
      const tripsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        city: doc.data().city,
        startDate: doc.data().startDate,
        endDate: doc.data().endDate,
      }));
      callback(tripsData);
    },
    (error) => {
      console.error("Error listening to trips:", error);
    }
  );
}

export function addTripToFirestore(trip) {
  return db.collection("trips").add(trip);
}

export async function socialLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      console.log('Hello new user', result.user);
    }
  } catch (error) {
    console.log(error.message);
  }
}