function Enlarge(options){
    this.init(options)
}

Enlarge.prototype = {
    init: function(params){
        this.left =  this.getElement(params.left)   
        this.mask = this.getElement(params.mask)
        this.maxbox = this.getElement(params.maxbox)
        this.maxboximg = this.getElement(params.maxboximg)
        this.addMouseEnter(this.left, this.mask, this.maxbox)
        this.addMouseMove(this.left, this.mask, this.maxbox, this.maxboximg)
        this.addMouseLeave(this.left, this.mask, this.maxbox)
    },

    getElement: function(params){
        return document.querySelector(params)
    },

    addMouseEnter: function(left,mask, maxbox){
        left.onmouseenter = function () {
            mask.style.display = 'block';
            maxbox.style.display = 'block';
        }
    },

    addMouseLeave: function(left,mask, maxbox){
        left.onmouseleave = function(){
            mask.style.display = 'none';
            maxbox.style.display = 'none';
        }
    },

    addMouseMove: function(left1, mask, maxbox, maxboximg){
        var _this = this
        left1.onmousemove = function(ev){
            var e = ev || event;
            var l = e.clientX - _this.offset_body(left1, false).left - mask.clientWidth/2 ;
            var t = e.pageY - _this.offset_body(left1, false).top - mask.clientHeight/2 ;
           
            if(l >= left1.clientWidth - mask.clientWidth){
                l = left1.clientWidth - mask.clientWidth;
            }
            if(l <= 0){
                l = 0;
            }
            if(t >= left1.clientHeight - mask.clientHeight){
                t = left1.clientHeight - mask.clientHeight;
            }
            if(t <= 0){
                t = 0;
            }
            mask.style.left = l + 'px';
            mask.style.top = t + 'px';

            var scalx = l/(left1.clientWidth - mask.clientWidth)
            var scaly = t/(left1.clientHeight - mask.clientHeight)
            var imgl = (maxboximg.clientWidth - maxbox.clientWidth) * scalx
            var imgt = (maxboximg.clientHeight - maxbox.clientHeight) * scaly

            maxboximg.style.left = -imgl + 'px';
            maxboximg.style.top = -imgt + 'px';
        }
    },

    offset_body: function(dom, bool){
        var l = 0, t = 0;
        var bdleft = dom.clientLeft;//初始元素的左边框
        var bdtop = dom.clientTop;//初始元素的上边框
        while(dom){
            l = l + dom.offsetLeft + dom.clientLeft;
            t = t + dom.offsetTop + dom.clientTop;
            dom = dom.offsetParent;
        }
        if (bool) {
            // 元素边框外侧到body的距离
            return {left: l-bdleft, top: t-bdtop};
        } else {
            // 元素内容外侧到body的距离
            return {left: l, top: t};
        }
    }
}

var en = new Enlarge({
    left: '.details-img',
    mask: '.details-img .mask',
    maxbox: '.maxBox',
    maxboximg: '.maxBox img'
})
