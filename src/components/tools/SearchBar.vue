<template>
    <div class="container">
        <div id="SearchBar">
            <form :action="resultURL" method="get" id="form" class="form">
                <div class="row">
                    <div class="col-md-1"><!--p>{{ plch }}</p--></div>
                    <div class="col-md-10">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <select v-model="selected" @change="onChange()" class="btn btn-default dropdown-toggle" id="selectList">
                                    <option v-for="option in options" :key="option.k" :value="option.v" :label="option.v" style="text-align: left;"></option>
                                </select>
                            </div>
                            <input class="form-control" id="iptBar" type="text" :placeholder="plch" v-model="searchContent" name="query">
                            <span class="input-group-btn">
                                <button class="btn btn-default" id="searchBtn" v-on:click="onClick()"  name="type" :value="selectedValue">Search</button>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                </div>
                <!-- <div class="row" id="methodDesc">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <p>Please select a search method.</p>
                    </div>
                    <div class="col-md-3"></div>
                </div> -->
                <!-- <div class="row" id="methodDesc">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <p>Supported search methods:</p>
                    </div>
                    <div class="col-md-3"></div>
                </div> -->
                <!-- <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <span>
                            <button class="btn btn-default" id="searchBtn" v-on:click="onClick()" name="type" value="1">Structure</button>
                            <button class="btn btn-default" id="searchBtn" v-on:click="onClick()" name="type" value="2">Similarity</button>
                            <button class="btn btn-default" id="searchBtn" v-on:click="onClick()" name="type" value="3">Prediction</button>
                            <button class="btn btn-default" id="searchBtn" v-on:click="onClick()" name="type" value="4">Name</button>
                        </span>
                    </div>
                    <div class="col-md-3"></div>
                </div> -->
                <div class="row" id="queryDisplay">
                    <!-- <p>Searching: {{ searchContent }}</p> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)
axios.defaults.headers.get['Content-Type'] = 'text/plain'

export default {
    name: 'SearchBar',
    data() {
        return {
            searchContent: '',
            resultURL: '',
            jsonContent: '',
            options: [
                {k: 1, v: 'Structure', plch: 'Enter SMILES'},
                {k: 2, v: 'Similarity', plch: 'Enter SMILES'},
                {k: 3, v: 'Prediction', plch: 'Enter SMILES'},
                {k: 4, v: 'Text', plch: 'Enter SMILES/CAS-No./Pubchem ID'}
            ],
            selected: '',
            selectedValue: '',
            plch: ''
        }
    },
    mounted() {
        this.selected = this.options[0].v
        this.plch = this.options[0].plch
    },
    methods: {
        onClick() {
            let urlBase = 'http://1.117.57.232'
            let urlFunc = 'result'
            let query = this.searchContent
            let urlQuery = encodeURIComponent(query)
            let selectedValue = this.selected
            // let btnValue = e.currentTarget.getAttributeNode('value').value
            // let queryType = btnValue
            // let queryType = 1
            let i = 0
            for (i in this.options) {
                if (this.options[i].v === selectedValue) {
                    // queryType = this.options[i].k
                    this.selectedValue = this.options[i].k
                }
            }
            // this.selectedValue = queryType
            // let url = urlBase + '/' + urlFunc + '/?query=' + urlQuery + '&type=' + queryType
            let url = urlBase + '/' + urlFunc + '/?query=' + urlQuery + '&type=' + this.selectedValue
            this.resultURL = url
        },
        onChange() {
            let i = 0
            for (i in this.options) {
                if (this.options[i].v === this.selected) {
                    // queryType = this.options[i].k
                    this.plch = this.options[i].plch
                }
            }
        }
    }
}
</script>

<style scoped>
#iptBar {
    width: 100%;
    text-align: center;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    font-family: Helvetica, Montserrat, Roboto;
    /* border: none; */
    box-shadow: none;
    border-color: #4a593c;
}
/* #searchBtn {
    width: 20%;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 10px;
} */
#searchBtn {
    background-color: #4a593c;
    color: white;
    /* border: 1px #4a593c; */
    border-color: #4a593c;
    font-size: 18px;
    padding-top: 4px;
    padding-bottom: 3px;
}
#selectList {
    border-color: #4a593c;
    border-width: 2px;
}
#queryDisplay {
    margin-top: 10px;
    color: black;
    font-size: 26px;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    font-family: Helvetica, Montserrat, Roboto;
    /* text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black; */
}
#methodDesc {
    margin-top: 15px;
    text-align: center;
    color: black;
    font-size: 20px;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    font-family: Helvetica, Montserrat, Roboto;
    /* text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black; */
}
</style>
