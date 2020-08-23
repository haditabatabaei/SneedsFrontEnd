import api from '../api'
export default {
    state: {
        destination: null,
        destinationAddPermission: false,
        isDestinationValid: false,
        wantsToAddDestination: true,
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
            state.wantsToAddDestination = validityState
        }
    },
    actions: {
        createDestination({state, getters, commit}) {
            return new Promise(async (resolve, reject) => {
                if (state.isDestinationValid) {
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
                    reject();
                }
            })
        },
    },
    getters: {
        destinationAddPermission: state => state.destinationAddPermission,
        isDestinationValid: state => state.isDestinationValid,
        destination: state => state.destination,
        wantsToAddDestination: state => state.wantsToAddDestination
    }
}