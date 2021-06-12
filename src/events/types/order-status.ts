export enum OrderStatus {
    Created = 'created', 
    // reserving a ticket ?

    Cancelled = 'cancelled',
    // already reserved by other user ? -> fail order, User cancelled ? -> unlock ticket, Order expired ? -> unlock ticket

    AwaitingPayment = 'awaiting:payment', 
    // User reserved a ticket

    Complete = 'complete'
}