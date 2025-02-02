import { useEffect, useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

export const useSession = (sessionId: string) => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) return;
    const unsubscribe = onSnapshot(doc(db, "sessionQuiz", sessionId), (doc) =>
      setSession(doc.data())
    );
    return unsubscribe;
  }, [sessionId]);

  return { session };
};

export const useParticipants = (sessionId: string) => {
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    const unsubscribe = onSnapshot(
      collection(db, `sessions/${sessionId}/participants`),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const parts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParticipants(parts);
      }
    );
    return unsubscribe;
  }, [sessionId]);

  return { participants };
};
