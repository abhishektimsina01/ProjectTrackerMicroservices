import amqplib from "amqplib"
import { channel } from "../server.js"

export const createChannel = async() => {
    const connection = await amqplib.connect("")
    const channel = await connection.createChannel()
    await channel.assertExchange("user.exchange", "direct")
    const q = await channel.assertQueue("user_queue")
    await channel.bindQueue("user_queue", "user.exchange", "user_email_key")
    return channel
}

export const publishMessage = async(channel, exchange, routing_key) => {
    
}