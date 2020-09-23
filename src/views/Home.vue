<template>
    <main class="landing gadugiFont">
        <section class="landing-section  homepage-section">
            <div class="homepage-intro">
              <img class="globe-desktop" src="/sneedsAssets/img/Globe Desktop.png">
                <div class="homepage-intro-info">
                    <h6 class="homepage-intro-info-small-title">with Abroad Path</h6>
                    <h1 class="homepage-intro-info-title">You Shouldn't Study Abroad Alone</h1>
                    <div class="homepage-intro-info-title-line"></div>
                    <p class="homepage-intro-info-text">

                      Receive personalized guidance from mentors who are currently
                      studying in same field and country you desire.

                    </p>
                    <div class="homepage-links homepage-info-links">
                        <router-link to="/analysis/landing" class="link-admit">
                            Admit chance
                            <span class="link-admit-free">Free</span>
                        </router-link>
                      <router-link to="/consultants" class="homepage-intro-info-link link -interview">
                        Consultation
                      </router-link>
                        <a href="https://sneeds.ir/%D9%81%DB%8C%D9%84%D9%85-%D9%87%D8%A7%DB%8C-%D8%AE%D9%88%D8%AF
                        -%D8%A2%D9%85%D9%88%D8%B2-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/"
                           class="homepage-intro-info-link link -live">
                          Videoes</a>
                        <a href="https://sneeds.ir/%D9%81%DB%8C%D9%84%D9%85-%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1%D9%87%D8%A7-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/"
                           class="homepage-intro-info-link link -webinar">
                          Webinars
                        </a>
                    </div>

                </div>
              <img class="globe-mobile" src="/sneedsAssets/img/Globe-mobile.png">
            </div>

        </section>


        <section class="landing-section  structure-section">
            <div class="structure-section-stages-header">
                <h2 class="structure-section-title">How does it work?</h2>
                <div class="structure-section-title-line">

                </div>


                <p class="structure-section-title-sub" >We connect you with international students</p>

            </div>


            <div class="structure-section-stages">
                <div class="structure-section-stages-column">
                    <img class="circle-svg" src="/sneedsAssets/img/step1.png">
                    <p class="structure-section-small-title">Select a consultant</p>
                    <p class="structure-section-text">
                      After ordering the project, you select the consultant you want according
                      to his resume and score</p>
                </div>
                <div class="structure-section-stages-column">
                  <img  class="circle-svg" src="/sneedsAssets/img/step2.png">
                    <p class="structure-section-small-title">Conectto the consultant</p>
                    <p class="structure-section-text">
                        Once you have selected the best consultant, you will connect
                        to the consultant with just one click!
                    </p>
                </div >
                <div class="structure-section-stages-column">
                    <img class="circle-svg" src="/sneedsAssets/img/step3.png">
                    <p class="structure-section-small-title">Start the apply process</p>
                    <p class="structure-section-text">
                            Your application and project process will start immediately after
                           your approval and the consultant will be by your side until the end.
                    </p>
                </div>
            </div>
        </section>



        <section class=" landing-section consultants-section">
            <div class="consultants-section-header  universities">
                <img  class="pointer-svg" src="/sneedsAssets/img/pointer.svg">

                <div class="consultants-section-title">
                    Consultants
                    <div class="consultants-section-header-line"></div>
                    <span class="consultants-section-title-sub">
                       <br>Apply consultants with experience studying at the best universities around the world.
                     </span>


                </div>

            </div>

              <home-page-consultants :consultants-input="Consultants"></home-page-consultants>


            <div class="consultants-section-rows  see-all homepage-links">
                <div class="see-all-link-line"></div>
                <router-link class="see-all-link" to="/consultants">
                    All consultants
                    <i class="material-icons">keyboard_arrow_right</i>
                </router-link>
                <div class="see-all-link-line"></div>
            </div>
        </section>



        <section class="landing-section  advantages">

            <div class="blue-options-box">
                <div class="design-details blue-box-details">
                    <img  class="white-plane-svg" src="/sneedsAssets/img/white-plane.svg" alt="">
                </div>
                <div class="column-container">
                    <div class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                thumb_up_alt
                            </i>
                        </div>
                        <h5 class="blue-box-title">Satisfaction Guarantee</h5>
                        <p class="blue-box-text">An average of 97% satisfaction indicates the quality of our work

                        </p>
                    </div>

                    <div  class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                lock
                            </i>
                        </div>
                        <h5 class="blue-box-title">Secure payments</h5>
                        <p class="blue-box-text">Make secure payments abroad with the help of Snides</p>
                    </div>

                    <div  class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                flight_takeoff
                            </i>
                        </div>
                        <h5 class="blue-box-title">Monitor the process</h5>
                        <p class="blue-box-text">Be aware of the apply process with the fully transparent homepage platform.
                        </p>
                    </div>




                    <div  class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                perm_identity
                            </i>
                        </div>
                        <h5 class="blue-box-title">Approved consultants</h5>
                        <p class="blue-box-text" >Experience gaining admission from the top universities in the world and full familiarity with the apply process</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="landing-section activities">

            <div class="activities-rows  activities">
                <img  class="pointer-svg" src="/sneedsAssets/img/pointer.svg">

                <div  class="activities-header">

                    What do you do?
                    <div class="consultants-section-header-line"></div>
                    <span class="activities-title-sub">
                       <br>
                        Almost everything! From writing and translating documents to making payments and getting accepted
                     </span>

                </div>

            </div>



            <div class="different-activities-box ">
                <div class="horizontal-items-box  different-activities">
                    <div class="different-activities-item">
                        <div class="activities-circle">
                            <img   class="activities-circle-img"src="/sneedsAssets/img/scholarship.svg" alt="">
                        </div>
                        <a  href="#" class="activities-circle-text">Admission packages</a>

                    </div>
                    <div class="different-activities-item">
                        <div class="activities-circle">
                            <img  class="activities-circle-img" src="/sneedsAssets/img/news.svg" alt="">
                        </div>
                        <a href="#" class="activities-circle-text">Writing and editing a cover letter</a>

                    </div>
                    <div class="different-activities-item">
                        <div class="activities-circle">
                            <img  class="activities-circle-img" src="/sneedsAssets/img/subject.svg" alt="">
                        </div>
                        <a  href="#" class="activities-circle-text">Translation of application documents</a>
                    </div>
                </div>

            <div class="horizontal-items-box  different-activities">
                <div class="different-activities-item">
                    <div class="activities-circle">
                        <img class="activities-circle-img" src="/sneedsAssets/img/list.svg" alt="">
                    </div>
                    <a href="#" class="activities-circle-text">Writing and editing SOP </a>

                </div>
                <div class="different-activities-item">
                    <div class="activities-circle">
                        <img  class="activities-circle-img" src="/sneedsAssets/img/book%20(1).svg" alt="">
                    </div>
                    <a  href="#" class="activities-circle-text">Writing and editing CV</a>

                </div>
                <div class="different-activities-item">
                    <div class="activities-circle">
                        <img  class="activities-circle-img" src="/sneedsAssets/img/lesson.svg" alt="">
                    </div>
                    <a href="#" class="activities-circle-text">Admission packages</a>

                </div>
            </div>
            </div>
                <div class="design-details">
                </div>
                <div class="achievements-section">
                    <div class="design-details">
                        <img  class="plane-enter" src="/sneedsAssets/img/airplane-exit.svg" alt="">
                        <img  class="plane-exit" src="/sneedsAssets/img/airplane-enter.svg" alt="">
                    </div>

                    <div class="achievements-section-box  first-box">
                        <img class="achievements-svg" src="/sneedsAssets/img/login.svg" alt="">
                        <h3 class="achievements-section-header">+56 Admissions</h3>
                        <p class="achievements-section-text">Taken by our consultants.</p>
                    </div>
                    <div class="achievements-section-box  center-box">
                        <img class="achievements-svg" src="/sneedsAssets/img/people1.svg" alt="">
                        <h3 class="achievements-section-header">+27,000 Minutes</h3>
                        <p class="achievements-section-text">Online video consulting with homepage consultants.</p>
                    </div>
                    <div class="achievements-section-box  last-box">
                        <img class="achievements-svg" src="/sneedsAssets/img/document%20(1).svg" alt="">
                        <h3 class="achievements-section-header">+540 Documents</h3>
                        <p class="achievements-section-text">Translated, edited or written by  our Consultants.</p>
                </div>
            </div>
          </section>


        <section class="landing-section  analysis-section">
            <div class="analysis">
                <div class="analysis-info">
                    <h6 class="analysis-info-small-title">Advanced Apply Analyzer</h6>
                    <h5 class="analysis-info-title">Make the best decision</h5>
                    <div class="analysis-info-title-line"></div>
                    <p class="analysis-info-text">
                        You filling out the free education information form, you will immediately rank among the other people who intend to
                        Apply with the help of Snides artificial intelligence, see your weaknesses and strengths in addition to
                        Get those smart offers to improve your resume and get ahead of the rest of the competition.
                    </p>
                    <div class="analysis-info-links homepage-links">
                        <a href="#" class=" analysis-link-admit">
                            Admit Chance
                            <span class="analysis-link-free">Free!</span>
                        </a>
                    </div>

                </div>
                <img class="analysis-img-desk" src="/sneedsAssets/img/admit-home-desk.png">
                <img class="analysis-img-mobile" src="/sneedsAssets/img/admit-home-mobile.png">
            </div>

        </section>

      <app-question></app-question>

    </main>

