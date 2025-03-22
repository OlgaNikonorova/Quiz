import { Question } from "@/components/quiz/quiz-model";
import { API_URL } from "./api-url";

export class QuizAPI {
  public static async answerQuestion(
    questionId: number,
    answerIndex: number,
    token: string,
  ): Promise<boolean> {
    const response = await fetch(`${API_URL}/questions/${questionId}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answerIndex }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    const responseText = await response.text();
    return responseText.toLowerCase() === "true";
  }

  static async getLastQuestionId(
    quizId: number,
    token: string,
  ): Promise<number> {
    const response = await fetch(`${API_URL}/quizzes/${quizId}/last-question`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    return Number(await response.text());
  }

  static async getQuestions(
    quizId: number,
    token: string,
  ): Promise<Question[]> {
    const response = await fetch(`${API_URL}/quizzes/${quizId}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    const questions: Question[] = await response.json();

    return questions;
  }
}
