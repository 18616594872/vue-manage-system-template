import {
	VuexModule,
	Module,
	Mutation,
	Action,
	getModule
} from 'vuex-module-decorators'
import {
	RouteConfig
} from 'vue-router'
import {
	asyncRoutes,
	constantRoutes
} from '@/router'
import store from '@/store'

/**
 * 判断用户是否拥有此菜单
 * @param menus
 * @param route
 */

function deepCopy(obj: any) { // 只拷贝对象 
	if (typeof obj !== 'object') {
		return
	}
	// 根据obj的类型判断是新建一个数组还是一个对象
	let newObj: any = obj instanceof Array ? [] : {};
	for (let key in obj) {
		// 遍历obj,并且判断是obj的属性才拷贝 
		if (obj.hasOwnProperty(key)) {
			// 判断属性值的类型，如果是对象递归调用深拷贝 
			newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
		}
	}
	return newObj;
}

/**
 * 递归过滤异步路由表，返回符合用户菜单权限的路由表
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter(asyncRouters: any, routeNames: any) {
	return asyncRouters.reduce((prevArr: any, curVal: any) => {
		let obj: any = {}
		let findFlag = routeNames.find((name: any) => {
			return name === curVal.name || curVal.path === '*'
		})
		if (!!findFlag) {
			obj = curVal
			if (obj.children) {
				obj.children = filterAsyncRouter(curVal.children, routeNames)
			}
		}

		return findFlag ? prevArr.concat(obj) : prevArr
	}, [])
}

export interface PermissionState {
	routers: RouteConfig[]
	addRouters: RouteConfig[]
}

@Module({
	dynamic: true,
	store,
	name: 'permission'
})
class Permission extends VuexModule implements PermissionState {

	routers: RouteConfig[] = constantRoutes // 本用户所有的路由,包括了固定的路由和下面的addRouters
	addRouters: RouteConfig[] = [] // 本用户的角色赋予的新增的动态路由

	@Mutation
	SET_ROUTERS(permissionRoute: RouteConfig[] ) {
		this.addRouters = permissionRoute;
		this.routers = constantRoutes.concat(this.addRouters); // 将固定路由和新增路由进行合并, 成为本用户最终的全部路由信息
	}

	@Action
	generateRoutes(permissionRoute: RouteConfig[] ) {
		let accessedRouters
		let isAdmin
		let menus: any[] = [];

		permissionRoute.forEach((role: RouteConfig) => isAdmin = role.name === 'admin' ? true : false)

		if (!!isAdmin) {
			accessedRouters = asyncRoutes;
		} else {
			permissionRoute.map((item: any) => {
				menus = menus.concat(item.routeList.split(','))
			})
			const tempMap: any = deepCopy(asyncRoutes);
			accessedRouters = filterAsyncRouter(tempMap, Array.from(new Set(menus)));
		}
		// 执行设置路由的方法
		this.SET_ROUTERS(accessedRouters)

		return accessedRouters
	}
}

export const PermissionModule = getModule(Permission)