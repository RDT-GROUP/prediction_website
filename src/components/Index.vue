<template>
<div class="container">
    <div id="IndexPage" class="row">
        <!-- <p>prediction website index page</p> -->
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>An integrative platform for biotransformation data query and prediction</p>
    </div>
    <div class="row"><SearchBar></SearchBar></div>
    <div class="row" id="setBlank"></div>
    <div class="row" id="siteDesc">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <p>
                Human and biota are chronically exposed to thousands of chemicals from numerous
                environmental sources through various pathways. Biotransformation plays a central
                role because it can directly alter the chemical structures of such compounds, thus
                modifying their lifetimes, bioavailabilities, and biological effects.  However,
                though growth, evolution, and accessibility of high-resolution mass spectrometry
                (HR-MS) has promoted advanced detection in biological and environmental samples,
                significantly less effort has been devoted to the characterization or understanding
                of xenobiotic biotransformation among multiple species (i.e., not only human). Moreover,
                the biotransformation of environmental pollutants including flame retardants,
                plasticizers, polycyclic aromatic hydrocarbons (PAHs), polychlorinated biphenyls
                (PCBs) and other industrial chemicals lack adequate scientific attention. To address
                these needs, we have developed an integrative platform named EcoBioTrans, including
                a web server, as well as a database repository that shall facilitate the curation
                and standardization of the experimental biotransformation information of multiple
                species. Users are allowed to query by compound name and simplified molecular input
                line entry specification (SMILES) for retrieving the database or submit compound
                structure for retrieving prediction results.
            </p>
        </div>
        <div class="col-md-1"></div>
    </div>
    <div class="row">
        <!-- <img id="bgimg" src="http://www.rxnfinder.org/static/toxindb/images/back_toxin.jpg"> -->
    </div>
</div>
</template>

<script type="text/javascript">
import SearchBar from './tools/SearchBar.vue'
export default {
    components: {
        SearchBar
    }
}
</script>

<style scoped>
#bgimg {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: -1;
}
#IndexPage {
    margin-top: 10px;
    color: black;
    font-size: 26px;
    font-weight: bold;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    font-family: Helvetica, Montserrat, Roboto;
    /* text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black; */
}
#setBlank {
    height: 7vh;
}
#siteDesc {
    /* height: 330px; */
    color: black;
    font-size: 15px;
    text-align: justify;
    /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
    font-family: Helvetica, Montserrat, Roboto;
    /* text-shadow: 1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black, -1px 1px 0 black; */
    /* border: #FFFFFF solid 1px; */
}
</style>
