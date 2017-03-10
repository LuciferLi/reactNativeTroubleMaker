
/**
 * Created by lucifer on 2016/02/10.
 *
 *  api url 列表，基础api地址，如http://qa.capi.mengbuy.com/取自源生配置文件
 *  变量名称全部为大写字母如：首页任务列表的apiurl
 *  var REQUEST_URL = host+"/v1/task/recommendTasks"
 */

   'use strict';
   //apiHost
   const API_HOST = 'https://capi.mengbuy.com'
   //版本号
   const VERSION = '/v1';
   //地址列表
   let API_URL = {
       recommendTasks:API_HOST+VERSION+"/task/recommendTasks",
       getNotify:API_HOST+VERSION+"/homepage/getNotify",
   };
   //暴露URL地址与host
   export default{
     API_HOST,
     VERSION,
     API_URL,
   };
