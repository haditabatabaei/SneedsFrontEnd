<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="false"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
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
                    <div class="col-md-12">
                        <h4 class="isansFont text-center">پیام های شما</h4>
                    </div>
                </div>
                <div class="row" v-if="this.$route.query.newmessage != 'true'">
                    <div class="col-md-12">
                        <button @click="sendTicketsGet()">get tickets</button>
                        <button @click="sendMessagesGet('','created')">get messages by ticket and created ordering
                        </button>
                        <button @click="sendPostTicketReq('testTitle','2')">send test title ticket to consultant id 2
                        </button>
                    </div>
                    <div class="col-md-3">
                        <div class="row">
                            <div class="col-md-12" v-for="ticket in tickets" :key="tickets.indexOf(ticket)">
                                <button @click="setSelectedTicketByIndex(tickets.indexOf(ticket))"
                                        class="btn btn-info btn-block"
                                        :class="[{'btn-rose' : isSelectedTicket(ticket.id)}]">{{ticket.id}} :
                                    {{ticket.title}}
                                </button>
                            </div>
                        </div>
                        <!--                        </div>-->
                        <!--                        <p>عنوان تیکت :</p>-->
                        <!--                        <p>{{ticket.title}}</p>-->
                        <!--                        <p>نام مشاور :</p>-->
                        <!--                        <p>{{ticket.consultant.first_name + " " + ticket.consultant.last_name}}</p>-->
                        <!--                        <p>نام کاربر : </p>-->
                        <!--                        <p>{{ticket.user.first_name + ' ' + ticket.user.last_name}}</p>-->
                        <!--                        <button @click="sendPostMessageReq(ticket.id,null,'my message to ticket with id ' + ticket.id)">send message</button>-->
                        <hr>
                    </div>
                    <div class="col-md-9" v-for="message in messagesForSelectedTicket">
                        <p>مشاور است ؟ {{message.is_consultant}}</p>
                        <p>{{message.text}}</p>
                    </div>
                    <div class="col-md-9">
                        <form action="" class="form-inline">
                            <div class="form-group">
                                <label for="messageText">متن پیام :</label>
                                <textarea name="" id="messageText" cols="40" rows="5" v-model="newMessageText"
                                          class="form-control"></textarea>
                            </div>
                            <button type="button" class="btn btn-success" @click="sendNewMessageToSelectedTicket()">
                                ارسال پیام به این تیکت
                            </button>
                        </form>
                    </div>

                    <br>
                    <hr>

                    <div class="col-md-12" v-if="!isConsultant">
                        <p>ایجاد تیکت جدید :</p>
                        <form action="" class="form-inline">
                            <div class="form-group">
                                <label for="ticketTitle">موضوع تیکت :</label>
                                <input id="ticketTitle" type="text" class="form-control" v-model="newTicketInfo.title">
                            </div>
                            <div class="form-group">
                                <label for="consultantId">شماره مشاور :</label>
                                <input type="number" min="0" id="consultantId" class="form-control"
                                       v-model="newTicketInfo.consultant">
                            </div>
                            <button type="button" @click="createNewTicket()" class="btn btn-success isansFont">ایجاد
                                تیکت جدید
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-md-12">
                        <form action="">
                            <div class="form-group">
                                <label for="fullTicketTitle">عنوان تیکت :</label>
                                <input type="text" class="form-control" v-model="fullMessageData.ticketTitle"
                                       id="fullTicketTitle">
                            </div>
                            <div class="form-group">
                                <label for="fullMessageText">پیام شما :</label>
                                <textarea cols="40" rows="5" class="form-control" type="text"
                                          v-model="fullMessageData.messageText" id="fullMessageText"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="fullConsultantId">آیدی مشاور :</label>
                                <input type="number" class="form-control" v-model="fullMessageData.consultantId"
                                       id="fullConsultantId">
                            </div>
                            <button class="btn btn-info" type="button" @click="createFullTicketMessage()">ارسال تیکت
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        name: "Messages",
        data: function () {
            return {
                tickets: [],
                messages: [],
                selectedTicket: {},
                messagesForSelectedTicket: [],
                newTicketInfo: {
                    title: '',
                    consultant: ''
                },
                newMessageText: '',

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
            }else {
                console.log(this.$route.query);
                this.fullMessageData.ticketTitle = this.$route.query.consultant + 'تیکت اتوماتیک برای مشاور با آیدی ';
                this.fullMessageData.consultantId = this.$route.query.consultant;
                this.fullMessageData.messageText = 'سلام. بنده با شما یک جلسه مشاوره رزرو کردم.'
            }
        },
        mounted() {

        },
        methods: {
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
                this.sendPostMessageReq(this.selectedTicket.id, null, this.newMessageText).then(response => {
                    this.sendMessagesGet(this.selectedTicket.id, 'created').then(response2 => {
                        // console.log('inside getting after posting a new message')
                        this.messagesForSelectedTicket = response2.data;
                    }).catch(error => {
                        console.log(error);
                    })
                })
            },
            createFullTicketMessage: function () {
                this.sendPostTicketReq(this.fullMessageData.ticketTitle, this.fullMessageData.consultantId).then(response => {
                    this.sendPostMessageReq(response.data.id, this.fullMessageData.file, this.fullMessageData.messageText).then(response2 => {
                        this.$router.push('/user/messages');
                    }).catch(error2 => {

                    });
                }).catch(error => {

                })
            },

            createNewTicket: function () {
                console.log('create new ticket');
                console.log();
                this.sendPostTicketReq(this.newTicketInfo.title, this.newTicketInfo.consultant).then(response => {
                    this.sendTicketsGet().then(response2 => {
                        this.newTicketInfo.consultant = '';
                        this.newTicketInfo.title = '';
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
    .section {
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>