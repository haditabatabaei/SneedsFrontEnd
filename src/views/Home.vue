<template>
    <main class="landing isansFont iranSansFarsiNumber">
        <section class="landing-section --sneeds-section">
            <div class="sneeds-intro">
                <img class="globe" src="/sneedsAssets/img/globe.png">
                <div class="sneeds-intro-info">
                    <h6 class="sneeds-intro-info-small-title">با پلتفرم اسنیدز</h6>
                    <h3 class="sneeds-intro-info-title">هوشمندانه اپلای کن!</h3>
                    <div class="sneeds-intro-info-title-line"></div>
                    <p class="sneeds-intro-info-text">هدف ما وصل کردن شما به دانشجویان ایرانی خارج از
                        کشور برای استفاده از تجربیاتشون تو این مسیره و نمی‌دونی از کجا شروع کنی؟
                        با پر کردن فرم رایگان تعیین سطح اپلای از وضعیتت با خبر شو و پیشنهادات هوشمند دریافت کن
                    </p>
                    <div class="sneeds-intro-info-links">
                        <a href="#" class=" link--level">
                            تعیین سطح اپلای
                            <span class="link--level--free">رایگان!</span>
                        </a>
                        <a href="http://google.com" class="sneeds-intro-info-link link--interview">مشاوره اپلای</a>
                        <a href="#" class="sneeds-intro-info-link link--live">لایو های اپلای</a>
                        <a href="#" class="sneeds-intro-info-link link--webinar"> وبینار ها</a>
                        <a href="#" class="sneeds-intro-info-link link--film">فیلم های خود آموز اپلای</a>
                    </div>

                </div>
            </div>

        </section>


        <section class="landing-section --structure-section">
            <div class="structure-section-stages-column">
                <h3 class="structure-section-title">اسنیدز چطوری کار می کنه؟</h3>
                <div class="structure-section-title-line">

                </div>


                <p class="structure-section-title-sub" >ما پل ارتباطی شما با دانشجویان ایرانی خارج از کشور هستیم.</p>

            </div>


            <div class="structure-section-stages">
                <div class="structure-section-stages-column">
                    <img class="circle-svg" src="/sneedsAssets/img/step1.png">
                    <p class="structure-section-small-title">اتصال مشاور</p>
                    <p>بعد از سفارش پروژه مشاور مورد نظرتون رو با توجه به رزومه و امتیازش انتخاب می‌کنید</p>
                </div>
                <div class="structure-section-stages-column">
                  <img  class="circle-svg" src="/sneedsAssets/img/step2.png">
                    <p class="structure-section-small-title">اتصال مشاور</p>
                    <p>بعد از انتخاب بهترین مشاور فقط با یک کلیک به مشاور !وصل خواهید شد</p>
                </div >
                <div class="structure-section-stages-column">
                    <img class="circle-svg" src="/sneedsAssets/img/step3.png">
                    <p class="structure-section-small-title">شروع فرآیند اپلای</p>
                    <p>فرآيند اپلای و پروژه‌تون بلافاصله بعد از تایید شما شروع خواهد شد و مشاور تا پایانش کنارتون هست</p>
                </div>
            </div>
        </section>



        <section class=" landing-section consultants-section">
            <div class="consultants-section-header --universities">
                <img  class="pointer-svg" src="/sneedsAssets/img/pointer.svg">

                <p class="consultants-section-title">
                    مشاوران اپـلای
                    <span class="consultants-section-title-sub">
                       <br> مشاوران اپلای با تجربه تحصیل در بهترین دانشگاه‌های سراسر جهان
                     </span>


                </p>
                <img  class="scroll universities-logoes" src="/sneedsAssets/img/harvard.png">
                <img  class="universities-logoes" src="/sneedsAssets/img/harvard.png">
                <img  class="universities-logoes" src="/sneedsAssets/img/harvard.png">
                <img  class="universities-logoes"src="/sneedsAssets/img/harvard.png">
                <img  class="universities-logoes"src="/sneedsAssets/img/harvard.png">

            </div>



              <home-page-consultant-section :items-input="consultants"> </home-page-consultant-section>




            <div class="consultants-section-rows --see-all">
                <div class="see-all-link-line"></div>
                <a class="see-all-link" href="#">
                    همه مشاوران
                    <i data-v-f966f08a="" class="material-icons">keyboard_arrow_left</i>
                </a>
                <div class="see-all-link-line"></div>
            </div>
        </section>



        <section class="landing-section --advantages">

            <div class="blue-options-box">
                <div class="column-container">
                    <div class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                thumb_up_alt
                            </i>
                        </div>
                        <h5 class="blue-box-title">تضمین رضایت</h5>
                        <p class="blue-box-text">میانگین رضایت ۹۷ درصدی نشون دهنده کیفیت کار ماست</p>
                    </div>

                    <div  class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                lock
                            </i>
                        </div>
                        <h5 class="blue-box-title">پرداخت‌های امن</h5>
                        <p class="blue-box-text">با کمک اسنیدز به خارج از کشور پرداخت امن داشته باشید</p>
                    </div>

                    <div  class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                flight_takeoff
                            </i>
                        </div>
                        <h5 class="blue-box-title">نظارت بر روند</h5>
                        <p class="blue-box-text">با پلتفرم اسنیدز کاملا شفاف از مراحل اپلایت  با خبر باش
                        </p>
                    </div>




                    <div  class="blue-box-column">
                        <div class="circle-icon">
                            <i class="material-icons">
                                perm_identity
                            </i>
                        </div>
                        <h5 class="blue-box-title">مشاوران تایید شده</h5>
                        <p class="blue-box-text" >تجربه کسب پذیرش از دانشگاه‌های برتر دنیا و آشنایی کامل با روند اپلای</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="landing-section ">

            <div class="activities-section-rows --activities">
                <img  class="pointer-svg" src="/sneedsAssets/img/pointer.svg">

                <p  class="activities-section-title">

                    چی کارا انجام میدین؟
                    <span class="activities-section-title-sub">
                       <br>تقریبا همه چی! از نگارش و ترجمه مدارک تا انجام پرداخت‌ها و اخذ پذیرش
                     </span>


                </p>

            </div>



            <div class="different-activities-box ">
                <div class="horizontal-items-box --different-activities">
                    <div class="different-activities-items">
                        <div class="activities-circle">
                            <img   class="activities-circle-img"src="/sneedsAssets/img/scholarship.svg" alt="">
                        </div>
                        <a  href="#" class="activities-circle-text">پکیج‌های اخذ پذیرش</a>

                    </div>
                    <div class="different-activities-items">
                        <div class="activities-circle">
                            <img  class="activities-circle-img" src="/sneedsAssets/img/news.svg" alt="">
                        </div>
                        <a href="#" class="activities-circle-text">نگارش و ویرایش کاورلتر</a>

                    </div>
                    <div class="different-activities-items">
                        <div class="activities-circle">
                            <img  class="activities-circle-img" src="/sneedsAssets/img/subject.svg" alt="">
                        </div>
                        <a  href="#" class="activities-circle-text">ترجمه مدارک اپلای</a>
                    </div>
                </div>

            <div class="horizontal-items-box --different-activities">
                <div class="different-activities-items">
                    <div class="activities-circle">
                        <img class="activities-circle-img" src="/sneedsAssets/img/list.svg" alt="">
                    </div>
                    <a href="#" class="activities-circle-text">(SOP) ویرایش و نگارش انگیزه‌نامه</a>

                </div>
                <div class="different-activities-items">
                    <div class="activities-circle">
                        <img  class="activities-circle-img" src="/sneedsAssets/img/book%20(1).svg" alt="">
                    </div>
                    <a  href="#" class="activities-circle-text">(CV) ویرایش و نگارش رزومه</a>

                </div>
                <div class="different-activities-items">
                    <div class="activities-circle">
                        <img  class="activities-circle-img" src="/sneedsAssets/img/subject.svg" alt="">
                    </div>
                    <a href="#" class="activities-circle-text">پکیج‌های اخذ پذیرش</a>

                </div>
            </div>
            </div>
                <div class="design-details">
                </div>
                <div class="achievements-section">

                    <img  class="plane-enter" src="/sneedsAssets/img/airplane-enter.svg" alt="">

                    <div class="achievements-section-box --first">
                        <img class="achievements-svg" src="/sneedsAssets/img/login.svg" alt="">
                        <h3 class="achievements-section-header">56+ پذیرش</h3>
                        <p class="achievements-section-text">اخذ شده به دست مشاوران اسنیدز در تمامی مقاطع</p>
                    </div>
                    <div class="achievements-section-box --center">
                        <img class="achievements-svg" src="/sneedsAssets/img/people1.svg" alt="">
                        <h3 class="achievements-section-header">+۲۷,۰۰۰ دقیقه</h3>
                        <p class="achievements-section-text">مشاوره آنلاین تصویری انجام شده با مشاوران اسنیدز</p>
                    </div>
                    <div class="achievements-section-box --last">
                        <img class="achievements-svg" src="/sneedsAssets/img/document%20(1).svg" alt="">
                        <h3 class="achievements-section-header">+۵۴۰ مدرک</h3>
                        <p class="achievements-section-text">ترجمه، تصحیح یا نگارش شده به دست مشاوران اسنیدز</p>
                </div>
            </div>
          </section>


        <section class="landing-section --analysis-section">
            <div class="analysis-container">
                <div class="analysis-img-div">
                    <img class="analysis-svg" src="/sneedsAssets/img/analysis.svg">
                </div>
                <div class="analysis-container-info">
                    <h6 class="analysis-container-info-small-title">آنالیزور پیشرفته اپلای</h6>
                    <h5 class="analysis-container-info-title">!بهترین تصمیم‌ رو بگیر</h5>
                    <div class="analysis-container-info-title-line"></div>
                    <p class="analysis-container-info-text">
                        با پرکردن فرم رایگان اطلاعات تحصیلیت‌ بلافاصله رتبه‌ات رو بین بقیه افرادی که قصد
                        اپلای دارن با کمک هوش مصنوعی اسنیدز ببین نقاط ضعف و قوت خودت رو بشناس علاوه بر
                        اون پیشنهادات هوشمند برای بهبود رزومه خودت دریافت کن و تو مسیر اپلای از بقیه رقیبات جلو بیفت
                    </p>
                    <div class="analysis-container-info-links">
                        <a href="#" class=" analysis-container--level">
                            تعیین سطح اپلای
                            <span class="analysis-container--free">رایگان!</span>
                        </a>
                    </div>

                </div>
            </div>

        </section>
        <section>
            <div class="activities-section-rows --activities">
                <img  class="pointer-svg" src="/sneedsAssets/img/pointer.svg">

                <p  class="activities-section-title">

                    مجله اینترنتی اسنیدز
                    <span class="blog-section-title-sub">
                       <br>همه مطالب
                     </span>


                </p>

            </div>
            <div class="landing-section blog-section">
                <div class="blog-blocks-container">
                </div>
            </div>
        </section>

        <blog-section :items-input="persons"></blog-section>


        <app-question></app-question>

    </main>

