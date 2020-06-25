<template>
    <div>
        <notifications group="notif" position="bottom left" classes="notif isansFont"/>
        <top-menu/>
        <transition name="fade" mode="out-in">
            <router-view style="margin-top:70px;padding-bottom:200px" :key="$route.fullPath"/>
        </transition>
        <sneeds-footer v-if="showFooter" />
    </div>

</template>

<script>
    import TopMenu from "@/components/TopMenus/TopMenu";
    import Footer from "@/components/StandAlone/Footer";
    export default {
        name: 'App',
        components: {
            "top-menu": TopMenu,
            "sneeds-footer": Footer
        },
        computed: {
            showFooter() {
                return true
            }
        }
    }
</script>

<style>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loading-icon {
        margin: 5px;
    }
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
        border-left: 4px solid;
        border-right: 5px solid;
        border-radius: 0;
        padding: 10px;
        text-align: right !important;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
    }

    .notif.error {
        background-color: #d9534f;
        border-left-color: #963a38;
        border-left-color: #963a38;
    }

    .notif.warn {
        background-color: #f0ad4e;
        border-left-color: #a77836;
        border-right-color: #a77836;
    }

    .notif.success {
        background-color: #5cb85c;
        border-left-color: #428342;
        border-right-color: #428342;
    }

    .notif.info {
        background-color: #5bc0de;
        border-left-color: #418a9f;
        border-right-color: #418a9f;
    }

    .vue-star-rating-star {
        display: flex !important;
        align-items: center !important;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

</style>
