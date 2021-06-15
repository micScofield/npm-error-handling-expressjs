import { Message, Stan } from 'node-nats-streaming'

import { Subjects } from './subjects'

//specifying a generic event for different listeners
interface Event {
    subject: Subjects
    data: any
}

//make sure to extend Event so as to make sure we dont enter incorrect subject names
export abstract class Listener<T extends Event> {
    
    abstract subject: T['subject']
    abstract queueGroupName: string
    abstract onMessage(data: T['data'], msg: Message): void

    protected client: Stan // deliberately made protected so the child classes can use this client to publish an event from within listener files. Otherwise if this was private, we would have to import natsWrapper.client and we would have faced issues while testing as we are mocking that natswrapper import and extra imports means files are tied together. Better prevent that and use protected here instead of private.
    protected ackWait = 5 * 1000

    constructor(client: Stan) {
        this.client = client
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

    listen() {
        // create a subscription
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`)

            const parsedData = this.parseMessage(msg)

            this.onMessage(parsedData, msg)
        })
    }

    parseMessage(msg: Message) {
        const data = msg.getData()

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8')) //in case we receive a buffer
    }
}