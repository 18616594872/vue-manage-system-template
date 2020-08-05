import Vue from 'vue'

export default () => {
    let config =
        process.env.NODE_ENV === 'production' ?
        '' // 生产环境
        :
        require('../../public/serverconfig.json') // 开发环境

}