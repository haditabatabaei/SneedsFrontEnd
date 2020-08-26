import api from '../api'
export default {
    state: {
        destination: null,
        destinationAddPermission: false,
        isDestinationValid: false,
        wantsToAddDestination: true,
        hasPrevDestination: false,
    },
    mutations: {
        setDestination(state, destination) {
            state.destination = destination;
        },

        setDestinationAddPermission(state, permission) {
            state.destinationAddPermission = permission;
        },

        setIsDestinationValid(state, isValid) {
            state.isDestinationValid = isValid;
        },

        setWantsToAddDestination(state, validityState) {
            state.wantsToAddDestination = validityState;
        },

        setHasPrevDestination(state, hasPrevDestination) {
            state.hasPrevDestination = hasPrevDestination;
        }
    },
    actions: {
        createDestination({getters, commit}) {
            return new Promise(async (resolve, reject) => {
                if (getters.isDestinationValid) {
                    //create destination
                    try {
                        let result = await api.post(`${getters.getApi}/account/want-to-applies/`, getters.destination, getters.httpConfig)
                        console.log(result);
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    } finally {
                        commit('setDestinationAddPermission', false)
                        commit('setDestination', null)
                        commit('setIsDestinationValid', false)
                        commit('setWantsToAddDestination', true)
                    }
                } else {
                    reject('Destination is not valid');
                }
            })
        },

        overrideDestination({getters, commit}) {
            return new Promise(async (resolve, reject) => {
                if(getters.isDestinationValid) {
                    //override destination by put method
                    try {
                        let result = await api.put(`${getters.getApi}/account/want-to-applies/${getters.destination.id}/`, getters.destination, getters.httpConfig)
                        console.log(result);
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    } finally {
                        commit('setDestinationAddPermission', false)
                        commit('setDestination', null)
                        commit('setIsDestinationValid', false)
                        commit('setWantsToAddDestination', true)
                    }
                } else {
                    reject('Destination is not valid.')
                }
            })
        }
    },

    getters: {
        destinationAddPermission: state => state.destinationAddPermission,
        isDestinationValid: state => state.isDestinationValid,
        destination: state => state.destination,
        wantsToAddDestination: state => state.wantsToAddDestination,
        hasPrevDestination: state => state.hasPrevDestination
    }
}