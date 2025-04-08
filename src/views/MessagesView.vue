<script lang="ts" setup>
import { formatShort } from "@/locale/date";
import { useMessageStore } from "@/state/message";
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
          <div class="message-content">{{ message.content }}</div>
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

.icon-call {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z'/%3E%3C/svg%3E");
}

.icon-video {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z'/%3E%3C/svg%3E");
}

.icon-more {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'/%3E%3C/svg%3E");
}

.icon-attachment {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z'/%3E%3C/svg%3E");
}

.icon-send {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'/%3E%3C/svg%3E");
}
</style>
