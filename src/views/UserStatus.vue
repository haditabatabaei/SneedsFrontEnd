<template>
    <div class="row">
        <div class="col-md-12">
            <div class="itemBlock statusBlock">
                Status
            </div>
        </div>
        <div class="col-md-8">
            <div class="itemBlock messages">
                <h3 class="isansFont--faNum messages-title">
                    <span>آخرین پیام ها</span>
                    <router-link to="/user/messages">مشاهده همه ></router-link>
                </h3>
                <div class="messages-info" v-if="messages.length === 0">
                    <p class="isansFont--faNum text-muted text-center">پیامی برای نمایش وجود ندارد</p>
                </div>
                <div class="messages-info" v-else>
                    <p class="isansFont--faNum text-muted text-center" v-for="(message, index) in messages" :key="index">
                        {{message.senderName + " : " + message.title + "-->" + message.text}}
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="itemBlock files">
                <h3 class="isansFont--faNum files-title">فایل های دریافتی</h3>
                <div class="files-info" v-if="files.length === 0">
                    <img class="files-info--nofileimage" src="../../public/sneedsAssets/img/gucci.jpg" />
                    <p class="isansFont--faNum files-info--nofiletext">
                        تا کنون هیچ فالی از طرف مشاور ارسال نشده است.
                    </p>
                </div>
                <div class="files-info" v-else>
                    <p v-for="(file, index) in files" :key="index" class="isansFont--faNum files-info--nofiletext">
                        {{file.title + " | " + file.name + " | " + file.type}}
                    <p/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserStatus",
        data() {
            return {
                // files : [
                //     {name : 'asghar.pdf', title: 'عنوان', type : 'music'}
                // ],
                files : [],
                messages : [
                    {senderName: "اسنیدز", senderAvatar: "asghar.jpg", title : "خوش آمدید", text : "به اسنیدز خودش آمدید :)"}
                    ],
                overallStatus: []
            }
        }
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 30px;
        padding-bottom: 10px;
        /*min-height: 300px;*/
    }

    .files-title {
        font-size: 15px;
        font-weight:bold;
        margin-right:15px;
    }

    .statusBlock {
        display: flex;
    }

    .files-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .files-info--nofileimage {
        width: 100px;
        height: 100px;
        margin-top: 10px;
    }

    .files-info--nofiletext {
        padding:15px;
        color: #bbb;
        text-align:center;
    }

    .messages {
        display: flex;
        flex-direction: column;
    }

    .messages-title {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: space-between;
        font-weight: bold;
    }

    .messages-title span {
        margin-right: 15px;
    }

    .messages-title a {
        margin-left: 15px;
        color: #aaa;
    }

    .messages-info {
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>