</template>

<script>
   import FAQ from "@/components/HomePage/FAQ";
   import HomePageBlogSection from "../components/HomePage/HomePageBlogSection";
   import BlogSection from "../components/HomePage/BlogSection";
   import HomePageConsultantSection from "../components/HomePage/HomePageConsultantSection";
   import 'vueperslides/dist/vueperslides.css'
    export default {
        components: {
            HomePageConsultantSection,
            HomePageConsultants: HomePageConsultantSection,
            HomePageBlog: HomePageBlogSection,
            appQuestion: FAQ,
        },
        data() {
            return {
                persons: [
                    {SubTitle: "cvfv", Title: "sahar"},
                    {SubTitle: 'cvfv', Title: "aref"},
                    {SubTitle: 'cvfv', Title: 'aFz'},
                    {SubTitle: 'cvfv', Title: 'tehran'}

                ],
                Consultants: []
            }

        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            }

        },
        created() {
            this.getConsultants()
        },
        methods: {
            async getConsultants() {
              this.$api
              .get(`${this.api}/consultant/consultant-profiles/?page=1&page_size=6&ordering=-rate`,this.httpConfig)
                .then (response =>{ this.Consultants = response.data.results;
                })
                .catch(error =>{
                  console.log(error)
                })
               .finally( () => {}

               )

            }


        }
    }
