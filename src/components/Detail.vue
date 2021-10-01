<template>
    <div class="container" style="width: 100%;">
        <!-- <div class="row" id="display" style="width: 100%;"><p>prediction website detial page</p></div> -->
        <div class="row" id="display" style="width: 100%;"><p>&nbsp;</p></div>
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10" style="text-align: left"><p>2D Structure:</p></div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <img :src="resImage" width="150px" height="150px" style="float: left;">
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10" style="text-align: left"><p>Physiochemical Properties:</p></div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="showroom">
                    <ve-table   :columns="columns"
                                :table-data="tableData"
                                :border-x="true"
                                :border-y="true"
                                :fixed-header="true"
                                :max-height="750"
                                :row-style-option="rowStyleOption"
                                >
                    </ve-table>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-2" style="text-align: left"><p>Biotransformation:</p></div>
            <div class="col-md-9"></div>
        </div>
        <div class="row" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="showroom2">
                    <ve-table   :columns="columns2"
                                :table-data="tableData2"
                                :border-x="true"
                                :border-y="true"
                                :fixed-header="true"
                                :row-style-option="rowStyleOption"
                                >
                    </ve-table>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-md-12"><p>&nbsp;</p></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vetable from 'vue-easytable'

Vue.use(VueAxios, axios)
Vue.use(Vetable)
axios.defaults.headers.get['Content-Type'] = 'text/plain'

export default {
    name: 'Result',
    data() {
        return {
            rowStyleOption: {
                stripe: true
            },
            jsonContent: '',
            resData: '',
            resImage: '',
            urlBase: '',
            urlPort: '',
            reqId: '',
            reqQuery: '',
            keyArray: [],
            valueArray: [],
            columns: [],
            tableData: [],
            columns2: [],
            tableData2: []
        }
    },
    created() {
        this.reqId = this.$route.query.id
        this.reqQuery = this.$route.query.query
        this.resImage = 'http://1.117.57.232:8080/media/' + this.reqQuery + '.jpg'
        // this.resImage = 'http://1.117.57.232:8080/media/' + this.SMILES + '.jpg'
    },
    mounted() {
        this.getJSON()
    },
    methods: {
        getJSON() {
            let urlBase = 'http://1.117.57.232'
            let urlPort = '8080'
            let reqId = this.$route.query.id
            let reqUrl = urlBase + ':' + urlPort + '/detail/?id=' + reqId
            this.resData = reqUrl
            this.urlBase = urlBase
            this.urlPort = urlPort
            axios({
                method: 'get',
                url: reqUrl,
                withCredentials: true
            })
            .then((res) => {
                this.jsonContent = res.data
                this.resolveJSON(this.jsonContent)
                console.log(this.jsonContent)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        resolveJSON(json) {
            this.columns = [{
                field: 'Attr',
                key: 'Attr',
                title: 'Attr',
                align: 'left'
            }, {
                field: 'Data',
                key: 'Data',
                title: 'Data',
                align: 'left'
            }]
            this.keyArray = Object.keys(json)
            this.valueArray = Object.values(json)
            // this.resImage = this.urlBase + ':' + this.urlPort + '/' + 'media/' +
            //                     this.valueArray[0] + '.jpg'
            console.log('json: ' + json)
            this.resImage = this.valueArray[0]
            var dataItem = {}
            /* Last element is 'ext' which contains a sub-json object.
               Resolve this element in another table */
            for (let i = 0; i < this.keyArray.length - 1; i++) {
                dataItem = {}
                dataItem[this.columns[0].title] = this.keyArray[i]
                dataItem[this.columns[1].title] = this.valueArray[i]
                this.tableData.push(dataItem)
            }

            /* Resolve ext datas */
            var extDatas = {}
            extDatas[this.columns[0].title] = this.keyArray[this.keyArray.length - 1]
            extDatas[this.columns[1].title] = this.valueArray[this.keyArray.length - 1]
            this.keyArray = Object.keys(extDatas['Data'][0])
            this.valueArray = []
            for (let i = 0; i < extDatas['Data'].length; i++) {
                this.valueArray.push(Object.values(extDatas['Data'][i]))
            }
            for (let i = 0; i < this.valueArray.length + 1; i++) {
                let colEle2 = {
                    field: '',
                    key: '',
                    title: '',
                    align: '',
                    fixed: ''
                }
                if (i === 0) {
                    colEle2.field = 'Attr'
                    colEle2.key = 'Attr'
                    colEle2.title = 'Attr'
                    colEle2.align = 'left'
                    colEle2.fixed = 'left'
                } else {
                    colEle2.field = 'Data_' + i
                    colEle2.key = 'Data_' + i
                    colEle2.title = 'Data_' + i
                    colEle2.align = 'left'
                }
                this.columns2.push(colEle2)
            }
            for (let i = 0; i < this.keyArray.length; i++) {
                dataItem = {}
                for (let j = 0; j < this.valueArray.length + 1; j++) {
                    if (j === 0) {
                        dataItem[this.columns2[j].title] = this.keyArray[i]
                    } else {
                        dataItem[this.columns2[j].title] = this.valueArray[j - 1][i]
                    }
                }
                this.tableData2.push(dataItem)
            }
        }
    }
}

</script>

<style scoped>
#display {
    margin-top: 10px;
    color: black;
    font-size: 26px;
    font-family: Helvetica, Montserrat, Roboto;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black; */
}
</style>
