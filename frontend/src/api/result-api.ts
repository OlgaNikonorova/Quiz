import { QuizResult } from "@/types/result";
import { API_URL } from "./api-url";


export class ResultAPI {
  public static async getQuizResult(quizId: number, token: string): Promise<QuizResult> {
    const response = await fetch(`${API_URL}/quizzes/${quizId}/result`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    return data as QuizResult;
  }
}