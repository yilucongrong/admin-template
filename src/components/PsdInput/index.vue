<template>
    <div>
        <span class="svg-container"
              v-if="showLock">
            <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType"
                  v-model="psdValue"
                  @input="e => this.updateVal(this.psdValue)"
                  :placeholder="placeholderContent"
                  :name="namebind"
                  auto-complete="on"
                  @keyup.enter.native="handleAction" />
        <span class="show-pwd"
              @click="showPwd">
            <svg-icon icon-class="eye" />
        </span>
    </div>
</template>

<script>

export default {
    name: 'PsdInput',
    data () {
        return {
            passwordType: 'password',
            psdValue: '',
        }
    },
    props: {
        updateVal: {
            required: true,
            type: Function
        },
        placeholderContent: {
            required: true,
            type: String
        },
        namebind: {
            required: true,
            type: String
        },
        keyAction: {
            required: false,
            type: String
        },
        showLock: {
            required: false,
            type: Boolean
        }
    },
    methods: {
        showPwd () {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
        },
        handleAction () {
            this.$emit('keyAction');
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
        &::first-line {
            color: $light_gray;
        }
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .set-language {
            color: #fff;
            position: absolute;
            top: 5px;
            right: 0px;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }
}
</style>