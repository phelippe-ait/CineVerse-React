import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const addToWatchLater = async (movie: {
  movieId: number;
  title: string;
  posterPath?: string;
  overview?: string;
  releaseDate?: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(
    collection(db, "watchLater"),
    where("userId", "==", user.uid),
    where("movieId", "==", movie.movieId)
  );

  const existing = await getDocs(q);
  if (!existing.empty) return;

  await addDoc(collection(db, "watchLater"), {
    userId: user.uid,
    movieId: movie.movieId,
    title: movie.title,
    posterPath: movie.posterPath || "",
    overview: movie.overview || "",
    releaseDate: movie.releaseDate || "",
  });
};

export const removeFromWatchLater = async (movieId: number) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(
    collection(db, "watchLater"),
    where("userId", "==", user.uid),
    where("movieId", "==", movieId)
  );

  const snapshot = await getDocs(q);

  const deletes = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletes);
};

export const getWatchLaterMovies = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "watchLater"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const isMovieInWatchLater = async (movieId: number) => {
  const user = auth.currentUser;
  if (!user) return false;

  
  const q = query(
    collection(db, "watchLater"),
    where("userId", "==", user.uid),
    where("movieId", "==", movieId)
  );

  const snapshot = await getDocs(q);
  return !snapshot.empty;
};