import axios from 'axios';
import router from "../router";
import {Indicator} from 'mint-ui';


axios.defaults.timeout = 20000;
axios.defaults.baseURL ='';



//http request 拦截器
axios.interceptors.request.use(

    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        let token = window.localStorage.getItem('token');
        config.data = JSON.stringify(config.data);

        config.headers = {
            //'Content-Type':'application/x-www-form-urlencoded'
             'Content-Type':'application/json;charset=utf-8',
              'token':token

        };
       /* if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${token}`;

        }*/
        Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
        });
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器 判断是注册
axios.interceptors.response.use(
    response => {
/*
        if(response.data.code ==0){
            /!*if(response.data.status){

            }*!/
         /!*   router.push({
                path: "/Registered"
            });*!/
        }*/
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get('http://web.laowangu.net/'+url,{
            params:params

        })
            .then(response => {
                resolve(response.data);
                Indicator.close();

            })
            .catch(err => {
                reject(err)
                Indicator.close();

            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data){
    return new Promise((resolve,reject) => {
        axios.post('http://web.laowangu.net/'+url,data)
            .then(response => {
                resolve(response.data);
                Indicator.close();
                console.log(22)
            },err => {
                Indicator.close();
                reject(err)
            })

    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){

    return new Promise((resolve,reject) => {
        axios.patch('http://web.laowangu.net/'+url,data)
            .then(response => {
                Indicator.close();

                resolve(response.data);
            },err => {
                Indicator.close();

                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put('http://web.laowangu.net/'+url,data)
            .then(response => {
                Indicator.close();

                resolve(response.data);
            },err => {
                Indicator.close();

                reject(err)
            })
    })
}


