import api from '../api'
export default {
    state: {
        wantsToAddPaper: false,
        paperToAdd: null,
        paperAddPermission: false,
        paperIsValid: false
    },
    mutations: {
        setWantsToAddPaper(state, option) {
            state.wantsToAddPaper = option
        },
        setPaperToAdd(state, paper) {
            state.paperToAdd = paper
        },

        setPaperAddPermission(state, permission) {
            state.paperAddPermission = permission
        },

        setPaperIsValid(state, validity) {
            state.paperIsValid = validity
        }
    },
    actions: {
        createPaper({commit, getters}) {
            return new Promise((resolve, reject) => {
                if(getters.wantsToAddPaper) {
                    if(getters.paperIsValid) {
                        api.post(`${getters.getApi}/account/publications/`, getters.paperToAdd, getters.httpConfig)
                            .then(response => {
                                resolve(response)
                                commit('setWantsToAddPaper', false)
                                commit('setPaperToAdd', null)
                                commit('setPaperIsValid', false)
                            })
                            .catch(err => {
                                reject(err);
                            })
                            .finally(() => {
                                commit('setPaperAddPermission', false)
                            })
                    } else {
                        reject('Paper input is not valid.')
                    }
                } else {
                    reject('Dont want to add paper.')
                }
            })
        }
    },
    getters: {
        wantsToAddPaper: state => state.wantsToAddPaper,
        paperToAdd: state => state.paperToAdd,
        paperAddPermission: state => state.paperAddPermission,
        paperIsValid: state => state.paperIsValid
    }
}