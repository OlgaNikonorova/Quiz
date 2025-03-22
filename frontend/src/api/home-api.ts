import { Quiz } from "@/components/home/home-model";
import { API_URL } from "./api-url";

export class HomeAPI {
  static async getQuizzes(token: string): Promise<Quiz[]> {
    const response = await fetch(`${API_URL}/quizzes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        JSON.stringify({ message: data.message, status: response.status }),
      );
    }

    return data as Quiz[];
  }
}
