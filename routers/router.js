
/**
 * 路由整体控制,重写第三次
 */

const router = require('koa-router')();
const api = require('./api');
const andirApi = require('./andirPlugin');
const addMes = require('./messagePush');
const user = require('./user');
const oauth = require('./../oauth/oauth');


const multer = require('koa-multer');


const storage = multer.diskStorage({
    //文件保存路径  
    destination: function (req, file, cb) {
        cb(null, 'public/download/');
    },
    //修改文件名称  
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split('.');
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({ storage: storage });

/**
 * oauth 权限控制
 * 1、login 用户登录
 * 2、setBasic 存储用户版本信息
 * 3、getBasic 获取用户版本信息
 * 4、setHtmlError 存储端页面报错信息
 * 5、getHtmlError 获取前端页面报错信息
 * 6、getLogs 获取后端接口报错
 * 7、layOut  用户退出接口
 * 8、typeErr 页面js错误返回数据合并
 * 9、getUrlErr 接口错误返回数据合并
 */


router
    .post('/plugin/api/login', user.login)
    .post('/plugin/api/register', user.register)
    .get('/plugin/api/userInfo', oauth.user, user.userInfo)
    .post('/plugin/api/setBasic', oauth.pass, api.setBasic)
    .get('/plugin/api/getBasic', oauth.user, api.getBasic)
    .post('/plugin/api/setHtmlError', oauth.pass, api.setHtmlError)
    .get('/plugin/api/getHtmlError', oauth.user, api.getHtmlError)
    .get('/plugin/api/pageError', oauth.user, api.pageError)
    .get('/plugin/api/typeErr', oauth.user, api.getTypeErr)
    .get('/plugin/api/getUrlErr', oauth.user, api.getUrlErr)
    .post('/plugin/api/layout', user.layOut)
    .post('/plugin/api/setPlug', oauth.pass, api.setPlug)
    .get('/plugin/api/getPlug', oauth.pass, api.getPlug)
    .post('/plugin/api/settingPlug', oauth.pass, api.settingPlug)
    .post('/plugin/api/setPlugList', oauth.pass, api.setPlugList)
    .get('/plugin/api/getPlugList', oauth.pass, api.getPlugList)
    .post('/plugin/api/setPlugListInfo', upload.single('file'), api.setPlugListInfo)
    .get('/plugin/api/getPlugListInfo', oauth.pass, api.getPlugListInfo)
    .post('/plugin/api/delPlug', oauth.pass, api.delPlug)
    .get('/plugin/api/getPlugDownloads', oauth.pass, api.getPlugDownloads)
    .post('/plugin/api/isLogin', api.isLogin);
    // .get('/plugin/api/getBrowser', oauth.user, api.getBrowser);


/**
 * andir app端单独提出来
 */

router
    .get('/plugin/api/andirApi', oauth.pass, andirApi.andirAppPlugin);


/**
 * addMes 消息推送单独提出来
 */

router
    .post('/plugin/api/addMessage', oauth.user, addMes.addMessage)
    .get('/plugin/api/getMessage', oauth.user, addMes.getMessage)
    .post('/plugin/api/setMessage', oauth.user, addMes.setMessage);



module.exports = router;