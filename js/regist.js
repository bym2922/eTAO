$.fn.extend({
    drag:function(){
        $(this).css({"cursor":"pointer"});
        var $this = $(this)
        $(this).mousedown(function(e){
            var toleft = e.clientX - $this.offset().left;
            $(document).bind('mousemove',function(e){
                var l = e.clientX - toleft -664.5;
                if (l>=232) {
                    l=232
                    $this.parent().css({"background-color":"yellowgreen"})
                    $this.siblings('p').text('验证成功').css({"color":"white"})
                    $('.btn').css({"background-color":"#fb3434","color":"white","pointer-events":"auto"})
                }
                if (l<=0) {
                    l=0
                }
                $this.css({
                    "left": l,
                    "top": 0
                })
            })
            $(document).mouseup(function(){
                $(document).unbind('mousemove');
            })
        })
    }
})

$('.box').drag()


$('.btn').click(function(){

    if (!form.phone.value || !form.pass.value) {
        alert("用户名或密码不能为空！")
    }else{
        $.ajax({
            url:"../data/user.php",
            type:"get",
            data:{
                "phone":form.phone.value,
                "pass":form.pass.value,
                "type":"add",
            },
            dataType:"json",
            success:function(data){
                alert(data.msg)
                console.log(data);
                if (data.err === 3) {
                    location.href = './index.html'
                }  
            },
            error:function(){
                console.log("err");
            }
        })
    }

    
})