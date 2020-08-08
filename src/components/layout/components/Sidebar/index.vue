<template>
    <div class="layout-warp">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :background-color="variables.menuBg" :text-color="variables.menuText"
                :active-text-color="menuActiveTextColor" :unique-opened="false" :collapse-transition="false"
                mode="vertical">
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'vue-property-decorator'
    import {
        PermissionModule
    } from '@/store/modules/permission'
    import SidebarItem from './SidebarItem.vue'
    import variables from '@/styles/variables.less'

    @Component({
        components: {
            SidebarItem
        }
    })
    export default class extends Vue {

        get routes() {
            return PermissionModule.routes
        }

        get menuActiveTextColor() {
            return variables.menuActiveText
        }

        get variables() {
            return variables
        }

        get activeMenu() {
            return this.$route.path
        }

    }
</script>

<style lang="less">
    .sidebar-container {

        // reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }

        .el-scrollbar__view {
            height: 100%
        }

        .el-scrollbar__bar {
            &.is-vertical {
                right: 0px;
            }

            &.is-horizontal {
                display: none;
            }
        }
    }
</style>

<style lang="less" scoped>
    .layout-warp {}

    .el-scrollbar {
        height: 100%
    }

    .has-logo {
        .el-scrollbar {
            height: calc(100% - 50px);
        }
    }

    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }
</style>