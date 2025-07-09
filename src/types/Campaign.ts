import { daysBetween } from '@/helpers/dates'

export class Campaign {
  startDate: Date
  endDate: Date
  totalBudget: number
  duration: number
  acceptTerms: boolean

  constructor (
    startDate: Date,
    endDate: Date,
    minDayBudget: number,
  ) {
    this.startDate = startDate
    this.endDate = endDate
    this.duration = daysBetween(this.startDate, this.endDate)
    this.totalBudget = this.duration * minDayBudget
    this.acceptTerms = false
  }
}
