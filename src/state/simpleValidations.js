export default {
    state: {
        educationalGapIsValid: true,
        ageIsValid: true,
        workExperienceIsValid: false,
    },

    mutations: {
        setEducationalGapIsValid(state, validityState) {
            state.educationalGapIsValid = validityState
        },
        setAgeIsValid(state, validityState) {
            state.ageIsValid = validityState
        },
        setWorkExperienceIsValid(state, validityState) {
            state.workExperienceIsValid = validityState
        }
    },

    actions: {

    },

    getters: {
        educationalGapIsValid: state => state.educationalGapIsValid,
        ageIsValid: state => state.ageIsValid,
        workExperienceIsValid: state => state.workExperienceIsValid
    }
}