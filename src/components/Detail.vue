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
                <img :src="resImage" width="200px" height="200px" style="float: left;">
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10" style="text-align: left"><p>General Information:</p></div>
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
            <div class="col-md-10" style="text-align: left"><p>Biotransformation Information:</p></div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="showroom2">
                    <ve-table   id="loading-container"
                                :columns="columns2"
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
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10" style="text-align: left"><p>Biotransformation Pathway:</p></div>
            <div class="col-md-1"></div>
        </div>
        <div class="row" id="display" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <img :src="resImage2" style="float: left;">
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
            loadingInstance: null,
            jsonContent: '',
            resData: '',
            resImage: '',
            resImage2: '',
            urlBase: '',
            urlPort: '',
            reqId: '',
            reqQuery: '',
            keyArray: [],
            valueArray: [],
            columns: [],
            tableData: [],
            columns2: [{
                field: '#',
                key: '#',
                title: '#',
                align: '',
                fixed: 'left',
                renderBodyCell: ({ row, column, rowIndex }, h) => {
                    return ++rowIndex
                }
            }],
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
        this.loadingInstance = this.$veLoading({
            target: document.querySelector('#loading-container'),
            name: 'wave',
            tip: 'Your results will be available when the calculation is done, please wait...',
            color: '#94AA81'
        })
        this.loadingInstance.show()
    },
    updated() {
        this.loadingInstance.close()
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
                // console.log(this.jsonContent)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        resolveJSON(json) {
            this.keyArray = Object.keys(json)
            this.valueArray = Object.values(json)
            this.resImage = this.urlBase + ':' + this.urlPort + '/' + 'media/' +
                                this.valueArray[3] + '.jpg'
            this.resImage2 = this.urlBase + ':' + this.urlPort + '/' + 'media/' +
                                this.reqId + '.dot.png'
            this.columns = [{
                field: 'Attr',
                key: 'Attr',
                title: this.keyArray[0],
                align: 'left'
            }, {
                field: 'Data',
                key: 'Data',
                title: this.valueArray[0],
                align: 'left'
            }]
            var dataItem = {}
            /* The first element is set as the initial value of the header
               of the table. */
            /* Last element is 'ext' which contains a sub-json object.
               Resolve this element in another table */
            /* Element before the last element is 'image' which contains
               back-end port. It shouldn't be displayed. */
            for (let i = 1; i < this.keyArray.length - 2; i++) {
                dataItem = {}
                dataItem[this.columns[0].field] = this.keyArray[i]
                dataItem[this.columns[1].field] = this.valueArray[i]
                this.tableData.push(dataItem)
            }

            /* Resolve ext datas */
            // var extDatas = {}
            // extDatas[this.columns[0].field] = this.keyArray[this.keyArray.length - 1]
            // extDatas[this.columns[1].field] = this.valueArray[this.keyArray.length - 1]
            // this.keyArray = Object.keys(extDatas['Data'][0])
            // this.valueArray = []
            // console.log(extDatas)
            // for (let i = 0; i < extDatas['Data'].length; i++) {
            //     this.valueArray.push(Object.values(extDatas['Data'][i]))
            // }
            // for (let i = 0; i < this.valueArray.length + 1; i++) {
            //     let colEle2 = {
            //         field: '',
            //         key: '',
            //         title: '',
            //         align: '',
            //         fixed: ''
            //     }
            //     if (i === 0) {
            //         colEle2.field = 'Attr'
            //         colEle2.key = 'Attr'
            //         colEle2.title = 'Attributes'
            //         colEle2.align = 'left'
            //         colEle2.fixed = 'left'
            //     } else {
            //         colEle2.field = 'Data ' + i
            //         colEle2.key = 'Data ' + i
            //         colEle2.title = 'Data ' + i
            //         colEle2.align = 'left'
            //     }
            //     this.columns2.push(colEle2)
            // }
            /* The last element is 'image' which contains back-end port.
               It shouldn't be displayed. */
            // for (let i = 0; i < this.keyArray.length - 1; i++) {
            //     dataItem = {}
            //     for (let j = 0; j < this.valueArray.length + 1; j++) {
            //         if (j === 0) {
            //             dataItem[this.columns2[j].field] = this.keyArray[i]
            //         } else {
            //             dataItem[this.columns2[j].field] = this.valueArray[j - 1][i]
            //         }
            //     }
            //     // console.log(dataItem)
            //     this.tableData2.push(dataItem)
            // } //竖表

            /* Resolve ext datas */
            var extDatas = this.valueArray[this.valueArray.length - 1]
            let extKeyArray = {}
            let extValueArray = [{}]
            for (let i in extDatas) {
                extKeyArray = Object.keys(extDatas[i])
                extValueArray[i] = Object.values(extDatas[i])
            }
            let imgSrc = [{}]
            for (let i = 0; i < extKeyArray.length; i++) {
                let colEle = {}
                if (extKeyArray[i] !== 'Image') {
                    if (i <= 1) {
                        colEle = {
                            field: '',
                            key: '',
                            title: '',
                            align: 'center',
                            fixed: 'left'
                        }
                    } else if (i === 8) {
                        colEle = {
                            field: '',
                            key: '',
                            title: '',
                            align: 'center',
                            sortBy: ''
                        }
                    } else {
                        colEle = {
                            field: '',
                            key: '',
                            title: '',
                            align: 'center'
                        }
                    }
                } else {
                    colEle = {
                        field: '',
                        key: '',
                        title: '',
                        align: 'center',
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <span>
                                    <img src={imgSrc[rowIndex]} width="150px" height="150px"></img>
                                </span>
                            )
                        }
                    }
                }
                // console.log(extKeyArray[8])
                colEle.field = extKeyArray[i]
                colEle.key = extKeyArray[i]
                colEle.title = extKeyArray[i]
                this.columns2.push(colEle)
            }
            for (let i = 0; i < extValueArray.length; i++) {
                // console.log(this.columns2[0].title)
                let dataEle = {}
                for (let j = 0; j < extValueArray[i].length; j++) {
                    dataEle[this.columns2[j + 1].title] = extValueArray[i][j]
                }
                imgSrc[i] = dataEle['Image']
                this.tableData2.push(dataEle)
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
