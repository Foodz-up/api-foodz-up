mport { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    
    async handleConnection(){

        // Notify connected clients of current users
        this.server.emit('users', 'Someone has come !');

    }

    async handleDisconnect(){

        this.server.emit('users', 'Someone has gone !');

    }

    @SubscribeMessage('order')
    async onChat(client, order){
        client.broadcast.emit('order', order);
    }

}
