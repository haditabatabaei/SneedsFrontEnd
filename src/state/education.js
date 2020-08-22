import api from '../api'

export default {
    state: {
        educationToAdd: null,
        isEducationValid: false,
        addEducationPermission: false,
        wantsToAddEducation: true,
    },
    mutations: {
        setAddEducationPermission(state, permission) {
            state.addEducationPermission = permission;
        },

        setIsEducationValid(state, isValid) {
            state.isEducationValid = isValid;
        },

        setEducationToAdd(state, educationToAdd) {
            state.educationToAdd = educationToAdd;
        },

        setWantsToAddEducation(state, option) {
            state.wantsToAddEducation = option;
        }
    },
    actions: {
        createEducation({commit, getters}) {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log(getters.educationToAdd)
                    console.log(getters.isEducationValid)
                    if (getters.isEducationValid) {
                        let res = await api.post(`${getters.getApi}/account/student-detailed-university-throughs/`, getters.educationToAdd, getters.httpConfig);
                        console.log(res);
                        resolve(res);
                    } else {
                        reject('Education is not valid');
                    }
                } catch (e) {
                    reject(e);
                } finally {
                    commit('setAddEducationPermission', false);
                }
            })
        }
    },
    getters: {
        educationToAdd: state => state.educationToAdd,
        isEducationValid: state => state.isEducationValid,
        addEducationPermission: state => state.addEducationPermission,
        wantsToAddEducation: state => state.wantsToAddEducation
    }
}