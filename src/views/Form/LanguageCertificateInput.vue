<template>
    <section class="form-militaryservice">
        <h1 class="militaryservice-title isansFont">
            مدرک زبان داری؟
            <i class="material-icons">info</i>
        </h1>
        <div class="militaryservice-wrapper isansFont">
            <input v-model="selectedLanguageCertificateStatus" id="militaryservice-have" type="radio"
                   name="militaryservice" value="have">
            <input v-model="selectedLanguageCertificateStatus" id="militaryservice-donthave" type="radio"
                   name="militaryservice" value="donthave">
            <label for="militaryservice-have" class="militaryservice-holder"
                   :class="[{'holder--selected': selectedLanguageCertificateStatus == 'have'}]">
                <i class="material-icons holder-selected-icon"
                   v-if="selectedLanguageCertificateStatus == 'have'">done</i>
                <img draggable="false" src="/sneedsAssets/img/english.svg" class="militaryservice-holder-image"
                     alt="مدرک زبان دارم">
                <p class="militaryservice-holder-text">دارم</p>
            </label>
            <label for="militaryservice-donthave" class="militaryservice-holder"
                   :class="[{'holder--selected': selectedLanguageCertificateStatus == 'donthave'}]">
                <i class="material-icons holder-selected-icon" v-if="selectedLanguageCertificateStatus == 'donthave'">done</i>
                <img draggable="false" src="/sneedsAssets/img/no-english.svg" class="militaryservice-holder-image"
                     alt="مدرک زبان ندارم">
                <p class="militaryservice-holder-text">ندارم</p>
            </label>
        </div>
        <div class="inputs" v-if="selectedLanguageCertificateStatus == 'have'">
            <c-dropdown-input class="edu-gap" label="مدرک زبان" :options="certOptions"
                              @select-option="setSelectedCert"/>
            <div v-if="selectedCert">
                <div class="inputs-certs" v-if="shownType == 'regular'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => regularCert.listening = Number(val)"
                                    label="Listening"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => regularCert.writing = Number(val)"
                                    label="Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => regularCert.speaking = Number(val)"
                                    label="Speaking"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => regularCert.reading = Number(val)"
                                    label="Reading"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => regularCert.overall = Number(val)"
                                    label="Overall"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'gmat'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6" @set-number="val => gmat.analytical_writing_assessment = Number(val)"
                                    label="Analytic Writing Assessment"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6" @set-number="val => gmat.integrated_reasoning = Number(val)"
                                    label="Integrated Reasoning"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6" @set-number="val => gmat.quantitative_and_verbal = Number(val)"
                                    label="Quantitative and Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6" @set-number="val => gmat.total = Number(val)"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'grePhys'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.quantitative = Number(val)"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.verbal = Number(val)"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.analytical_writing = Number(val)"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.classical_mechanics = Number(val)"
                                    label="Classical Mechanics"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.electromagnetism = Number(val)"
                                    label="Electromagnetism"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.quantum_mechanics = Number(val)"
                                    label="Quantum Mechanics"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePhysics.total = Number(val)"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'grePsycho'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.quantitative = Number(val)"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.verbal = Number(val)"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.analytical_writing = Number(val)"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.biological = Number(val)"
                                    label="Biological"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.cognitive = Number(val)"
                                    label="Cognitive"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.social = Number(val)"
                                    label="Social"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.developmental = Number(val)"
                                    label="Developmental"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.clinical = Number(val)"
                                    label="Clinical"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.measurement_or_methodology = Number(val)"
                                    label="Measurement or Methodology"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => grePsychology.total = Number(val)"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'greBio'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.quantitative = Number(val)"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.verbal = Number(val)"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.analytical_writing = Number(val)"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.cellular_and_molecular = Number(val)"
                                    label="Cellular and Molecular"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.organismal = Number(val)"
                                    label="Organismal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.ecology_and_evolution = Number(val)"
                                    label="Ecologyand Evolution"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greBiology.total = Number(val)"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'greGen'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greGeneral.quantitative = Number(val)"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greGeneral.verbal = Number(val)"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greGeneral.analytical_writing = Number(val)"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greGeneral.total = Number(val)"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'greSub'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greSubject.quantitative = Number(val)"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greSubject.verbal = Number(val)"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greSubject.analytical_writing = Number(val)"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => greSubject.total = Number(val)"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'duolingo'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => duolingo.literacy = Number(val)"
                                    label="Literacy"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => duolingo.comprehension = Number(val)"
                                    label="Comprehension"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => duolingo.conversation = Number(val)"
                                    label="Conversation"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => duolingo.production = Number(val)"
                                    label="Production"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1" :default-value="6.5" @set-number="val => duolingo.overall = Number(val)"
                                    label="Overall"/>
                </div>
                <button class="certificate-add" @click="addCertificate">اضافه کردن مدرک زبان جدید</button>
            </div>
        </div>
    </section>
