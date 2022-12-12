function getQueryVariable(url,variable){
        var query = url.split("?")[1]; // 根据“?”切割数组，截取“?”之后的字符串
        // ['https://qq.com','appid=1234567890&name=Zdf']
        var vars = query.split("&"); // 根据“&”切割成数组
        // ['appid=1234567890','name=Zdf']
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                // ['appid','1234567890']
                if(pair[0] == variable) return pair[1]; // 没有花括号默认执行第一个js语句
        }
        return(false);
    }
window.playerConfig = {
    container: '#mui-player', /*播放器ID*/
    themeColor: '#fa0000',   /*进度条颜色*/
    title: getQueryVariable( window.location.href , 'title' )?getQueryVariable( window.location.href , 'title' ):'',
    src: getQueryVariable( window.location.href , 'url' )?decodeURIComponent(getQueryVariable( window.location.href , 'url' )):"",
    poster: getQueryVariable( window.location.href , 'pic' )?getQueryVariable( window.location.href , 'pic' ):'',
    autoplay: true,/*自动播放*/
    initFullFixed: true,/*是否全屏*/
    preload: 'auto',/*预加载*/
    autoOrientaion: true,/*自动切换方向*/
    dragSpotShape: 'circula',/*进度条样式 可选 circula | square*/
    lang: 'zh-cn',/*语言*/
    volume: '1',/*声音默认1 可选0.5*/
    custom:{},
    videoAttribute:[
        {attrKey:'webkit-playsinline',attrValue:''},
        {attrKey:'playsinline',attrValue:''},
        {attrKey:'x5-playsinline',attrValue:''},
        {attrKey:'t7-video-player-type',attrValue:'inline'},
        {attrKey:'x5-video-player-type',attrValue:'h5-page'},
        {attrKey:'x-webkit-airplay',attrValue:'allow'},
        {attrKey:'controlslist',attrValue:'nodownload'},
    ],
    plugins: [
            new MuiPlayerDesktopPlugin({
                leaveHiddenControls: true,
                fullScaling: 1,
            }),
            new MuiPlayerMobilePlugin({
                key:'01I01I01H01J01L01K01J01I01K01J01H01D01J01G01E',
                showMenuButton: true,
                forwardRate:0.1,
            })
        ],
        
};


var api = "https://danmaku.wobbay.xyz/dmku/?ac=dm&id=";
$.getJSON(api+hex_md5(getQueryVariable( window.location.href , 'url' )), function(res){
        console.log(res);
        var danmakuList = [];
        let danmaku = res.danmuku;
        for ( i = 0; i < danmaku.length; i++){
            danmakuList.push({
                "mode":danmaku[i][1]=="right"?1:5,
                "text":danmaku[i][4],
                "stime":danmaku[i][0],
                "size":25,
                "dur":7000,
                "color":danmaku[i][2]
            })
        }
        window.danmakuList = danmakuList;
        if(getQueryVariable( window.location.href , 'url' ))$danmaku.initCreateDanmaku();
    })

    
var footerControls = [];
if(getQueryVariable( window.location.href , 'data' )){
    //多剧集的下一集设置不在这里，在index.html处
}else if(getQueryVariable( window.location.href , 'subtitle' )){
    //多剧集的下一集设置不在这里，在index.html处
}else if(!!getQueryVariable( window.location.href , 'next' )){
        footerControls.push({
                slot:'nextMedia',
                position:'left',
                tooltip:'下一集',
                oftenShow:true,
                click:function(e) {
                    top.location.href=top.location.origin+top.location.pathname+"?url="+getQueryVariable( window.location.href , 'next' );
                },
            })
        
    }
footerControls.push({
                slot:'changeDanmaku',
                position:'right',
                tooltip:'弹幕',
                oftenShow:true,
                click:function(e) {
                    
                    mp.showRightSidebar("Danmaku");
                },
            })
console.log(footerControls);

var rightSidebar = [];
rightSidebar.push({
    slot:'HD', 
    width:'200px'
})
rightSidebar.push({
    slot:'Danmaku', 
    width:'200px'
})
console.log(rightSidebar);

window.playerConfig.custom.rightSidebar=rightSidebar;
window.playerConfig.custom.footerControls=footerControls;


//如果请求包含指定数据集，则载入数据集
if(getQueryVariable( window.location.href , 'data' )){
    //多剧集的设置不在这里，在index.html处
} else {
    if(window.playerConfig.src.indexOf(".m3u8")>0){
        window.playerConfig.parse= {
            type:'hls',
            loader:Hls,
            config: {
                debug:false,
            },
        };
    }
    
if(window.playerConfig.src.indexOf(".flv")>0){
        window.playerConfig.parse= {
            type:'flv',
            loader:flvjs,
            config: {
                cors:true,
            },
        };
    }
}