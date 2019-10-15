<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="false"
             style="background-image: url('http://195.248.243.68/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            پیام های شما
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="main section">
            <div class="container">

                <div class="row">
                    <div class="col-md-4 messagesWrapper">
                        <div class="ticketTitleSearchWrapper isansFont--faNum">
                            <input placeholder="جستجو در تیکت ها..." type="text">
                            <i class="material-icons">search</i>
                        </div>

                        <div class="ticketTitleBlock isansFont--faNum"
                             @click="setSelectedTicketByIndex(tickets.indexOf(ticket))"
                             :class="{'active' : isSelectedTicket(ticket.id)}" v-for="ticket in tickets">
                            <div class="ticketTitleBlock--info">
                                <img :src="ticket.consultant.profile_picture"
                                     :alt="ticket.consultant.first_name+' ' + ticket.consultant.last_name ">
                                <div class="ticketTitleBlock--info__text">
                                    <h5 class="isansFont--faNum" v-if="isConsultant">
                                        {{ticket.user.first_name + " " + ticket.user.last_name}}
                                    </h5>
                                    <h5 class="isansFont--faNum" v-else>
                                        {{ticket.consultant.first_name + " " + ticket.consultant.last_name}}
                                    </h5>
                                    <p>{{ticket.title}}</p>
                                </div>
                            </div>
                            <p class="ticketTitleBlock--date">
                                {{getJalali(ticket.created).locale('fa').format('DD MMMM')}}
                            </p>
                        </div>

                        <button @click="toggleShowNewTicket()"
                                class="addTicketButton btn btn-round btn-just-icon btn-primary">
                            <i class="material-icons">add</i>
                        </button>
                    </div>
                    <div class="col-md-8 contentWrapper">
                        <div class="content--title">
                            <h5 class="isansFont--faNum">{{selectedTicket.title}}</h5>
                        </div>
                        <div class="content--texts">
                            <div class="content-text"
                                 :class="[{'user-text' : !message.is_consultant}, {'consultant-text': message.is_consultant}]"
                                 v-for="message in messagesForSelectedTicket">
                                <img :src="message.consultant.profile_picture" v-if="message.is_consultant"
                                     :alt="message.consultant.first_name+' ' + message.consultant.last_name ">
                                <p class="isansFont--faNum">
                                    {{message.text}}
                                </p>
                            </div>
                        </div>
                        <div class="newMessageWrapper isansFont--faNum">
                            <input type="text" v-model="$v.ticketNewMessageText.$model" placeholder="ارسال پیام...">
                            <i class="material-icons" role="button"
                               :disabled="$v.ticketNewMessageText.$error || !$v.ticketNewMessageText.$dirty"
                               @click="sendNewMessageToSelectedTicket">send</i>
                        </div>
                    </div>
                </div>
            </div>


            <!--- show / hide new ticket modal --->
            <div class="newTicketWrapper" v-if="showNewTicketModal" @click="toggleShowNewTicket($event)">
                <div class="newTicketModal" @click="">
                    <button class="closeModalButton btn btn-sm btn-fab btn-fab-mini btn-round btn-sample"
                            @click="toggleShowNewTicket()">
                        <i class="material-icons">close</i>
                    </button>

                    <h5 class="isansFont--faNum">ایجاد تیکت جدید</h5>
                    <form @submit="createFullTicketMessage($event)" class="isansFont--faNum">
                        <label for="ticketTitle">عنوان تیکت :</label>
                        <input id="ticketTitle" v-model="$v.newTicketInfo.title.$model" type="text">

                        <label for="ticketConsultant">برای :</label>
                        <select name="consultant" v-model="$v.newTicketInfo.consultant.$model" id="ticketConsultant">
                            <option value="1">هادی طباطبایی</option>
                            <option value="-1">پشتیبانی</option>
                        </select>

                        <label for="newTicketMessage">اولین پیام تیکت :</label>
                        <textarea name="message" v-model="$v.newTicketInfo.newMessage.$model" id="newTicketMessage"
                                  cols="30" rows="10"></textarea>

                        <input type="submit" :disabled="$v.newTicketInfo.$anyError || !$v.newTicketInfo.$anyDirty" class="btn btn-block btn-success" value="ایجاد تیکت جدید">
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "Messages",
        validations: {
            ticketNewMessageText: {required},
            newTicketInfo: {
                title: {required},
                consultant: {required},
                newMessage: {}
            }
        },
        data: function () {
            return {
                tickets: [],
                messages: [],
                selectedTicket: {},
                messagesForSelectedTicket: [],
                newTicketInfo: {
                    title: '',
                    consultant: '-1',
                    newMessage: '',
                    file : null
                },
                ticketNewMessageText: '',

                showNewTicketModal: false,

                fullMessageData: {
                    ticketTitle: '',
                    messageText: '',
                    consultantId: '',
                    file: null,
                }
            }
        },
        computed: {
            isConsultant: function () {
                return this.$store.getters.getUserInfo.is_consultant;
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo;
            }
        },
        created() {
            // console.log(this.$route.query);
            if (this.$route.query.newmessage != 'true') {
                this.sendTicketsGet().then(response => {
                    this.tickets = response.data;
                    this.setSelectedTicketByIndex(0);
                });
                this.sendMessagesGet('', 'created');
            } else {
                console.log(this.$route.query);
                this.fullMessageData.ticketTitle = this.$route.query.consultant + 'تیکت اتوماتیک برای مشاور با آیدی ';
                this.fullMessageData.consultantId = this.$route.query.consultant;
                this.fullMessageData.messageText = 'سلام. بنده با شما یک جلسه مشاوره رزرو کردم.'
            }
        },
        mounted() {

        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
            },
            toggleShowNewTicket: function ($event) {
                console.log($event);
                if (this.showNewTicketModal) {
                    if ($event.target.className === 'newTicketWrapper' || $event.target.innerText === 'close') {
                        this.showNewTicketModal = !this.showNewTicketModal;
                    }
                } else {
                    this.showNewTicketModal = !this.showNewTicketModal;
                }
            },
            setSelectedTicketByIndex: function (ticketIndex) {
                this.selectedTicket = this.tickets[ticketIndex];
                console.log('selected ticket : ', this.selectedTicket);
                this.sendMessagesGet(this.selectedTicket.id, 'created').then(response => {
                    this.messagesForSelectedTicket = response.data;
                }).catch(error => {
                    console.log(error);
                })
            },
            sendNewMessageToSelectedTicket: function () {
                if (!this.$v.ticketNewMessageText.$error && this.$v.ticketNewMessageText.$dirty) {
                    console.log('payload:', this.ticketNewMessageText);
                    this.sendPostMessageReq(this.selectedTicket.id, null, this.ticketNewMessageText).then(response => {
                        this.sendMessagesGet(this.selectedTicket.id, 'created').then(response2 => {
                            // console.log('inside getting after posting a new message')
                            this.messagesForSelectedTicket = response2.data;
                        }).catch(error => {
                            console.log(error);
                        })
                    })
                } else {
                    console.log('input new message is not valid')
                }
            },
            createFullTicketMessage: function ($event) {
                $event.preventDefault();
                if (!this.$v.newTicketInfo.$anyError && this.$v.newTicketInfo.$dirty) {
                    this.sendPostTicketReq(this.newTicketInfo.title, this.newTicketInfo.consultant).then(response => {
                        this.sendPostMessageReq(response.data.id, this.newTicketInfo.file, this.newTicketInfo.newMessage).then(response2 => {
                            this.$router.push('/user/messages');
                        }).catch(error2 => {
                            console.log(error2);
                            console.log(error2.response)
                        });
                    }).catch(error => {
                        console.log(error);
                        console.log(error.response);
                    })
                }else {
                    console.log('form is not valid');
                }
            },
            createNewTicket: function () {
                console.log('create new ticket');
                console.log();
                this.sendPostTicketReq(this.newTicketInfo.title, this.newTicketInfo.consultant).then(response => {
                    this.sendTicketsGet().then(response2 => {
                        this.newTicketInfo.consultant = '';
                        this.newTicketInfo.title = '';
                        this.$v.ticketNewMessageText.$model = '';
                        this.tickets = response2.data;
                        this.setSelectedTicketByIndex(0);
                    });
                    this.sendMessagesGet('', 'created');
                }).catch(error => {

                })
            },
            sendTicketsGet: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'ticket/tickets/',
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        console.log('tickets response : ', response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
            },
            sendMessagesGet: function (ticketQueryId, ordering) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'ticket/messages/?ordering=' + ordering + '&ticket=' + ticketQueryId,
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        console.log('messages response : ', response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
            },
            sendPostTicketReq: function (title, consultantToSend) {
                let payload = {
                    'title': title,
                    'consultant': consultantToSend
                };
                console.log(payload);
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'ticket/tickets/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json'
                        },
                        data: payload
                    }).then(response => {
                        console.log('ticket post response :', response);
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
            },
            sendPostMessageReq: function (ticketId, file, text) {
                let payload = {
                    'ticket': ticketId,
                    'file': file,
                    'text': text
                };
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'ticket/messages/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json'
                        },
                        data: payload
                    }).then(response => {
                        console.log('send message post response:', response)
                        resolve(response);
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        reject(error);
                    })
                })
            },
            isSelectedTicket: function (ticketId) {
                return this.selectedTicket.id == ticketId;
            }
        }
    }
