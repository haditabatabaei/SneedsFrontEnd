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
            <c-dropdown-input class="edu-gap" label="مدرک زبان"
                              :error="selectedCert == null"
                              error-text="لطفاً یک مدرک زبان انتخاب کنید."
                              :options="certOptions"
                              @select-option="setSelectedCert"/>
            <div v-if="selectedLanguageCertificateStatus == 'have'">
                <div class="inputs-certs" v-if="shownType == 'regular'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.regularCert.listening.$error"
                                    error-text="مقدار وارد شده باید بین 0 تا 9 باشد."
                                    :default-value="6.5"
                                    v-model.number="regularCert.listening"
                                    label="Listening"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.regularCert.writing.$error"
                                    error-text="مقدار وارد شده باید بین 0 تا 9 باشد."
                                    :default-value="6.5"
                                    v-model.number="regularCert.writing"
                                    label="Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.regularCert.speaking.$error"
                                    error-text="مقدار وارد شده باید بین 0 تا 9 باشد."
                                    :default-value="6.5"
                                    v-model.number="regularCert.speaking"
                                    label="Speaking"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.regularCert.reading.$error"
                                    error-text="مقدار وارد شده باید بین 0 تا 9 باشد."
                                    :default-value="6.5"
                                    v-model.number="regularCert.reading"
                                    label="Reading"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.regularCert.overall.$error"
                                    error-text="مقدار وارد شده باید بین 0 تا 9 باشد."
                                    :default-value="6.5"
                                    v-model.number="regularCert.overall"
                                    label="Overall"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'gmat'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.gmat.analytical_writing_assessment.$error"
                                    error-text="مقدار وارد شده باید بین 0 و 6 باشد. (0 - 0.5 - ... )"
                                    :default-value="0"
                                    v-model.number="gmat.analytical_writing_assessment"
                                    label="Analytic Writing Assessment"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.gmat.integrated_reasoning.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 1 و 8 باشد."
                                    :default-value="1"
                                    v-model.number="gmat.integrated_reasoning"
                                    label="Integrated Reasoning"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.gmat.quantitative_and_verbal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 6 و 51 باشد."
                                    :default-value="6"
                                    v-model.number="gmat.quantitative_and_verbal"
                                    label="Quantitative and Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="10"
                                    :error="$v.gmat.total.$error"
                                    error-text="مقدار وارد شده باید عدد مضرب 10 بین 200 و 800 باشد."
                                    :default-value="200"
                                    v-model.number="gmat.total"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'grePhys'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePhysics.quantitative.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="grePhysics.quantitative"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePhysics.verbal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="grePhysics.verbal"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.grePhysics.analytical_writing.$error"
                                    error-text="مقدار وارد شده باید بین 0 و 6 باشد. (0 - 0.5 - ... )"
                                    :default-value="0"
                                    v-model.number="grePhysics.analytical_writing"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePhysics.classical_mechanics.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePhysics.classical_mechanics"
                                    label="Classical Mechanics"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePhysics.electromagnetism.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePhysics.electromagnetism"
                                    label="Electromagnetism"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePhysics.quantum_mechanics.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePhysics.quantum_mechanics"
                                    label="Quantum Mechanics"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePhysics.total.$error"
                                    error-text="مقدار وارد شده باید عدد مضرب 10 بین 200 و 990 باشد."
                                    :default-value="200"
                                    v-model.number="grePhysics.total"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'grePsycho'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.quantitative.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="grePsychology.quantitative"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.verbal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="grePsychology.verbal"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.grePsychology.analytical_writing.$error"
                                    error-text="مقدار وارد شده باید بین 0 و 6 باشد. (0 - 0.5 - ... )"
                                    :default-value="0"
                                    v-model.number="grePsychology.analytical_writing"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.biological.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePsychology.biological"
                                    @set-number="val => grePsychology.biological = Number(val)"
                                    label="Biological"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.cognitive.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePsychology.cognitive"
                                    label="Cognitive"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.social.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePsychology.social"
                                    label="Social"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.developmental.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePsychology.developmental"
                                    label="Developmental"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.clinical.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePsychology.clinical"
                                    label="Clinical"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.measurement_or_methodology.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="grePsychology.measurement_or_methodology"
                                    label="Measurement or Methodology"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.total.$error"
                                    error-text="مقدار وارد شده باید عدد مضرب 10 بین 200 و 990 باشد."
                                    :default-value="200"
                                    v-model.number="grePsychology.total"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'greBio'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greBiology.quantitative.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="greBiology.quantitative"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greBiology.verbal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="greBiology.verbal"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.greBiology.analytical_writing.$error"
                                    error-text="مقدار وارد شده باید بین 0 و 6 باشد. (0 - 0.5 - ... )"
                                    :default-value="0"
                                    v-model.number="greBiology.analytical_writing"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greBiology.cellular_and_molecular.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="greBiology.cellular_and_molecular"
                                    label="Cellular and Molecular"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greBiology.organismal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="greBiology.organismal"
                                    label="Organismal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greBiology.ecology_and_evolution.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 20 و 99 باشد."
                                    :default-value="20"
                                    v-model.number="greBiology.ecology_and_evolution"
                                    label="Ecologyand Evolution"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.grePsychology.total.$error"
                                    error-text="مقدار وارد شده باید عدد مضرب 10 بین 200 و 990 باشد."
                                    :default-value="200"
                                    v-model.number="greBiology.total"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'greGen'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greGeneral.quantitative.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="greGeneral.quantitative"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greGeneral.verbal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="greGeneral.verbal"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.greGeneral.analytical_writing.$error"
                                    error-text="مقدار وارد شده باید بین 0 و 6 باشد. (0 - 0.5 - ... )"
                                    :default-value="0"
                                    v-model.number="greGeneral.analytical_writing"
                                    label="Analytical Writing"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'greSub'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greSubject.quantitative.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="greSubject.quantitative"
                                    label="Quantitative"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greSubject.verbal.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 130 و 170 باشد."
                                    :default-value="130"
                                    v-model.number="greSubject.verbal"
                                    label="Verbal"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="0.5"
                                    :error="$v.greSubject.analytical_writing.$error"
                                    error-text="مقدار وارد شده باید بین 0 و 6 باشد. (0 - 0.5 - ... )"
                                    :default-value="0"
                                    v-model.number="greSubject.analytical_writing"
                                    label="Analytical Writing"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.greSubject.total.$error"
                                    error-text="مقدار وارد شده باید عدد مضرب 10 بین 200 و 990 باشد."
                                    :default-value="200"
                                    v-model.number="greSubject.total"
                                    label="Total"/>
                </div>
                <div class="inputs-certs" v-else-if="shownType == 'duolingo'">
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.duolingo.literacy.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 0 و 32767 باشد."
                                    :default-value="0"
                                    v-model.number="duolingo.literacy"
                                    label="Literacy"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.duolingo.comprehension.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 0 و 32767 باشد."
                                    :default-value="0"
                                    v-model.number="duolingo.comprehension"
                                    label="Comprehension"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.duolingo.conversation.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 0 و 32767 باشد."
                                    :default-value="0"
                                    v-model.number="duolingo.conversation"
                                    label="Conversation"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.duolingo.production.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 0 و 32767 باشد."
                                    :default-value="0"
                                    v-model.number="duolingo.production"
                                    label="Production"/>
                    <c-number-input class="edu-gap" :is-ltr="true" :step="1"
                                    :error="$v.duolingo.overall.$error"
                                    error-text="مقدار وارد شده باید عدد صحیح بین 10 و 160 باشد."
                                    :default-value="10"
                                    v-model.number="duolingo.overall"
                                    label="Overall"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import NumberInput from "@/components/Form/NumberInput";
    import DropdownInput from "@/components/Form/DropdownInput";
    import SimpleInput from "@/components/Form/SimpleInput";
    import RadioGroupInput from "@/components/Form/RadioGroupInput";
    import {required, between, integer} from 'vuelidate/lib/validators';

    const moduleTenValidator = (input, vm) => {
        return Number(input) % 10 === 0
    }

    const halfFloatValidator = (input, vm) => {
        return (Number(input) * 10) % 5 === 0
    }

    export default {
        name: 'LanguageCertificateInput',
        components: {
            "c-number-input": NumberInput,
            "c-dropdown-input": DropdownInput,
            "c-simple-input": SimpleInput,
            "c-radio-group": RadioGroupInput
        },
        validations: {
            regularCert: {
                is_mock: {},
                speaking: {required, between: between(0, 9)},
                writing: {required, between: between(0, 9)},
                listening: {required, between: between(0, 9)},
                reading: {required, between: between(0, 9)},
                overall: {required, between: between(0, 9)},
            },
            gmat: {
                is_mock: {},
                analytical_writing_assessment: {required, between: between(0, 6), halfFloatValidator},
                integrated_reasoning: {required, between: between(1, 8), integer},
                quantitative_and_verbal: {required, between: between(6, 51)},
                total: {required, between: between(200, 800), integer, moduleTenValidator},
            },

            grePhysics: {
                is_mock: {},
                quantitative: {required, integer, between: between(130, 170)},
                verbal: {required, integer, between: between(130, 170)},
                analytical_writing: {required, between: between(0, 6), halfFloatValidator},
                total: {required, between: between(200, 990), moduleTenValidator},
                classical_mechanics: {required, integer, between: between(20, 99)},
                electromagnetism: {required, integer, between: between(20, 99)},
                quantum_mechanics: {required, integer, between: between(20, 99)}
            },

            grePsychology: {
                is_mock: {},
                quantitative: {required, integer, between: between(130, 170)},
                verbal: {required, integer, between: between(130, 170)},
                analytical_writing: {required, between: between(0, 6), halfFloatValidator},
                total: {required, between: between(200, 990), moduleTenValidator},
                biological: {required, integer, between: between(20, 99)},
                cognitive: {required, integer, between: between(20, 99)},
                social: {required, integer, between: between(20, 99)},
                developmental: {required, integer, between: between(20, 99)},
                clinical: {required, integer, between: between(20, 99)},
                measurement_or_methodology: {required, integer, between: between(20, 99)}
            },

            greBiology: {
                is_mock: {},
                quantitative: {required, integer, between: between(130, 170)},
                verbal: {required, integer, between: between(130, 170)},
                analytical_writing: {required, between: between(0, 6), halfFloatValidator},
                total: {required, between: between(200, 990), moduleTenValidator},
                cellular_and_molecular: {required, integer, between: between(20, 99)},
                organismal: {required, integer, between: between(20, 99)},
                ecology_and_evolution: {required, integer, between: between(20, 99)},
            },

            greGeneral: {
                is_mock: {},
                quantitative: {required, integer, between: between(130, 170)},
                verbal: {required, integer, between: between(130, 170)},
                analytical_writing: {required, between: between(0, 6), halfFloatValidator},
            },

            greSubject: {
                is_mock: {},
                quantitative: {required, integer, between: between(130, 170)},
                verbal: {required, integer, between: between(130, 170)},
                analytical_writing: {required, between: between(0, 6), halfFloatValidator},
                total: {required, between: between(200, 990), moduleTenValidator}
            },

            duolingo: {
                is_mock: {},
                overall: {required, integer, between: between(10, 160)},
                literacy: {required, integer, between: between(0, 32767)},
                comprehension: {required, integer, between: between(0, 32767)},
                conversation: {required, integer, between: between(0, 32767)},
                production: {required, integer, between: between(0, 32767)},
            },
        },
        data() {
            return {
                selectedLanguageCertificateStatus: 'donthave',
                selectedCert: null,
                isSubmitted: false,
                regularCert: {
                    is_mock: false,
                    speaking: 6.5,
                    writing: 6.5,
                    listening: 6.5,
                    reading: 6.5,
                    overall: 6.5,
                },

                gmat: {
                    is_mock: false,
                    analytical_writing_assessment: 0,
                    integrated_reasoning: 1,
                    quantitative_and_verbal: 6,
                    total: 200,
                },

                duolingo: {
                    is_mock: false,
                    overall: 10,
                    literacy: 0,
                    comprehension: 0,
                    conversation: 0,
                    production: 10,
                },

                greSubject: {
                    is_mock: false,
                    quantitative: 130,
                    verbal: 130,
                    analytical_writing: 0,
                    total: 200
                },

                greGeneral: {
                    is_mock: false,
                    quantitative: 130,
                    verbal: 130,
                    analytical_writing: 0,
                    total: 200
                },

                greBiology: {
                    is_mock: false,
                    quantitative: 130,
                    verbal: 130,
                    analytical_writing: 0,
                    total: 200,
                    cellular_and_molecular: 20,
                    organismal: 20,
                    ecology_and_evolution: 20,
                },

                grePhysics: {
                    is_mock: false,
                    quantitative: 130,
                    verbal: 130,
                    analytical_writing: 0,
                    total: 200,
                    classical_mechanics: 20,
                    electromagnetism: 20,
                    quantum_mechanics: 20
                },

                grePsychology: {
                    is_mock: false,
                    quantitative: 130,
                    verbal: 130,
                    analytical_writing: 0,
                    total: 200,
                    biological: 20,
                    cognitive: 20,
                    social: 20,
                    developmental: 20,
                    clinical: 20,
                    measurement_or_methodology: 20
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
            },
            langCertAddPermission() {
                return this.$store.getters.langCertAddPermission;
            },
            isPayloadValid() {
                return this.$store.getters.isPayloadValid;
            }

        },
        watch: {
            langCertAddPermission(newVal, oldVal) {
                console.log('lang cert add permission from ', oldVal, ' switch to ', newVal)
                if (oldVal == false && newVal == true) {
                    if (this.selectedCert) {
                        this.createPayload();
                        if (this.isPayloadValid) {
                            this.pingCertificateHandler();
                        } else {
                            this.$notify({
                                group: 'notif',
                                title: 'مدرک: اخطار',
                                text: 'لطفاً ورودی های مدرک را کنترل کنید.',
                                type: 'warn',
                                duration: 3000
                            })
                        }
                    }
                }
                this.$store.commit('setLangCertAddPermission', false)
            },
            selectedLanguageCertificateStatus(newStatus) {
                this.$store.commit('setWantsToAddCert', newStatus == 'have')
                if (newStatus == 'donthave') {
                    this.setSelectedCert(null);
                }
            }
        },
        methods: {
            setGapYears(newGapYear) {
                this.gapYears = newGapYear;
            },
            setSelectedCert(cert) {
                this.selectedCert = cert;
            },
            createPayload() {
                let payload = {
                    student_detailed_info: this.detailedFormId,
                    certificate_type: this.selectedCert.nameEnglish
                }
                this.$v.$touch();
                switch (this.selectedCert.nameEnglish) {
                    case 'IELTS_GENERAL' :
                    case 'IELTS_ACADEMIC' :
                    case 'TOEFL' :
                        payload = {
                            ...payload,
                            ...this.regularCert,
                        }
                        this.$store.commit('setIsPayloadValid', !this.$v.regularCert.$error);
                        break;
                    case 'GMAT' :
                        payload = {
                            ...payload,
                            ...this.gmat
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.gmat.$error);
                        break;
                    case 'GRE_PHYSICS':
                        payload = {
                            ...payload,
                            ...this.grePhysics
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.grePhysics.$error);
                        break;
                    case 'GRE_BIOLOGY':
                        payload = {
                            ...payload,
                            ...this.greBiology
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.greBiology.$error);
                        break;
                    case 'GRE_PSYCHOLOGY':
                        payload = {
                            ...payload,
                            ...this.grePsychology
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.grePsychology.$error);
                        break;
                    case 'GRE_GENERAL':
                        payload = {
                            ...payload,
                            ...this.greGeneral
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.greGeneral.$error);
                        break;
                    case 'GRE_MATHEMATICS':
                    case 'GRE_LITERATURE':
                    case 'GRE_CHEMISTRY':
                        payload = {
                            ...payload,
                            ...this.greSubject
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.greSubject.$error);
                        break;
                    case 'DUOLINGO':
                        payload = {
                            ...payload,
                            ...this.duolingo
                        }
                        console.log('certificate payload ', payload);
                        this.$store.commit('setIsPayloadValid', !this.$v.duolingo.$error);
                        break;
                }
                console.log('form payload validity ', this.$store.getters.isPayloadValid);
                this.$store.commit('setLangCertToAdd', payload);
            },

            pingCertificateHandler() {
                this.$emit('langcert-add');
            }

        },
        created() {
            this.$store.commit('setWantsToAddCert', false);
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