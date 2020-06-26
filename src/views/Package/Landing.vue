<template>
    <main class="landing">
        <transition name="fade">
            <div class="modalOverlay" data-command="consultant-modal-close" v-if="showModalOverlay"
                 @click="hideAllModals">
                <div class="consultant-modal consultant-modal--registerIntro" v-if="showRegisterIntro">
                    <div class="intro-head">
                        <i class="material-icons" data-command="consultant-modal-close">close</i>
                    </div>
                    <div class="modal-warn isansFont">
                        <i class="material-icons modal-warn-icon">
                            info
                        </i>
                        <p>
                            <strong>برای رزرو پکیج نیاز به حساب کاربری دارید!</strong>
                            <br>
                            بعد از ثبت نام / ورود، مستقیماً به صفحه پرداخت هدایت خواهید شد و از اونجا مراحل بعدی رو
                            انجام میدید.
                        </p>
                    </div>
                    <div class="intro-content ">
                        <h2 class="intro-content-head isansFont">
                            چرا ثبت نام کنم ؟
                        </h2>
                        <ul class="intro-content-list isansFont">
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی اطلاعات مربوط به پکیجت رو توی یه فرم مخصوص پر کنی.
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی از بین لیست مشاورایی که اعلام آمادگی کردن، یکی رو انتخاب کنی.
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی به طور مداوم با مشاورت در ارتباط باشی.
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی با توجه به نوع پکیجی بی نهایت جلسه مشاوره بگیری.
                            </li>
                        </ul>
                    </div>
                    <div class="intro-action isansFont">
                        <button class="intro-action-button intro-action-button--active" @click="continueRegisterFlow">
                            ورود/ثبت نام و رزرو پکیج
                        </button>
                        <button @click="hideAllModals" data-command="consultant-modal-close"
                                class="intro-action-button intro-action-button--passive">
                            بیخیال
                        </button>
                    </div>
                </div>
                <div class="consultant-modal consultant-modal--register" v-if="showRegisterModal">
                    <div class="intro-head">
                        <i class="material-icons" data-command="consultant-modal-close">close</i>
                    </div>
                    <div class="authFormWrapper-switcher isansFont">
                        <button @click="showLoginForm" class="switcher" :class="[{'switcher--active' : loginForm}]">
                            ورود
                        </button>
                        <button @click="showRegisterForm" class="switcher"
                                :class="[{'switcher--active' : registerForm}]">
                            ثبت نام
                        </button>
                    </div>
                    <login-form :customAction="true" @custom-action-call="loginFormAction" submit-label="ورود و ادامه"
                                v-if="loginForm"/>
                    <register-form :customAction="true" @custom-action-call="registerFormAction"
                                   submit-label="ثبت نام و ادامه" v-else-if="registerForm"/>
                </div>

                <div class="consultant-modal consultant-modal--register" v-if="showNameModal">
                    <div class="intro-head">
                        <i class="material-icons" data-command="consultant-modal-close">close</i>
                    </div>
                    <div class="modal-warn modal--error isansFont">
                        <i class="material-icons modal-warn-icon modal-icon--error">
                            info
                        </i>
                        <p>
                            <strong>لطفا نام و نام خانوادگی خود را وارد کنید.</strong>
                            <br>
                            برای رزرو، نیاز هست که نام و نام خانوادگی خودتون رو ثبت کنید تا مشاورین شمارو بشناسن.
                            این اطلاعات همیشه از طریق پروفایلتان قابل ویرایش است.
                        </p>
                    </div>
                    <label class="loginForm-label isansFont" for="phone" style="margin-top: 15px">
                        نام :
                        <input class="loginForm-control" id="phone" type="text" v-model.trim="first_name">
                    </label>
                    <label class="loginForm-label isansFont" for="password">
                        نام خانوادگی :
                        <input class="loginForm-control" id="password" v-model.trim="last_name">
                    </label>
                    <div class="intro-action isansFont">
                        <button class="intro-action-button intro-action-button--active" @click="setNameAndPay">
                            ثبت و رزرو پکیج
                        </button>
                        <button @click="buyPackage(null, true)" data-command="consultant-modal-close"
                                class="intro-action-button intro-action-button--passive">
                            بعدا وارد میکنم
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <section class="package-section section-intro">
            <div class="section-sub section-sub-intro">
                <div class="section-intro-title-box">
                    <a v-smooth-scroll="{offset: -100, updateHistory: false}" href="#consultant-anchor" class="intro-start isansFont">
                        از اینجا شروع کن!
                        <i class="material-icons">keyboard_arrow_down</i>
                    </a>
                    <h1 class="section-intro-title isansFont">
                        <img src="/sneedsAssets/img/dots.svg" alt="dots" class="intro-title-dots">
                        <img src="/sneedsAssets/img/dots.svg" alt="dots" class="intro-title-dots left">
                        
                        <span class="intro-title-span span-blue">
                        با اسنیدز،
                        </span>
                        <span class="intro-title-span span-black">
                        لازم نیس سخت
                        </span>
                        <br>
                        <br>
                        <span class="intro-title-span span-black">اپلای کنی!</span>
                    </h1>
                    <p class="section-intro-text isansFont">
                        خیلی خوب می‌شه وقتی می‌خوای برای کالج اپلای کنی یکی که تمام این مسیر رو طی کرده و با
                        موانعشآشنایی داره کنارت باشه تا با خیال راحت بتونی کشور، رشته .و کالجی که دوست داری درس بخونی
                    </p>
                </div>
            </div>
        </section>
        <section class="package-section section-consultants">
            <div class="section-sub section-sub-consultants" id="consultant-anchor">
                <div class="section-consultants-info">
                    <h1 class="section-consultants-title isansFont">
                        مشاوران اسنیدز
                        <br>
                        توی این مسیر طولانی کنارت هستن...
                    </h1>
                    <div class="section-consultants-divider"></div>
                    <p class="section-consultants-text isansFont">
                        مشاوران و کارشناسای ما کسایی هستند که خودشون یک بار اپلای کردن. علاوه بر تجربه، با توجه به
                        حضورشون در خارج از کشور به روزترین اطلاعات رو از دانشگاه ها دارن. علاوه بر اون با دلسوزی خیلی
                        بیشتری نسبت به شرکت‌های مهاجرتی کار شما رو جلو خواهند برد.
                    </p>
                </div>
                <div class="section-consultants-avatars">
                    <img class="section-consultants-avatars-img"
                         src="http://api.sneeds.ir/files/account/images/consultants/17/image/danial-khorsandi.jpeg"
                         alt="avatar">
                    <img class="section-consultants-avatars-img"
                         src="http://api.sneeds.ir/files/account/images/consultants/12/image/ali-hejazi.jpeg"
                         alt="avatar">
                    <img class="section-consultants-avatars-img"
                         src="http://api.sneeds.ir/files/account/images/consultants/36/image/amirhossein-qezelbash.jpeg"
                         alt="avatar">
                    <img class="section-consultants-avatars-img"
                         src="http://api.sneeds.ir/files/account/images/consultants/21/image/shahrooz-rahmati.jpeg"
                         alt="avatar">
                    <img class="section-consultants-avatars-img"
                         src="http://api.sneeds.ir/files/account/images/consultants/24/image/mahtab-rezaie_CHIJEuT.jpeg"
                         alt="avatar">
                </div>
            </div>
        </section>
        <section class="package-section package-section-services">
            <div class="section-sub section-sub-services">
                <div class="section-services-title">
                    <h1 class="services-title-text isansFont">به این کارها فکر نکن!</h1>
                    <h2 class="services-title-subtext isansFont">با پکیج کامل اپلای اسنیدز همه این کارا با مشاوران
                        اسنیدزه.</h2>
                    <div class="services-title-divider"></div>
                </div>
                <div class="section-services-items">
                    <div class="services-item isansFont">
                        <img class="services-item-image" src="/sneedsAssets/img/destchoose.png" alt="">
                        <h3 class="services-item-meta isansFont--faNum">
                            <mark class="services-item-meta-number">
                                1.
                            </mark>
                            پیدا کردن کالج
                        </h3>
                        <p class="services-item-text">
                            مشاوران اسنیدز بعد از صحبت با شما ،بهترین کالج ممکن رو بر اساس بودجه علایق و رزومه شما
                            براتون انتخاب می‌کنند و دیگه لازم نیست توی یه لیست طولانی !اطلاعات کلی کالج رو زیر و رو کنی
                        </p>
                    </div>
                    <div class="services-item isansFont">
                        <img class="services-item-image" src="/sneedsAssets/img/docs.png" alt="">
                        <h3 class="services-item-meta isansFont--faNum">
                            <mark class="services-item-meta-number">
                                2.
                            </mark>
                            تکمیل مدارک
                        </h3>
                        <p class="services-item-text">
                            بلد نیستی چطوری رزومه یا انگیزه‌نامه بنویسی؟ یا هیچ ایده‌ای نسبت به مدارکی که برای اپلای
                            لازمه نداری؟ مهم نیست همه این کارا با مشاوران با تجربه اسنیدزه.
                        </p>
                    </div>
                    <div class="services-item isansFont">
                        <img class="services-item-image" src="/sneedsAssets/img/submit.png" alt="">
                        <h3 class="services-item-meta isansFont--faNum">
                            <mark class="services-item-meta-number">
                                3.
                            </mark>
                            سابمیت اپلیکیشن
                        </h3>
                        <p class="services-item-text">
                            شاید در نگاه اول کار ساده‌ای به نظر بیاد ولی یکی از زمان‌بر ترین کار‌ها سابمیت اپلیکیشنه...
                        </p>
                    </div>
                    <div class="services-item isansFont">
                        <img class="services-item-image" src="/sneedsAssets/img/conversations.png" alt="">
                        <h3 class="services-item-meta isansFont--faNum">
                            <mark class="services-item-meta-number">
                                4.
                            </mark>
                            انجام مکاتبات
                        </h3>
                        <p class="services-item-text">
                            زبانت خوب نیست؟ فکر می‌کنی ممکنه به خاطر اشتباه در مکاتبات پذیرشت رو به خطر بندازی؟ بسپرش به
                            مشاورانی که تو کشور مقصد تحصیل کردن!
                        </p>
                    </div>
                    <div class="services-item isansFont">
                        <img class="services-item-image" src="/sneedsAssets/img/payment.png" alt="">
                        <h3 class="services-item-meta isansFont--faNum">
                            <mark class="services-item-meta-number">
                                5.
                            </mark>
                            انجام پرداخت‌ها
                        </h3>
                        <p class="services-item-text">
                            برای پرداخت شهریه، اپلیکشین‌فی و نیاز به کمک داری؟ اسنیدز با کمترین کارمزد و در کمترین
                            زمان ممکن بدون واسطه برات پرداخت‌ها رو انجام می‌ده.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="package-section package-section-steps">
            <div class="section-sub section-sub-steps">
                <h1 class="section-steps-title isansFont--faNum">اپلای در 3 مرحله!</h1>
                <div class="section-steps-title-divider"></div>
                <div class="step">
                    <img class="step-image" src="/sneedsAssets/img/step-1.png" alt="">
                    <div class="step-info">
                        <h2 class="step-title isansFont--faNum">
                            1.رزرو پکیج و اعلام آمادگی مشاوران
                        </h2>
                        <p class="step-text isansFont">
                            بعد از رزرو پکیج و پر کردن فرم، اطلاعات شما برای مشاوران اسنیدز فرستاده میشه و حداکثر بعد از
                            چهار روز مشاورانی که برای پروژه شما اعلام آمادگی کردند، توی پروفایلتون قابل مشاهده خواهند بود.
                        </p>
                    </div>
                </div>
                <div class="step">
                    <img class="step-image" src="/sneedsAssets/img/step-2.png" alt="">
                    <div class="step-info">
                        <h2 class="step-title isansFont--faNum">
                            2.انتخاب مشاور توسط شما و شروع پروسه
                        </h2>
                        <p class="step-text isansFont">
                            بعدش شما میتونید از بین این مشاوران، بررسی کنید و یکی رو انتخاب کنید تا پروسه اپلایتون شروع بشه.
                        </p>
                    </div>
                </div>
                <div class="step">
                    <img class="step-image" src="/sneedsAssets/img/step-3.png" alt="">
                    <div class="step-info">
                        <h2 class="step-title isansFont--faNum">
                            3.مراحل پروسه با توجه به پکیج و در نهایت پذیرش و ویزا
                        </h2>
                        <p class="step-text isansFont">
                            با توجه به پکیجی که انتخاب کردید، مشاورتون و اسنیدز در تمام مسیرتون کنارتون خواهد بود.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="package-section package-section-smart">
            <div class="section-sub section-sub-smart">
                <img class="smart-image" src="/sneedsAssets/img/smart.png" alt="Sneeds">
                <div class="smart-info">
                    <h4 class="smart-info-suptitle isansFont">
                        اپلای هوشمند
                    </h4>
                    <h1 class="smart-info-title isansFont">
                        با استفاده از پلتفرم اسنیدز...
                    </h1>
                    <div class="smart-info-divider"></div>
                    <p class="smart-info-text isansFont">
                        با استفاده از پلتفرم اسنیدز از همه مراحل اپلایت با خبر باش! از زمانی که پکیج رو رزرو می‌کنی تا
                        پایان مراحل اپلای یا یک کلیک همه چیز رو زیر نظر داشته باش. همین طور می‌تونی هر وقت که خواستی با
                        مشاور از طریق ناحیه کاربری چت کنی.
                    </p>
                    <ul class="smart-info-items isansFont">
                        <li class="smart-info-item">
                            <i class="material-icons">done</i>
                            <span>چت با مشاور</span>
                        </li>
                        <li class="smart-info-item">
                            <i class="material-icons">done</i>
                            <span>اطلاع از وضعیت دقیق اپلای</span>
                        </li>
                        <li class="smart-info-item">
                            <i class="material-icons">done</i>
                            <span>مشاوره تصویری در بستر اسنیدز</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="package-section package-section-about">
            <div class="section-sub section-sub-smart">
                <div class="about-info">
                    <h4 class="smart-info-suptitle isansFont">
                        درباره اسنیدز
                    </h4>
                    <h1 class="smart-info-title isansFont">
                        ما کی هستیم؟
                    </h1>
                    <div class="smart-info-divider"></div>
                    <p class="smart-info-text isansFont">
                        حدود ۲ سال پیش با چندتا بچه‌های امیرکبیر جمع شدیم و برای برطرف کردن یکی از مهم‌ترین نیازهای
                        دانشجو‌ها که اپلای و تحصیل و در خارج از کشوره یه استارتاپ راه انداختیم. هدفمون وصل کردن
                        دانشجو‌هایی که یک بار اپلای کردن و مسیر رو به طور کامل طی کردن به شمایی که به تجربه‌ این افراد
                        نیاز دارین بوده تا با خیال راحت بتونین همون جایی که دوست دارین درس بخونید. توی این مسیر موفق
                        شدیم به صدها دانشجو برای گرفتن پذیرش تحصیلی کمک کنیم و خیلی زیاد خدا رو برای این که تونستیم این
                        مسئولیت رو به نحو احسن انجام بدیم شکر می‌کنیم
                    </p>
                </div>
                <img class="smart-image" src="/sneedsAssets/img/team.png" alt="تیم اسنیدز">
            </div>
        </section>
        <section class="package-section package-section-support">
            <div class="section-sub section-sub-support">
                <div class="support-overlay"></div>
                <h1 class="support-title isansFont--faNum">پاسخگوی شما هستیم 24 ساعته و 7 روز هفته</h1>
                <ul class="support-items isansFont--faNum">
                    <li class="support-item item--hasLtr">
                        <i class="material-icons">call</i>
                        <span>021 - 2842 8353</span>
                    </li>
                    <li class="support-item item--link ">
                        <a href="http://bit.ly/2FPshaR" class="gadugiFont item--hasLtr" target="_blank">
                            <i class="material-icons">chat</i>
                            <span>@sneeds_admin</span>
                        </a>
                    </li>
                    <li class="support-item item--link">
                        <a href="http://bit.ly/3581UUU" class="gadugiFont item--hasLtr" target="_blank">
                            <i class="material-icons">picture_in_picture</i>
                            <span>@sneeds_admin</span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
        <section class="package-section package-section-buy">
            <div class="section-sub section-sub-buy" :class="[{'section-sub-buy--full': showComparePackages}]">
                <div class="buy-box buy-box--noborder">
                    <h2 class="buy-box-title-price title-price--brown isansFont--faNum">
                        8
                        <span class="buy-box-title-price-sup">
                            میلیون تومان
                        </span>
                    </h2>
                    <div class="buy-box-title ">
                        <h1 class="box-title-text isansFont">پکیج برنزی کالج</h1>
                        <h3 class="box-title-meta isansFont">اخذ تضمینی پذیرش کالج به وسیله مشاوران اسنیدز!</h3>
                    </div>
                    <ul class="buy-box-features isansFont">
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                پرداخت در
                                <mark class="buy-box-feature-mark isansFont--faNum">
                                    4 قسط
                                    <span class="buy-box-feature-mark-modal">
                                        <span class="box-feature-mark-modal-prices">
                                            <span>
                                                300 هزار تومان
                                            </span>
                                            <span>
                                                2 میلیون و 700 هزار تومان
                                            </span>
                                            <span>
                                                3 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                        </span>
                                        <span class="box-feature-mark-modal-infos">
                                            <span>
                                                در هنگام رزرو پکیج
                                            </span>
                                            <span>
                                                بعد از تایید مشاور و عقد قرارداد
                                            </span>
                                            <span>
                                                بعد از سابمیت و ارائه مدارک
                                            </span>
                                            <span>
                                                بعد از دریافت پذیرش
                                            </span>
                                        </span>
                                    </span>
                                </mark>
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                مشاوره اپلای
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                نگارش کامل مدارک
                            </p>
                        </li>
                    </ul>
                    <button @click="buyPackage({id: 9042})" class="buy-box-action isansFont--faNum">رزرو پکیج | 300,000
                        تومان
                    </button>
                </div>
                <div class="buy-box">
                    <h2 class="buy-box-title-price title-price--gray isansFont--faNum">
                        12
                        <span class="buy-box-title-price-sup">
                            میلیون تومان
                        </span>
                    </h2>
                    <div class="buy-box-title ">
                        <h1 class="box-title-text isansFont">پکیج نقره ای کالج</h1>
                        <h3 class="box-title-meta isansFont">
                            برای اونایی که می‌خوان ریسک رد شدن ویزا رو با کمک مشاوران اسنیدز حداقل کنن.
                        </h3>
                    </div>
                    <ul class="buy-box-features isansFont">
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                پرداخت در
                                <mark class="buy-box-feature-mark isansFont--faNum">
                                    6 قست
                                    <span class="buy-box-feature-mark-modal">
                                        <span class="box-feature-mark-modal-prices">
                                            <span>
                                                300 هزار تومان
                                            </span>
                                            <span>
                                                2 میلیون و 700 هزار تومان
                                            </span>
                                            <span>
                                                3 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                        </span>
                                        <span class="box-feature-mark-modal-infos">
                                            <span>
                                                در هنگام رزرو پکیج
                                            </span>
                                            <span>
                                                بعد از تایید مشاور و عقد قرارداد
                                            </span>
                                            <span>
                                                بعد از سابمیت و ارائه مدارک
                                            </span>
                                            <span>
                                                بعد از دریافت پذیرش
                                            </span>
                                            <span>
                                                بعد از سابمیت مدارک ویزا
                                            </span>
                                            <span>
                                                بعد از اخذ ویزا
                                            </span>
                                        </span>
                                    </span>
                                </mark>
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                مشاوره اپلای
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                مشاوره ویزا
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                نگارش کامل مدارک
                            </p>
                        </li>
                    </ul>
                    <button class="buy-box-action isansFont--faNum">رزرو پکیج | 300,000 تومان</button>
                </div>
                <div class="buy-box buy-box--noborder">
                    <h2 class="buy-box-title-price title-price--gold isansFont--faNum">
                        16
                        <span class="buy-box-title-price-sup">
                            میلیون تومان
                        </span>
                    </h2>
                    <div class="buy-box-title ">
                        <h1 class="box-title-text isansFont">پکیج طلایی کالج</h1>
                        <h3 class="box-title-meta isansFont">
                            برای اونایی که می‌خوان استرس پیدا کردن خونه در کشور مقصد رو از خودشون دور کنن!
                        </h3>
                    </div>
                    <ul class="buy-box-features isansFont">
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                پرداخت در
                                <mark class="buy-box-feature-mark isansFont--faNum">
                                    8 قست
                                    <span class="buy-box-feature-mark-modal">
                                        <span class="box-feature-mark-modal-prices">
                                            <span>
                                                300 هزار تومان
                                            </span>
                                            <span>
                                                2 میلیون و 700 هزار تومان
                                            </span>
                                            <span>
                                                3 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                            <span>
                                                2 میلیون تومان
                                            </span>
                                        </span>
                                        <span class="box-feature-mark-modal-infos">
                                            <span>
                                                در هنگام رزرو پکیج
                                            </span>
                                            <span>
                                                بعد از تایید مشاور و عقد قرارداد
                                            </span>
                                            <span>
                                                بعد از سابمیت و ارائه مدارک
                                            </span>
                                            <span>
                                                بعد از دریافت پذیرش
                                            </span>
                                            <span>
                                                بعد از سابمیت مدارک ویزا
                                            </span>
                                            <span>
                                                بعد از اخذ ویزا
                                            </span>
                                            <span>
                                                بعد از انتخاب خانه و هماهنگی با کاربر
                                            </span>
                                            <span>
                                                بعد از اجاره خانه
                                            </span>
                                        </span>
                                    </span>
                                </mark>
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                مشاوره اپلای
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                مشاوره ویزا
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                نگارش کامل مدارک
                            </p>
                        </li>
                        <li class="buy-box-feature">
                            <i class="material-icons buy-box-feature-icon">
                                done
                            </i>
                            <p class="buy-box-feature-text">
                                اجاره خانه پیش از رسیدن
                            </p>
                        </li>
                    </ul>
                    <button class="buy-box-action isansFont--faNum">رزرو پکیج | 300,000 تومان</button>
                </div>
                <button class="buy-box-compare-toggler isansFont" @click="toggleComparePackages">
                    مقایسه کامل پکیج ها
                    <i class="material-icons buy-box-compare-toggler-icon" v-if="showComparePackages">
                        keyboard_arrow_up
                    </i>
                    <i class="material-icons buy-box-compare-toggler-icon" v-else>
                        keyboard_arrow_down
                    </i>
                </button>
            </div>
        </section>
        <transition name="fade">
            <section class="package-section package-section-compare" v-if="showComparePackages">
                <div class="section-sub section-sub-compare">
                    <div class="compare-title isansFont">
                        <p class="compare-title-item">
                            پکیج برنزی کالج
                        </p>
                        <p class="compare-title-item">
                            پکیج نقره ای کالج
                            <mark class="compare-title-item-marked">
                                پر فروش ترین!
                            </mark>
                        </p>
                        <p class="compare-title-item">
                            پکیج طلایی کالج
                        </p>
                    </div>
                    <div class="compare-item isansFont--faNum">
                        <h3 class="compare-item-title isansFont">
                            قیمت
                        </h3>
                        <div class="compare-item-values">
                            <p class="compare-item-value">
                                8 میلیون تومان -> 4قسط
                            </p>
                            <p class="compare-item-value compare-item-value--bordered">
                                12 میلیون تومان -> 6قسط
                            </p>
                            <p class="compare-item-value">
                                16 میلیون تومان -> 8قسط
                            </p>
                        </div>
                    </div>
                    <div class="compare-item isansFont--faNum" v-for="item in compareItems">
                        <h3 class="compare-item-title isansFont">
                            {{item.title}}
                        </h3>
                        <div class="compare-item-values">
                            <p class="compare-item-value">
                                <i class="material-icons compare-item-hasIcon icon-done" v-if="item.bronze">done</i>
                                <i class="material-icons compare-item-hasIcon icon-close" v-else>close</i>
                            </p>
                            <p class="compare-item-value compare-item-value--bordered">
                                <i class="material-icons compare-item-hasIcon icon-done" v-if="item.silver">done</i>
                                <i class="material-icons compare-item-hasIcon icon-close" v-else>close</i>
                            </p>
                            <p class="compare-item-value">
                                <i class="material-icons compare-item-hasIcon icon-done" v-if="item.gold">done</i>
                                <i class="material-icons compare-item-hasIcon icon-close" v-else>close</i>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </transition>
        <section class="package-section package-section-college">
            <div class="section-sub section-sub-college">
                <h1 class="college-title isansFont">
                    چرا کالج؟
                </h1>
                <p class="college-info isansFont">
                    کالج یه موسسه آموزشیه مثل دانشگاه، اما با یه سری تفاوت‌ها که اونو به انتخاب راحت‌ و منطقی‌تری
                    برای افرادی که بیشتر از تحصیلات آکادمیک به کارکردن علاقه دارن می‌کنه.
                    <br>
                    <br>
                    شهریه کالج‌ها معمولا نسبتا به دانشگاه‌ها کمتره و این مسئله کالج رو تبدیل به یه انتخاب ایده‌آل
                    برای افرادی که نمی‌خوان بودجه زیادی برای شهریه بپردازن می‌کنه.
                    <br>
                    <br>
                    آموزش‌هایی که توی کالج دریافت خواهید کرد Skill based هستند
                    این مسئله به این معناست که به بعد از گرفتن مدرک به راحتی می‌تونید با توانایی‌هایی که دارید
                    وارد بازار کار بشین
                    و بعد از دریافت ویزای کار می‌تونید راحت تر اون رو تبدیل به ویزای اقامت دائم بکنید!
                    <br>
                    <br>
                    شرایط پذیرش در کالج بسیار راحت‌تر از دانشگاه بوده و نیاز به رزومه و زبان خیلی قوی برای اپلای به کالج
                    نخواهید داشت
                    علاوه بر اون با توجه به زمان آزاد بیشتری که به دست خواهید آورد می‌تونید در کنار کالج به راحتی کار
                    کنید که همچین شرایطی برای دانشجویان در حال تحصیل در دانشگاه فراهم نیست.
                </p>
            </div>
        </section>
        <section class="package-section package-section-trust">
            <div class="section-sub section-sub-trust">
                <div class="trust-title-box">
                    <div class="trust-title-meta">
                        <span class="trust-title-meta-line"></span>

                        <i class="material-icons trust-title-meta-icon">
                            help_outline
                        </i>
                    </div>
                    <h1 class="isansFont trust-title-text">چرا به شما اعتماد کنم؟</h1>
                    <h3 class="isansFont trust-title-sub">نظرات کاربران مارو ببینید</h3>
                </div>
                <div class="trust-comments isansFont">
                    <button class="trust-comments-action" @click="showPrevComment">
                        <i class="material-icons">keyboard_arrow_right</i>
                    </button>
                    <div class="trust-comment-box">
                        <div class="trust-comments-content">
                            <img class="trusts-comments-sender-avatar" :src="currentComment.sender.avatar"
                                 :alt="currentComment.sender.name">
                            <h3 class="trusts-comments-sender-name isansFont">{{currentComment.sender.name}}</h3>
                            <p class="trusts-comments-sender-text isansFont--faNum">
                                {{currentComment.text}}
                            </p>
                        </div>
                        <img class="trust-comments-box-topicon"
                             src="/sneedsAssets/img/comments-circle.svg"
                             alt="comments svg">
                        <div class="trust-comments-box-rightrect"></div>
                        <div class="trust-comments-box-leftrect"></div>

                    </div>
                    <button class="trust-comments-action" @click="showNextComment">
                        <i class="material-icons">keyboard_arrow_left</i>
                    </button>
                </div>
            </div>
        </section>
        <section class="package-section package-section-awards">
            <p class="awards-sup isansFont--faNum">
                در 2 سال گذشته
            </p>
            <h1 class="awards-title isansFont">
                دستاورد های اسنیدز
            </h1>
            <div class="section-sub section-sub-awards">
                <div class="awards-item">
                    <img alt="2000 پذیرش اخذ شده توسط مشاوران اسنیدز" src="/sneedsAssets/img/awards-login.svg"
                         class="awards-item-icon">
                    <p class="isansFont--faNum awards-item-amount">56+</p>
                    <p class="isansFont awards-item-desc">
                        پذیرش اخذ شده
                        <br>
                        به دست مشاوران اسنیدز
                    </p>
                </div>
                <div class="awards-item">
                    <img alt="2000 پذیرش اخذ شده توسط مشاوران اسنیدز" src="/sneedsAssets/img/awards-people.svg"
                         class="awards-item-icon">
                    <p class="isansFont--faNum awards-item-amount">27,000+</p>
                    <p class="isansFont awards-item-desc">
                        دقیقه مشاوره آنلاین
                        <br>
                        انجام شده!
                    </p>
                </div>
                <div class="awards-item">
                    <img alt="2000 پذیرش اخذ شده توسط مشاوران اسنیدز" src="/sneedsAssets/img/awards-docs.svg"
                         class="awards-item-icon">
                    <p class="isansFont--faNum awards-item-amount">540+</p>
                    <p class="isansFont awards-item-desc">
                        مدارک ویرایش یا نگارش شده
                        <br>
                        به دست مشاوران اسنیدز
                    </p>
                </div>
            </div>
        </section>
        <section class="package-section package-section-faq">
            <div class="section-sub section-sub-faq">
                <section class="faq-box" v-for="faqBox in faqBoxes">
                    <sup class="isansFont faq-box-title-sup">{{faqBox.sup}}</sup>
                    <h1 class="isansFont faq-box-title">{{faqBox.title}}</h1>
                    <div class="faq-divider divider--purple"></div>
                    <div class="faq-question" v-for="question in faqBox.questions">
                        <div class="faq-question-title" @click="toggleQuestion(question)">
                            <h2 class="faq-question-title-text isansFont">
                                {{question.title}}
                            </h2>
                            <button class="faq-question-title-toggler" :class="[{'toggler--open': question.isOpen}]">
                                <transition name="fade">
                                    <i class="material-icons" v-if="!question.isOpen">keyboard_arrow_down</i>
                                    <i class="material-icons" v-else>keyboard_arrow_up</i>
                                </transition>
                            </button>
                        </div>
                        <transition name="fade">
                            <p class="isansFont faq-question-answer" v-if="question.isOpen">
                                {{question.answer}}
                            </p>
                        </transition>
                    </div>
                </section>
            </div>
        </section>
    </main>
