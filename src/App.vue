<template>
    <div>
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

    export default {
        name: 'App',
        components: {
            TopMenu, Footer
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

</style>
