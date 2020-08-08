<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template v-if="onlyOneChild && !onlyOneChild.children">
      <sidebar-item-link v-if="onlyOneChild.meta" :to="onlyOneChild.path">
        <el-menu-item :index="onlyOneChild.path">
          <span v-if="onlyOneChild.meta.title" slot="title">{{ $t('route.' + onlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="item.path" popper-append-to-body>
      <template slot="title">
        <span v-if="item.meta && item.meta.title" slot="title">{{ $t('route.' + item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-first-level="false"
          :base-path="child.path" class="nest-menu" />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
  import path from 'path'
  import {
    Component,
    Prop,
    Vue
  } from 'vue-property-decorator'
  import {
    RouteConfig
  } from 'vue-router'

  @Component({
    name: 'SidebarItem',
    components: {}
  })
  export default class extends Vue {
    @Prop({
      required: true
    }) item!: RouteConfig
    @Prop({
      default: ''
    }) basePath!: string


    get showingChildNumber() {
      if (this.item.children) {
        const showingChildren = this.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    }

    get onlyOneChild() {
      if (this.showingChildNumber > 1) {
        return null
      }
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      return {
        ...this.item,
        path: ''
      }
    }

  }
</script>

<style lang="less">
</style>