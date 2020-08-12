<template>
    <section class="analysis-form"> 
        <div class="analysis-form-bluebg"></div> 
        <div class="form-title-circle"></div>
      
        <section class="form-container">
            <aside class="form-title">
                <h1 class="form-title-text" style="font-family: Sans-Serif !important">
                    sneeds.ir
                </h1>
                <p class="form-title-desc danaFont">
                    برای رسید به اهدافت نیاز به کمک داری؟
                    <br>
                    <span class="form-title-desc-emphase">
                        درست اومدی!
                        <span class="form-title-desc-star"></span>
                    </span>
                </p>
                <img draggable="false" class="form-title-image" src="/sneedsAssets/img/takhminstars.svg" alt="کاربران اسنیدز">
            </aside>
            <main class="form-layout-view-wrapper">
                <router-view @edulevel-add="edulevelAddHandler" @sync-current-page="syncCurrentPage" :key="$route.fullPath" class="form-layout-view"></router-view>
                <div class="progress-wrapper">
                    <div class="form-confirm isansFont">
                        <button @click="submitAndMoveNext()" class="form-confirm-next">
                        <span>
                        ادامه
                        </span>
                            <i class="material-icons">keyboard_arrow_left</i>
                        </button>
                        <button @click="goBack()" class="form-confirm-back">
                            <i class="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
                    <div class="form-progress">
                        <span class="form-progress-value" :style="currentPageWidthStyle"></span>
                    </div>
                </div>
            </main>
        </section>
    </section>
</template>

