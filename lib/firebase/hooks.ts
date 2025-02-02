import { useEffect, useState } from "react";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const useSession = (sessionId: string) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(
      doc(db, "sessionQuiz", sessionId),
      (doc) => {
        if (doc.exists()) {
          setSession({ id: doc.id, ...doc.data() });
          setLoading(false);
        } else {
          setError(new Error("Session not found"));
          setLoading(false);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  return { session, loading, error };
};

export const useParticipants = (sessionId: string) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(
      collection(db, `sessionQuiz/${sessionId}/participants`),
      (snapshot) => {
        const parts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          joinedAt: doc.data().joinedAt?.toDate().toISOString(),
        }));
        setParticipants(parts);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  return { participants, loading, error };
};
