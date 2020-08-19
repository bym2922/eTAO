
$(function(){

    $('.head').load('./header.html')

    $('.footer').load('./footer.html')
    
    var timer
    var imgindex = 0
    var n = window.location.href.split("?")[1].split("=")[1];
    $.ajax({
        url:"../data/"+n+".json",
        type:"get",
        dataType:"json",
        success:function(data){
            console.log(data[2].details[0].src);
            $('.details-img img').attr('src','../img/details/'+n+'/01.jpg');
            $('.maxBox img').attr('src','../img/details/'+n+'/b01.jpg');
            var liDom = '';	
            (data[0].small).forEach((element) => {
                // console.log(element);
                liDom += `<li>
                            <img src="${element}" alt="">
                        </li>`
            });
            $('.imgwrap').append(liDom);
            $('.details-middle').append(datarender(data[2].details))
            var dd1Dom = '';	
            (data[2].details[0].src).forEach((ele) => {
                // console.log(ele);
                dd1Dom += `<dd>
                            <div class="color-img">
                                <img src="${ele}" alt="">
                            </div>
                          </dd>`
            });
            $('.type .color').append(dd1Dom)

            var dd2Dom = '';	
            (data[2].details[0].height).forEach((ele) => {
                // console.log(ele);
                dd2Dom += `<dd>${ele}</dd>`
            });
            $('.type .height').append(dd2Dom)
        }
    })

    $('.imgwrap').on('mouseenter', 'li', function(){
        // 获取元素的对应下标

        var $index = $(this).index()+1;
        $('.details-img img').attr('src','../img/details/'+n+'/0'+$index+'.jpg');
        $('.maxBox img').attr('src','../img/details/'+n+'/b0'+$index+'.jpg')
    })

    $('.details-middle').on('click','.type .color-img',function(){
        // 获取元素的对应下标
        console.log('333333333333');
        var src = $(this).children(0).attr('src')
        var s = src.split('/');
        console.log(s[s.length-1]);
        var $index = $(this).index()+1;
        $('.details-img img').attr('src',src);
        $('.maxBox img').attr('src','../img/details/'+n+'/b'+s[s.length-1])
    })


    


    timer = setInterval(function(){
        moveNext()
        // movePrev()
    },4000)


    function moveNext(){
        imgindex ++;
        if(imgindex >= 5){
            imgindex = 0;
            $('.lunbo').scrollTop = 0;
        }
        $('.lunbo').animate({scrollTop: (imgindex * 480)}, 800)
        console.log('2222222222');
    }


    function movePrev(){
        imgindex --;
        if(imgindex < 0){
            imgindex = 4;
            $('.lunbo').scrollTop = imgindex * 480;
        }
        $('.lunbo').animate({scrollTop: (imgindex * 480)}, 800)
    }

    $('.btn .shang').click(function(){
        clearInterval(timer)
        moveNext()
        timer = setInterval(function(){
            moveNext()
        },4000)
    })

    $('.btn .xia').click(function(){
        clearInterval(timer)
        movePrev()
        timer = setInterval(function(){
            movePrev()
        },4000)
    })



    function datarender(data){
        var msgDom = '';
        data.forEach((ele)=>{
            // console.log(ele);
            msgDom = `<div class="details-middle">
            <div class="details-tit">
                <h1>${ele.tith}</h1>
                <p>${ele.titp}</p>
            </div>
            <div class="details-price">
                <dl>
                    <dt>价格</dt>
                    <dd class="d1">${ele.price1}</dd>
                </dl>
                <dl>
                    <dt>促销价</dt>
                    <dd class="d2">${ele.price2}</dd>
                    <span class="d4"><s></s> 品牌钜惠</span>
                </dl>
                <dl>
                    <dt>本店活动</dt>
                    <dd class="d3">满2件7.5折；满3件6.5折</dd>
                    <a href="#">更多优惠 v</a>
                </dl>
            </div>
            <div class="yunfei">
                <dl>
                    <dt>运费</dt>
                    <dd>浙江杭州至 苏州 快递: 0.00</dd>
                </dl>
            </div>
            <ul>
                <li>
                    <span>月销量<em> ${ele.em1}</em></span>
                </li>
                <li>
                    <span>累计评价<em> ${ele.em2}</em></span>
                </li>
                <li>
                    <span>送天猫积分<em style="color: #280!important;"> ${ele.em3}</em></span>
                </li>
            </ul>
            <div class="type">
                <dl class="color">
                    <dt>颜色分类</dt>

                </dl>
                <dl class="height">
                    <dt>参考身高</dt>
                </dl>
                <dl class="num">
                    <dt>数量</dt>
                    <dd>
                        <input type="text" placeholder="1">
                        <span class="choose">
                            <span>^</span>
                            <span>v</span>
                        </span>
                        <span class="kucun">
                            <span class="word"> 件</span>
                            <span class="word"> ${ele.kucun}</span>
                        </span>
                    </dd>
                </dl>
                <div class="car">
                    <a href="#" class="purchase">立即购买</a>
                    <a href="#" class="addcar">加入购物车</a>
                </div>
                <dl class="promise">
                    <dt>服务承诺</dt>
                    <dd>正品保证</dd>
                    <dd>极速退款</dd>
                    <dd>七天无理由退换</dd>
                </dl>
            </div>
        </div>`
        })  
       
        return msgDom
    }
})
