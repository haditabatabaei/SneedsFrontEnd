<template>
    <section class="package-section package-section-faq">
        <div class="section-sub section-sub-faq">
            <section class="faq-box" v-for="faqBox in faqBoxes">
              <div class="fag-header">
                <h1 class="isansFont faq-box-title">{{faqBox.title}}</h1>
                <div class="faq-divider divider--blue"></div>
              </div>
                <div class="faq-question" v-for="question in faqBox.questions">
                    <div class="faq-question-title" @click="toggleQuestion(question)">
                        <h2 class="faq-question-title-text isansFont--faNum">
                            {{question.title}}
                            <span class="title-highpriority" v-if="question.highPriority">پر تکرار!</span>
                        </h2>
                        <button class="faq-question-title-toggler" :class="[{'toggler--open': question.isOpen}]">
                            <transition name="fade">
                                <i class="material-icons" v-if="!question.isOpen">keyboard_arrow_down</i>
                                <i class="material-icons" v-else>keyboard_arrow_up</i>
                            </transition>
                        </button>
                    </div>
                    <transition name="fade">
                        <p class="isansFont--faNum faq-question-answer" v-if="question.isOpen">
                            {{question.answer}}
                        </p>
                    </transition>
                </div>
            </section>
        </div>
    </section>
</template>





<script>

    export default {
        name: "FAQ",
        data() {


            return {
                storePackages: [],
                showComparePackages: false,
                showRegisterIntro: false,
                showRegisterModal: false,
                showNameModal: false,
                loginForm: true,
                registerForm: false,
                first_name: '',
                last_name: '',
                commentsSliderInterval: null,
                currentCommentIndex: 0,
                packageToBuy: null,
                comments: [
                    {
                        sender: {
                            name: 'مینا',
                            avatar: 'https://sneeds.ir/wp-content/uploads/2019/10/%D9%85%DB%8C%D9%86%D8%A7-128x128.png'
                        },
                        text: 'فوق‌العاده بود\n' +
                            'همه چی عالی و پرفکت.\n' +
                            'خانم حقیقتی عزیز ماشاالله با حوصله و جزییات تمام برامون وقت گذاشتن.\n' +
                            'خیلی راهنمایی هاشون خوب بود.\n' +
                            'از خودشون و شما خیلی تشکر می‌کنیم🙏'
                    },
                    {
                        sender: {
                            name: 'علیرضا',
                            avatar: 'https://sneeds.ir/wp-content/uploads/2019/10/photo_2019-08-29_01-20-06-128x128.jpg'
                        },
                        text: 'عالي بود واقعا\n' +
                            'ممنونم ازتون واقعا و بسيار زياد از سركار خانم حقيقتي\n' +
                            'و خيلي خيلي قابل احترام هست براي من اين امكان كه فراهم كرديد شما دوستان\n' +
                            'و ضمنا مجددا تشكر ميكنم حتي از جناب امراللهي نسب، دوست عزيزم كه سري قبل باهاشون صحبت داشتم و همچنان مديونشون هستم'
                    }
                ],
                faqBoxes: [
                    {
                        title: 'FAQs',
                        questions: [
                            {
                                title: 'اسنیدز چی کار می‌کنه؟',
                                answer: `اسنیدز اولین پلتفرم مهاجرت تحصیلی و اپلای آنلاین هست که تمام خدمات مورد نیاز در مسیر اخذ پذیرش رو ارائه میده. از ارائه جلسات مشاوره با دانشجویان در سراسر جهان و رشته ها و دانشگاه های مختلف گرفته تا انجام خدمات اپلای، برگزاری وبینارها و کلاس های اپلای تا گرفتن پذیرش و ارائه خدمات ویزا رو به صورت کاملاً آنلاین  انجام میده.`,
                                isOpen: true,
                            },
                            {
                                title: 'منظورتون از پلتفرم بودن چیه؟',
                                answer: `اسنیدز خدماتش رو از طریق مشاورانش در سراسر جهان ارائه میده و منظور از پلتفرم بودنش این هست که بین شما به عنوان کسانی که نیاز به خدمات اپلای دارید و مشاوران ما که همگی از افراد با تجربه در این زمینه هستند برای انجام خدمات ارتباط برقرار می‌کنیم.`,
                                isOpen: false,
                            },
                            {
                                title: 'مشاورانتون کیا هستن؟',
                                answer: `مشاوران ما دانشجویان در حال تحصیل در کشورها، رشته‌ها و مقاطع مختلف هستند که همگی تجربه اپلای موفق رو داشتند و خودشون این مسیر رو طی کردند و به طور کامل با مراحل و روند کار آشنا هستند و امروز به عنوان مشاورین اسنیدز به افراد زیادی در زمینه اخذ پذیرش کمک می‌کنند.`,
                                isOpen: false,
                            },
                            {
                                title: 'چطوری به شما اعتماد کنم؟',
                                answer: 'اسنیدز یه استارتاپ دانش بنیان متشکل از دانشجویان امیرکبیره، که بیش از ۲ سال سابقه‌ فعالیت در زمینه‌ اپلای و مهاجرت تحصیلی داره.\n' +
                                    'ما توی این مسیر به تعداد زیادی از دانشجویانی که قصد اپلای داشتند کمک کردیم و کارنامه ما بهترین معرف ماست.\n' +
                                    'تمام مشاوران اسنیدز تجربه کسب پذیرش از دانشگاه‌ها وکالج‌های برتر سراسر دنیا رو داشتند که با مراجعه به پروفایلشون در سایت می‌تونید رزومشون رو ببینید و از نظرات کاربرایی که از کمکشون استفاده کردند، استفاده کنید و بهترین تصمیم رو برای آیندتون بگیرین!',
                                isOpen: false,
                            },
                            {
                                title: 'امکان مراجعه حضوری به دفترتون هست؟',
                                answer: `برای پکیج‌های اسنیدز امکان مراجعه حضوری برای صحبت و عقد قرارداد وجود داره، ولی حتماً قبل از مراجعه باید باهامون هماهنگ کنید تا پذیرایی گرمی ازتون کنیم. پس باهامون در تماس باشید!`,
                                isOpen: false,
                            }
                        ]
                    }
                ]
            }


        },
        methods: {
            toggleQuestion(question) {
                question.isOpen = !question.isOpen;
            },
        }
    }







