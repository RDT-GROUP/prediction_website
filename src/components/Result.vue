<template>
    <div id="container" style="width: 100%;">
        <div class="row" id="display" style="width: 100%;"><p>&nbsp;</p></div>
        <div class="row" id="display" style="width: 100%;" v-if="urlType !== '' && urlQuery !== ''">
             <p>Search Method: {{ searchType }} &nbsp;|&nbsp; Query: {{ urlQuery }}</p>
        </div>
        <div class="row" id="display" style="width: 100%;" v-if="urlType !== '' && urlQuery !== '' && recordNum > 1">
            <p>We found {{ recordNum }} records that matched the search criteria.</p>
        </div>
        <div class="row" id="display" style="width: 100%;" v-if="urlType !== '' && urlQuery !== '' && recordNum === 1">
            <p>We found {{ recordNum }} record that matched the search criteria.</p>
        </div>
        <!-- <div class="row" id="display" style="width: 100%;"><p>&nbsp;</p></div> -->
        <!-- <div class="row" style="width: 100%;">
            <img :src="resImage" width="150px" height="150px">
            <p>{{ msg }}</p>
        </div> -->
        <div class="row" style="width: 100%;">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="showroom"
                     v-if="urlQuery === '' &&
                           !(urlType !== '1' && urlType !== '2' && urlType !== '3' && urlType !== '4')">
                    <h2>404 Page Not Found. <br/>
                        Error: Empty query, please type in a correct query.</h2>
                </div>
                <div class="showroom"
                     v-if="(urlType !== '1' && urlType !== '2' && urlType !== '3' && urlType !== '4') &&
                           urlQuery !== ''">
                    <h2>404 Page Not Found. <br/>
                        Error: Wrong request type, please select one item from the given list.</h2>
                </div>
                <div class="showroom"
                     v-if="(urlType !== '1' && urlType !== '2' && urlType !== '3' && urlType !== '4') &&
                           urlQuery === ''">
                    <h2>404 Page Not Found. <br/>
                        Error: Please select one item from the given list and type in a correct query.</h2>
                </div>
                <div class="showroom" v-if="jsonReturn === 'emptyJSON'">
                    <h2>Warning: Empty return value, no results can be shown.</h2>
                </div>
                <div class="showroom" v-if="jsonReturn === 'wrongQuery'">
                    <h2>Warning: Wrong query, we cannot find any result.</h2>
                </div>
                <div class="showroom"
                     v-if="recordNum !== 0 &&
                           urlQuery !== '' &&
                           urlType !== '3' &&
                           jsonReturn !== 'emptyJSON' &&
                           jsonReturn !== 'wrongQuery'">
                    <ve-table
                        id="loading-container"
                        :columns="columns"
                        :table-data="tableData"
                        :border-x="true"
                        :border-y="true"
                        :fixed-header="true"
                        :row-style-option="rowStyleOption"
                        :event-custom-option="eventCustomOption">
                    </ve-table>
                </div>
                <div class="showroom"
                     v-if="recordNum !== 0 &&
                           urlQuery !== '' &&
                           urlType === '3' &&
                           jsonReturn !== 'emptyJSON' &&
                           jsonReturn !== 'wrongQuery'">
                    <ve-table
                        id="loading-container"
                        :columns="columns"
                        :table-data="tableData"
                        :border-x="true"
                        :border-y="true"
                        :fixed-header="true"
                        :row-style-option="rowStyleOption">
                    </ve-table>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vetable from 'vue-easytable'
import ElementUI from 'element-ui'

Vue.use(VueAxios, axios)
Vue.use(Vetable)
Vue.use(ElementUI)
axios.defaults.headers.get['Content-Type'] = 'text/plain'

