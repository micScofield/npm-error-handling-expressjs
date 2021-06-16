import { Subjects } from './subjects'

export interface PaymentCreatedEvent {
    subject: Subjects.PaymentCreated
    data: {
        id: string,
        price: number,
        userId: string,
        version: number
    }
}