
daojishi()
$(function(){
    $('.head').load('./header.html')

    $('.footer').load('./footer.html')

    if (localStorage.getItem('phone')) {
        console.log($('.top p'));
        $('.top p').html(localStorage.getItem('phone'))
        $('.top .user-log').css({"display":"none"})
        $('.top .logout').css({"display":"block"})
    }
})

var timer
var imgindex = 0
var numindex = 0

function LunBo(options){
    this.init(options);
}

LunBo.prototype = {
    init: function(params){
        this.main = this.getElement(params.main);
        this.content = this.getElement(params.content);
        this.prev = this.getElement(params.prev) || null;
        this.next = this.getElement(params.next) || null;
        this.nums = this.getElements(params.nums) || null;
        this.time = params.time;
        this.imgindex = imgindex;
        this.numindex = numindex;
        this.firstImg = this.content.children[0].cloneNode(true);
        this.content.appendChild(this.firstImg);
        this.imgs = this.content.children
        this.timer = setInterval(()=>{
            this.moveNext(this.imgindex,this.imgs,this.main,this.nums,this.numindex)
        },this.time) || timer;
        this.addEvent(this.imgindex,this.imgs,this.main,this.nums,this.numindex);
    },
    getElement: function(selector){
        return document.querySelector(selector);
    },
    getElements:function(selector){
        return document.querySelectorAll(selector);
    },
    moveNext: function(imgindex,imgs,main,nums,numindex){
        imgindex ++;
        if(imgindex >= imgs.length){
            imgindex = 1;
            main.scrollLeft = 0;
        }
        animate(main,{"scrollLeft": imgindex * imgs[0].clientWidth})
        this.imgindex = imgindex;
        if (nums.length > 0) {
            nums[numindex].className = '';
            numindex ++;
            if(numindex >= nums.length){
                numindex = 0;
            }
            this.numindex = numindex
            nums[numindex].className = 'active'
        }
        
    },
    movePrev: function(imgindex,imgs,main,nums,numindex){
        imgindex --;
        if(imgindex < 0){
            imgindex = imgs.length-2;
            main.scrollLeft = (imgs.length-1) * imgs[0].clientWidth;
        }
        animate(main,{"scrollLeft": imgindex * imgs[0].clientWidth})
        this.imgindex = imgindex;
        if (nums.length > 0) {
            nums[numindex].className = '';
            numindex --;
            if(numindex < 0){
                numindex = nums.length-1;
            }
            this.numindex = numindex
            nums[numindex].className = 'active'
        } 
    },

    addEvent: function(imgindex,imgs,main,nums,numindex){
       
        if (this.next != null && this.prev != null) {
            _this = this
            this.main.onmouseenter = function(){
                _this.next.style.display = 'block';
                _this.prev.style.display = 'block';
            }

            this.main.onmouseleave = function(){
                _this.next.style.display = 'none';
                _this.prev.style.display = 'none';
            }

            this.next.onclick = function(){
                clearInterval(_this.timer)
                _this.moveNext(_this.imgindex,imgs,main,nums,_this.numindex)
                _this.timer = setInterval(function(){
                    _this.moveNext(_this.imgindex,imgs,main,nums,_this.numindex)
                },_this.time)
            }
            this.prev.onclick = function(){
                clearInterval(_this.timer)
                _this.movePrev(_this.imgindex,imgs,main,nums,_this.numindex)
                _this.timer = setInterval(function(){
                    _this.movePrev(_this.imgindex,imgs,main,nums,_this.numindex)
                },_this.time)
            }
            
        }
        
        if (nums.length > 0) {
            this.main.onmouseover = function(ev){
                var e = ev || event;
                var target = e.target || e.srcElement;
                if (target.tagName === 'LI' && e.target.parentNode.className === 'num') {
                    console.log(this);
                    console.log(target);
                    console.log(numindex);
                } 
            }
        }
    }, 
    numchange:function(){
        for(var i = 0; i < this.nums.length; i++){
            this.nums[i].index = i
            _this = this;
            this.nums[i].onclick = function(){
                clearInterval(_this.timer)
                _imgindex = this.index
                animate(_this.main,{"scrollLeft": _imgindex * _this.imgs[0].clientWidth})
                _this.nums[numindex].className = ''
                _this.numindex = this.index;
                _this.nums[numindex].className = 'active';
                _this.timer = setInterval(()=>{
                    _this.moveNext()
                },_this.time)

            }
        }
    }
}


var lun1 = new LunBo({
    main:'.banner-con-left',
    content:'.banner-con-left .content',
    prev:'.prev',
    next:'.next',
    time:'3000'
})

var lun2 = new LunBo({
    main:'.banner-con-mid',
    content:'.banner-con-mid .content',
    nums:'.num li',
    time:'5000'
})

// 1.实现倒计时效果（2020/10/01）
function daojishi(){
    var time = document.querySelector('.time')
    var timer = setInterval(function(){
        // var p = document.querySelector('#p')
        var d = new Date('2020/10/1 00:00:00')
        var d1 = d.getTime()   //获得对应时间的时间戳
        var d2 = Date.now()    //获得当前时间的时间戳
        // 计算天数
        var d4 = (d1 - d2)/1000/60/60/24
        var days = parseInt(d4)
        // 计算小时
        var d5 = (d4-days) *24 
        var hour = parseInt(d5)
        hour = hour <=9? '0'+hour:hour;
        // 计算分钟
        var d6 = (d5 - hour) * 60
        var minut = parseInt(d6)
        minut = minut <=9? '0'+minut:minut;
        //计算秒钟
        var d7 = (d6-minut)*60
        var sec = parseInt(d7)
        sec = sec <=9? '0'+sec:sec;
        // 计算毫秒
        var millminut = parseInt((d7-sec)*1000)
        time.innerHTML = '<a href="#">距离下一场开始还有 <em>'+hour+'</em>:<em>'+minut+'</em>:<em>'+sec+'</em><span class="more">更多</span></a>'
        // time.innerHTML = '距离2020年国庆节还剩'+days+'天'+hour+'小时'+minut+'分'+sec+'秒'+millminut+'毫秒'
    },1)
}


