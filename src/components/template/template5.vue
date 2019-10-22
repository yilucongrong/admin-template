//tab+上下  左右表
<template>
    <div class="tab_container">
        <el-tabs v-model="activeContent"
                 type="border-card">
            <el-tab-pane label="登记"
                         name="content1">
                <contentRegister @changeSelect="changeSelect"
                                 ref="cregister"></contentRegister>
            </el-tab-pane>
            <el-tab-pane label="凭证"
                         name="content2">
                <contentProof ref="cproof"></contentProof>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import contentProof from "./content5/contentProof.vue";
import contentRegister from "./content5/contentRegister.vue";


export default {
    name: "t5",
    components: { contentProof, contentRegister },
    data () {
        return {
            activeContent: 'content1'
        };
    },
    methods: {
        changeSelect (val) {
            this.$emit('changeSelect', val)
        }
    }
};
</script>