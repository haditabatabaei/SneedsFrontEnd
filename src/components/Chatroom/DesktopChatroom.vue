<template>
    <div class="chatroom-box gadugiFont">
        <div class="chatroom-chats">
            <div class="chatroom-chats-search">
                <input type="text" placeholder="Search" class="chatroom-chats-search-input">
            </div>

            <div class="chatroom-chats-list" v-if="chats.length > 0">
                <div @click="setSelectedChat(chat)"
                     class="chatroom-chats-item"
                     :class="[{'active' : selectedChat && selectedChat.id === chat.id}]"
                     v-for="chat in chats"
                     >
                    <img v-if="chat.profile_img" :src="chat.profile_img" :alt="`${chat.other_person.first_name} ${chat.other_person.last_name}`" class="chatroom-chats-item-image">
                    <img v-else src="/sneedsAssets/img/profile.png" :alt="`${chat.other_person.first_name} ${chat.other_person.last_name}`" class="chatroom-chats-item-image">
                    <div class="chatroom-chats-item-info">
                        <h4 class="gadugiFont">
                            {{chat.other_person.first_name + " " + chat.other_person.last_name}}
                        </h4>
                    </div>
                </div>
            </div>
            <div class="chatroom-chats-list" v-else>
                <p class="gadugiFont">
                    There is no chat to show.
                </p>
            </div>

        </div>
        <div class="chatroom-messages">
            <div class="chatroom-messages-title" v-if="windowWidth > 991.8">
                <h4 class="gadugiFont" v-if="selectedChat">
                    {{this.selectedChat.other_person.first_name + " " + this.selectedChat.other_person.last_name}}
                </h4>
            </div>

            <div class="chatroom-messages-list" id="messagesBody" @scroll="messageBodyScroll" v-if="selectedChat">
                <button class="new-messages-toggler" v-if="showScrollButton" @click="scrollDownMessages">
                    <span class="gadugiFont">
                        {{numberOfNewMessages}}
                    </span>
                    <i class="material-icons">keyboard_arrow_down</i>
                </button>
                <div class="chatroom-messages-item" v-for="(message, index) in selectedChatMessages"
                     @mouseenter="mouseOnMessage(message)" :key="index">
                    <img draggable="false" :src="message.profile_img"
                         class="chatroom-messages-item-avatar" alt=""
                         v-if="message.profile_img && message.messageType != 'VoiceMessage'">

                    <img draggable="false" src="/sneedsAssets/img/profile.png"
                         class="chatroom-messages-item-avatar" alt="" v-else-if="message.messageType != 'VoiceMessage'">

                    <div class="chatroom-messages-item-content"
                         :class="[{'content-other' : !message.is_sender_me, 'chatroom-messages-item-content--unseen': messageInUnseen(message)}]"
                         v-if="message.messageType == 'TextMessage'">
                        <p class="chatroom-messages-item-content-text gadugiFont text-justify">
                            {{message.text_message}}
                        </p>
                        <span class="chatroom-messages-item-time gadugiFont">
                            {{getJalali(message.created).locale('fa').format('HH:mm')}}
                        </span>
                    </div>
                    <div class="chatroom-messages-item-content"
                         :class="[{'content-other' : !message.is_sender_me, 'chatroom-messages-item-content--unseen': messageInUnseen(message)}]"
                         v-else-if="message.messageType == 'ImageMessage'">
                        <img class="chatroom-messages-item-content-image"
                             :src="message.image_field" alt="">
                        <span class="chatroom-messages-item-time gadugiFont">
                            {{getJalali(message.created).locale('fa').format('HH:mm')}}
                        </span>
                    </div>
                    <div class="chatroom-messages-item-content content-file"
                         :class="[{'content-other' : !message.is_sender_me, 'chatroom-messages-item-content--unseen': messageInUnseen(message)}]"
                         v-else-if="message.messageType == 'FileMessage'">
                        <a :href="message.file_field" target="_blank">
                            <i class="material-icons">save</i>
                        </a>
                        <p class="gadugiFont">
                            <span>
                                {{message.name}}
                            </span>
                            <span>
                                {{Math.floor((message.volume / 1024))}} KB
                            </span>
                        </p>
                        <span class="chatroom-messages-item-time gadugiFont">
                            {{getJalali(message.created).locale('fa').format('HH:mm')}}
                        </span>
                    </div>

                    <!--                    <div class="chatroom-messages-item-content content-file"-->
                    <!--                         :class="[{'content-other' : !message.is_sender_me}]"-->
                    <!--                         v-else-if="message.messageType == 'VoiceMessage'">-->
                    <!--                        <audio :src="message.file_field" controls/>-->
                    <!--                        <p class="isansFont&#45;&#45;faNum">-->
                    <!--                            <span>-->
                    <!--                                filename.mp3-->
                    <!--                            </span>-->
                    <!--                            <span>-->
                    <!--                                n مگابایت-->
                    <!--                            </span>-->
                    <!--                        </p>-->
                    <!--                        <span class="chatroom-messages-item-time isansFont&#45;&#45;faNum">-->
                    <!--                            {{getJalali(message.created).locale('fa').format('HH:mm')}}-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </div>
            <p class="gadugiFont text-center mt-100" v-if="!selectedChat">
                There is no chat selected.
            </p>
            <div class="chatroom-messages-new" v-if="selectedChat">
                <label for="fileUpload" class="chatroom-messages-new-attach">
                    <input id="fileUpload" type="file" style="display: none" @input="handleFile">
                    <i class="material-icons">attach_file</i>
                </label>
                <!--                <vue-record-audio @result="onResult" />-->
                <input type="text" @keypress="sendMessageByKey" class="chatroom-messages-new-input gadugiFont"
                       placeholder="Message..." v-model="inputMessage">
                <button class="chatroom-messages-new-send" @click="sendMessage(null)">
                    <i class="material-icons">
                        send
                    </i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'

    export default {
        name: "DesktopChatroom",
        validations: {},
        data() {
            return {
                chats: [],
                selectedChat: null,
                selectedChatMessages: [],
                inputMessage: '',
                showMobileMessages: false,
                updateMessageInterval: null,
                showScrollButton: false,
                numberOfNewMessages: 0
            }
        },
        computed: {
            isConsultant() {
                return this.$store.getters.getUserInfo.user_type == 'consultant';
            },
            userInfo() {
                return this.$store.getters.getUserInfo;
            },
            inMobile() {
                return this.windowWidth < 991.8;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            }
        },
        created() {
            this.initComp();
            this.updateMessageInterval = setInterval(() => {
                //remove false in production
                if (this.selectedChat) {
                    this.updateMessages();
                }
            }, 5000)
        },

        destroyed() {
            clearInterval(this.updateMessageInterval);
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            messageBodyScroll(event) {
                // console.log(event);
            },

            scrollDownMessages() {
                console.log('scroll down messages');
                let messagesBody = window.document.getElementById('messagesBody');
                messagesBody.scrollTop = 3 * messagesBody.scrollHeight;
                // window.document.getElementById('messagesBody').scroll(Infinity);
                this.showScrollButton = false;
            },

            mouseOnMessage(message) {
                if (this.messageInUnseen(message)) {
                    message.seen = true;
                    this.numberOfNewMessages--;
                    if (this.numberOfNewMessages === 0) {
                        this.showScrollButton = false;
                    }
                }
            },

            messageInUnseen(message) {
                return message.hasOwnProperty('seen') && !message.seen && !message.is_sender_me;
            },

            messageIsSeen(message) {
                return message.hasOwnProperty('seen') && message.seen
            },

            async updateMessages(messageSendCause) {
                if (this.selectedChatMessages.length > 0) {
                    try {
                        let result = await this.$api.get(`${this.$store.getters.getApi}/chat/messages/?chat=${this.selectedChat.id}&tag=${this.selectedChatMessages[this.selectedChatMessages.length - 1].tag}&ordering=created`, this.httpConfig);
                        console.log('update chats messages result ', result);
                        if (result.data.length > 0) {
                            if (!messageSendCause) {
                                this.numberOfNewMessages += result.data.length;
                                this.showScrollButton = true;
                                result.data.forEach(item => item.seen = false);
                                this.selectedChatMessages = this.selectedChatMessages.concat(result.data);
                            } else {
                                this.selectedChatMessages = this.selectedChatMessages.concat(result.data);
                                this.scrollDownMessages();
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        if (e.response) {
                            console.log(e.response);
                        }
                    } finally {

                    }
                } else {
                    try {
                        let result = await this.$api.get(`${this.$store.getters.getApi}/chat/messages/?chat=${this.selectedChat.id}&ordering=created`, this.httpConfig);
                        console.log('selected chats messages result ', result);
                        this.selectedChatMessages = result.data;
                        console.log('SIZE==========' + (JSON.stringify(result.data)).length + "chars");
                    } catch (e) {
                        console.log(e);
                        if (e.response) {
                            console.log(e.response);
                        }
                    } finally {

                    }
                }
            },

            async handleFile(event) {
                let file = event.target.files[0];
                console.log(file);
                let payload = new FormData();
                if (file.type.startsWith("image")) {
                    payload.append("messageType", "ImageMessage");
                    payload.append("image_field", file);
                } else if (file.type.startsWith("application")) {
                    payload.append("messageType", "FileMessage");
                    payload.append("file_field", file);
                } else if (file.type.startsWith("audio")) {
                    payload.append("messageType", "VoiceMessage");
                    payload.append("voice_field", file);
                }
                payload.append("chat", this.selectedChat.id);
                console.log(payload);
                this.sendMessage(payload);
            },

            async getChats() {
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/chat/chats/`, this.httpConfig);
                    console.log('chats result ', result);
                    this.chats = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async getMessagesForSelectedChat() {
                try {
                    //this.$loading(true);
                    let result = await this.$api.get(`${this.$store.getters.getApi}/chat/messages/?chat=${this.selectedChat.id}&ordering=created`, this.httpConfig);
                    console.log('selected chats messages result ', result);
                    this.selectedChatMessages = result.data;
                    console.log('SIZE==========' + (JSON.stringify(result.data)).length + "chars");
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.scrollDownMessages();
                }
            },

            async sendMessageByKey(event) {
                if (event.key === 'Enter' && event.shiftKey === false) {
                    this.sendMessage(null);
                }
            },

            async sendMessage(payload) {
                console.log(payload);
                try {
                    let config = this.httpConfig;
                    config.headers['Content-Type'] = 'multipart/form-data';
                    if (!payload) {
                        let localPayload = new FormData();
                        localPayload.append("chat", this.selectedChat.id);
                        localPayload.append("text_message", this.inputMessage);
                        localPayload.append("messageType", "TextMessage");
                        let result = await this.$api.post(
                            `${this.$store.getters.getApi}/chat/messages/`,
                            localPayload,
                            config
                        );
                        console.log(result);
                        this.updateMessages(true);
                        this.inputMessage = '';
                    } else {
                        let result = await this.$api.post(
                            `${this.$store.getters.getApi}/chat/messages/`,
                            payload,
                            config
                        );
                        console.log(result);
                        this.updateMessages(true);
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            setSelectedChat(chat) {
                this.selectedChat = chat;
                this.getMessagesForSelectedChat();
            },

            async initComp() {
                await this.getChats();
            },
        }
    }
</script>

<style scoped>
    .chatroom-box {
        display: grid;
        grid-template-areas: "chats messages messages";
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .chatroom-chats {
        border-radius: 15px 0 0 0;
        padding: 0;
        border-right: 1px solid #ddd;
        grid-area: chats;
    }

    .chatroom-chats-search {
        border-top-right-radius: 15px;
        text-align: left;
    }

    .chatroom-chats-search-input {
        width: calc(100% - 40px);
        height: 40px;
        padding: 5px;
        margin: 10px 0;
        border-radius: 0 15px 15px 0;
        border: none;
        background-color: #eee;
        color: #999;
        font-size: 14px;
    }

    .chatroom-chats-list {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        overflow: auto;
        height: calc(100vh - 200px);
        max-height: 470px;
    }

    .chatroom-chats-list::-webkit-scrollbar {
        width: 5px;
    }

    .chatroom-chats-list::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: white;
    }

    .chatroom-chats-list::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .chatroom-chats-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 5px 0;
        margin: 0 0 5px 0;
        cursor: pointer;
    }

    .chatroom-chats-item:hover {
        background-color: #eee;
    }

    .chatroom-chats-item.active {
        border-left: 5px solid #9038CC;
    }

    .chatroom-chats-item img {
        width: 60px;
        height: 60px;
        margin-left: 5px;
        border-radius: 50%;
    }

    .chatroom-chats-item-info {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    }

    .chatroom-chats-item h4 {
        margin: 5px;
        font-size: 14px;
    }

    .chatroom-chats-item p {
        margin: 0;
        font-size: 12px;
    }

    .chatroom-messages {
        padding: 0;
        border-radius: 15px 0 0 15px;
        grid-area: messages;
    }

    .chatroom-messages-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 15px 0;
        border-radius: 15px 0 0 0;
        margin-left: auto;
        border-bottom: 1px solid #ddd;
    }

    .chatroom-messages-title h4 {
        margin: 0 auto;
    }

    .chatroom-messages-title-icons {
        margin-left: 10px;
        display: flex;
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
        height: calc(100vh - 200px);
        max-height: 470px;
        overflow: auto;
    }

    .chatroom-messages-item {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        position: relative;
        margin-top: 50px;
        z-index: 1000;
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

    .chatroom-messages-item-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        bottom: -10px;
        left: 10px;
    }

    .chatroom-messages-item-content {
        border-radius: 15px 15px 15px 5px;
        width: 100%;
        margin: 0 15px 0 65px;
        padding: 10px;
        border: none;
        background-color: #E7FFFF;
        color: #4B6969;
    }

    .chatroom-messages-item-content-text {
        word-break: break-word;
    }

    .chatroom-messages-item-content.content-other {
        border: 1px solid #74BDBC;
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

    .chatroom-messages-item-content.content-file a {
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
        float: right;
        margin-top: 10px;
        font-size: 12px;
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

    .new-messages-toggler {
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: none;
        color: white;
        background-color: #8C3DDB;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
        padding: 0;
        margin: 0;
        position: absolute;
        bottom: 75px;
        left: 10px;
        z-index: 1001;
    }

    .chatroom-messages-item-content--unseen {
        border: 2px solid #8C3DDB !important;
    }
</style>
