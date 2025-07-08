// Klasa CampaignBuilder przyjmuje startDate i endDate, a zwraca pełny obiekt campaign
export interface Campaign {
  startDate: Date;
  endDate: Date;
  totalBudget: number;
  duration: number;
  acceptTerms: boolean;
}

export class CampaignBuilder {
  private startDate: Date;
  private endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  build(): Campaign {
    const duration = this.daysBetween(this.startDate, this.endDate) + 1;
    const minDayBudget = 30;
    const totalBudget = duration * minDayBudget;
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      totalBudget,
      duration,
      acceptTerms: false,
    };
  }

  private daysBetween(date1: Date, date2: Date): number {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = Math.abs(d2.getTime() - d1.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}
