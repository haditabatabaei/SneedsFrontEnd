<template>
    <div class="infoBlock">
        <considering-package v-for="marketPackage in packages" :package="marketPackage" />
    </div>
</template>

<script>
    import ConsultantConsideringPackageBlock from "@/components/Packages/ConsultantConsideringPackageBlock";
    export default {
        name: "PackagesToConsider",
        components: {
            'considering-package': ConsultantConsideringPackageBlock
        },
        data() {
            return {
                packages: []
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            }
        },
        methods: {
            async getConsideringPackages() {
                try {
                    this.$loading(true);
                    let packagesResult = (await this.$api.get(`${this.api}/store/packages/marketplace-list/`, this.httpConfig));
                    console.log(packagesResult);
                    this.packages = packagesResult.data;
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },
        },
        created() {
            this.getConsideringPackages();
        }
    }
</script>

<style scoped>
    .infoBlock {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 30px;
        padding-bottom: 15px;
    }
</style>