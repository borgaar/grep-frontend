<script lang="ts" setup>
import { formatShort } from "@/locale/date";
import { useMessageStore, type Message } from "@/state/message";
import { useUserStore } from "@/state/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { sendMessage, setSelectedContact, fetchContacts } = useMessageStore();
const { messages, selectedContact, currentMessage, contacts } = storeToRefs(useMessageStore());
const { user: currentUser } = useUserStore();

// Lifecycle hooks
onMounted(() => {
  fetchContacts();
});

const getMessageContent = (message: Message): string => {
  const author =
    message.senderId == currentUser?.phone
      ? currentUser?.firstName
      : contacts.value.find((u) => u.phone === message.senderId)?.firstName;

  switch (message.type) {
    case "TEXT":
      return message.content;
    case "MARKED_SOLD":
      return t("author-marked-sold", {
        user: author,
      });
    case "RESERVED":
      return t("user-marked-as-reserved", { user: author });
  }
};
</script>

<template>
  <div class="chat-container">
    <!-- Left sidebar with contacts -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>{{ t("meldinger") }}</h2>
        <div class="search-container">
          <input type="text" placeholder="Søk" class="search-input" />
        </div>
      </div>
      <div class="contacts-list">
        <div
          v-for="contact in contacts"
          :key="contact.phone"
          :class="['contact-item', { active: contact.phone === selectedContact?.phone }]"
          @click="setSelectedContact(contact.phone)"
        >
          <div class="avatar">
            <div class="name-initials">{{ contact.firstName[0] }}{{ contact.lastName[0] }}</div>
          </div>
          <div class="contact-info">
            <div class="contact-name">{{ contact.firstName }} {{ contact.lastName }}</div>
            <div class="contact-last-message">{{ contact.lastMessageContent }}</div>
          </div>
          <div class="contact-time">
            {{ formatShort(new Date(contact.lastMessageTimestamp)) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Right chat section -->
    <div class="chat-section">
      <!-- Chat header -->
      <div class="chat-header">
        <div class="chat-user-info">
          <div class="avatar">
            <div class="name-initials">
              {{ selectedContact?.firstName?.[0] || "" }}{{ selectedContact?.lastName?.[0] || "" }}
            </div>
          </div>
          <div class="contact-name">
            {{ selectedContact?.firstName }} {{ selectedContact?.lastName }}
          </div>
        </div>
      </div>

      <!-- Chat messages area -->
      <div class="messages-container">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.senderId === currentUser?.phone ? 'sent' : 'received']"
        >
          <div class="message-content">{{ getMessageContent(message) }}</div>
          <div class="message-time">{{ formatShort(new Date(message.timestamp)) }}</div>
        </div>
      </div>

      <!-- Message input area -->
      <div class="message-input-container">
        <InputText
          v-model="currentMessage"
          type="text"
          :placeholder="t('skriv-en-melding')"
          class="message-input"
          @keyup.enter="sendMessage"
        />
        <Button icon="pi pi-send" @click="sendMessage"> </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: calc(100vh - 60px); /* Subtract navbar height */
  font-family: Arial, sans-serif;
}

/* Sidebar styles */
.sidebar {
  width: 300px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-header h2 {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #333;
}

.search-container {
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.contacts-list {
  flex: 1;
  overflow-y: auto;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-item:hover {
  background-color: #eaeaea;
}

.contact-item.active {
  background-color: var(--p-emerald-100);
}

.avatar {
  position: relative;
  margin-right: 15px;
}

.name-initials {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--p-emerald-400);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #f5f5f5;
}

.status-indicator.online {
  background-color: #4caf50;
}

.status-indicator.offline {
  background-color: #9e9e9e;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.contact-last-message {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

/* Chat section styles */
.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

.chat-user-info {
  display: flex;
  align-items: center;
}

.chat-actions {
  display: flex;
}

.action-button {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.action-button:hover {
  background-color: #eaeaea;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column-reverse;
}

.message {
  max-width: 70%;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 10px 15px;
  position: relative;
  clear: both;
}

.message.sent {
  align-self: flex-end;
  background-color: var(--p-emerald-200);
  color: #333;
}

.message.received {
  align-self: flex-start;
  background-color: #fff;
  color: #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-content {
  margin-bottom: 5px;
  word-wrap: break-word;
}

.message-time {
  font-size: 10px;
  color: #999;
  text-align: right;
}

.message-input-container {
  display: flex;
  align-items: center;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

.attachment-button,
.send-button {
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
}

.attachment-button:hover,
.send-button:hover {
  color: #2196f3;
}

.message-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  margin: 0 10px;
  outline: none;
}

/* Icons (you would replace these with actual icons in a real app) */
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: currentColor;
  -webkit-mask-size: cover;
  mask-size: cover;
}
</style>
