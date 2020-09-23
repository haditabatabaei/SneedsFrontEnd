<template>
    <div class="consultant-info-container ">
        <img class="consultant-avatar" :src="consultant.profile_picture" >
        <div class="consultant-info">
            <star-rating
                    :star-size="12"
                    :padding="1"
                    :showRating="false"
                    :read-only="true"
                    style="background-color: #ffffff;padding:10px 0px 5px 0px; border-radius:20px"
                    inactive-color="#00BFD6"
                    active-color="#00BFD6"
                    :border-width="0"
                    v-model="rate"
            />
            <p class="consultant-name">
                {{consultant.first_name + ' ' + consultant.last_name}}
                <span><img class="county-img" :src="studyInfo.country.picture" alt=""></span>
            </p>
          <p class="consultant-bio">
            {{studyText}}
          </p>


        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    export default {
        name: "HomePageConsultant",
        components: {
            "star-rating": StarRating
        },
        data() {
            return {
                rate: 2.5
            }
        },
        props: {
            consultant: {
                type: Object,
                default: () => null
            }

        },
      computed: {
        studyInfo() {
          return this.consultant.study_info[this.consultant.study_info.length - 1];
        },
        studyText() {
          if (this.consultant != null) {
            return `Studying ${this.studyInfo.grade} of ${this.studyInfo.field_of_study.name} at ${this.studyInfo.university.name} in ${this.studyInfo.country.name}`
          } else {
            return " ";
          }
        },
      }
    }
</script>

<style scoped>
    .consultant-info-container {
        width: 30%;
        min-height: 130px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 0px 7px 46px #0000001F;
        margin:20px auto;

    }

    .consultant-info {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding-left: 10px;

    }
    .consultant-avatar {
      width: 30%;
      border-radius: 20px;
      padding: 10px;
    }
    .consultant-name {
        color: #303143;
        font-size: 11px;
      font-weight: bold;
    }
    .county-img {
      width: 20px;
      height: 20px;
    }
    .consultant-bio {
      font-size: 10px;
       color: #707070;

    }
    @media only screen and (max-width: 767.8px) {
        .consultant-info-container {
            width: 90%;
          margin:  15px auto;
        }
    }

</style>