</script>

<style scoped>
    .landing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: calc(100vh - 70px);
        background-color: white;
    }

    .package-section {
        width: 70%;
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }


    .package-section-faq {
    }

    .section-sub-faq {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }

    .faq-box {
        display: flex;
        flex-direction: column;
        padding: 0 40px;
    }

    .faq-box:not(:first-child) {
        margin-top: 50px;
    }

    .faq-box-title {
        color: #303143;
        font-size: 20px;
        font-weight: bold;
        margin: 0;
    }

    .fag-header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .faq-divider {
        width: 130px;
        height: 3px;
        border-radius: 20px;
        background-color: black;
        margin-top: 25px;
    }

    .divider--blue {
        background-color: #00D4ED;
    }

    .faq-question {
        display: flex;
        flex-direction: column;
        padding: 10px 50px;
    }

    .faq-question-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 40px;
        padding: 5px;
        border-radius: 5px;
        margin-top: 5px;
        transition: all 0.2s ease-in-out;
    }

    .faq-question-title:hover {
        cursor: pointer;
        background-color: #eee;
    }

    .faq-question-title-text {
        color: #585858;
        font-size: 18px;
        font-weight: bold;
        position: relative;
        padding-right: 15px;
        margin: 0;
    }

    .faq-question-title-text:before {
        content: " ";
        background-color: #00D4ED;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 10px;
    }

    .faq-question-title-toggler {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 2px solid #00BFD6;
        background: none;
        color:#00BFD6;
    }

    .faq-question-title-toggler.toggler--open {
        border-color: #00D4ED;
        color: #00D4ED;
    }

    .faq-question-answer {
        color: #9B9999;
        line-height: 26px;
        padding-top: 10px;
    }

    .buy-box-feature-mark:hover > .buy-box-feature-mark-modal {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }


    .box-feature-mark-modal-prices span {
        margin: 5px 0;
    }

    .box-feature-mark-modal-infos span {
        margin: 5px 0;
    }




    .buy-box-compare-toggler:hover > .buy-box-compare-toggler-icon {
        border-color: white;
    }




    .intro-head i {
        color: #B3B3B3;
        font-size: 18px;
        margin-right: 10px;
        cursor: pointer;
    }

    .modal-warn p {
        margin-bottom: 0;
    }


    .intro-content-item i {
        color: #00BFD6;
        font-size: 16px;
        margin-left: 5px;
    }

    .title-highpriority {
        font-size: 13px;
        background-color: #c43d39;
        color: white;
        border-radius: 10px;
        margin-right: 10px;
        padding: 2px 10px;
        font-weight: normal;
    }

    @media only screen and (max-width: 991.8px) {


        .faq-box {
            padding: 0;
        }
    }


    @media only screen and (max-width: 567.8px) {
        .package-section {
            width: 100%;
        }

        .faq-box {
            padding: 0;
        }

        .faq-question {
            padding: 10px 0;
        }


    }

    .intro-head i {
        color: #B3B3B3;
        font-size: 18px;
        margin-right: 10px;
        cursor: pointer;
    }

    .intro-content-item i {
        color: #00BFD6;
        font-size: 16px;
        margin-left: 5px;
    }



    .title-highpriority {
        font-size: 13px;
        background-color: #c43d39;
        color: white;
        border-radius: 10px;
        margin-right: 10px;
        padding: 2px 10px;
        font-weight: normal;
    }

    @media only screen and (max-width: 991.8px) {


        .faq-box {
            padding: 0;
        }
    }



</style>