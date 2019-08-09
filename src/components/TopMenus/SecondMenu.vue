<template>
  <div
    class="container-fullwidth secondContainer customContainer navbar navbar-default" color-on-scroll=" ">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header navbar-right">
      <button type="button" class="navbar-toggle" data-toggle="collapse"
              data-target="#dropdownTogglerTarget">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="dropdownTogglerTarget">
      <ul class="nav navbar-nav navbar-right isansFont">

        <li class="text-right" v-for="item in this.topMenuListItems" v-bind:class="[{'dropdown':item.hasDropdown}]">
          <a href="#" v-if="item.hasDropdown && item.type == 'router'" class="dropdown-toggle" data-toggle="dropdown">
            <span>{{item.itemName}}</span>
            <b class="caret"></b>
          </a>

          <a :href="item.target" v-else-if="item.hasDropdown && item.type == 'hyper'" class="dropdown-toggle" target="_blank" data-toggle="dropdown">
            <span>{{item.itemName}}</span>
            <b class="caret"></b>
          </a>

          <router-link v-else-if="!item.hasDropdown && item.type == 'router'" :to="item.target">{{item.itemName}}</router-link>

          <a :href="item.target" v-else-if="!item.hasDropdown && item.type == 'hyper'" target="_blank">{{item.itemName}}</a>

          <ul v-if="item.hasDropdown" class="dropdown-menu customRadius">
            <li v-for="dropdownItem in item.dropdownItems" v-bind:class="[{'dropdown' : dropdownItem.hasDropdown}]">
              <router-link v-bind:to="dropdownItem.target" v-if="dropdownItem.type == 'router'">{{dropdownItem.itemName}}</router-link>
              <a v-bind:href="dropdownItem.target" v-else-if="dropdownItem.type == 'hyper'" target="_blank">{{dropdownItem.itemName}}</a>
            </li>
          </ul>
        </li>

      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-->

</template>

<script>
  export default {
    name: "SecondMenu",
    data: function () {
      return {
        topMenuListItems: [
          {itemName: 'صفحه اصلی', target: '/', type : 'router' , hasDropdown: false, dropdownItems: []},
          {itemName: 'مشاوران', target: '/consultants', type : 'router', hasDropDown: false, dropdownItems: []},
          {itemName: 'مشاوره اپلای' , target : '/consultant/apply', type : 'router', hasDropdown: false, dropdownItems: []},
          {itemName: 'مشاوره کسب و کار' , target : '/consultant/business', type : 'router', hasDropdown: false, dropdownItems: []},
          {itemName: 'بلاگ' , target: 'http://sneeds.ir/%d8%a8%d9%84%d8%a7%da%af/' , type : 'hyper' , hasDropdown: false, dropdownItems : []},
          {itemName: 'مصاحبه' , target: 'http://sneeds.ir/category/conversation/' , type : 'hyper' , hasDropdown: true, dropdownItems : [
              {itemName: 'مصاحبه اپلای' , target: 'http://sneeds.ir/category/conversation/%d9%85%d8%b5%d8%a7%d8%ad%d8%a8%d9%87-%d8%a7%d9%be%d9%84%d8%a7%db%8c/' , type : 'hyper' , hasDropdown: false, dropdownItems : []},
              {itemName: 'مصاحبه ویژه' , target: 'http://sneeds.ir/category/conversation/%d9%85%d8%b5%d8%a7%d8%ad%d8%a8%d9%87-%d9%88%db%8c%da%98%d9%87/' , type : 'hyper' , hasDropdown: false, dropdownItems : []},
              {itemName: 'لایو اینستاگرامی' , target: 'http://sneeds.ir/category/conversation/%d9%84%d8%a7%db%8c%d9%88-%d8%a7%db%8c%d9%86%d8%b3%d8%aa%d8%a7%da%af%d8%b1%d8%a7%d9%85%db%8c/' , type : 'hyper' , hasDropdown: false, dropdownItems : []},
            ]},
          {itemName: 'درباره ما', target: '/in-touch/aboutus', type : 'router' , hasDropdown: false, dropdownItems: []},
          {itemName: 'تماس با ما', target: '/in-touch/contact', type : 'router' , hasDropdown: false, dropdownItems: []},
        ]
      }
    }, methods: {},
    created() {
    },
    mounted() {
    },

  }
</script>

<style scoped>

  .customContainer {
    margin-bottom: 0;
    padding: 0;
  }

  .secondContainer {
    padding: 0 10px 0 0;
    border-radius: 0;
  }

  .dropdown-menu {
    min-width: 200px;
    margin-top: -1px !important;
  }

  .dropdown-menu li:hover > a {
    background-color: #00bcd4 !important;
  }
</style>
