import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const requireUser = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  return user;
};

const userWatchlistCollection = (userId: string) =>
  collection(db, "users", userId, "watchlist");

const userWatchlistDoc = (userId: string, movieId: number) =>
  doc(db, "users", userId, "watchlist", String(movieId));

const getMoviePayload = (movie: {
  movieId: number;
  title: string;
  posterPath?: string;
  overview?: string;
  releaseDate?: string;
  voteAverage?: string;
}) => ({
  movieId: movie.movieId,
  title: movie.title,
  posterPath: movie.posterPath || "",
  overview: movie.overview || "",
  releaseDate: movie.releaseDate || "",
  voteAverage: movie.voteAverage || "0.0",
});

export const addToWatchLater = async (movie: {
  movieId: number;
  title: string;
  posterPath?: string;
  overview?: string;
  releaseDate?: string;
  voteAverage?: string;
}) => {
  const user = requireUser();
  const docRef = userWatchlistDoc(user.uid, movie.movieId);
  const currentSnapshot = await getDoc(docRef);
  const currentData = currentSnapshot.exists() ? currentSnapshot.data() : null;

  await setDoc(docRef, {
    ...getMoviePayload(movie),
    isOnWatchlist: true,
    isWatched: Boolean(currentData?.isWatched),
  }, { merge: true });
};

export const removeFromWatchLater = async (movieId: number) => {
  const user = requireUser();
  const docRef = userWatchlistDoc(user.uid, movieId);
  const currentSnapshot = await getDoc(docRef);
  const currentData = currentSnapshot.exists() ? currentSnapshot.data() : null;

  await setDoc(docRef, {
    movieId,
    isOnWatchlist: false,
    isWatched: Boolean(currentData?.isWatched),
  }, { merge: true });
};

export const getWatchLaterMovies = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    userWatchlistCollection(user.uid),
    where("isOnWatchlist", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((snapshotDoc) => ({
    id: snapshotDoc.id,
    ...snapshotDoc.data(),
  }));
};

export const getWatchedMovies = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    userWatchlistCollection(user.uid),
    where("isWatched", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((snapshotDoc) => ({
    id: snapshotDoc.id,
    ...snapshotDoc.data(),
  }));
};

export const isMovieInWatchLater = async (movieId: number) => {
  const user = auth.currentUser;
  if (!user) return false;

  const snapshot = await getDoc(userWatchlistDoc(user.uid, movieId));
  if (!snapshot.exists()) return false;

  return Boolean(snapshot.data().isOnWatchlist);
};

export const isMovieWatched = async (movieId: number) => {
  const user = auth.currentUser;
  if (!user) return false;

  const snapshot = await getDoc(userWatchlistDoc(user.uid, movieId));
  if (!snapshot.exists()) return false;

  return Boolean(snapshot.data().isWatched);
};

export const setMovieWatchedStatus = async (
  movie: {
    movieId: number;
    title: string;
    posterPath?: string;
    overview?: string;
    releaseDate?: string;
    voteAverage?: string;
  },
  isWatched: boolean
) => {
  const user = requireUser();
  const docRef = userWatchlistDoc(user.uid, movie.movieId);
  const snapshot = await getDoc(docRef);
  const currentData = snapshot.exists() ? snapshot.data() : null;

  await setDoc(docRef, {
    ...getMoviePayload(movie),
    isOnWatchlist: Boolean(currentData?.isOnWatchlist),
    isWatched,
  }, { merge: true });
};