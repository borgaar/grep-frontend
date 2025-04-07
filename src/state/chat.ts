// src/store/chatStore.js
import { defineStore } from "pinia";
import { Client, type Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ref } from "vue";

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export const useChatStore = defineStore("chat", () => {
  // Connection state
  const isConnected = ref(false);
  const stompClient = ref<Client | null>(null);

  // Error handling
  const connectionError = ref<string | null>(null);

  // Configure and connect to WebSocket
  const connectToWebSocket = (
    serverUrl: string = "http://localhost:8080/ws-connection",
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const socket = new SockJS(serverUrl);
        const client = new Client({
          webSocketFactory: () => socket,
          debug: (str) => {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          onConnect: () => {
            isConnected.value = true;
            connectionError.value = null;
            console.log("WebSocket connection established");
            resolve(true);
          },
          onStompError: (frame) => {
            connectionError.value = `STOMP error: ${frame.headers["message"]}`;
            console.error("STOMP error:", frame);
            reject(new Error(`STOMP error: ${frame.headers["message"]}`));
          },
          onWebSocketError: (event) => {
            connectionError.value = "WebSocket connection error";
            console.error("WebSocket error:", event);
            reject(new Error("WebSocket connection error"));
          },
        });

        client.activate();
        stompClient.value = client;
      } catch (error) {
        connectionError.value = `Connection error: ${error}`;
        console.error("Error setting up WebSocket connection:", error);
        reject(error);
      }
    });
  };

  // Disconnect from WebSocket
  const disconnectFromWebSocket = (): Promise<void> => {
    return new Promise((resolve) => {
      if (stompClient.value && stompClient.value.connected) {
        stompClient.value.deactivate().then(() => {
          isConnected.value = false;
          stompClient.value = null;
          console.log("WebSocket connection closed");
          resolve();
        });
      } else {
        isConnected.value = false;
        stompClient.value = null;
        resolve();
      }
    });
  };

  // Check connection status
  const isWebSocketConnected = (): boolean => {
    return isConnected.value;
  };

  // Subscribe to a topic
  const subscribeToTopic = (
    topic: string,
    callback: (message: any) => void,
  ): { unsubscribe: () => void } | null => {
    if (!stompClient.value || !stompClient.value.connected) {
      console.error("Cannot subscribe: WebSocket is not connected");
      return null;
    }

    const subscription = stompClient.value.subscribe(topic, (message: Message) => {
      try {
        const parsedBody = JSON.parse(message.body);
        callback(parsedBody);
      } catch (error) {
        console.error("Error parsing message:", error);
        callback(message.body);
      }
    });

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
      },
    };
  };

  // Send a message to the server
  const sendMessage = (destination: string, body: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!stompClient.value || !stompClient.value.connected) {
        reject(new Error("Cannot send message: WebSocket is not connected"));
        return;
      }

      try {
        const jsonBody = typeof body === "string" ? body : JSON.stringify(body);
        stompClient.value.publish({
          destination: `/ws${destination}`, // Prepend the application prefix
          body: jsonBody,
        });
        resolve();
      } catch (error) {
        console.error("Error sending message:", error);
        reject(error);
      }
    });
  };

  // Send a chat message
  const sendChatMessage = (content: string, userId: string): Promise<void> => {
    const message = {
      content: content,
    };
    return sendMessage("/send", message);
  };

  return {
    connectToWebSocket,
    disconnectFromWebSocket,
    isWebSocketConnected,
    subscribeToTopic,
    sendMessage,
    sendChatMessage,
    isConnected,
    connectionError,
  };
});
