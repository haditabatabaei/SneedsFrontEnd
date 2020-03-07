<template>
    <div class="row chatroomBox">
        <div class="col-md-4 chatroom-chats">
            <div class="chatroom-chats-search">
                <input type="text" placeholder="جستجو" class="chatroom-chats-search-input isansFont">
            </div>


            <!-- DESKTOP VERSION  -->
            <div class="chatroom-chats-list" v-if="windowWidth > 991.8">
                <div @click="setSelectedChat(chat)" class="chatroom-chats-item"
                     :class="[{'active' : selectedChat.id == chat.id}]" v-for="(chat, index) in chats"
                     :key="index">
                    <img :src="chat.profile_img" alt="" class="chatroom-chats-item-image">
                    <div class="chatroom-chats-item-info">
                        <h4 class="isansFont--faNum">
                            {{chat.other_person.first_name + " " + chat.other_person.last_name}}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8 chatroom-messages">
            <!-- DESKTOP VERSION -->
            <div class="chatroom-messages-title" v-if="windowWidth > 991.8">
                <h4 class="isansFont--faNum">
                    سید محمد هادی طباطبایی
                </h4>
                <div class="chatroom-messages-title-icons">
                    <button>
                        <i class="material-icons">search</i>
                    </button>
                    <button>
                        <i class="material-icons">alarm_on</i>
                    </button>
                </div>
            </div>

            <!-- MOBILE VERSION -->
            <!--            <div v-else @click="selectedChat = chat" class="chatroom-chats-item"-->
            <!--                 :class="[{'active' : selectedChat.id = chat.id}]" v-for="(chat, index) in chats" :key="index">-->
            <!--                <img :src="chat.profile_img" alt="" class="chatroom-chats-item-image">-->
            <!--                <div class="chatroom-chats-item-info">-->
            <!--                    <h4 class="isansFont&#45;&#45;faNum">{{chat.other_person.first_name + " " +-->
            <!--                        chat.other_person.last_name}}</h4>-->
            <!--                </div>-->
            <!--                <button class="chatroom-chats-item-back">-->
            <!--                    <i class="material-icons">keyboard_backspace</i>-->
            <!--                </button>-->
            <!--            </div>-->


            <div class="chatroom-messages-list">
                <div class="chatroom-messages-item" v-for="(message, index) in selectedChatMessages" :key="index">
                    <img draggable="false" :src="message.profile_img"
                         class="chatroom-messages-item-avatar" alt="">
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
            <form @submit.prevent="sendMessage" class="chatroom-messages-new">
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
    </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'

    export default {
        name: "DesktopChatroom",
        validations: {},
        data: function () {
            return {
                chats: [],
                selectedChat: {},
                selectedChatMessages: [],
                inputMessage: '',
                showMobileMessages: false,
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
            }
        },
        created() {
            if (this.$route.query.newmessage != 'true') {
                this.initComp();
            } else {
                console.log(this.$route.query);
            }
        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
            },

            async getChats() {
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/chat/chats/`, this.$store.getters.httpConfig);
                    console.log('chats result ', result);
                    this.chats = result.data;
                    this.selectedChat = this.chats[0];
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
                    let result = await axios.get(`${this.$store.getters.getApi}/chat/messages/?chat=${this.selectedChat.id}&ordering=created`, this.$store.getters.httpConfig);
                    console.log('selected chats messages result ', result);
                    this.selectedChatMessages = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async sendMessage() {
                try {
                    let payload = new FormData();
                    payload.append("chat", this.selectedChat.id);
                    payload.append("text_message", this.inputMessage);
                    payload.append("messageType", "TextMessage");
                    let result = await axios.post(
                        `${this.$store.getters.getApi}/chat/messages/`,
                        payload,
                        {
                            headers: {
                                'Authorization': `JWT ${this.$store.getters.getToken}`,
                                "Content-Type": "multipart/form-data"
                            },
                            timeout: 6000
                        }
                    );
                    console.log(result);
                    this.getMessagesForSelectedChat();
                    this.inputMessage = '';
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
                await this.getMessagesForSelectedChat();
            },
        }
    }
</script>

<style scoped>

    .chatroomWrapper {
        margin-top: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        background-color: white;
        min-height: 700px;
    }

    .chatroom-chats {
        border-radius: 0 15px 0 0;
        height: 700px;
        padding: 0;
        border-left: 1px solid #ddd;
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
        height: 400px;
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
        border-right: 5px solid #9038CC;
    }

    .chatroom-chats-item img {
        width: 60px;
        height: 60px;
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
        margin: 5px;
        font-size: 14px;
    }

    .chatroom-chats-item p {
        margin: 0;
        font-size: 12px;
    }

    .chatroom-messages {
        height: 700px;
        padding: 0;
        border-radius: 15px 0 0 15px;
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
        height: 570px;
        overflow: auto;
    }

    .chatroom-messages-item {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        position: relative;
        margin-top: 50px;
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
        right: 10px;
    }

    .chatroom-messages-item-content {
        border: 1px solid #74BDBC;
        border-radius: 15px 15px 5px 15px;
        width: 100%;
        margin-right: 65px;
        margin-left: 15px;
        padding: 10px;
    }

    .chatroom-messages-item-content-text {
        word-break: break-word;
    }

    .chatroom-messages-item-content.content-other {
        border: none;
        color: #4B6969;
        background-color: #E7FFFF;
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

    @media only screen and (max-width: 991.8px) {
        .chatroom-chats-search {
            display: none;
        }

        .chatroomWrapper {
            box-shadow: none;
            border-radius: 0;
        }

        .chatroom-chats {
            border-left: none;
            height: initial;
        }

        .chatroom-chats-list {
            height: initial;
        }

        .chatroom-chats-item {
            margin-top: 0;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            padding: 10px;
        }

        .chatroom-chats-item.active {
            border-right: none;
        }

        .chatroom-chats-item-next {
            background: none;
            padding: 0;
            border: none;
            display: flex;
            align-items: center;
            margin: 0 auto 0 30px;
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
    }
</style>