</template>

<script>
    import RegisterForm from '@/components/StandAlone/RegisterForm';
    import LoginForm from '@/components/StandAlone/LoginForm';

    export default {
        name: "Landing",
        components: {
            "login-form": LoginForm,
            "register-form": RegisterForm
        },
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
                        sup: 'عمومی',
                        title: 'سوالات متداول',
                        questions: [
                            {
                                title: 'این 300 هزارتومان برای چیه و چی میشه؟',
                                answer: `این مبلغ برای رزرو پکیج کالج مورد نظر شماست، با پرداخت این مبلغ روند کار برای شما شروع میشه و اطلاعات برای مشاوران ارسال میشه، اگر بعد از مشاوره (ها)به این نتیجه برسید که تمایل به ادامه کار ندارید مبالغ مشاوره(هرجلسه معادل مبلغ مشاوره بر روی سایت)ا از هزینه 500 تومان شما کسر و مابقی به شما برگشت میخورد.`,
                                isOpen: true,
                            },
                            {
                                title: 'گرفتن پذیرش قطعیه؟',
                                answer: `بله، مشاوران ما درصورت اطمینان از زرومه و اخذ پذیرش برای شما، پروژه شما رو قبول می‌کنند.`,
                                isOpen: false,
                            },
                            {
                                title: 'کالج فاند داره؟ اگه آره براش اقدام می‌کنید؟',
                                answer: `برای کالج فاند تعریف نمی‌شود و لذا اقدامی هم برای اون انجام نمیشه اما هزینه‌های تحصیل در کالج نسبت به دانشگاه کمتر هست.`,
                                isOpen: false,
                            },
                            {
                                title: 'برای ویزا هم اقدام میشه؟',
                                answer: `پکیج‌های اخذ پذیرش کالج اسنیدز سه نوع هستند که در پکیج نقره‌ای و طلایی علاوه بر پذیرش کالج خدمات اخذ ویزا هم ارائه میشه.`,
                                isOpen: false,
                            },
                            {
                                title: 'کالج محدودیت سنی داره؟',
                                answer: `برای اخذ پذیرش کالج هیچ محدودیت سنی وجود نداره اما برای گرفتن ویزا بالا بودن سن شانس شما رو کم‌تر میکنه.`,
                                isOpen: false,
                            },
                            {
                                title: 'امکان تغییر قسط‌ها وجود داره؟',
                                answer: `با توجه به اینکه اسنیدز برای پیشبرد روند کار و پرداخت به مشاورین دارای پروتکل مشخصی است، متاسفانه امکان تغییر قسط وجود ندارد و پرداخت هزینه با توجه به پکیج و مطابق قرارداد انجام می‌شود.`,
                                isOpen: false,
                            },
                            {
                                title: 'چطوری باید مشاور مورد نظرم رو انتخاب کنم؟',
                                answer: `رزومه شما برای مشاوران ما ارسال میشه و مشاران بعد از بررسی در صورتی که تمایل به انجام پروژه داشته باشند پروژه شما رو قبول می‌کنند و شما می‌تونید از بین مشاورانی که رزومه شما رو قبول کردند مشاورتون رو انتخاب کنید.`,
                                isOpen: false,
                            },
                            {
                                title: 'چطوری در جریان روند کار قرار می‌گیرم؟',
                                answer: `بعد از عقد قرارداد شما به طور مستقیم با مشاورتون در ارتباط هستید و در جریان روند کار قرار می‌گیرید، به علاوه با مراجعه به پروفایلتون هم می‌تونید ببینید دقیقا پروژه شما در چه مرحله ای هست.`,
                                isOpen: false,
                            },
                            {
                                title: 'به جز خود پکیج چه هزینه‌های دیگه‌ای با منه؟',
                                answer: 'همون طور که می دونید اپلای فرآیند پر هزینه‌ایه و هزینه‌هایی مثل پرداخت اپلیکیشن‌فی، بلیط و ... کم نخواهد بود.\n' +
                                    'اما خرید پکیج‌های کمکی اپلای اسنیدز علاوه بر خدماتی که ارائه شده به شما کمک خواهد کرد با استفاده از تجربه اونایی که خودشون اپلای کردن هزینه‌هاتون رو به حداقل برسونید و پول‌هاتون رو به بهینه‌ترین شکل ممکن خرج کنید.',
                                isOpen: false,
                            },
                            {
                                title: 'قرار داد حتما باید حضوری بسته بشه؟',
                                answer: `نه، اسنیدز یه پلتفرم کاملا آنلاین هست و قرارداد برای شما ارسال میشه و شما از هر جای جهان بعد از امضای قرارداد و اسکن اون، قرارداد رو برای ما می‌فرستید.`,
                                isOpen: false,
                            }
                        ]
                    },
                    {
                        sup: 'اسنیدز',
                        title: 'سوالات متداول',
                        questions: [
                            {
                                title: 'اسنیدز چی کار می‌کنه؟',
                                answer: `اسنیدز اولین پلتفرم مهاجرت تحصیلی و اپلای آنلاین هست که تمام خدمات مورد نیاز در مسیر اخذ پذیرش از ارائه جلسات مشاوره با دانشجویان در سراسر جهان و رشته ها و دانشگاه های مختلف، انجام خدمات اپلای، برگزاری وبینارها و کلاس های اپلای تا گرفتن پذیرش و ارائه خدمات ویزا رو به صورت کاملا آنلاین  انجام میده.`,
                                isOpen: true,
                            },
                            {
                                title: 'منظورتون از پلتفرم بودن چیه؟',
                                answer: `اسنیدز خدماتش رو از طریق مشاورانش در سراسر جهان ارائه میده و منظور از پلتفرم بونش این هست که بین شما به عنوان کسانی که نیاز به خدمات اپلای دارید و مشاوران ما که همگی از افراد با تجربه در این زمینه هستند برای انجام خدمات ارتباط برقرار می‌کنیم.`,
                                isOpen: false,
                            },
                            {
                                title: 'مشاورانتون کیا هستن؟',
                                answer: `مشاوران ما دانشجویان در حال تحصیل در کشورها، رشته‌ها و مقاطع مختلف هستند که همگی تجربه اپلای موفق رو داشتند و خودشون این مسیر رو طی کردند و به طور کامل با مراحل و روند کار آشنا هستند و امروز به عنوان مشاورین اسنیدز به افراد زیادی در زمینه اخذ پیرش کمک می‌کنند.`,
                                isOpen: false,
                            },
                            {
                                title: 'چطوری به شما اعتماد کنم؟',
                                answer: 'اسنیدز یه استارتاپ دانش بنیان متشکل از دانشجویان امیرکبیره، که بیش از ۲ سال سابقه‌ فعالیت در زمینه‌ اپلای و مهاجرت تحصیلی رو داره.\n' +
                                    'ما توی این مسیر به تعداد زیادی از دانشجویانی که قصد اپلای داشتند کمک کردیم و کارنامه ما بهترین معرف ماست.\n' +
                                    'تمام مشاوران اسنیدز تجربه کسب پذیرش از دانشگاه‌ها وکالج‌های برتر سراسر دنیا رو داشتند که با مراجعه به پروفایلشون در سایت می‌تونید به رزومه‌شون دسترسی داشته باشید و از نظرات کاربرایی که از کمکشون استفاده کردند استفاده کنید و بهترین تصمیم رو برای آیندتون بگیرین!',
                                isOpen: false,
                            },
                            {
                                title: 'امکان مراجعه حضوری به دفترتون هست؟',
                                answer: `برای پکیج‌های اسنیدز امکان مراجعه حضوری برای صحبت و عقد قرارداد وجود داره ولی حتما قبل از مراجعه باید هماهنگی برای زمان مراجعه صورت بگیره.`,
                                isOpen: false,
                            }
                        ]
                    }
                ],
                compareItems: [
                    {title: 'آماده سازی مدارک اپلای', bronze: true, silver: true, gold: true},
                    {title: 'تضمین پذیرش', bronze: true, silver: true, gold: true},
                    {title: 'مشاوره زبان', bronze: true, silver: true, gold: true},
                    {title: 'مشاوره انتخاب کالج', bronze: true, silver: true, gold: true},
                    {title: 'مشاوره شرایط زندگی', bronze: true, silver: true, gold: true},
                    {title: 'مشاوره انتخاب رشته', bronze: true, silver: true, gold: true},
                    {title: 'مشاوره ویزا', bronze: true, silver: true, gold: true},
                    {title: 'انجام مراحل اخذ ویزا', bronze: false, silver: true, gold: true},
                    {title: 'مشاوره دریافت منزل در کشور مقصد', bronze: false, silver: true, gold: true},
                    {title: 'اجاره منزل', bronze: false, silver: false, gold: true},
                ]
            }
        },
        computed: {
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
            api() {
                return this.$store.getters.getApi;
            },
            isiran() {
                return this.$store.getters.isiran;
            },
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            },
            currentComment() {
                return this.comments[this.currentCommentIndex]
            },
            showModalOverlay() {
                return this.showRegisterIntro || this.showRegisterModal || this.showNameModal;
            },
            user() {
                return this.$store.getters.getUser;
            },
            showNameModalAfterLogin() {
                if (this.user.first_name == null || this.user.last_name == null) {
                    return true
                } else if (this.user.first_name.trim().length === 0 || this.user.last_name.trim().length === 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        mounted() {
            this.commentsSliderInterval = setInterval(() => {
                this.showNextComment();
            }, 10000)
            console.log('interval created');
        },

        beforeDestroy() {
            clearInterval(this.commentsSliderInterval);
        },

        methods: {
            showLoginForm() {
                this.loginForm = true;
                this.registerForm = false;
                this.showNameModal = false;
            },

            showRegisterForm() {
                this.registerForm = true;
                this.loginForm = false;
                this.showNameModal = false;
            },

            loginFormAction() {
                this.showRegisterIntro = false;
                this.showRegisterModal = false;
                if (this.showNameModalAfterLogin) {
                    this.showNameModal = true;
                } else {
                    this.buyPackage(null, true);
                }
            },

            registerFormAction() {
                this.showRegisterModal = false;
                this.showRegisterIntro = false;
                this.showNameModal = true;
            },

            continueRegisterFlow() {
                this.showRegisterIntro = false;
                this.showRegisterModal = true;
                this.showNameModal = false;
            },

            hideAllModals(event) {
                let command = event.target.dataset.command;
                if (command === 'consultant-modal-close') {
                    this.showRegisterIntro = false;
                    this.showRegisterModal = false;
                    this.showNameModal = false;
                }
            },

            showPrevComment() {
                if (this.currentCommentIndex === 0) {
                    this.currentCommentIndex = this.comments.length - 1;
                } else {
                    this.currentCommentIndex--;
                }
            },

            showNextComment() {
                if (this.currentCommentIndex === this.comments.length - 1) {
                    this.currentCommentIndex = 0;
                } else {
                    this.currentCommentIndex++;
                }
            },

            toggleQuestion(question) {
                question.isOpen = !question.isOpen;
            },

            toggleComparePackages() {
                this.showComparePackages = !this.showComparePackages;
            },

            setNameAndPay() {
                let requests = [];
                let editReq = this.$api.put(`${this.$store.getters.getApi}/auth/accounts/${this.$store.getters.getUserInfo.id}/`, {
                    "first_name": this.first_name,
                    "last_name": this.last_name
                }, this.$store.getters.httpConfig);
                let dispatchUser = this.$store.dispatch('getUserWithId', this.$store.getters.getUserInfo.id);
                requests.push(editReq);
                requests.push(dispatchUser);
                //this.$loading(true);
                Promise.all(requests).then(([editRes, dispatchRes]) => {
                    this.buyPackage(null, true);
                }).catch(error => {

                }).finally(() => {

                })
            },

            async buyPackage(storePackageToBuy, forced = false) {
                if (forced) {
                    this.hideAllModals({target: {dataset: {command: 'consultant-modal-close'}}});
                } else {
                    this.packageToBuy = storePackageToBuy;
                }
                // console.log(this.stash);
                let payload = {products: [this.packageToBuy.id]};
                console.log(payload);
                if (this.isLoggedIn) {
                    if (this.showNameModalAfterLogin && !forced) {
                        this.showNameModal = true;
                    } else {
                        try {
                            //this.$loading(true);
                            let result = await this.$api.post(`${this.$store.getters.getApi}/cart/carts/`, payload, this.$store.getters.httpConfig);
                            console.log(result);
                            this.$router.push(`/carts/${result.data.id}`);
                        } catch (e) {
                            console.log(e);
                            if (e.response) {
                                console.log(e.response)
                            }
                            this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "رزرو : خطا", "error", 3000, "notif")
                        } finally {

                        }
                    }
                } else {
                    this.showRegisterIntro = true;
                }

            },

            async getPackages() {
                try {
                    //this.$loading(true);
                    this.storePackages = (await this.$api.get(`${this.api}/store/packages/store-package-list/`, this.httpConfig)).data;
                } catch (e) {

                } finally {

                }
            }
        },
        created() {
            this.getPackages();
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
        width: 100%;
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section-sub {
        width: 100%;
        max-width: 1170px;
        padding: 0 35px;
    }

    .section-sub-intro {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section-intro-title-box {
        display: flex;
        flex-direction: column;
        width: 80%;
        text-align: center;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        position: relative;
        padding-bottom: 30px;
    }

    .intro-title-span {
        font-weight: 900;
        border-bottom: 3px solid #00BFD6;
        padding-bottom: 2px;
    }

    .span-blue {
        color: #00BFD6;
    }

    .span-black {
        color: #303143
    }

    .section-intro {
        background: linear-gradient(90deg, #A347FF 50%, #FFF 50%);
    }

    .section-intro-title {
        color: white;
        font-size: 28px;
        margin: 30px;
        z-index: 5;
        position: relative;
    }

    .intro-title-dots {
        position: absolute;
        right: 0;
        top: 10px;
        width: 200px;
        color: #929493;
    }

    .intro-title-dots.left {
        left: 0;
        right: initial;
    }

    .intro-start {
        position: absolute;
        bottom: -25px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-radius: 5px;
        background-color: #00BFD6;
        color: white;
        border: none;
        padding: 0 28px;
        align-self: center;
        transition: all 0.2s ease-in-out;
    }

    .intro-start:hover {
        background-color: #00bfa5;
    }

    .section-intro-text {
        color: #707070;
        font-size: 16px;
        margin: 30px;
        line-height: 25px;
        z-index: 5;
    }

    .section-consultants {
        background-size: contain;
        background: white url('/sneedsAssets/img/world.png') 20px;
        align-items: center;
    }

    .section-sub-consultants {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        justify-self: stretch;
    }

    .section-consultants-info {
        width: 50%;
    }

    .section-consultants-title {
        font-size: 24px;
        font-weight: bold;
        margin: 0 0 10px 0;
        line-height: 32px;
        color: #303143;
    }

    .section-consultants-text {
        color: #707070;
        font-size: 16px;
        line-height: 30px;
    }

    .section-consultants-divider {
        width: 100px;
        height: 5px;
        border-radius: 20px;
        background-color: #8C3DDB;
        margin: 20px 0;
    }

    .section-consultants-avatars {
        width: 50%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .section-consultants-avatars-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 10px
    }

    .section-sub-services {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .section-services-title {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .services-title-text {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 25px 0;
        color: #303143;
    }

    .services-title-subtext {
        text-align: center;
        color: #707070;
        margin: 0 0 15px 0;
        font-size: 16px;
    }

    .services-title-divider {
        width: 100px;
        height: 4px;
        border-radius: 30px;
        background-color: #00BFD6;
        margin: 20px 0;
    }

    .section-services-items {
        display: flex;
        justify-content: center;
        width: 100%;
        flex-wrap: wrap;
    }

    .services-item {
        width: 250px;
        margin: 15px;
        min-height: 300px;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: flex-start;
        background-color: white;
        box-shadow: 0 8px 46px #6E6E6E29;
        border-radius: 15px;
    }

    .services-item-image {
        width: 100px;
        height: 100px;
        margin: 30px auto;
    }

    .services-item-meta {
        margin: 0 15px 10px 0;
        color: #303143;
        font-size: 15px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }

    .services-item-meta-number {
        padding: 0;
        background: none;
        color: #00BFD6;
        font-size: 32px;
        margin-left: 5px;
    }

    .services-item-text {
        color: #707070;
        padding: 15px;
        font-size: 13px;
        line-height: 24px;
    }

    .section-sub-steps {
        display: flex;
        flex-direction: column;
    }

    .section-steps-title {
        font-size: 24px;
        font-weight: bold;
        margin: 50px 0 25px 0;
        color: #303143;
    }

    .section-steps-title-divider {
        width: 100px;
        height: 4px;
        border-radius: 30px;
        background-color: #8C3DDB;
        margin: 5px 0;
    }

    .step {
        display: flex;
        align-items: center;
    }

    .step-info {
        margin-right: 20px;
    }

    .step-image {
        width: 150px;
        height: 150px;
        border-radius: 50% 0 50% 50%;
    }

    .step-title {
        font-size: 18px;
        margin: 10px 0;
        color: #585858;
        font-weight: bold;
    }

    .step-text {
        color: #9B9999;
        line-height: 25px;
        margin-top: 10px;
    }

    .section-sub-smart {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .smart-image {
        width: 50%;
    }

    .smart-info {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .smart-info-suptitle {
        margin: 20px 0;
        color: #303143;
        font-size: 14px;
        font-weight: bold;
    }

    .smart-info-title {
        color: #303143;
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }

    .smart-info-divider {
        width: 150px;
        height: 5px;
        border-radius: 20px;
        background-color: #00BFD6;
        margin: 20px 0;
    }

    .smart-info-text {
        color: #707070;
        line-height: 26px;
    }

    .smart-info-items {
        list-style: none;
        background-color: #00BFD6;
        color: white;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        padding: 0;
    }

    .smart-info-item {
        display: flex;
        align-items: center;
        padding: 15px 0;
        margin: 0 10px;
        font-size: 13px;
    }

    .smart-info-item i {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        margin-left: 5px;
        background-color: white;
        color: #00BFD6;
        border-radius: 50%;
        font-size: 12px;
    }

    .about-info {
        display: flex;
        flex-direction: column;
        width: calc(50% - 20px);
    }

    .package-section-support {
        min-height: initial;
        margin: 50px 0;
    }

    .section-sub-support {
        height: 300px;
        background: url("/sneedsAssets/img/support.png") no-repeat center;
        background-size: cover;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
    }

    .support-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 300px;
        z-index: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(31, 31, 31, 1) 50%, rgba(84, 84, 84, 1) 100%);
        opacity: 0.5;
        border-radius: 10px;
    }

    .support-title {
        z-index: 3;
        position: relative;
        color: white;
        font-size: 22px;
        font-weight: bold;
    }

    .support-items {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 3;
        position: relative;
        padding: 0;
        flex-wrap: wrap;
    }

    .support-item {
        background-color: #303143;
        color: #00BFD6;
        display: flex;
        align-items: center;
        direction: ltr;
        margin: 15px;
        padding: 10px 25px;
        border-radius: 20px;
    }

    .support-item i {
        font-size: 16px;
        margin-left: 5px;
    }

    .item--link {
        padding: 0;
    }

    .item--link a {
        width: 100%;
        padding: 10px 25px;
        color: #00BFD6;
        border-radius: 20px;
        transition: all 0.2s ease-in-out;
    }

    .item--link a:hover {
        color: #303143;
        background-color: #00BFD6;
    }

    .item--hasLtr span {
        direction: ltr !important;
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

    .faq-box-title-sup {
        color: #303143;
        font-size: 14px;
        margin-bottom: 15px;
    }

    .faq-divider {
        width: 130px;
        height: 3px;
        border-radius: 20px;
        background-color: black;
        margin-top: 25px;
    }

    .divider--purple {
        background-color: #8C3DDB;
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
        background-color: #BD7AFF;
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
        border: 2px solid #8E39CC;
        background: none;
        color: #8E39CC;
    }

    .faq-question-title-toggler.toggler--open {
        border-color: #BD7AFF;
        color: #BD7AFF;
    }

    .faq-question-answer {
        color: #9B9999;
        line-height: 26px;
        padding-top: 10px;
    }

    .package-section-buy {
        background-color: #F6F7FA;
        z-index: 28;
        min-height: auto;
    }

    .section-sub-buy {
        display: flex;
        justify-content: space-evenly;
        align-items: stretch;
        flex-wrap: wrap;
        background-color: #FFFFFF;
        border: 1px solid #F6F6F6;
        box-shadow: 0 18px 26px #5E5E5E29;
        border-radius: 15px;
        margin: 40px 0;
        padding: 40px 0 60px 0;
        position: relative;
    }

    .section-sub-buy--full {
        margin-bottom: 0;
    }

    .buy-box {
        width: 33%;
        min-width: 300px;
        border-right: 2px solid #F2F2F2;
        border-left: 2px solid #F2F2F2;
        display: flex;
        flex-direction: column;
    }

    .buy-box--noborder {
        border: none;
    }

    .buy-box-title-price {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 40px;
        font-weight: bold;
        width: 55px;
        height: 55px;
        margin: 30px;
    }

    .buy-box-title-price-sup {
        position: absolute;
        font-size: 14px;
        font-weight: normal;
        right: 45px;
        top: initial;
        width: 120px;
    }

    .title-price--brown {
        color: #6C2C10;
        background-color: #FFECEC;
    }

    .title-price--gray {
        color: #707070;
        background-color: #F2F2F2;
    }

    .title-price--gold {
        color: #CAA53D;
        background-color: #FBF8DE;
    }

    .buy-box-title {
        margin: 30px;
    }

    .box-title-text {
        color: #303143;
        font-size: 18px;
        margin: 0;
    }

    .box-title-meta {
        color: #9B9999;
        font-size: 13px;
        margin: 20px 0 0 0;
        line-height: 26px;
        height: 60px;
    }

    .buy-box-features {
        list-style: none;
        padding: 0;
        margin: 0 30px;
        display: flex;
        flex-direction: column;
        height: 150px;
    }

    .buy-box-feature {
        display: flex;
        align-items: center;
        margin: 5px 0;
    }

    .buy-box-feature-icon {
        font-size: 13px;
        border-radius: 50%;
        border: 1px solid #8C3DDB;
        padding: 1.5px;
        margin-left: 10px;
        color: #8C3DDB;
    }

    .buy-box-feature-text {
        margin: 0 5px;
        color: #585858;
        font-size: 13px;
    }

    .buy-box-action {
        border-radius: 15px;
        border: 2px solid #A347FF;
        color: #A347FF;
        background-color: white;
        padding: 10px;
        margin: 50px 30px 0 30px;
        transition: all 0.2s ease-in-out;
    }

    .buy-box-action:hover {
        color: white;
        background-color: #A347FF;
    }

    .buy-box-feature-mark {
        padding: 0;
        background: none;
        border-bottom: 1px dashed #A347FF;
        margin-right: 5px;
        color: #585858;
        cursor: pointer;
        position: relative;
        transition: display 0.2s ease-in-out;
    }

    .buy-box-feature-mark-modal {
        position: absolute;
        top: 20px;
        right: -100px;
        padding: 20px;
        background-color: white;
        box-shadow: 0 -4px 7px #00000017;
        z-index: 999;
        border-radius: 15px;
        display: none;
        min-width: 400px;
        transition: all 0.2s ease-in-out;
    }

    .buy-box-feature-mark:hover > .buy-box-feature-mark-modal {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }


    .box-feature-mark-modal-prices {
        display: flex;
        flex-direction: column;
        background-color: #EFF8FF;
        border-radius: 15px;
        color: #20639B;
        padding: 15px;
    }

    .box-feature-mark-modal-infos {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        color: #585858;
        padding: 15px;
    }

    .box-feature-mark-modal-prices span {
        margin: 5px 0;
    }

    .box-feature-mark-modal-infos span {
        margin: 5px 0;
    }


    .buy-box-compare-toggler {
        position: absolute;
        bottom: -23px;
        box-shadow: 0 4px 16px #00000021;
        background: #FFFFFF;
        border: none;
        border-radius: 15px;
        padding: 10px 25px;
        color: #8C3DDB;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        z-index: 30;
    }

    .buy-box-compare-toggler-icon {
        font-size: 13px;
        border-radius: 50%;
        border: 1px solid #8C3DDB;
        padding: 1.5px;
        margin-right: 5px;
        transition: border-color 0.2s ease-in-out;
    }

    .buy-box-compare-toggler:hover {
        color: white;
        background-color: #8C3DDB;
    }

    .buy-box-compare-toggler:hover > .buy-box-compare-toggler-icon {
        border-color: white;
    }

    .package-section-compare {
        background-color: #F6F7FA;
        z-index: 26;
        margin-top: -10px;
    }

    .section-sub-compare {
        flex-direction: column;
        align-items: stretch;
    }

    .compare-title {
        margin: 50px 50px 20px 50px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 40px;
        background-color: #A347FF;
        color: white;
        position: sticky;
        top: 80px;
    }

    .compare-title-item {
        margin: 0;
    }

    .compare-title-item-marked {
        font-size: 11px;
        padding: 1px 8px;
        border-radius: 20px;
        color: #8C3DDB;
        background-color: #F0E6FA;
        margin-right: 5px;
    }

    .compare-item {
        margin: 15px 50px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .compare-item-title {
        font-size: 15px;
        color: #707070;
        align-self: center;
        background-color: #F8F8F8;
        border-radius: 10px;
        padding: 2px 15px;
    }

    .compare-item-values {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: 20px 0;
    }

    .compare-item-value {
        color: #585858;
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .compare-item-hasIcon {
        color: #00BFD6;
    }

    .compare-item-noHasIcon {
        color: #9B9999;
    }

    .compare-item-value--bordered {
        border-right: 2px solid #E3E3E3;
        border-left: 2px solid #E3E3E3;
    }

    .section-sub-college {
        justify-self: center;
        margin: 10px 120px;
    }

    .college-title {
        font-size: 24px;
        font-weight: bold;
        margin-top: 30px;
        position: relative;
        padding-right: 20px;
    }

    .college-title:before {
        content: " ";
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background-color: #14D5EA;
        position: absolute;
        right: 0;
        top: 10px;
        margin-left: 5px;
    }

    .college-info {
        margin-top: 30px;
        padding: 10px;
        border-right: 2px solid #14D5EA;
        margin-right: 2px;
        color: #707070;
        line-height: 26px;
    }

    .package-section-awards {
        background-color: #8C3DDB;
        min-height: 250px;
        height: 300px;
        position: relative;
        display: flex;
        margin-bottom: 175px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .section-sub-awards {
        background-color: white;
        height: 250px;
        position: absolute;
        bottom: -100px;
        border-radius: 10px;
        box-shadow: 0 4px 16px #00000021;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .awards-title {
        color: white;
        font-weight: bold;
        font-size: 24px;
        margin: 10px;
    }

    .awards-sup {
        background-color: white;
        color: #8C3DDB;
        border-radius: 20px;
        padding: 5px 15px;
        margin-top: 30px;
    }

    .awards-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .awards-item-icon {
        width: 40px;
        height: 40px;
    }

    .awards-item-amount {
        color: #303143;
        font-weight: bold;
        margin: 10px 0;
        font-size: 16px;
    }

    .awards-item-desc {
        text-align: center;
        color: #9B9999;
        font-size: 13px;
    }

    .section-sub-trust {
        flex-direction: column;
    }

    .trust-title-box {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .trust-title-meta {
        position: absolute;
        right: -160px;
        top: 8px;
        display: flex;
        align-items: center;
    }

    .trust-title-meta-icon {
        color: white;
        background-color: #00BFD6;
        border-radius: 50%;
        border: 2px solid #BAEEF4;
    }

    .trust-title-meta-line {
        width: 100px;
        height: 5px;
        border-radius: 5px;
        background-color: #BAEEF4;
        margin-left: 10px;
    }

    .trust-title-text {
        font-size: 18px;
        color: #303143;
        margin: 10px 0;
    }

    .trust-title-sub {
        color: #9B9999;
        margin: 10px 0;
        font-size: 14px;
    }

    .trust-comments {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .trust-comments-action {
        width: 35px;
        height: 35px;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        background: none;
        color: #8E39CC;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #8C3DDB;
    }

    .trust-comments-box-topicon {
        position: absolute;
        top: -50px;
        z-index: 9;
        width: 150px;
        height: 150px;
    }

    .trust-comments-box-rightrect {
        position: absolute;
        right: -30px;
        border-radius: 8px;
        height: 150px;
        width: 40px;
        background-color: #20639B;
        z-index: 9;
    }

    .trust-comments-box-leftrect {
        position: absolute;
        left: -30px;
        border-radius: 8px;
        height: 150px;
        width: 40px;
        background-color: #20639B;
        z-index: 9;
    }

    .trust-comment-box {
        position: relative;
        width: 550px;
        height: 350px;
        border-radius: 25px;
        background-color: #173F5F;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        box-shadow: 0 3px 6px #00000029;
    }

    .trust-comments-content {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 20;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #173F5F;
        border-radius: 25px;
    }

    .trusts-comments-sender-avatar {
        width: 85px;
        height: 85px;
        border-radius: 50%;
    }

    .trusts-comments-sender-name {
        font-size: 18px;
        font-weight: bold;
        color: #00BFD6;
        margin: 10px;
    }

    .trusts-comments-sender-text {
        padding: 15px;
        color: #FFFFFF;
        text-align: center;
        line-height: 25px;
    }

    .modalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1013;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .consultant-modal {
        width: 100%;
        max-width: 400px;
        min-height: 450px;
        background-color: white;
        border-radius: 10px;
        z-index: 1014;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 20px
    }

    .intro-head {
        background-color: #FCFCFC;
        height: 45px;
        display: flex;
        align-items: center;
        border-radius: 10px 10px 0 0;
    }

    .intro-head i {
        color: #B3B3B3;
        font-size: 18px;
        margin-right: 10px;
        cursor: pointer;
    }

    .modal-warn {
        background-color: #FFFCF4;
        color: #8C6D1F;
        display: flex;
        align-items: flex-start;
        margin: 0 15px;
        padding: 15px;
        border-radius: 5px;
        font-size: 13px;
    }

    .modal-warn-icon {
        color: #CAA53D;
        margin-left: 10px;
    }

    .modal-warn p {
        margin-bottom: 0;
    }

    .modal--error {
        color: #891B1B;
        background-color: #FFECEC
    }

    .modal-icon--error {
        color: #891B1B;
    }

    .intro-content {
        margin: 15px;
        display: flex;
        flex-direction: column;
    }

    .intro-content-head {
        font-size: 14px;
        margin: 10px 0;
        color: #585858;
        font-weight: bold;
    }

    .intro-content-list {
        padding: 0;
        list-style: none;
    }

    .intro-content-item {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 13px;
        color: #707070;
    }

    .intro-content-item i {
        color: #00BFD6;
        font-size: 16px;
        margin-left: 5px;
    }

    .intro-action {
        margin: 15px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .intro-action-button {
        border-radius: 10px;
        padding: 10px 20px;
        border: none;
        font-size: 12px;
    }

    .intro-action-button--active {
        background-color: #8C3DDB;
        color: white;
    }

    .intro-action-button--passive {
        background-color: white;
        color: #707070;
    }

    .authFormWrapper-switcher {
        border-bottom: 3px solid #eee;
        min-height: 50px;
        margin: 0;
        display: flex;
        align-items: stretch;
    }

    .switcher {
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        color: #aaa;
        background: none;
        border: none;
    }

    .switcher--active {
        border-bottom: 3px solid #9038CC;
        color: #9038CC;
    }

    .loginForm-label {
        margin: 20px;
        display: flex;
        flex-direction: column;
    }

    .loginForm-label:not(:first-child) {
        margin-top: 0;
    }

    .loginForm-control {
        border-radius: 10px;
        padding: 10px;
        border: none;
        background-color: #F8F8F8;
        margin-top: 10px;
        color: #999;
    }

    .loginForm-meta {
        font-size: 12px;
        margin-top: 10px;
    }

    .loginForm-meta.error {
        color: #c9737c;
    }

    .icon-done {
        color: #00bfa5;
    }

    .icon-close {
        color: #963a38;
    }

    .package-section-services {
        min-height: auto;
    }

    .package-section-steps {
        min-height: auto;
        margin-bottom: 50px;
    }

    .package-section-smart {
        min-height: auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .package-section-about {
        min-height: auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .package-section-college {
        min-height: auto;
        margin: 50px 0;
    }

    .package-section-trust {
        min-height: auto;
        margin: 50px 0;
    }

    .step {
        margin: 20px 0;
    }

    @media only screen and (max-width: 991.8px) {
        .section-intro {
            background: white;
            min-height: auto;
        }

        .section-sub-intro {
            flex-direction: column;
        }

        .section-intro-title-box {
            width: 100%;
            margin-top: 20px;
        }

        .section-intro-title {
            text-align: center;
        }

        .section-intro-text {
            text-align: center;
        }

        .section-consultants-title {
            text-align: center;
        }

        .section-sub-consultants {
            flex-direction: column;
        }

        .section-consultants-info {
            width: 100%;
            margin-top: 30px;
        }


        .section-consultants-divider {
            margin: 20px auto;
        }

        .section-consultants-avatars {
            width: 100%;
        }

        .section-steps-title {
            text-align: center;
        }

        .section-steps-title-divider {
            margin: 5px auto;
        }

        .smart-info-suptitle {
            text-align: center;
        }

        .smart-info-title {
            text-align: center;
        }

        .smart-info-divider {
            margin: 20px auto;
        }

        .section-sub-smart {
            flex-direction: column;
        }

        .smart-image {
            width: 60%;
        }

        .smart-info {
            width: 100%;
        }

        .about-info {
            width: 100%;
        }

        .support-items {
            justify-content: center;
        }

        .faq-box {
            padding: 0;
        }
    }

    @media only screen and (max-width: 767.8px) {
        .buy-box {
            border: none;
        }

        .trust-comment-box {
            width: calc(100% - 150px);
        }

        .intro-title-dots {
            display: none;
        }

    }

    @media only screen and (max-width: 567.8px) {

        .section-intro-title {
            line-height: 46px;
        }

        .step-info {
            text-align: center;
        }

        .section-sub-consultants {
            flex-direction: column;
        }

        .section-consultants-info {
            width: 100%;
            margin-top: 30px;
        }

        .section-consultants-avatars {
            width: 100%;
        }

        .section-sub-smart {
            flex-direction: column;
            margin-top: 100px;
        }

        .smart-image {
            width: 100%;
            display: none;
        }

        .smart-info {
            width: 100%;
        }

        .about-info {
            width: 100%;
        }

        .smart-info-items {
            margin-top: 15px;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 0 5px;
        }

        .support-items {
            justify-content: center;
        }

        .faq-box {
            padding: 0;
        }

        .step {
            flex-wrap: wrap;
            justify-content: center;
            margin: 20px 0;
        }

        .section-consultants-avatars {
            display: none;
        }

        .faq-question {
            padding: 10px 0;
        }

        .section-sub-college {
            margin: 10px 0;
        }

        .buy-box {
            width: 100%;
            min-width: auto;
        }

        .compare-item {
            margin-right: 0;
            margin-left: 0;
        }

        .compare-title {
            margin-right: 0;
            margin-left: 0;
            flex-wrap: wrap;
            border-radius: 0;
        }

        .compare-title-item {
            font-size: 10px;
        }

        .compare-title-item-marked {
            font-size: 8px;
        }

        .section-sub-compare {
            padding-right: 0;
            padding-left: 0;
        }

        .trusts-comments-sender-text {
            font-size: 12px;
            line-height: 26px;
        }

        .trust-comments-box-rightrect {
            display: none;
        }

        .trust-comments-box-leftrect {
            display: none;
        }


        .trust-comment-box {
            width: 100%;
            order: -1;
            margin-bottom: 15px;
            border-radius: 0;
        }

        .trust-comments {
            flex-wrap: wrap;
            justify-content: center;
            border-radius: 0;
        }

        .trust-comments-action {
            margin: 0 5px;
        }

        .section-sub-trust {
            padding: 0;
        }

        .trust-title-text {
            text-align: center;
        }

        .trust-title-sub {
            text-align: center;
        }

    }
</style>