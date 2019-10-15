<template>
    <div>
        <notifications group="notif" position="bottom right" classes="notif isansFont"></notifications>
        <TopMenu></TopMenu>
        <transition
                name="fade"
                mode="out-in"
        >
            <router-view :key="$route.fullPath"/>
        </transition>
        <Footer></Footer>
    </div>

</template>

<script>
    import TopMenu from "@/components/TopMenus/TopMenu";
    import Footer from "@/components/StandAlone/Footer";
    import TopMessage from '@/components/TopMenus/TopMessage';

    export default {
        name: 'App',
        components: {
            TopMenu, Footer, TopMessage
        }
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .notif {
        color: white;
        direction: rtl;
        flex-direction: column;
        border-right: 4px solid;
        border-radius: 5px 0 0 5px;
        padding: 10px;
        text-align: right !important;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right:5px;
    }

    .notif.error {
        background-color: #d9534f;
        border-right-color: #963a38;
    }

    .notif.warn {
        background-color: #f0ad4e;
        border-right-color: #a77836;
    }

    .notif.success {
        background-color: #5cb85c;
        border-right-color: #428342;
    }

    .notif.info {
        background-color: #5bc0de;
        border-right-color: #418a9f;
    }

</style>
