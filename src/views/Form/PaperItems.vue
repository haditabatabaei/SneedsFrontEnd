<template>
    <section class="paper-items isansFont">
        <div class="paper-items-wrapper isansFont--faNum">
            <div class="paper-items-item" v-for="item in items">
                <i class="material-icons paper-item-icon">content_paste</i>
                <div class="paper-item-info">
                    <p class="paper-item-summary">{{getSummary(item)}}</p>
                    <p class="paper-item-title">عنوان مقاله: {{item.title}}</p>
                </div>
                <button class="paper-item-remove" @click="deletePaper(item)">
                    <i class="material-icons">close</i>
                </button>
            </div>

            <moon-loader class="loading-icon" style="align-self:center;margin:20px auto;" color="purple" :loading="loading" :size="20" sizeUnit="px"/>

            <p class="paper-items-empty" v-if="items.length == 0">
                مقاله ای وارد نشده است.
            </p>

            <router-link to="/analysis/form/paper" class="paper-items-addnew" v-if="items.length > 0">
                افزودن مقاله دیگر
            </router-link>

            <router-link to="/analysis/form/paper" class="paper-items-addnew" v-else>
                افزودن مقاله جدید
            </router-link>
        </div>
    </section>
</template>

<script>
    export default {
        name: "PaperItems",
        data() {
            return {
                items: [],
                loading: false
            }
        },
        computed: {
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
            getType(type) {
                switch (type.toLowerCase()) {
                    case 'journal':
                        return 'مقاله ژورنالی'
                    case 'conference':
                        return 'مقاله کنفرانسی';
                }
            },

            getAuthorNumber(authorNumber) {
                switch (authorNumber.toLowerCase()) {
                    case 'first':
                        return 'اول'
                    case 'second':
                        return 'دوم'
                    case 'third':
                        return 'سوم'
                    case 'fourth_or_more':
                        return 'چهارم به بعد'
                }
            },

            getJournalReputation(rp) {
                switch (rp.toLowerCase()) {
                    case 'one_to_three':
                        return '1 تا 3';
                    case 'four_to_then':
                        return '4 تا 10'
                    case 'above_ten':
                        return 'بالای 10'
                }
            },

            getSummary(item) {
                return `${this.getType(item.type)}، ${item.publish_year}، نویسنده ${this.getAuthorNumber(item.which_author)}`
            },

            async getPublications() {
                try {
                    this.loading = true;
                    let result = await this.$api.get(`${this.api}/account/publications/?student-detailed-info=${this.detailedFormId}`, this.httpConfig);
                    this.items = result.data;
                    console.log('publications results ', result)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.loading = false;
                }

            },

            async deletePaper(item) {
                try {
                    this.loading = true;
                    let delResult = await this.$api.delete(`${this.api}/account/publications/${item.id}/`, this.httpConfig)
                    console.log(delResult)
                    this.getPublications();
                } catch (e) {

                } finally {
                    this.loading = false;
                }
            }
        },
        watch: {
            detailedForm(newDetailedForm) {
                console.log('detailed form changed ', newDetailedForm);
                this.getPublications();
            }
        },
        created() {
            if(this.detailedForm) {
                this.getPublications();
            }
        }
    }
</script>

<style scoped>
    .paper-items {
        display: flex !important;
        flex-direction: column;
        align-items: stretch !important;
        padding: 100px 20px 20px 20px;
    }

    .paper-items-notif {
        color: white;
        background-color: #009FB3;
        border-radius: 15px;
        font-size: 16px;
        display: flex;
        align-items: center;
        min-height: 45px;
    }

    .paper-items-notif i {
        margin: 0 15px 0 10px;
        background-color: white;
        border-radius: 50%;
        color: #009FB3;
        font-size: 20px;
    }

    .paper-items-wrapper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border-radius: 20px;
        background-color: #F5F7FA;
        border: 2px solid #F2F2F2;
        margin-top: 20px;
    }

    .paper-items-item {
        display: flex;
        align-items: center;
    }

    .paper-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F4CA64;
        border: 5px solid white;
        width: 60px;
        height: 60px;
        font-size: 26px;
        color: white;
        border-radius: 50%;
        box-shadow: 0 2px 20px #00000029;
        margin: 20px;
    }

    .paper-item-remove {
        margin: 0 auto 0 20px;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        color: #B3B3B3;
    }

    .paper-item-summary {
        margin: 0;
        font-size: 20px;
        color: #173F5F;
    }

    .paper-item-title {
        margin: 5px 0 0 0;
        font-size: 14px;
        color: #9B9999;
    }

    .paper-items-empty {
        align-self: center;
        margin-top: 20px;
    }

    .paper-items-addnew {
        align-self: flex-end;
        margin: 20px;
        background-color: #F5F7FA;
        border: 2px solid #00BFD6;
        color: #009FB3;
        border-radius: 5px;
        padding: 5px 15px;
    }

    @media only screen and (max-width: 767.8px) {
        .paper-items-item {
            flex-direction: column;
            position: relative;
        }

        .paper-item-icon {
            margin: 20px 0 10px 0;
        }

        .paper-item-info {
            text-align: center;
            margin: 10px 0 0 0;
        }

        .paper-item-remove {
            position: absolute;
            top: 20px;
            right: 20px;
            margin: 0;
        }

        .paper-items-addnew {
            align-self: center;
        }

        .paper-items-notif {
            justify-content: center;
        }
    }


</style>