import api from '../api'
export default {
    state: {
        langCertToAdd: null,
        wantsToAddCert: false,
        langCertAddPermission: false,
        isPayloadValid: false,
    },

    mutations: {
        setLangCertAddPermission(state, permission) {
            state.langCertAddPermission = Boolean(permission)
        },
        setLangCertToAdd(state, cert) {
            state.langCertToAdd = cert;
        },
        setWantsToAddCert(state, option) {
            state.wantsToAddCert = Boolean(option)
        },
        setIsPayloadValid(state, option) {
            state.isPayloadValid = Boolean(option);
        },
    },

    actions: {
        createLanguageCert({commit, getters, state}) {
            return new Promise(async (resolve, reject) => {
                if(state.wantsToAddCert) {
                    if(state.isPayloadValid) {
                        //post cert
                        let payload = state.langCertToAdd;
                        let result = {}
                        try {
                            switch (payload.certificate_type) {
                                case 'IELTS_GENERAL' :
                                case 'IELTS_ACADEMIC' :
                                case 'TOEFL' :
                                    result = await api.post(`${getters.getApi}/account/regular-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'GMAT' :
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/gmat-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'GRE_PHYSICS':
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/gre-physics-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'GRE_BIOLOGY':
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/gre-biology-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'GRE_PSYCHOLOGY':
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/gre-psychology-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'GRE_GENERAL':
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/gre-general-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'GRE_MATHEMATICS':
                                case 'GRE_LITERATURE':
                                case 'GRE_CHEMISTRY':
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/gre-subject-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                                case 'DUOLINGO':
                                    console.log('certificate payload ', payload);
                                    result = await api.post(`${getters.getApi}/account/duolingo-certificates/`, payload, getters.httpConfig);
                                    console.log(result);
                                    break;
                            }
                            commit('setWantsToAddCert', false);
                            commit('setLangCertToAdd', null)
                            commit('setIsPayloadValid', false)
                            resolve(result);
                        } catch (e) {
                            reject(e);
                        } finally {
                            commit('setLangCertAddPermission', false)
                        }
                    } else {
                        reject();
                    }
                } else {
                    reject();
                }
            })

        }
    },

    getters: {
        langCertAddPermission: state => state.langCertAddPermission,
        langCertToAdd: state => state.langCertToAdd,
        wantsToAddCert: state => state.wantsToAddCert,
        isPayloadValid: state => state.isPayloadValid
    }
}