import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loadJson, saveJson, STORAGE_KEYS } from "@/lib/storage";

export type CompletedJob = {
  id: string;
  completedOn: string;
};

type Action =
  | { type: "complete"; id: string; completedOn: string }
  | { type: "undo"; id: string }
  | { type: "hydrate"; jobs: CompletedJob[] };

type CompletedJobsContextValue = {
  completedJobs: CompletedJob[];
  markComplete: (id: string) => void;
  undoComplete: (id: string) => void;
  hydrated: boolean;
};

function completedJobsReducer(
  completedJobs: CompletedJob[],
  action: Action,
): CompletedJob[] {
  switch (action.type) {
    case "hydrate":
      return action.jobs;
    case "complete":
      if (completedJobs.some((job) => job.id === action.id)) {
        return completedJobs;
      }
      return [
        ...completedJobs,
        { id: action.id, completedOn: action.completedOn },
      ];
    case "undo":
      return completedJobs.filter((job) => job.id !== action.id);
    default:
      return completedJobs;
  }
}

const CompletedJobsContext = createContext<CompletedJobsContextValue | undefined>(
  undefined,
);

export function CompletedJobsProvider({ children }: { children: ReactNode }) {
  const [completedJobs, dispatch] = useReducer(completedJobsReducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadJson<CompletedJob[]>(STORAGE_KEYS.completedJobs, []).then((jobs) => {
      dispatch({ type: "hydrate", jobs });
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveJson(STORAGE_KEYS.completedJobs, completedJobs);
    }
  }, [completedJobs, hydrated]);

  function markComplete(id: string) {
    dispatch({
      type: "complete",
      id,
      completedOn: new Date().toLocaleDateString(),
    });
  }

  function undoComplete(id: string) {
    dispatch({ type: "undo", id });
  }

  return (
    <CompletedJobsContext.Provider
      value={{ completedJobs, markComplete, undoComplete, hydrated }}
    >
      {children}
    </CompletedJobsContext.Provider>
  );
}

export function useCompletedJobs() {
  const context = useContext(CompletedJobsContext);

  if (context === undefined) {
    throw new Error("useCompletedJobs must be used inside CompletedJobsProvider");
  }

  return context;
}
