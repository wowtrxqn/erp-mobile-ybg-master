import Widget from 'eros-widget'
import apis from './apis'
import routes from './routes'
import qs from 'query-string'
import './push'

new Widget({
    router: {
        /**
         * 路由配置表
         */
        routes
    },
    ajax: {
        baseUrl: 'http://bjtm.shasteel.cn/ybg/',
        //baseUrl: 'http://10.68.0.55:8080/bjtm/',
        /**
         * 接口别名
         */
        apis,
        // 接口超时时间
        timeout: 10000,

        /**
         * 请求发送统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * next
         */
        requestHandler (options, next) {
            options.method = options.method || 'POST';
            options.header = options.header || {};
            /*
            if(!options.header['Content-Type']){
                options.header['Content-Type'] = 'application/x-www-form-urlencoded';
            }
            */
            options.header['Accept'] = 'application/json';
            options.header['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36';
            if(options.method == 'POST'){
                options.header['Content-Type'] = 'application/x-www-form-urlencoded';
                options.data = options.data || {};
                // 对API请求页码和分页进行预设
                if(!options.data['pageNum']){
                    options.data['pageNum'] = 1
                }
                if(!options.data['limit']){
                    options.data['limit'] = 10
                }
                //兼容suppId、suppName处理，统一加上
                let suppId = Vue.prototype.$storage.getSync('suppId');
                let suppName = Vue.prototype.$storage.getSync('suppName');
                if(suppId && !options.data['q_suppId']){
                    options.data['q_suppId'] = suppId;
                }
                if(suppName && !options.data['q_suppName']){
                    options.data['q_suppName'] = suppName;
                }
                console.log('options:',options)
                //options.data = qs.stringify(options.data)
            }
            //console.log('request-opts', options)
            next()
        },
        /**
         * 请求返回统一拦截器 （可选）
         * options 你请求传入的所有参数和配置
         * resData 服务器端返回的所有数据
         * resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
         * reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
         */
        responseHandler (options, resData, resolve, reject) {
            const { status, errorMsg, data } = resData
            if( status == 9){
                Vue.prototype.$notice.alert({
                    title: '系统提示',
                    message: '请求后台服务超时，请联系客服',
                    okTitle: '确认',
                    callback() {
                        //判断是否在登陆页面
                        let currentUrl = weex.config.bundleUrl;
                        let pageName = currentUrl.substring(currentUrl.lastIndexOf('/')+1)
                        if(pageName == "App.js"){
                            Vue.prototype.$router.refresh();
                        }else{
                            //强行退出
                            Vue.prototype.$fetch({   
                                method: 'POST',   
                                name: 'logout'
                            })
                            Vue.prototype.$router.setHomePage('/pages/App.js');
                        }
                    }
                })
            }
            else if(status !== 200) {
                //console.log(`invoke error status: ${status}`)
                //console.log(`invoke error message: ${errorMsg}`)
                reject(resData)
            } else {
                switch(resData.data.status){
                    //后台服务出错，service or sql error
                    /*
                    case -1:
                        Vue.prototype.$notice.alert({
                            message:'请求数据异常'
                        })
                        break;
                    */
                    //后台session过期
                    case -2:
                        Vue.prototype.$notice.alert({
                            title: '系统提示',
                            message: '登陆已超时，请重新登陆',
                            okTitle: '确认',
                            callback() {
                                //session过期直接返回登陆界面
                                Vue.prototype.$fetch({   
                                    method: 'POST',   
                                    name: 'logout'
                                })
                                Vue.prototype.$router.setHomePage('/pages/App.js');
                            }
                        })
                        break;
                    default:
                        resolve(data)
                }
            }
        }
    }
})
