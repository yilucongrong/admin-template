<template>
    <section class="app-main">
        <transition mode="out-in" name="fade-transform">
            <keep-alive :include="cachedViews" exclude="redirect">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.path
            // return this.$route.fullPath
        }
    }
}
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px - 43px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #f3f3f3;
}
.fixed-header + .app-main {
    padding-top: 50px;
    height: 100vh;
    overflow: auto;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px - 43px);
    }

    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>

