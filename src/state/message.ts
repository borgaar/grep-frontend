// stores/counter.js
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { MessageControllerService, type ChatContactDTO, type SendResponse } from "../api/services";

/**
 * Message mapped to userId (other user)
 */
type Messages = {
  [key: string]: Message[];
};

export type Message = SendResponse;

export const useMessageStore = defineStore("message", () => {
  const messages = ref<Messages>({});
  const selectedContactPhone = ref<string | null>(null);
  const currentMessage = ref<string>("");
  const contacts = ref<ChatContactDTO[]>([]);

  async function sendMessage() {
    if (!selectedContactPhone.value) return;
    const content = currentMessage.value.trim();

    const message = await MessageControllerService.sendMessage({
      requestBody: {
        recipientId: selectedContactPhone.value,
        content,
      },
    });

    currentMessage.value = "";
    messages.value[selectedContactPhone.value].push(message);
  }

  async function setSelectedContact(contactPhone: string) {
    selectedContactPhone.value = contactPhone;

    // TODO fetch history
    const response = await MessageControllerService.getHistory({
      otherUser: contactPhone,
      page: 0,
      pageSize: 10,
    });

    const newMessages = dedupeMessages(response);
    messages.value[contactPhone] = newMessages;
    currentMessage.value = "";
  }

  const selectedContact = computed(() =>
    contacts.value.find((c) => c.phone === selectedContactPhone.value),
  );

  const currentMessages = computed(() =>
    Boolean(selectedContactPhone) ? (messages.value[selectedContactPhone.value!] ?? []) : [],
  );

  return {
    setSelectedContact,
    sendMessage,
    messages: currentMessages,
    currentMessage,
    contacts,
    selectedContact,
  };
});

/**
 * Removes all duplicate messages if overlapping after API fetch
 */
function dedupeMessages(messages: Message[]): Message[] {
  // Remove all duplicate messages by id
  const uniqueMessages = new Map<string, Message>();

  messages.forEach((message) => {
    if (!uniqueMessages.has(message.id)) {
      uniqueMessages.set(message.id, message);
    }
  });

  // Return the unique messages as an array
  return Array.from(uniqueMessages.values());
}
