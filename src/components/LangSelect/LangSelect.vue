<template>
    <el-dropdown trigger="click" @command="setLanguage">
        <span>
            {{language==='zh' ? '中文' : 'English'}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language==='zh'" command="zh">
                中文
            </el-dropdown-item>
            <el-dropdown-item :disabled="language==='en'" command="en">
                English
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'vue-property-decorator'
    import {
        CommonModule
    } from '@/store/module/common'
    @Component({})
    export default class extends Vue {
        get language() {
            return CommonModule.language
        }

        setLanguage(lang: string) {
            this.$i18n.locale = lang
            CommonModule.SetLanguage(lang)
        }
    }
</script>