<template>
    
</template>

<script>
    import axios from 'axios'
    export default {
        name: "UserCheckout.vue",
        data() {
            return {
                checkouts: []
            }
        },
        methods: {
            async getCheckouts() {
                try {
                    this.$loading(true);
                    console.log('http config', this.$store.getters.httpConfig);
                    this.checkouts = (await this.$api.get(`${this.$store.getters.getApi}/payment/consultant-deposits/`, this.$store.getters.httpConfig));
                    console.log(this.checkouts);
                } catch (e) {
                    console.log(e);
                } finally {
                    this.$loading(false);
                }
            }
        },
        created() {
            this.getCheckouts();
        }
    }
</script>

<style scoped>

</style>