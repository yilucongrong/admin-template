<template>
    <div :class="classObj" class="app-wrapper">
        <div @click="handleClickOutside" class="drawer-bg" v-if="device==='mobile'&&sidebar.opened" />
        <sidebar class="sidebar-container" v-if="showSidebar" />
        <div :class="{hasTagsView:needTagsView}" class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <navbar @clickSettings="clickSettings" v-if="showBraed" />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
            <right-panel ref="rpanel" v-if="showSettings">
                <settings />
            </right-panel>
        </div>
    </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        RightPanel,
        Settings,
        Sidebar,
        TagsView
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
            device: state => state.app.device,
            showSettings: state => state.settings.showSettings,
            showSidebar: state => state.settings.showSidebar,
            showBraed: state => state.settings.showBraed,
            needTagsView: state => state.settings.tagsView,
            fixedHeader: state => state.settings.fixedHeader
        }),
        classObj() {
            return {
                showBraed: !this.showBraed,
                hideSidebarAll: !this.showSidebar,
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', {
                withoutAnimation: false
            })
        },
        clickSettings() {
            this.$refs.rpanel.show = !this.$refs.rpanel.show
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}
.hideSidebarAll .fixed-header {
    width: calc(100%);
}
.mobile .fixed-header {
    width: 100%;
}
.showBraed .app-main {
    min-height: calc(100vh);
}
</style>
