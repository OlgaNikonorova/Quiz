import { State } from "@/core/state";

export interface AppState {
  user: string | null;
  quizId: number | null;
  questionId: number | null;
  authToken: string | null;
}

export const AppStore = new State<AppState>({
  user: null,
  quizId: null,
  questionId: null,
  authToken: null,
});
