export default {
    state: {
        detailedForm: null,

        detailedFormId: localStorage.getItem('detailedFormId') || null,

        analysisFormPageMapping: new Map(
            [
                [1, 'marriage'],
                [2, 'militaryservice'],
                [3, 'educationalgap'],
                [4, 'gender'],
                [5, 'workexperience'],
                [6, 'lasteducationallevel'],
                [7, 'educationallevelsitems'],
                [8, 'paper'],
                [9, 'paperitems'],
                [10, 'powerfulrecom'],
                [11, 'languagecerts'],
                [12, 'languagecertsitems'],
                [13, 'destination'],
                [14, 'destinationitems'],
                [15, 'funds'],
                [16, 'otherinformation']
            ]
        )
    },
    mutations: {
        setDetailedForm(state, form) {
            state.detailedForm = form;
            if(form == null) {
                localStorage.removeItem('detailedFormId')
            } else {
                state.detailedFormId = form.id;
                localStorage.setItem('detailedFormId', form.id)
            }
        },

        setDetailedFormProperty(state, {prop, value}) {
            state.detailedForm[prop] = value;
            if(prop == 'id') {
                localStorage.setItem('detailedFormId', value)
            }
        },
    },
    actions: {

    },
    getters: {
        detailedForm: state => state.detailedForm,
        detailedFormId: state => state.detailedFormId,
        analysisFormPageMapping: state => state.analysisFormPageMapping
    }
}