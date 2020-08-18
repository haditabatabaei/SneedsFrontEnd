<template>
    <section class="paper-items isansFont">
        <div class="paper-items-wrapper">
            <div class="paper-items-item" v-for="cert of regular">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} - Overall : {{cert.overall}}</p>
                    <p class="paper-item-title">L:{{cert.listening}} S:{{cert.speaking}} R:{{cert.reading}} W:{{cert.writing}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of gmat">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} - Total : {{cert.total}}</p>
                    <p class="paper-item-title">Quantitative and Verbal:{{cert.quantitative_and_verbal}} Integrated Reasoning:{{cert.integrated_reasoning}} Analytical Writing Assessment:{{cert.analytical_writing_assessment}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of greGen">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}}</p>
                    <p class="paper-item-title">Analytical Writing:{{cert.analytical_writing}} Quantitative:{{cert.quantitative}} Verbal:{{cert.verbal}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of greSub">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} Total: {{cert.total}}</p>
                    <p class="paper-item-title">Analytical Writing:{{cert.analytical_writing}} Quantitative:{{cert.quantitative}} Verbal:{{cert.verbal}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of greBio">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} Total: {{cert.total}}</p>
                    <p class="paper-item-title">Analytical Writing:{{cert.analytical_writing}} Quantitative:{{cert.quantitative}} Verbal:{{cert.verbal}}</p>
                    <p class="paper-item-title">Cellular and Molecular: {{cert.cellular_and_molecular}} Organismal: {{cert.organismal}} Ecology and Evolution: {{cert.ecology_and_evolution}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of grePhys">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} Total: {{cert.total}}</p>
                    <p class="paper-item-title">Analytical Writing:{{cert.analytical_writing}} Quantitative:{{cert.quantitative}} Verbal:{{cert.verbal}}</p>
                    <p class="paper-item-title">Classical Mechanics: {{cert.classical_mechanics}} Electromagnetism: {{cert.electromagnetism}} Quantum Mechanics: {{cert.quantum_mechanics}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of grePsycho">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} Total: {{cert.total}}</p>
                    <p class="paper-item-title">Analytical Writing:{{cert.analytical_writing}} Quantitative:{{cert.quantitative}} Verbal:{{cert.verbal}}</p>
                    <p class="paper-item-title">Biological: {{cert.biological}} Cognitive: {{cert.cognitive}} Social: {{cert.social}} Developmental: {{cert.developmental}} Clinical: {{cert.clinical}} Measurement or Methodology: {{cert.measurement_or_methodology}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="paper-items-item" v-for="cert of duolingo">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info isansFont">
                    <p class="paper-item-summary">آزمون {{cert.certificate_type}} Overall: {{cert.overall}}</p>
                    <p class="paper-item-title">Literacy:{{cert.literacy}} Comprehension:{{cert.comprehension}} Conversation:{{cert.conversation}} Production:{{cert.production}}</p>
                </div>
                <button class="paper-item-remove" @click="deleteCert(cert)">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <moon-loader class="loading-icon" style="align-self:center;margin:20px auto;" color="purple" :loading="loading" :size="20" sizeUnit="px"/>
            <p class="paper-items-empty" v-if="isEmpty">
                مقاله ای وارد نشده است.
            </p>
            <router-link to="/analysis/form/languagecerts" class="paper-items-addnew" v-if="isEmpty">
                افزودن مدرک زبان جدید
            </router-link>
            <router-link to="/analysis/form/languagecerts" class="paper-items-addnew" v-else>
                افزودن مدرک زبان دیگر
            </router-link>
        </div>
    </section>
</template>

<script>
    export default {
        name: "LanguageCertificateItems",
        data() {
            return {
                duolingo: [],
                gmat: [],
                greBio: [],
                greGen: [],
                grePhys: [],
                grePsycho: [],
                greSub: [],
                regular: [],
                loading: false,
            }
        },
        computed: {
            user() {
                return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
            },

            detailedForm() {
                return this.$store.getters.detailedForm;
            },

            detailedFormId() {
                return this.$store.getters.detailedFormId;
            },

            api() {
                return this.$store.getters.getApi
            },

            httpConfig() {
                return this.$store.getters.httpConfig
            },

            multipartHttpConfig() {
                return this.$store.getters.multipartHttpConfig
            },

            isEmpty() {
                return this.duolingo.length == 0 &&
                this.gmat.length == 0&&
                this.greBio.length == 0 &&
                this.greGen.length == 0 &&
                this.grePhys.length == 0 &&
                this.grePsycho.length == 0 &&
                this.greSub.length == 0 &&
                this.regular.length == 0;
            }
        },
        methods: {
            getCerts() {
                this.loading = true;
                let reqs = [
                    this.$api.get(`${this.api}/account/duolingo-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/gmat-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/gre-biology-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/gre-general-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/gre-physics-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/gre-psychology-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/gre-subject-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                    this.$api.get(`${this.api}/account/regular-certificates/?student-detailed-info=${this.detailedFormId}`, this.httpConfig),
                ]
                Promise
                    .all(reqs)
                    .then(results => {
                        this.duolingo = results[0].data;
                        this.gmat = results[1].data;
                        this.greBio = results[2].data;
                        this.greGen = results[3].data;
                        this.grePhys = results[4].data;
                        this.grePsycho = results[5].data;
                        this.greSub = results[6].data;
                        this.regular = results[7].data;
                        results.forEach(result => {
                            console.log(result.data)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            },
            async deleteCert(cert) {
                try {
                    this.loading = true;
                    let result = {}
                    switch (cert.certificate_type) {
                        case 'IELTS_GENERAL' :
                        case 'IELTS_ACADEMIC' :
                        case 'TOEFL' :
                            result = await this.$api.delete(`${this.api}/account/regular-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GMAT' :
                            result = await this.$api.delete(`${this.api}/account/gmat-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_PHYSICS':
                            result = await this.$api.delete(`${this.api}/account/gre-physics-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_BIOLOGY':
                            result = await this.$api.delete(`${this.api}/account/gre-biology-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_PSYCHOLOGY':
                            result = await this.$api.delete(`${this.api}/account/gre-psychology-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_GENERAL':
                            result = await this.$api.delete(`${this.api}/account/gre-general-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_MATHEMATICS':
                        case 'GRE_LITERATURE':
                        case 'GRE_CHEMISTRY':
                            result = await this.$api.delete(`${this.api}/account/gre-subject-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                        case 'DUOLINGO':
                            result = await this.$api.delete(`${this.api}/account/duolingo-certificates/${cert.id}/`, this.httpConfig);
                            console.log(result);
                            break;
                    }
                } catch (e) {

                } finally {
                    this.loading = false;
                }
                this.getCerts();
            }
        },
        watch: {
            detailedForm(newDetailedForm) {
                console.log('detailed form changed ', newDetailedForm);
                this.getCerts();
            }
        },
        created() {
            if(this.detailedForm) {
                this.getCerts();
            }
        }
    }
</script>

<style scoped>
    .paper-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 100px 20px 20px 20px;
    }

    .paper-items-notif {
        color: white;
        background-color: #009FB3;
        border-radius: 15px;
        font-size: 16px;
        display: flex;
        align-items: center;
        min-height: 45px;
    }

    .paper-items-notif i {
        margin: 0 15px 0 10px;
        background-color: white;
        border-radius: 50%;
        color: #009FB3;
        font-size: 20px;
    }

    .paper-items-wrapper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        align-self: stretch;
        border-radius: 20px;
        background-color: #F5F7FA;
        border: 2px solid #F2F2F2;
        margin-top: 20px;
    }

    .paper-items-item {
        display: flex;
        align-items: center;
    }

    .paper-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F4CA64;
        border: 5px solid white;
        width: 60px;
        height: 60px;
        font-size: 26px;
        color: white;
        border-radius: 50%;
        box-shadow: 0 2px 20px #00000029;
        margin: 20px;
    }

    .paper-item-remove {
        margin: 0 auto 0 20px;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        color: #B3B3B3;
    }

    .paper-item-summary {
        margin: 0;
        font-size: 20px;
        color: #173F5F;
    }

    .paper-item-title {
        margin: 5px 0 0 0;
        font-size: 14px;
        color: #9B9999;
    }

    .paper-items-addnew {
        align-self: flex-end;
        margin: 20px;
        background-color: #F5F7FA;
        border: 2px solid #00BFD6;
        color: #009FB3;
        border-radius: 5px;
        padding: 5px 15px;
    }

    .paper-items-empty {
        align-self: center;
        margin-top: 20px;
    }


    @media only screen and (max-width: 767.8px) {
        .paper-items-item {
            flex-direction: column;
            position: relative;
        }

        .paper-item-icon {
            margin: 20px 0 10px 0;
        }

        .paper-item-info {
            text-align: center;
            margin: 10px 0 0 0;
        }

        .paper-item-remove {
            position: absolute;
            top: 20px;
            right: 20px;
            margin: 0;
        }

        .paper-items-addnew {
            align-self: center;
        }

        .paper-items-notif {
            justify-content: center;
        }
    }


</style>