export default {
    name: 'Result',
    data() {
        return {
            rowStyleOption: {
                stripe: true
            },
            eventCustomOption: {
                bodyRowEvents: ({ row, rowIndex }) => {
                    return {
                        click: (event) => {
                            // console.log('click::', row, rowIndex, event)
                            this.$router.push({
                                // path: '/detail/?query=' +
                                //        encodeURIComponent(row.canonical_substrate_smiles) +
                                //        '&id=' + row.pubchem_cid
                                path: '/detail/?query=' +
                                       encodeURIComponent(row['SMILES']) +
                                       '&id=' + row['Pubchem CID']
                            })
                        }
                    }
                }
            },
            loadingInstance: null,
            urlQuery: '',
            urlType: '',
            jsonReturn: '',
            // resImage: '',
            jsonContent: '',
            result: '',
            msg: '',
            titleArray: [],
            dataArray: [],
            recordNum: 0,
            columns: [{
                field: '',
                key: '',
                title: '#',
                align: '',
                // fixed: 'left',
                renderBodyCell: ({ row, column, rowIndex }, h) => {
                    return ++rowIndex
                }
            }],
            tableData: [],
            searchTypeMap: [
                {k: '1', v: 'Structure'},
                {k: '2', v: 'Similarity'},
                {k: '3', v: 'Prediction'},
                {k: '4', v: 'Text'}
            ],
            searchType: ''
        }
    },
    created() {
        this.urlQuery = this.$route.query.query
        this.urlType = this.$route.query.type
        let i = 0
        for (i in this.searchTypeMap) {
            if (this.searchTypeMap[i].k === this.urlType) {
                this.searchType = this.searchTypeMap[i].v
            }
        }
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
            let query = this.$route.query.query
            let urlQuery = encodeURIComponent(query)
            let urlType = this.$route.query.type
            let url = urlBase + ':' + urlPort + '/result/?query=' +
                      urlQuery + '&type=' + urlType
            // this.resImage = urlBase + ':' + urlPort + '/' + 'media/' +
            //                     urlQuery + '.jpg'
            // if (urlType !== '1' && urlType !== '2' && urlType !== '3' && urlType !== '4') {
            //     this.msg = '404 Page Not Found. Invalid Request Type.'
            //     url = ''
            // }
            axios({
                method: 'get',
                url: url,
                withCredentials: true
            })
            .then((res) => {
                this.jsonContent = res.data
                this.resolveJSON(this.jsonContent)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        resolveJSON(json) {
            if (Object.keys(json).length === 0) {
                this.jsonReturn = 'emptyJSON'
            } else if (json === 'error') {
                this.jsonReturn = 'wrongQuery'
            } else {
                for (let i in json) {
                    this.titleArray = Object.keys(json[i])
                    this.dataArray[i] = Object.values(json[i])
                }
                let imgSrc = [{}]
                // console.log(this.dataArray)
                for (let i = 0; i < this.titleArray.length; i++) {
                    let colEle = {}
                    if (this.titleArray[i] !== 'Image') {
                        colEle = {
                            field: '',
                            key: '',
                            title: '',
                            align: ''
                            // fixed: ''
                        }
                    } else {
                        colEle = {
                            field: '',
                            key: '',
                            title: '',
                            align: '',
                            // fixed: '',
                            renderBodyCell: ({ row, column, rowIndex }, h) => {
                                return (
                                    <span>
                                        <img src={imgSrc[rowIndex]} width="150px" height="150px"></img>
                                    </span>
                                )
                            }
                        }
                    }
                    colEle.field = this.titleArray[i]
                    colEle.key = this.titleArray[i]
                    colEle.title = this.titleArray[i]
                    colEle.align = 'center'
                    this.columns.push(colEle)
                }
                if (this.urlType !== '3') {
                    let colEleTmp = {
                        field: '',
                        key: 'Detail',
                        title: 'Detail',
                        align: '',
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return <span style="color: blue; text-decoration: underline;">Click here to get Details</span>
                        }
                    }
                    this.columns.push(colEleTmp)
                }
                this.recordNum = this.dataArray.length
                for (let i = 0; i < this.dataArray.length; i++) {
                    let dataEle = {}
                    for (let j = 0; j < this.dataArray[i].length; j++) {
                        dataEle[this.columns[j + 1].title] = this.dataArray[i][j]
                    }
                    imgSrc[i] = dataEle['Image']
                    // console.log(dataEle)
                    this.tableData.push(dataEle)
                }
            }
            // for (let i in json) {
            //     this.titleArray = Object.keys(json[i])
            //     this.dataArray[i] = Object.values(json[i])
            // }
            // let imgSrc = [{}]
            // // console.log(this.dataArray)
            // for (let i = 0; i < this.titleArray.length; i++) {
            //     let colEle = {}
            //     if (this.titleArray[i] !== 'image') {
            //         colEle = {
            //             field: '',
            //             key: '',
            //             title: '',
            //             align: ''
            //             // fixed: ''
            //         }
            //     } else {
            //         colEle = {
            //             field: '',
            //             key: '',
            //             title: '',
            //             align: '',
            //             // fixed: '',
            //             renderBodyCell: ({ row, column, rowIndex }, h) => {
            //                 return (
            //                     <span>
            //                         <img src={imgSrc[rowIndex]} width="150px" height="150px"></img>
            //                     </span>
            //                 )
            //             }
            //         }
            //     }
            //     colEle.field = this.titleArray[i]
            //     colEle.key = this.titleArray[i]
            //     colEle.title = this.titleArray[i]
            //     colEle.align = 'center'
            //     this.columns.push(colEle)
            // }
            // this.recordNum = this.dataArray.length
            // for (let i = 0; i < this.dataArray.length; i++) {
            //     let dataEle = {}
            //     for (let j = 0; j < this.dataArray[i].length; j++) {
            //         dataEle[this.columns[j + 1].title] = this.dataArray[i][j]
            //     }
            //     imgSrc[i] = dataEle['image']
            //     // console.log(dataEle)
            //     this.tableData.push(dataEle)
            // }
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
