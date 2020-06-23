<template>
    <div>
        <div class="chatroom-chats-list" v-if="showChats">
            <div @click="showMessagesForChat(chat)" class="chatroom-chats-item" v-for="(chat, index) in chats"
                 :key="index">
                <img :src="chat.profile_img" alt="" class="chatroom-chats-item-image">
                <div class="chatroom-chats-item-info">
                    <h4 class="isansFont--faNum">
                        {{chat.other_person.first_name + " " + chat.other_person.last_name}}
                    </h4>
                </div>
                <button class="chatroom-chats-item-next">
                    <i class="material-icons">keyboard_arrow_left</i>
                </button>
            </div>
        </div>

        <div class="chatroom-messages-list" id="messagesBody" v-if="!showChats">
            <div @click="disableMessagesForChat" class="chatroom-chats-item active">
                <img :src="selectedChat.profile_img" class="chatroom-chats-item-image">
                <div class="chatroom-chats-item-info">
                    <h4 class="isansFont--faNum">
                        {{selectedChat.other_person.first_name + " " + selectedChat.other_person.last_name}}
                    </h4>
                </div>
                <button class="chatroom-chats-item-back">
                    <i class="material-icons">keyboard_backspace</i>
                </button>
            </div>

            <div class="chatroom-messages-item" v-for="(message, index) in selectedChatMessages" :key="index">
                <div class="chatroom-messages-item-content" :class="[{'content-other' : !message.is_sender_me}]"
                     v-if="message.messageType == 'TextMessage'">
                    <p class="chatroom-messages-item-content-text isansFont--faNum text-justify">
                        {{message.text_message}}
                    </p>
                    <span class="chatroom-messages-item-time isansFont--faNum">
                        {{getJalali(message.created).locale('fa').format('HH:mm')}}
                    </span>
                </div>
                <div class="chatroom-messages-item-content" :class="[{'content-other' : !message.is_sender_me}]"
                     v-else-if="message.messageType == 'ImageMessage'">
                    <img class="chatroom-messages-item-content-image"
                         src="../../../public/sneedsAssets/img/bg3.jpg" alt="">
                    <span class="chatroom-messages-item-time isansFont--faNum">
                        {{getJalali(message.created).locale('fa').format('HH:mm')}}
                    </span>
                </div>
                <div class="chatroom-messages-item-content content-file"
                     :class="[{'content-other' : !message.is_sender_me}]"
                     v-else-if="message.messageType == 'FileMessage'">
                    <button>
                        <i class="material-icons">play_arrow</i>
                    </button>
                    <p class="isansFont--faNum">
                        <span>
                            filename.mp3
                        </span>
                        <span>
                            12 مگابایت
                        </span>
                    </p>
                    <span class="chatroom-messages-item-time isansFont--faNum">
                        {{getJalali(message.created).locale('fa').format('HH:mm')}}
                    </span>
                </div>
            </div>
        </div>

        <form @submit.prevent="sendMessage" class="chatroom-messages-new" v-if="!showChats">
            <button type="button" class="chatroom-messages-new-attach">
                <i class="material-icons">attach_file</i>
            </button>
            <input type="text" class="chatroom-messages-new-input isansFont--faNum"
                   placeholder="متن پیام..." v-model="inputMessage">
            <button class="chatroom-messages-new-send">
                <i class="material-icons">
                    send
                </i>
            </button>
        </form>

    </div>


</template>

