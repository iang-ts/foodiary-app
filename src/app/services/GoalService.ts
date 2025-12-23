import { Service } from './Service';

export class GoalService extends Service {
  static async updateGoal(payload: GoalService.UpdateGoalPayload): Promise<void> {
    await this.httpClient.put('/goal', payload);
  }
}

export namespace GoalService {
  export type UpdateGoalPayload = {
    calories: number;
    carbohydrates: number;
    proteins: number;
    fats: number;
  };
}
