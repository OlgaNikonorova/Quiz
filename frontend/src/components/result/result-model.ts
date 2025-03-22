import { ResultAPI } from "@/api/result-api";
import { AuthUtil } from "@/utils/auth-util";

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  notAnswered: number;
}

export class ResultModel {
  public async getQuizResult(quizId: number): Promise<QuizResult> {
    try {
      const token = AuthUtil.getToken();
      const result = await ResultAPI.getQuizResult(quizId, token);
      return result;
    } catch (error) {
      console.error("Failed to load quiz result:", error);
      throw error;
    }
  }
}