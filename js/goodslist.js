
daojishi()
$(function(){
    $('.head').load('./header.html')

    $('.footer').load('./footer.html')
    

    $.ajax({
        url:"../data/goods.json",
        type:"get",
        dataType:"json",
        success:function(data){
            var liDom = '';
            data.forEach((element,index) => {
                console.log(index, element.src);
                var s = element.src.split('/');
                var n = s[3].split('.')[0];
                console.log(n);
                liDom += `<li>
                            <a href="./details.html?id=${n}">
                                <div class="good-img">
                                    <img src="${element.src}" alt="">
                                </div>
                                <div class="goods-info">
                                    <div class="goods-title">
                                        ${element.goodstittle}
                                    </div>
                                    <p class="price-info">
                                        <span class="price">${element.price}</span>
                                        <span class="ori-price">${element.oriprice}</span>
                                    </p>
                                    <div class="rebate-info">
                                        <span class="rebate-price">${element.rebateprice}</span>
                                        <span class="rebate-rate">${element.rebaterate}</span>
                                    </div>
                                    <p><span>${element.num}</span></p>
                                </div>
                                
                            </a>
                        </li>
                        `
                
            });
            $('.list').append(liDom)
        },
        error:function(){
            console.log('err');
        }
    })
})


function daojishi(){
    var timer = setInterval(function(){
        var p = document.querySelector('.banner-con p')
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
        millminut = millminut <=9? '0'+millminut:millminut;
        p.innerHTML = '距离下一场开始还有：'+days+'天 <em>'+hour+'</em>:<em>'+minut+'</em>:<em>'+sec+'</em>:<em>'+millminut+'</em>'
    },1)
}