</script>

<style scoped>

    .landing-section{
      margin-bottom: 100px;
      width: 100%;
      max-width: 1500px;
      margin-left: auto;
      margin-right: auto;
      align-items: center;
    }


    .landing-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .homepage-intro {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
        overflow-x: hidden;
    }


    .globe-desktop {
        width: 70%;
        max-width: 80%;
        margin-left: -15%;
        margin-top: -20%;
    }
    .globe-mobile {
      display: none;
    }


    .homepage-intro-info {
        width: 70%;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background-color: white;
        padding-right: 5%;
        padding-left: 5%;
        padding-top: 10%;
        font-size: 14px;
    }



    .homepage-intro-info-small-title {
        margin-bottom: 0px;
        margin-top: 10px;
        color: #374957;
    }

    .homepage-intro-info-title {

        color: #303143;
        font-weight: bold;

    }

    .homepage-intro-info-title-line{

        width: 120px;
        height: 3px;
        background-color: #00D4ED;
        right: -125px;
        border-radius: 2px;

    }

    .homepage-intro-info-text {
        padding: 5% 0px;
        font-size: 14px;
      color:#707070 ;
    }
    .homepage-links:hover{
      filter: brightness(95%);
    }
    .homepage-info-links {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
    }



    .homepage-intro-info-link {
        font-size: 14px;
        border: 1px solid #00D4ED;
        border-radius: 10px;
        color: #00D4ED;
        padding: 7px;
        margin-right: 5px;
        margin-bottom: 10px;
        cursor: pointer;

    }

    .link-admit {
        color: white;
        min-width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent linear-gradient(91deg, #00BFD6 0%, #04AEC2 100%) 0% 0%
        no-repeat padding-box;
        border-radius: 10px;
        font-size: 14px;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 10px 15px;
    }

    .link-admit-free {
        background-color: #008292;
        border-radius: 15px;
        padding: 5px 10px;
        margin-left: 10px;
    }

    .structure-section-title {
        color: #303143;
        font-size: 18px;

    }
    .structure-section-title-sub {
        color: #707070;
        padding: 10px;

    }

    .structure-section-title-line {
        width: 100px;
        height: 3px;
        border-radius: 5px;
        background-color: #00D4ED;
    }

    .structure-section-stages {
        display: flex;
        flex-direction: row;
        max-width: 60%;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0px ;
    }
    .structure-section-stages-header {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      padding: 20px 5%;

    }

    .structure-section-stages-column {
        display: flex;
        min-height: 400px;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding: 20px 5%;
    }


    .structure-section-small-title {
        color: #303143;
        font-size: 18px;
        font-weight: bold;
    }
    .structure-section-text {
      color: #707070;
      margin-top: 15px;
    }

    .circle-svg {
        padding: 20px;
        width: 200px;
        height: 200px;
    }
    .consultants-section-header {
        width: 80%;
        display: flex;
        flex-direction:row;
        align-items: center;
        flex-wrap: nowrap;
        margin: 40px 0px;

    }

    .consultants-section-rows {
        width: 80%;
        display: flex;
        flex-direction:row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: nowrap;
        margin: 40px 0px;
    }



    .see-all-link-line {
        height: 2px;
        width: 40%;
        border-radius: 5px;
        background-color: #E3E3E3;

    }

    .see-all {
        justify-content: center;
        align-items: baseline;
        margin: 0 auto 50px auto;
    }

    .see-all-link {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 10px;
        border-radius: 10px;
        background-color:#DDF3FC;
        color: #009FB3;
        margin: 0px 30px;
        font-size: 10px;

    }


    .pointer-svg {
        width: 40px;
        height: 40px;
        margin-top: -10px;

    }
    .consultants-section-title{
        align-items: flex-start;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;


    }

    .consultants-section-title-sub {
        font-weight: lighter;
        font-size: 14px;
      color: #707070;
    }


    .blue-options-box {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        justify-content: space-around;
        width: 90%;
        border-radius: 20px;
        background: transparent linear-gradient(89deg, #1F6197 0%, #154A74 100%) 0% 0%
        no-repeat padding-box;
    }

    .column-container{
        display: flex;
        justify-content: center;
        flex-direction: row;
        width: 80%;
        margin-bottom: 50px;
    }
    .advantages {
        width: 100%;
        overflow: hidden;
    }
    .blue-box-column {
        max-width: 185px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items:self-start;
        padding: 100px 20px 50px 20px;
    }

    .blue-box-title {
        color: #FFFFFF;
         margin-top: 20px ;
    }

    .blue-box-text {
        color: #1DFFF6;
        font-size: 10px;
      margin-top: 15px;
    }
    .blue-box-details {
        align-items: center;

    }

    .white-plane-svg {
      margin-top: -5%;
      margin-right: 0px;
      width: 30%;
      margin-left: 83%;
    }
    .circle-icon {
        background-color: white;
        color: #1F689E;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 60px;
        height: 60px;
    }

    .material-icons {
        width: 20px;
        height: 20px;
    }


    .activities-rows {
        width: 80%;
        display: flex;
        flex-direction:row;
        align-items: center;
        flex-wrap:nowrap;
        margin: 40px auto;
    }

    .  activities {
        justify-content: flex-start;
    }

    .different-activities-box {
        width: 90%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
    }

    .activities-circle-img {
        width: 50px;
        height: 50px;
    }

    .activities-header {
        align-items: flex-start;
        font-size: 18px;
        font-weight: bold;
    }

    .activities-title-sub {
        font-weight: lighter;
        font-size: 14px;
      color: #707070;
    }


    .different-activities{
        justify-content: center;
    }

    .different-activities-item {
        width: 33%;
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-items: center;
    }


    .activities-circle {
        height: 80px;
        width: 80px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0px 11px 16px #00000029;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .horizontal-items-box {
        width: 80%;
        display: flex;
        flex-direction:row;
        align-items: center;
        flex-wrap: nowrap;
        margin: 40px 0px;

    }


    .activities-circle-text {
        width: 40%;
        margin: 10px;
        color: #303143;
        font-size: 12px;
    }

    .achievements-section {
        display: flex;
        flex-direction: row;
        width: 80%;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        margin:50px 0px;
    }

    .achievements-section-box {
        width: 30%;
        position: relative;
        min-height: 230px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-shadow: 0px 7px 46px #0000001F;
        margin: 3%;
    }
    .plane-enter {
        margin-left: -15%;
        margin-bottom: 15%;
        width: 23%;
    }
    .plane-exit {
        margin-left: auto;
        margin-right: -18%;
        margin-top: 30%;
        width: 28%;

    }
    .design-details {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content:flex-start;
        overflow: hidden;

    }
    .achievements-section-header {
      margin-top: 20px;
    }
    .achievements-section-text {
      margin-top: 30px;
    }

    .center-box {
        margin-top: 100px;
    }
    .last-box {
        margin-top: 200px;
    }
    .design-details {
        position: absolute;

    }
    .analysis {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
        margin-top: 15%;
         overflow-x: hidden;
    }
    .analysis-img-desk {
        width: 50%;
        height: auto;
         margin-right: -10%;

    }
    .analysis-img-mobile {
      display: none;
    }

    .analysis-info {
        width: 70%;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background-color: white;
        padding-right: 5%;
        padding-left: 5%;
        padding-top: 10%;
        font-size: 14px;
    }



    .analysis-info-small-title {
        margin-bottom: 0px;
        margin-top: 10px;
        color: #374957;
    }

    .analysis-info-title {

        color: #303143;
        font-weight: bold;
        font-size: xx-large;

    }

    .analysis-info-title-line{

        width: 120px;
        height: 3px;
        background-color:#A347FF;
        right: -125px;
        border-radius: 2px;

    }

    .analysis-info-text {
        padding: 5% 0px;
        font-size: 12px;
    }

    .analysis-info-links {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
    }



    .analysis-link-admit {
        color: white;
        min-width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #A347FF 0% 0% no-repeat padding-box;
        border-radius: 10px;
        font-size: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 10px 15px;
    }

    .analysis-link-free {
        background-color: #592480;
        border-radius: 15px;
        padding: 5px 10px;
        margin-left: 10px;
    }

    .consultants-section-header-line {
        width: 120px;
        height: 3px;
        background-color:#A347FF;
        right: -125px;
        border-radius: 2px;

    }
    .consultants-section-header-line {
        display: none;
    }
    @media only screen and (max-width: 767.8px) {
      .homepage-section {
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
      }
      .homepage-intro {;
        display: flex;
        flex-direction: column;
      }
      .homepage-intro-info {
        width: 90%;
      }
      .homepage-info-links {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .homepage-intro-info-text {
        line-height: 30px;
      }
      .globe-desktop {
        display: none;
      }
      .globe-mobile {
        display: inline-block;
        width: 150%;
        margin-left: -33%;
      }
      .consultants-section-header-line {
        display: block;
      }
      .structure-section-stages {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .consultants-section-rows {
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .see-all-link {
        margin: 0px 10px;
        width: 50%;
      }
      .blue-options-box
      {
        width: 100%;
        border-radius: 0px;

      }
      .blue-options-box {
        flex-direction: column;
        align-items: center;

      }
      .white-plane-svg {
        display: none;
      }
      .column-container {
        flex-direction: column;
        justify-content: center;
        align-items: center;

      }
      .blue-box-text {
        text-align: center;
      }
      .blue-box-column {
        padding:20px ;
        max-width: 250px;
        justify-content: center;
        align-items: center;
      }
      .consultants-section-header {
        width: 80%;
      }
      .horizontal-items-box {
        flex-direction: column;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0;
        width: 60%;
      }
      .different-activities-item {
        margin-top: 30px;
        width: 120%;
      }
      .plane-enter {
        display: none;
      }
      .achievements-section {
        flex-direction: column;
      }
      .achievements-section-box {
        width: 80%;
        margin: 15px;
      }
      .achievements-section-header {
        padding-top: 20px;

      }
      .achievements-section-text {
        margin-top: 30px;
      }
      .pointer-svg {
        display: none;
      }
      .analysis {
        flex-direction: column-reverse;
      }
      .analysis-img-desk {
        display: none;
      }
      .analysis-img-mobile{
        display: inline-block;
        width: 100%;
      }
      .analysis-info {
        width: 90%;
        justify-content: flex-start;
      }
      .plane-enter {
        display: none;
      }
      .plane-exit {
        display: none;
      }
    }

</style>
