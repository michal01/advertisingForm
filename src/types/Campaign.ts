export class Campaign {
  startDate: Date
  endDate: Date
  totalBudget: number
  duration: number
  acceptTerms: boolean

  constructor (
    startDate: Date,
    endDate: Date,
  ) {
    this.startDate = startDate
    this.endDate = endDate
    this.totalBudget = 0
    this.duration = 0
    this.acceptTerms = false
  }
}
