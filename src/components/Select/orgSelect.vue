<template>
    <el-select size="small"
               clearable
               v-model="itemKey"
               @change="changeSelect"
               :disabled="disabled"
               :placeholder="placeholder">
        <el-option v-for="item in options"
                   :key="item.organizationCode"
                   :label="item.organizationName"
                   :value="item.organizationCode">
        </el-option>
    </el-select>
</template>
<script>
import { selectlists as listOrg } from "@/api/system/organization";
export default {
    name: "org-select",
    props: {
        orgType: {
            type: String
        },
        businessFunction: {
            type: String
        },
        organizationCode: {
            required: true,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "请选择"
        }
    },
    model: {
        prop: "organizationCode",
        event: "change"
    },
    data() {
        return {
            options: [],
            itemKey: this.organizationCode
        };
    },
    watch: {
        organizationCode() {
            this.itemKey = this.organizationCode;
        }
    },
    created() {
        this.getOptions();
    },
    methods: {
        getOptions() {
            const listQuery = {
                type: this.orgType,
                businessFunction: this.businessFunction,
                state: 1
            };
            listOrg(listQuery).then(res => {
                this.options = res.data;
                console.log(this.options, "9090");
                this.$emit("org", this.options);
            });
        },
        changeSelect(val) {
            this.$emit("change", val);
            let name = "";
            let org = this.options
                .filter(v => v.organizationCode == val)
                .find((value, index, arr) => value);
            if (org) {
                name = org.organizationName;
            }

            this.$emit("selectName", name);
        }
    }
};
</script>
