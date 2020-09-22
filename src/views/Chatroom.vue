<template>
    <div class="chatroomWrapper">
        <desktop-chatroom v-if="!inMobile"/>
        <mobile-chatroom v-else/>
    </div>
</template>

<script>
    import DesktopChatroom from "@/components/Chatroom/DesktopChatroom";
    import MobileChatroom from '@/components/Chatroom/MobileChatroom'

    export default {
        name: "Chatroom",
        components: {
            'desktop-chatroom': DesktopChatroom,
            'mobile-chatroom': MobileChatroom
        },
        computed: {
            inMobile() {
                return this.windowWidth < 991.8;
            }
        },
    }
</script>

<style scoped>
    .chatroomWrapper {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        background-color: white;
    }

    @media only screen and (max-width: 991.8px) {
        .chatroomWrapper {
            box-shadow: none;
            border-radius: 0;
            padding: 0;
            min-height: 100vh;
        }

        .chatroomWrapper .container-fluid {
            padding: 0;
        }
    }
</style>
