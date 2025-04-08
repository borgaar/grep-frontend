// stores/counter.js
import { defineStore } from "pinia";
import { computed, onUnmounted, ref } from "vue";
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
  const contactPage = ref(0);
  const interval = ref<number | null>(null);

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
    messages.value[selectedContactPhone.value].unshift(message);
  }

  async function setSelectedContact(contactPhone: string) {
    if (interval.value) {
      clearInterval(interval.value);
    }
    selectedContactPhone.value = contactPhone;

    const response = await MessageControllerService.getHistory({
      otherUser: contactPhone,
      page: 0,
      pageSize: 10,
    });

    const newMessages = dedupeMessages(response);
    messages.value[contactPhone] = newMessages;
    currentMessage.value = "";

    // Start polling for messages
    interval.value = window.setInterval(async () => {
      const newMessages = await MessageControllerService.getHistory({
        otherUser: contactPhone,
        page: 0,
        pageSize: 10,
      });

      const dedupedMessages = dedupeMessages(newMessages);
      messages.value[contactPhone] = dedupedMessages;
    }, 1000);
  }

  async function fetchContacts() {
    const response = await MessageControllerService.getContacts({
      page: contactPage.value,
      pageSize: 10,
    });
    contactPage.value++;
    contacts.value.push(...response);

    if (!Boolean(selectedContactPhone.value)) {
      setSelectedContact(response[0].phone);
    }
  }

  const selectedContact = computed(() =>
    contacts.value.find((c) => c.phone === selectedContactPhone.value),
  );

  const currentMessages = computed(() =>
    Boolean(selectedContactPhone) ? (messages.value[selectedContactPhone.value!] ?? []) : [],
  );

  onUnmounted(() => {
    if (interval.value) clearInterval(interval.value);
  });

  return {
    setSelectedContact,
    sendMessage,
    fetchContacts,
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
