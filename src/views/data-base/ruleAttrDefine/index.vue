// 规则属性定义
<template>
    <div class="app-container">
        <div class="tab_container">
            <el-tabs v-model="activeContent"
                     type="border-card">
                <el-tab-pane :label="$t('ruleAttrDefine.content1')"
                             name="content1">
                    <contentBatch></contentBatch>
                </el-tab-pane>
                <el-tab-pane :label="$t('ruleAttrDefine.content2')"
                             name="content2">
                    <contentBar></contentBar>
                </el-tab-pane>
                <el-tab-pane :label="$t('ruleAttrDefine.content3')"
                             name="content3">
                    <contentReferData></contentReferData>
                </el-tab-pane>
                <el-tab-pane :label="$t('ruleAttrDefine.content4')"
                             name="content4">
                    <contentPurchaseCatalog></contentPurchaseCatalog>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import contentBar from "./content/contentBar.vue";
import contentBatch from "./content/contentBatch.vue";
import contentReferData from "./content/contentReferData.vue";
import contentPurchaseCatalog from "./content/contentPurchaseCatalog.vue";

export default {
    name: "ruleAttrDefine",
    components: { contentBar, contentBatch, contentReferData, contentPurchaseCatalog },
    data () {
        return {
            activeContent: 'content1'
        };
    },
    methods: {

    }
};
</script>



