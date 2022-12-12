# WBPlayer
该播放器是以[Mui Player](https://muiplayer.js.org/zh)的基础上进行的开发的一款纯静态弹幕播放器。

# 特性
- 纯静态文件，无需运行时
- 支持对接自建弹幕数据库
- 支持读取结构化数据设置播放链接、剧集和字幕
- 支持播放M3U8和FLV
- 设置多语言字幕（仅支持Webvtt格式）
- 记忆播放（2022.12.11更新）


# 例子
- [单个视频](https://player.ssrfun.com/?url=https://vod1.wobbay.xyz/normal/bangumi/Bocchi_the_Rock/01.webm)
- [视频剧集](https://player.ssrfun.com/?data=static/json/Bocchi_the_Rock.json)
- [字幕](https://player.ssrfun.com/?url=https://vod1.wobbay.xyz/normal/bangumi/%5BNC-Raws%5D%20%E7%94%B5%E9%94%AF%E4%BA%BA%20-%2008%20%28B-Global%203840x2160%20HEVC%20AAC%20MKV%29%20%5BFC96AF15%5D.mkv&subtitle=static/subtitle/Chainsaw_Man/08//subtitle.json)   **似乎手机端没法更换字幕，所以还是建议直接链接字幕文件，或者将最合适的字幕设为default**

# 参数
- ?url= 播放单个视频链接  
- ?next= 播放完毕后跳转  
- ?data= 视频剧集结构数据  
- '{
    "title": "播放器左上角标题",  
    "pic": "播放前加载封面",  
    "video": [{  
        "title":"剧集名称",  
        "url":"该剧集视频简介"  
    }]  
}'  
- ?subtitle= 字幕文件/字幕结构化数据
- 可以直接提供字幕地址http://example.com/subtitle.vtt
- 也可以提供结构化数据
>'{  
>        "tracks":[  
>            {  
>				"kind":"subtitles",  
>				"src":"字幕地址",  
>				"label":"简体中文",  
>				"srclang":"zh-cn",  
>				"default": true//默认字幕  
>            },  
>            {  
>				"kind":"subtitles",  
>				"src":"字幕地址2",  
>				"label":"繁體中文",  
>				"srclang":"zh-tw"  
>            }  
>        ]  
>    }'  

# TODO
- 更好看的弹幕发送、剧集选择