</script>

<style scoped>

    .messagesWrapper {
        background-color: white;
        border: 1.5px solid #ccc;
        border-radius: 0 15px 15px 0;
        padding-right: 0;
        padding-left: 0;

        height: 624.5px;
        overflow: auto;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
    }

    .ticketTitleBlock {
        width: 100%;
        min-height: 80px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding-right: 10px;
        padding-left: 10px;

        transition: all 0.1s ease-in-out;
    }

    .ticketTitleBlock:last-child {
        border-radius: 0 0 15px 0;
    }

    .ticketTitleBlock.active {
        background-color: #BC82C6;
        color: white;
    }

    .ticketTitleBlock.active p {
        color: white;
    }

    .ticketTitleBlock:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .ticketTitleBlock:hover p {
        color: #787878;
    }

    .ticketTitleBlock:hover h5 {
        color: #787878;
    }

    .ticketTitleBlock--info {
        display: flex;
        align-items: center;
    }

    .ticketTitleBlock--info img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .ticketTitleBlock--info__text {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        margin-right: 5px;
    }

    .ticketTitleBlock--info__text h5 {
        margin: 0;
        font-size: 15px;
        font-weight: bold;
    }

    .ticketTitleBlock--info__text p {
        margin: 5px 0 0 0;
        font-size: 13px;
        color: #939393;
    }

    .ticketTitleBlock--date {
        color: #939393;
    }

    .ticketTitleSearchWrapper {
        border-radius: 10px;
        background-color: #F6F5FC;
        width: 90%;
        min-height: 35px;
        margin-top: 10px;
        margin-bottom: 10px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .ticketTitleSearchWrapper input {
        border: none;
        background: none;
        margin-right: 10px;
        width: 100%;
    }

    .ticketTitleSearchWrapper i {
        margin-left: 10px;
        color: #7C7D82;
        cursor: pointer;
    }

    .addTicketButton {
        justify-self: flex-end;
    }

    .contentWrapper {
        border-radius: 15px 0 0 15px;
        border: 1.5px solid #ccc;
        border-right: 0;
        padding-right: 0;
        padding-left: 0;
    }

    .content--title {
        width: 100%;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius: 15px 0 0 0;
    }

    .content--title h5 {
        padding: 10px 0;
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 15px 0 0 0;
    }

    .section {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .content-text {
        display: flex;
        width: 100%;
        align-items: center;
        margin-top: 20px;
    }

    .consultant-text:last-child {
        margin-bottom: 10px;
    }

    .user-text {
        max-width: 80%;
    }

    .user-text p {
        text-align: justify;
        background-color: white;
        border: 1.5px solid #ccc;
        border-radius: 20px;
        padding: 10px;
        margin-right: 10px;
        line-height: 2.5rem;
        justify-self: flex-start;
    }

    .content--texts {
        overflow: auto;
        height: 500px;
    }

    .consultant-text {
        justify-self: flex-end;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row-reverse;
    }

    .consultant-text img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 10px;
        align-self: flex-end;
    }

    .consultant-text p {
        text-align: justify;
        padding: 10px;
        background-color: #9AEBC8;
        color: #333;
        border-radius: 10px 10px 10px 0;
        line-height: 2.5rem;
        margin-right: 30%;
        margin-left: 10px;
    }

    .newMessageWrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 0 15px;
        height: 60px;
        margin-top: 0;
    }

    .newMessageWrapper input {
        width: 100%;
        margin-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border: none;
    }

    .newMessageWrapper i {
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        transform: rotate(180deg);
        color: #2BA9DC;
    }

    .newMessageWrapper i[disabled] {
        cursor: not-allowed;
    }


    .newTicketWrapper {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 9998;
        display: flex;
    }

    .newTicketModal {
        margin: auto;
        background-color: white;
        border-radius: 10px;

        min-width: 400px;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;

        z-index: 9999;
        position: relative;
        padding: 15px;
    }

    .newTicketModal form {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    }

    .newTicketModal input {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .newTicketModal label {
        margin-top: 10px;
    }

    .newTicketModal select {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .newTicketModal textarea {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px;
    }

    .closeModalButton {
        position: absolute;
        right: 10px;
        top: 5px;
    }


</style>