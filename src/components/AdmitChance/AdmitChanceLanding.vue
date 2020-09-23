<template>
  <main>
    <section class="admit-chance-section intro-section">
      <div class="intro-container">
        <div class="intro-img-div">
          <div class="admit-intro-info">
                            <span class="intro-info-small-title">
                                <div class="intro-info-title-line"></div>
                                AI powered</span>
            <h2 class="intro-info-title">Study Abroad Meter</h2>
            <p class="intro-info-text">
              Get Exclusive Insights On Your Admission And
              Scholarship Chances Before Applying To Your
              Dream Universities.
            </p>
            <div class="intro-info-links">
              <a href="#" class="link-start">
                Start here
                <span class="link-start-free">Free</span>
              </a>
            </div>
          </div>
          <img class="intro-img" src="/sneedsAssets/img/Hero.png">

        </div>

      </div>

    </section>

    <section class="admit-chance-section participants">
      <div class="participants-container">
        <p class="participants-count">
          1,254
        </p>
        <div class="count-line"></div>
        <p class="participants-sub">
          participants
        </p>
        <a href="#" class="participants-link-start">
          Start now
          <span class="participants-link-start-free">Free</span>
        </a>

      </div>
    </section>
    <section class="admit-chance-section admit-chance-demo">
      <div class="admit-chance-demo-div">
        <img class="admit-chance-image" src="/sneedsAssets/img/image 72.png" alt="">
        <button class="demo-button">
          <i  class="material-icons fullscreen-icon">fullscreen</i>
          Preview Results Demo
        </button>
      </div>
    </section>

    <landing-features></landing-features>

<section class="admit-chance-section smart-analysis">
    <div class="smart-analysis-img-div" >
      <div class="smart-analysis-container">
        <img  class="smart-analysis-img" src="/sneedsAssets/img/mob.png">
        <div class="smart-analysis-info">
                          <span class="smart-analysis-info-small-title">
                                <div class="smart-analysis-info-title-line"></div>
                                Smart Analysis</span>
          <h4 class="smart-analysis-info-title">Know Your Strengths and Weaknesses</h4>
          <p class="smart-analysis-info-text">
            We analyzed +12000 rejected and accepted student cases around the world.
            and we'll show you what are the best practices that need to be done to
            fulfill your dream of studying abroad.
          </p>
          <div class="smart-analysis-info-links">
            <a href="#" class="smart-analysis-link-start">
              Start your journey
              <i  class="material-icons">keyboard_arrow_right</i>
            </a>
          </div>
        </div>
      </div>
    </div>
</section>
    <all-in-one></all-in-one>
    <reminder></reminder>
    <FAQ></FAQ>
  </main>
</template>

<script>
import AdmitChanceAllinOne from "./AdmitChanceAllinOne";
import LandingReminder from "./LandingReminder";
import FAQ from "../HomePage/FAQ";
import LandingFeatures from "@/components/AdmitChance/LandingFeatures";

export default {
  name: "AdmitChanceLanding",
  components: {
    FAQ,
    LandingFeatures : LandingFeatures,
    allInOne : AdmitChanceAllinOne,
    reminder : LandingReminder,
  }
}
</script>

<style scoped>
.admit-chance-section {
  margin-bottom: 100px;
}

.admit-intro-info {
  width: 50%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 10%;
  font-size: 14px;
}



.intro-info-small-title {
  margin-bottom: 0px;
  margin-top: 10px;
  color: #8C3DDB;
}

.intro-info-title {

  color: #303143;
  font-weight: bold;

}

.intro-info-title-line{
  display: inline-block;
  width: 20px;
  height: 3px;
  vertical-align: middle;
  background-color: #8C3DDB;
  right: -125px;
  border-radius: 2px;

}

.intro-info-text {
  padding: 5% 0px;
  font-size: 12px;
}

.link-start {
  color: white;
  min-width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #A347FF 0% 0% no-repeat padding-box;
  border-radius: 20px;
  font-size: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
}

.link-start-free {
  background-color: #36006D;
  border-radius: 15px;
  padding: 5px 10px;
  margin-left: 10px;
}


.intro-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
}
.intro-img-div {
  width: 100%;
  background-color: #F5F7FA;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0% 100%);
  display: flex;
  flex-direction: row;
}
.intro-img {
  width: 50%;
  height: auto;
  padding: 3%;;

}
.participants-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5%;
}
.participants-count {
  font-weight: bold;
  line-height: inherit;
  font-size: 64px;
}
.participants-link-start {
  color: white;
  min-width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #008DB8 0% 0% no-repeat padding-box;
  border-radius: 10px;
  font-size: 10px;
  padding: 10px 15px;
  margin-top: 20px;
}

.participants-link-start-free {
  background-color: white;
  color: #008DB8;
  border-radius: 15px;
  padding: 5px 10px;
  margin-left: 5px;
}
.count-line {
  display: inline-block;
  margin: 5px 0px;
  width: 200px;
  height: 3px;
  vertical-align: middle;
  background-color: #173F5F;
  right: -125px;
  border-radius: 2px;
}
.admit-chance-demo-div {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
}
.fullscreen-icon {
  font-size: 28px;
  padding: 0 10px;
}
.demo-button {
  color: #008DB8;
  background-color: white;
  box-shadow: 0px 13px 26px #00000029;
  border-radius: 40px;
  font-size: 14px;
  border: white;
  align-self: flex-start;
  margin-left: 20%;
  margin-top: -5%;
}
button:hover {
  background-color: #ecf4ff;
}
.admit-chance-image {
  width: 65%;
  border-radius: 30px;

}

.smart-analysis-img-div {
  width: 100%;
  min-height: 500px;
  background-color: #F5F7FA;
  display: flex;
  flex-direction: row;
  clip-path: polygon(0 12%, 100% 0, 100% 88%, 0% 100%);
  display: flex;
  overflow: hidden;
  flex-direction: row;
}

.smart-analysis-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: -10%;
}

.smart-analysis-info {
  width: 40%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top:20px;
  padding-right: 5%;
  padding-left: 5%;
  font-size: 14px;
}
.smart-analysis-info-small-title {
  margin-bottom: 0px;
  margin-top: 10px;
  color: #374957;
}
.smart-analysis-info-title-line {
  display: inline-block;
  width: 20px;
  height: 3px;
  vertical-align: middle;
  background-color: #00D4ED;
  right: -125px;
  border-radius: 2px
}
.smart-analysis-info-title {

  color: #303143;
  font-weight: bold;
}
.smart-analysis-info-text {
  padding: 5% 0px;
  font-size: 14px;
}
.smart-analysis-link-start {
  color: #008DB8;
  min-width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bolder;
  margin-bottom: 10px;
  padding: 10px 0px;
}
.smart-analysis-img {
  width: 40%;
  height: auto;
  margin-bottom: -10%;
}
@media only screen and (max-width: 767.8px) {
  .smart-analysis-container {
    flex-direction: column-reverse;
  }
  .smart-analysis-info {
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 100px;
  }
  .smart-analysis-img {
    width: 85%;
    margin-bottom: -10%;
  }
  .intro-img-div {
    flex-direction: column;
  }
  .intro-img {
    width: 100%;
    margin-bottom: 50px;
  }
  .admit-intro-info {
    width: 100%;
  }
  .admit-chance-image {
    width: 95%;
  }
  .demo-button {
    margin-left: 10%;
    margin-top: -10%;
  }
}
</style>