</template>

<script>
    import NumberInput from "@/components/Form/NumberInput";
    import DropdownInput from "@/components/Form/DropdownInput";
    import SimpleInput from "@/components/Form/SimpleInput";
    import RadioGroupInput from "@/components/Form/RadioGroupInput";

    export default {
        name: 'LanguageCertificateInput',
        components: {
            "c-number-input": NumberInput,
            "c-dropdown-input": DropdownInput,
            "c-simple-input": SimpleInput,
            "c-radio-group": RadioGroupInput
        },
        data() {
            return {
                selectedLanguageCertificateStatus: null,
                selectedCert: null,
                regularCert: {
                    is_mock: false,
                    speaking: null,
                    writing: null,
                    listening: null,
                    reading: null,
                    overall: null,
                },

                gmat: {
                    is_mock: false,
                    analytical_writing_assessment: null,
                    integrated_reasoning: null,
                    quantitative_and_verbal: null,
                    total: null,
                },

                duolingo: {
                    is_mock: false,
                    overall: null,
                    literacy: null,
                    comprehension: null,
                    conversation: null,
                    production: null,
                },

                greSubject: {
                    is_mock: false,
                    quantitative: null,
                    verbal: null,
                    analytical_writing: null,
                    total: null
                },

                greGeneral: {
                    is_mock: false,
                    quantitative: null,
                    verbal: null,
                    analytical_writing: null,
                    total: null
                },

                greBiology: {
                    is_mock: false,
                    quantitative: null,
                    verbal: null,
                    analytical_writing: null,
                    total: null,
                    cellular_and_molecular: null,
                    organismal: null,
                    ecology_and_evolution: null,
                },

                grePhysics: {
                    is_mock: false,
                    quantitative: null,
                    verbal: null,
                    analytical_writing: null,
                    total: null,
                    classical_mechanics: null,
                    electromagnetism: null,
                    quantum_mechanics: null
                },

                grePsychology: {
                    is_mock: false,
                    quantitative: null,
                    verbal: null,
                    analytical_writing: null,
                    total: null,
                    biological: null,
                    cognitive: null,
                    social: null,
                    developmental: null,
                    clinical: null,
                    measurement_or_methodology: null
                },

                certOptions: [
                    {name: 'آیلتس جنرال', nameEnglish: 'IELTS_GENERAL'},
                    {name: 'آیلتس آکادمیک', nameEnglish: 'IELTS_ACADEMIC'},
                    {name: 'تافل', nameEnglish: 'TOEFL'},
                    {name: 'GMAT', nameEnglish: 'GMAT'},
                    {name: 'GRE General', nameEnglish: 'GRE_GENERAL'},
                    {name: 'GRE Chemistry', nameEnglish: 'GRE_CHEMISTRY'},
                    {name: 'GRE Mathematics', nameEnglish: 'GRE_MATHEMATICS'},
                    {name: 'GRE Literature', nameEnglish: 'GRE_LITERATURE'},
                    {name: 'GRE Biology', nameEnglish: 'GRE_BIOLOGY'},
                    {name: 'GRE Physics', nameEnglish: 'GRE_PHYSICS'},
                    {name: 'GRE Psychology', nameEnglish: 'GRE_PSYCHOLOGY'},
                    {name: 'Duolingo', nameEnglish: 'DUOLINGO'},
                ],
            }
        },
        computed: {
            shownType() {
                if (this.selectedCert) {
                    switch (this.selectedCert.nameEnglish) {
                        case 'IELTS_GENERAL' :
                        case 'IELTS_ACADEMIC' :
                        case 'TOEFL' :
                            return 'regular'
                        case 'GMAT' :
                            return 'gmat'
                        case 'GRE_PHYSICS':
                            return 'grePhys'
                        case 'GRE_BIOLOGY':
                            return 'greBio'
                        case 'GRE_PSYCHOLOGY':
                            return 'grePsycho'
                        case 'GRE_GENERAL':
                            return 'greGen'
                        case 'GRE_MATHEMATICS':
                        case 'GRE_LITERATURE':
                        case 'GRE_CHEMISTRY':
                            return 'greSub'
                        case 'DUOLINGO':
                            return 'duolingo'
                    }
                }
            },
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
            }
        },
        methods: {
            setGapYears(newGapYear) {
                this.gapYears = newGapYear;
            },
            setSelectedCert(cert) {
                this.selectedCert = cert;
            },
            async addCertificate() {
                if(this.selectedCert) {
                    let payload = {
                        student_detailed_info: this.detailedFormId,
                        certificate_type: this.selectedCert.nameEnglish
                    }
                    let result = {}
                    switch (this.selectedCert.nameEnglish) {
                        case 'IELTS_GENERAL' :
                        // break;
                        case 'IELTS_ACADEMIC' :
                        // break;
                        case 'TOEFL' :
                            payload = {
                                ...payload,
                                ...this.regularCert,
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/regular-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GMAT' :
                            payload = {
                                ...payload,
                                ...this.gmat
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/gmat-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_PHYSICS':
                            payload = {
                                ...payload,
                                ...this.grePhysics
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/gre-physics-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_BIOLOGY':
                            payload = {
                                ...payload,
                                ...this.greBiology
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/gre-biology-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_PSYCHOLOGY':
                            payload = {
                                ...payload,
                                ...this.grePsychology
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/gre-psychology-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_GENERAL':
                            payload = {
                                ...payload,
                                ...this.greGeneral
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/gre-general-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'GRE_MATHEMATICS':
                        case 'GRE_LITERATURE':
                        case 'GRE_CHEMISTRY':
                            payload = {
                                ...payload,
                                ...this.greSubject
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/gre-subject-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                        case 'DUOLINGO':
                            payload = {
                                ...payload,
                                ...this.duolingo
                            }
                            console.log('certificate payload ', payload);

                            result = await this.$api.post(`${this.api}/account/duolingo-certificates/`, payload, this.httpConfig);
                            console.log(result);
                            break;
                    }
                } else {
                    console.log('bad certificate input')
                }
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    input[type="radio"] {
        display: none;
    }

    .form-militaryservice {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        /* padding-right: 50px; */
    }

    .militaryservice-wrapper {
        display: flex;
    }

    .militaryservice-holder {
        width: calc(100% - 360px);
        max-width: 335px;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 3px 26px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 20px;
        padding: 20px;
        cursor: pointer;
        transition: all 100ms ease-in-out;
    }

    .holder-selected-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 18px;
        color: white;
        border-radius: 50%;
        background-color: #00D4ED;
        padding: 2px;
    }

    .militaryservice-holder-text {
        margin: 20px 0 10px 0;
        color: #9B9999;
    }

    .holder--selected {
        position: relative;
        box-shadow: none;
        border: 3px solid #00BFD6;
    }

    .militaryservice-holder-image {
        opacity: 0.5;
    }

    .holder--selected .militaryservice-holder-text {
        color: #00BFD6;
    }

    .holder--selected .militaryservice-holder-image {
        opacity: 1;
    }

    .militaryservice-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .inputs {
        margin: 20px;
        display: flex;
        flex-direction: column;
        width: calc(100% - 45px);
    }

    .edu-gap {
        width: 100%;
        margin-top: 10px;
    }

    .edu-gap:first-child {
        margin-top: 0;
    }

    .inputs-certs {
        margin-top: 10px;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 767.8px) {
        .militaryservice-wrapper {
            flex-wrap: nowrap;
            justify-content: flex-start;
        }

        .militaryservice-holder {
            max-width: initial;
            height: 296px;
        }
    }

    @media only screen and (max-width: 767.8px) {
        .militaryservice-wrapper {
            margin: 0 20px;
            flex-wrap: nowrap;
        }

        .militaryservice-holder {
            margin: 0;
            padding: 10px;
            width: calc(50%);
        }

        .militaryservice-holder[for*="-have"] {
            margin-left: 10px;
        }

        .militaryservice-holder[for*="-donthave"] {
            margin-right: 10px;
        }

        .militaryservice-holder-image {
            width: 80%;
        }

        .edu-gap {
            width: auto;
            height: 50px;
        }

        .inputs {
            width: auto;
        }
    }
</style>