<script>
export default {
    name: 'AnalysisFormLayout',
    data() {
        return {
            startPage: 1,
        }
    },
    computed: {
        currentPageWidthStyle() {
            console.log(this.currentPage)
            console.log(this.lastPage);
            console.log(this.$route);
            console.log(`width:${(this.currentPage / this.lastPage) * 100}%`);
            return `width:${(this.currentPage / this.lastPage) * 100}%`;
        },

        currentPage() {
            for(let entry of this.pageMap.entries()) {
                //if value was equal to form part name of current route
                if(entry[1] == this.$route.meta.formPartName) {
                    //return key as current page number
                    return entry[0]
                }
            }
            return 1;
        },

        lastPage() {
            return this.pageMap.size;
        },

        nextPageRoute() {
            let nextPage = this.currentPage + 1;
            if(nextPage > this.lastPage) {
                nextPage = this.lastPage;
            }
            return `/analysis/form/${this.pageMap.get(nextPage)}`
        },

        prevPageRoute() {
            let prevPage = this.currentPage - 1;
 
            if(prevPage < this.startPage ) {
                prevPage = this.startPage;
            }
            
            return `/analysis/form/${this.pageMap.get(prevPage)}`
        },

        pageMap() {
            return this.$store.getters.analysisFormPageMapping;
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
        syncCurrentPage(currentPageNumber) {
            this.currentPage = currentPageNumber;
        },

        async submitAndMoveNext() {
            if(this.$route.path != this.nextPageRoute) {
                //try this.submitmarriage() or this.submitmilitaryservice() or this.submit + this route name in store page map()
                try {
                    await this[`submit${this.pageMap.get(this.currentPage)}`]();
                } catch (e) {
                    console.log(e)
                } finally {
                    console.log('going to ', this.nextPageRoute)
                    this.$router.push(this.nextPageRoute);
                }
            } else {
                console.log('nowhere to go.')
            }
        },

        edulevelAddHandler() {
            console.log('edu level add handler');
        },

        async submitmarriage() {
            console.log(this.detailedForm.is_married);
            let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'is_married': this.detailedForm.is_married}, this.httpConfig)
            console.log('marriage status code', result.status)
        },

        async submitmilitaryservice() {
            console.log(this.detailedForm.military_service_status);
            let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'military_service_status': this.detailedForm.military_service_status}, this.httpConfig)
            console.log('military_service_status status code', result.status)
        },

        async submiteducationalgap() {
            console.log(this.detailedForm.academic_break);
            let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'academic_break': this.detailedForm.academic_break}, this.httpConfig)
            console.log('academic break status code', result.status)
        },

        async submitgender() {
            console.log(this.detailedForm.academic_break);
            let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'gender': this.detailedForm.gender, 'age': this.detailedForm.age}, this.httpConfig)
            console.log('academic break status code', result.status)
        },

        async submitworkexperience() {
            console.log(this.detailedForm.related_work_experience);
            let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'related_work_experience': this.detailedForm.related_work_experience}, this.httpConfig)
            console.log('work exp status code', result.status)
        },

        async submitfunds() {
            let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`,
                {'prefers_full_fund': this.detailedForm.prefers_full_fund, 'prefers_half_fund': this.detailedForm.prefers_half_fund, 'prefers_self_fund': this.detailedForm.prefers_self_fund},
                this.httpConfig)
            console.log('funds status code', result.status)
        },

        goBack() {
            if(this.$route.path != this.prevPageRoute) {
                this.$router.push(this.prevPageRoute);
            } else {
                console.log('nowhere to go.')
            }
        }
    },

    async created() {
        if(this.isLoggedIn) {
            //user is logged in
            if(!!this.detailedForm) {
                //user has form
            } else {
                //user doesnt have form
            }
        } else {
            //user is not logged in
            //check if there is form id present in storage
           if(!Boolean(this.detailedFormId)) {
               //there is no id, create an empty form and set form id and empty form data
               let formResult = await this.$api.post(`${this.api}/account/student-detailed-info/`, {}, this.httpConfig);
               console.log(formResult);
               this.$store.commit('setDetailedForm', formResult.data)
           } else {
               //there is an id available
               if(!Boolean(this.detailedForm)) {
                    //there is id but there is no form try fetch and set form
                   let formResult = await this.$api.get(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, this.httpConfig);
                   console.log(formResult)
                   this.$store.commit('setDetailedForm', formResult.data)
               }
           }

        }
        // console.log('analysis layout created.', this.user);
        // if(this.detailedForm == null) {
        //     let result = await this.$api.get(`${this.api}/account/user-student-detailed-info/${this.user.id}/`, this.httpConfig)
        //     console.log(result.data);
        //     this.$store.commit('setDetailedForm', result.data)
        // }
        // this.$api.get(`${this.api}/`)
        // if(!localStorage.hasOwnProperty('aformid')) {
        //     console.log('create new form')
        //     localStorage.setItem('aformid', 10)
        // } else {
        //     console.log(`continue as ${localStorage.getItem('aformid')}`)
        // }
    }
}
</script>

<style scoped>
    .analysis-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-size: 50%;
        position: relative;
    }

    .analysis-form-bluebg {
        background: #20639b; /* Old browsers */
        background: -moz-linear-gradient(top,  #20639b 0%, #051c30 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top,  #20639b 0%,#051c30 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom,  #20639b 0%,#051c30 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#20639b', endColorstr='#051c30',GradientType=0 ); /* IE6-9 */
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        min-height: 100vh;
        z-index: 1;
    }

    .form-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: flex-start;
        z-index: 5;
    }

    .form-title {
        width: 40%;
        max-width: 600px;
        align-self: stretch;
        position: relative;
    }

    .form-title-circle {
        position: absolute;
        right: 0;
        top: 0;
        width: 120px;
        height: 110px;
        background-color: #0F4775;
        border-radius: 50% 0 50% 50%;
        z-index: 5;
    }

    .form-title-image {
        position: absolute;
        bottom:0;
        left: 0;
        margin-left: 15px;
    }

    .form-title-text {
        position: absolute;
        right: 30px;
        top: 30px;
        z-index: 10;
        color: #EFF8FF;
        background-color: #20639B;
        border-radius: 30px;
        font-size: 22px;
        padding: 5px 15px;
        margin: 0;
    }

    .form-title-desc {
        font-size: 19px;
        color: #F5F7FA;
        background-color: #1A5D8E;
        box-shadow: 0 13px 23px rgba(0,0,0,0.1);
        border-radius: 15px;
        margin: 150px 50px 0 50px;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .form-title-desc-emphase {
        position: relative;
        font-weight: bold;
        font-size: 24px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding-right: 16px;
    }

    .form-title-desc-emphase:before {
        position: absolute;
        right: 0;
        top: 10px;
        width: 5px;
        height: 5px;
        content: " \2726";
        font-size: 15px;
    }

    .form-layout-view-wrapper {
        min-height: 100vh;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        background-color: white;
        padding-right: 35px;
        max-width: 800px;
    }

    .form-layout-view {
        min-height: calc(100vh - 200px);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding-top: 100px;
    }

    .form-progress {
        width: calc(100% - 40px);
        margin: 20px;
        height: 17px;
        border-radius: 20px;
        background-color: #DDEEFC;
        position: relative;
        z-index: 10;
    }

    .form-progress-value {
        position: absolute;
        top: 0;
        right: 0;
        height: 17px;
        background-color: #00A3B6;
        z-index: 15;
        border-radius: 20px;
    }

    .form-confirm {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-direction: row-reverse;
        height: 45px;
        max-width: 800px;
        align-self: flex-end;
        margin-left: 20px;
    }

    .form-confirm-next {
        background-color: #A347FF;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 5px 15px;
        border-radius: 5px 5px;
        font-size: 18px;
        transition: all 100ms ease-in-out;
        width: 200px;
    }

    .form-confirm-next i.material-icons {
        margin-right: auto;
    }

    .form-confirm-next span {
        margin-right: auto;
    }

    .form-confirm-next:hover {
        background-color: white;
        border: 2px solid #A347FF;
        padding: 5px 13px;
        color: #A347FF;
    }

    .form-confirm-back {
        border-radius: 5px;
        border: none;
        background-color: #F2F2F2;
        color: #707070;
        padding: 0 10px;
        transition: all 100ms ease-in-out;
    }

    .form-confirm-back:hover {
        background-color: #707070;
        color: #F2F2F2;
    }

    .progress-wrapper {
        display: flex;
        flex-direction: column;
    }


    @media only screen and (max-width: 991.8px ) and (min-width: 767.8px) {
        .form-title {
            display: none;
        }

        .form-container {
            flex-direction: column;
        }

        .analysis-form-bluebg {
            display: none;
        }

        .form-title-circle {
            display: none;
        }

        .form-layout-view-wrapper {
            width: auto;
            padding: 0;
            max-width: initial;
        }
    }


    @media only screen and (max-width: 767.8px) {
        .form-title {
            display: none;
        }

        .form-layout-view-wrapper {
            width: 100%;
            padding: 0 0 122px 0;
        }

        .progress-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 -11px 16px #0000001A;
            justify-content: center;
        }

        .form-confirm-back {
            position: fixed;
            top: 20px;
            right: 20px;
            color: #959D9D;
            padding: 10px;
            background: none;
        }

        .form-confirm-back i {
            font-size: 24px;
        }

        .form-confirm {
            align-self: stretch;
            margin: 20px 20px 0 20px;
        }

        .form-confirm-next {
            width: 100%;
        }
    }
</style>