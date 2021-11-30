<template>
  <div class="container" style="width: 100%;">
    <div class="row">
      <div class="col-md-12" style="width: 100%; padding-left: 0; padding-right: 0;">
        <div id="navbar" ref="navbar">
          <div class="row" style="width: 100%">
            <div class="col-md-2">
              <!-- <img src="./assets/ecobiotrans_logo.png" alt="EcoBioTransLogo" height="75px"> -->
            </div>
            <div class="col-md-8" id="logo">
              <div class="col-xs-1">
                <img src="./assets/ecobiotrans_logo_bolder.png" alt="EcoBioTransLogo" height="75px">
              </div>
              <div class="col-xs-11" style="height:75px; line-height: 75px;">
                <h1 style="margin: 0 auto; line-height: 75px;">
                <a href="/" id="titleLink">
                  <span>EcoBioTrans</span>
                </a>
              </h1>
              </div>
            </div>
            <div class="col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-12" style="width: 100%;"> -->
        <div class="col-md-12" :style="contentStyleObj" id="pageBody">
        <div id="app">
          <router-view/>
        </div>
      </div>
    </div>
    <!-- <div class="row" style="position: relative; bottom: -10vh;"> -->
    <div class="row" style="position: relative;" ref="footer">
      <div class="col-md-12" id="footer">
        <div class="container">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <p>&nbsp;</p>
            <p style="text-align: right; font-size: 18px;">
              School of Civil and Environmental Engineering
            </p>
            <p style="text-align: right; font-size: 18px;">
              Nanyang Technological University
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p style="text-align: center">
              Copyright © 2021 Nanyang Technology Univ. All rights reserved.
            </p>
            <p>&nbsp;</p>
        </div>
        <div class="col-md-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      pageHeight: '',
      navbarHeight: '',
      footerHeight: '',
      contentStyleObj: {
        minHeight: ''
      }
    }
  },
  created() {
    // this.setPageHeight()
  },
  mounted() {
    this.$nextTick(() => {
      this.navbarHeight = window.getComputedStyle(this.$refs.navbar).height
      this.footerHeight = window.getComputedStyle(this.$refs.footer).height
      let heightpx = this.navbarHeight.split('p')
      this.navbarHeight = heightpx[0]
      heightpx = this.footerHeight.split('p')
      this.footerHeight = heightpx[0]
      this.setPageHeight()
    })
  },
  methods: {
    setPageHeight() {
      this.pageHeight = window.innerHeight
      this.contentStyleObj.minHeight = this.pageHeight - parseInt(this.navbarHeight) - parseInt(this.footerHeight) + 'px'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navbar {
  /* background: url("http://www.rxnfinder.org/static/frcd/images/2.jpg") no-repeat left; */
  /* background-size: cover; */
  /* display: block; */
  background: #94AA81;
  width: 100%;
  height: 75px;
}
/* #pageBody {
  background: url("http://www.rxnfinder.org/static/toxindb/images/back_toxin.jpg") no-repeat left;
  background-size: 100%;
  position: cover;
} */
#footer {
  background: #94AA81;
  width: 100%;
  /* height: 350px; */
  /* margin-top: 25px; */
  /* position: absolute;
  bottom: -100vh; */
  color: white;
  font-size: 15px;
  text-align: justify;
  font-family: Helvetica, Montserrat, Roboto;
  /* border: #FFFFFF solid 1px; */
}
#logo {
  /* margin: 0 0 0 0; */
  margin: 0 auto;
  padding: 0 0 0 0;
  height: 75px;
  line-height: 75px;
  vertical-align: middle;
}
#titleLink:link {
  color: white;
  text-decoration: none;
  font-size: 50px;
  font-weight: bold;
}
#titleLink:visited {
  color: white;
  text-decoration: none;
  font-size: 50px;
  font-weight: bold;
}
#titleLink:hover {
  color: white;
  text-decoration: none;
  font-size: 50px;
  font-weight: bold;
}
#titleLink:active {
  color: white;
  text-decoration: none;
  font-size: 50px;
  font-weight: bold;
}
</style>
