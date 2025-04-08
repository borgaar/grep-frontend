// stores/counter.js
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { MessageControllerService, type ChatMessage } from "../api/services";

/**
 * Message mapped to userId (other user)
 */
type Messages = {
  [key: string]: ChatMessage[];
};

type Contact = {
  id: string;
};

export const useMessageStore = defineStore("message", () => {
  const messages = ref<Messages>({});
  const selectedContactId = ref<string | null>(null);
  const currentMessage = ref<string>("");
  const contacts = ref<Contact[]>([]);

  async function sendMessage(content: string) {
    if (!selectedContactId.value) return;

    const response = await MessageControllerService.sendMessage({
      requestBody: {
        recipientId: selectedContactId.value,
        content,
      },
    });

    currentMessage.value = "";

    // TODO capture id of message etc
  }

  async function setSelectedContact(contactId: string) {
    selectedContactId.value = contactId;

    // TODO fetch history
    const response = await MessageControllerService.getHistory({
      otherUser: contactId,
      page: 0,
      pageSize: 10,
    });

    const newMessages = dedupeMessages(response);
    messages.value[contactId] = newMessages;
    currentMessage.value = "";
  }

  const selectedContact = computed(() =>
    contacts.value.find((c) => c.id === selectedContactId.value),
  );

  return {
    setSelectedContact,
    sendMessage,
    messages,
    currentMessage,
    contacts,
    selectedContact,
  };
});

function dedupeMessages(messages: ChatMessage[]): ChatMessage[] {
  // Remove all duplicate messages by id
  const uniqueMessages = new Map<string, ChatMessage>();

  messages.forEach((message) => {
    if (!uniqueMessages.has(message.id)) {
      uniqueMessages.set(message.id, message);
    }
  });

  // Return the unique messages as an array
  return Array.from(uniqueMessages.values());
}