</template>

<script>
   import FAQ from "../components/HomePage/FAQ";
   import BlogSection from "../components/HomePage/BlogSection";
   import consultantHomeBlock from "../components/HomePage/consultantHomeBlock";
   import HomePageConsultantSection from "../components/HomePage/HomePageConsultantSection";
    export default {
        components: {
            HomePageConsultantSection,
            ConsultantHomeBlock : consultantHomeBlock,
            blogSection : BlogSection,

            appQuestion: FAQ,
        },
        data (){
            return {
                persons: [
                    {blogSubTitle: "cvfv",blogTitle:"sahar"  },
                    {blogSubTitle: 'cvfv',blogTitle: "aref" },
                    {blogSubTitle: 'cvfv',blogTitle: 'aFz' },
                    {blogSubTitle: 'cvfv',blogTitle: 'tehran' }

                ],
                consultants: [
                    {name: "njjj",major:"jjhjh"},
                    {name: "hbjhkjk",major:"pppp"},
                    {name: "hbjhkj",major:"nnnn"},
                    {name: "hbjhkj",major:"llll"},
                    {name: "hbjhkj",major:"mkljik"},
                    {name: "hbjhkj",major:"hbjhkj"}

                ]
            }
        }

    }
</script>

<style scoped>

    .landing-section{
        align-items: center;
    }


    .landing-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .sneeds-intro {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
    }


    .globe {
        width: 70%;
        max-width: 80%;
        margin-right: -25%;
        margin-top: -20%;
    }


    .sneeds-intro-info {
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



    .sneeds-intro-info-small-title {
        margin-bottom: 0px;
        margin-top: 10px;
        color: #374957;
    }

    .sneeds-intro-info-title {

        color: #303143;
        font-weight: bold;

    }

    .sneeds-intro-info-title-line{

        width: 120px;
        height: 3px;
        background-color: #00D4ED;
        right: -125px;
        border-radius: 2px;

    }

    .sneeds-intro-info-text {
        padding: 5% 0px;
        font-size: 12px;
    }

    .sneeds-intro-info-links {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
    }



    .sneeds-intro-info-link {
        font-size: 10px;
        border: 1px solid #00D4ED;
        border-radius: 10px;
        color: #00D4ED;
        padding: 7px;
        margin-right: 5px;
        margin-bottom: 10px;
        cursor: pointer;

    }

    .link--level {
        color: white;
        min-width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent linear-gradient(91deg, #00BFD6 0%, #04AEC2 100%) 0% 0%
        no-repeat padding-box;
        border-radius: 10px;
        font-size: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
        padding: 10px 15px;
    }

    .link--level--free {
        background-color: #008292;
        border-radius: 15px;
        padding: 5px 10px;
        margin-right: 10px;
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

    .structure-section-stages-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 5%;
    }

    .structure-section-small-title {
        color: #303143;
        font-size: 14px;
        font-weight: bold;
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
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        margin: 40px 0px;

    }
    .scroll {
        margin-right: auto;


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

    .--consultants-images {
        width: 100%;
        flex-wrap: wrap;
    }

    .see-all-link-line {
        height: 2px;
        width: 40%;
        border-radius: 5px;
        background-color: #E3E3E3;

    }

    .--see-all {
        justify-content: center;
        align-items: baseline;
        margin: 50px 0px;
    }
    .--advisors{
        width: 100%;
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
        font-size: 16px;
        font-weight: bold;


    }

    .consultants-section-title-sub {
        font-weight: lighter;
        font-size: 14px;
    }

    .consultants-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

    .blue-options-box {
        display: flex;
        flex-direction: row;
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





    .blue-box-column {
        max-width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items:self-start;
        padding: 50px 20px 0px 20px;
    }

    .blue-box-title {
        color: #FFFFFF;
    }
    .blue-box-text {
        color: #1DFFF6;
        font-size: 10px;

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


    .activities-section-rows {
        width: 80%;
        display: flex;
        flex-direction:row;
        justify-content: space-around;
        align-items: center;
        flex-wrap:nowrap;
        margin: 40px 0px;

    }

    .--activities {
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
    .activities-section-title {
        align-items: flex-start;
        font-size: 16px;
        font-weight: bold;
    }

    .activities-section-title-sub {
        font-weight: lighter;
        font-size: 14px;
    }


    .--different-activities{
        justify-content: center;
    }

    .different-activities-items {
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
        width: 60%;
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
    }

    .achievements-section-box {
        width: 20%;
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-shadow: 0px 7px 46px #0000001F;
        padding:4%;
        margin: 3%;
    }
    .plane-enter {
        position: absolute;
        margin-right: -60%;
        width: 600px;
    }

    .--center {
        margin-top: 100px;
    }
    .--last {
        margin-top: 200px;
    }
    .design-details {
        position: absolute;
        z-index: -1;

    }
    .analysis-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
    }
    .analysis-img-div {
        width: 50%;
        background-color: #F5F7FA;
        border-radius: 40px;


    }
    .analysis-svg {
        width: 80%;
        height: auto;
        padding: 3%;

    }

    .analysis-container-info {
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



    .analysis-container-info-small-title {
        margin-bottom: 0px;
        margin-top: 10px;
        color: #374957;
    }

    .analysis-container-info-title {

        color: #303143;
        font-weight: bold;

    }

    .analysis-container-info-title-line{

        width: 120px;
        height: 3px;
        background-color:#A347FF;
        right: -125px;
        border-radius: 2px;

    }

    .analysis-container-info-text {
        padding: 5% 0px;
        font-size: 12px;
    }

    .analysis-container-info-links {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
    }



    .analysis-container--level {
        color: white;
        min-width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #A347FF 0% 0% no-repeat padding-box;
        border-radius: 10px;
        font-size: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
        padding: 10px 15px;
    }

    .analysis-container--free {
        background-color: #592480;
        border-radius: 15px;
        padding: 5px 10px;
        margin-right: 10px;
    }

    .blog-section {
        margin-top: 70px;
        margin-bottom: 70px;
    }

    .blog-section-title-sub{
        color: #00b8d4;
    }
    @media only screen and (max-width: 767.8px) {
     .circle-svg {
         width: 160px;
         height: 160px;
     }
        .achievements-section {
            width: 100%;
        }
        .circle-icon {
            width: 50px;
            height: 50px;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .--sneeds-section {
            width: 100%;
            flex-direction: column;
            justify-content: flex-start;
        }
        .sneeds-intro {;
            display: flex;
            flex-direction: column;
        }
        .sneeds-intro-info {
            width: 90%;
        }
        .sneeds-intro-info-links {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
        .globe {
            display: none;
        }
        .universities-logoes {
            display: none;
        }
        .structure-section-stages {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .consultants-section-rows {
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
            justify-content: center;
            align-items: center;
        }
        .consultants-section-header {
            width: 80%;
        }
        .horizontal-items-box {
            flex-direction: column;
            justify-content: space-between;
            margin-top:0px;
            margin-bottom: 30px;
            width: 60%;
        }
        .different-activities-items {
            margin-top: 30px;
            width: 100%;
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
        .analysis-img-div {
            display: none;
        }
    }

</style>
