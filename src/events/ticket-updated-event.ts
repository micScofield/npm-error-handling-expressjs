import { Subjects } from './subjects'

export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated
    data: {
        id: string
        title:string
        price: number
        userId: string
        version: number
        orderId?: string //? marks it as an optional parameter. Using this because we are keeping track of ticket reserve status using orderId. We will manipulate this field on "order:created" and "order:cancelled" events
    }
}