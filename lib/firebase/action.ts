import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const createSession = async (quizId: string) => {
  const pin = await generateUniquePin();
  const sessionRef = await addDoc(collection(db, "sessionQuiz"), {
    quizId,
    pin,
    status: "waiting",
    currentQuestion: -1,
    createdAt: serverTimestamp(),
  });
  return { sessionId: sessionRef.id, pin };
};

export const checkSession = async (pin: string) => {
  const sessionsQuery = query(
    collection(db, "sessionQuiz"),
    where("pin", "==", pin)
  );
  const snapshot = await getDocs(sessionsQuery);
  if (snapshot.empty) throw new Error("Invalid PIN");
  return snapshot.docs[0].id;
};

export const joinSession = async (pin: string, nickname: string) => {
  const sessionsQuery = query(
    collection(db, "sessionQuiz"),
    where("pin", "==", pin)
  );
  const snapshot = await getDocs(sessionsQuery);

  if (snapshot.empty) throw new Error("Invalid PIN");

  const session = snapshot.docs[0];
  if (session.data().status !== "waiting")
    throw new Error("Session already started");

  const participantRef = await addDoc(
    collection(db, `sessionQuiz/${session.id}/participants`),
    {
      nickname,
      joinedAt: serverTimestamp(),
    }
  );

  return { sessionId: session.id, participantId: participantRef.id };
};

const generateUniquePin = async () => {
  let pin = "";
  let exists = true;

  while (exists) {
    pin = Math.floor(100000 + Math.random() * 900000).toString();
    const q = query(collection(db, "sessionQuiz"), where("pin", "==", pin));
    const snapshot = await getDocs(q);
    exists = !snapshot.empty;
  }
  return pin;
};

export const startQuiz = async (sessionId: string) => {
  await updateDoc(doc(db, "sessionQuiz", sessionId), {
    status: "started",
    currentQuestion: 0,
    startTime: serverTimestamp(),
  });
};