<script>
    import axios from 'axios';
    import jalali from "jalali-moment";

    export default {
        name: "MobileChatroom",
        data() {
            return {
                showChats: true,
                selectedChat: {},
                chats: [],
                selectedChatMessages: [],
                inputMessage: '',
                updateMessageInterval: null,
            }
        },
        created() {
            this.getChats();
            console.log('setting interval');
            this.updateMessageInterval = setInterval(() => {
                console.log('interval actived.');
                if(!this.showChats) {
                    console.log('open chat');
                    this.getMessagesForSelectedChat();
                } else {
                    console.log('no open chat')
                }
            }, 5000);
        },
        updated() {
            if(!this.showChats) {
                window.document.getElementById("messagesBody").scroll(0,10000);
            }
        },
        destroyed() {
            console.log('update mobile interval cleared');
            clearInterval(this.updateMessageInterval);
        },
        methods: {

            showMessagesForChat(chat) {
                this.showChats = false;
                this.selectedChat = chat;
                this.getMessagesForSelectedChat();
            },

            disableMessagesForChat() {
                this.showChats = true;
                this.selectedChat = {};
            },

            async getMessagesForSelectedChat() {
                try {
                    //this.$loading(true);
                    let result = await this.$api.get(`${this.$store.getters.getApi}/chat/messages/?chat=${this.selectedChat.id}&ordering=created`, this.$store.getters.httpConfig);
                    console.log('selected chats messages result ', result);
                    this.selectedChatMessages = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async sendMessage() {
                try {
                    let payload = new FormData();
                    payload.append("chat", this.selectedChat.id);
                    payload.append("text_message", this.inputMessage);
                    payload.append("messageType", "TextMessage");
                    let config = this.$store.getters.httpConfig;
                    config.headers["Content-Type"] = 'multipart/form-data';
                    let result = await this.$api.post(
                        `${this.$store.getters.getApi}/chat/messages/`,
                        payload,
                        config
                    );
                    console.log(result);
                    await this.getMessagesForSelectedChat();
                    this.inputMessage = '';
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                }
            },

            getJalali: function (date) {
                return jalali(date);
            },

            async getChats() {
                try {
                    //this.$loading(true);
                    let result = await this.$api.get(`${this.$store.getters.getApi}/chat/chats/`, this.$store.getters.httpConfig);
                    console.log('chats result ', result);
                    this.chats = result.data;
                    this.selectedChat = this.chats[0];
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },
        },

        computed: {
            isConsultant() {
                return this.$store.getters.getUserInfo.user_type == 'consultant';
            },
            userInfo() {
                return this.$store.getters.getUserInfo;
            },
        }
    }
</script>

<style scoped>
    .chatroom-chats-list {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        overflow: auto;
    }

    .chatroom-chats-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        cursor: pointer;
    }

    .chatroom-chats-item-next {
        margin: 0 auto 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background: none;
        color: #9038CC;
        border: none;
    }

    .chatroom-chats-item-next i {
        font-size: 30px;
    }

    .chatroom-chats-item-back {
        background: none;
        padding: 0;
        border: none;
        display: flex;
        align-items: center;
        margin: 0 auto 0 30px;
        color: #9038CC;
    }

    .chatroom-chats-item-back i {
        font-size: 30px;
    }

    .chatroom-chats-item:hover {
        background-color: #eee;
    }

    .chatroom-chats-item.active {
        border-bottom: 2px solid #ccc;
        z-index: 997;
        width: 100%;
        box-shadow:0 10px 30px -10px rgba(0,0,0,0.2);
        position: absolute;
        background-color: white;
    }

    .chatroom-chats-item:not(:last-child) {
        border-bottom: 2px solid #ccc;
    }

    .chatroom-chats-item img {
        width: 75px;
        height: 75px;
        margin-right: 5px;
        border-radius: 50%;
    }

    .chatroom-chats-item-info {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    }

    .chatroom-chats-item h4 {
        margin: 15px;
        font-weight: bold;
        font-size: 18px;
    }

    .chatroom-chats-item p {
        margin: 0;
        font-size: 12px;
    }

    .chatroom-messages-title h4 {
        margin: 0 auto;
    }

    .chatroom-messages-title-icons button {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        margin-left: 15px;
    }

    .chatroom-messages-title-icons button i {
        font-size: 24px;
        color: #B286DD;
    }

    .chatroom-messages-list {
        overflow: auto;
        height: calc(100vh - 120px);
    }

    .chatroom-messages-item {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        position: relative;
        margin-top: 50px;
    }

    .chatroom-messages-item:nth-child(2) {
        margin-top: 120px;
    }

    .chatroom-messages-list::-webkit-scrollbar {
        width: 5px;
    }

    .chatroom-messages-list::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: white;
    }

    .chatroom-messages-list::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .chatroom-messages-item-content {
        border: 1px solid #74BDBC;
        border-radius: 15px 15px 5px 15px;
        width: 100%;
        margin-right: 65px;
        margin-left: 15px;
        padding: 10px;
        font-size: 16px;
        color: #4B6969;
        background-color: #E7FFFF;
    }

    .chatroom-messages-item-content-text {
        word-break: break-word;
    }

    .chatroom-messages-item-content.content-other {
        background-color: white;
    }

    .chatroom-messages-item-content-image {
        width: 100%;
        border-radius: 15px;
    }

    .chatroom-messages-item-content.content-file {
        display: flex;
        align-items: center;
    }

    .chatroom-messages-item-content.content-file button {
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #76BDBA;
        border: none;
        border-radius: 50%;
        color: white;
        width: 35px;
        height: 35px;
    }

    .chatroom-messages-item-content.content-file p {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
    }

    .chatroom-messages-item-content.content-file p span:first-child {
        font-weight: bold;
    }

    .chatroom-messages-item-time {
        float: left;
        margin-top: 10px;
    }

    .chatroom-messages-item-content.content-file .chatroom-messages-item-time {
        float: initial;
        margin-right: auto;
    }

    .chatroom-messages-new {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
        background-color: #f3f3f3;
        margin: 10px;
        border-radius: 5px;
        position: fixed;
        width: calc(100% - 20px);
        left: 0;
        bottom: 0;
    }

    .chatroom-messages-new-attach {
        margin: 0 20px;
        padding: 0;
        border: none;
        background: none;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9038CC;
    }

    .chatroom-messages-new-input {
        height: 40px;
        width: calc(100%);
        border: none;
        background-color: #f3f3f3;
    }

    .chatroom-messages-new-send {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 15px;
        font-size: 20px;
        transform: rotate(180deg);
        background: none;
        border: none;
        color: #2EAFEC;
    }
</style>