var mask = document.querySelector('.log-mask')
var wrap = document.querySelector('.wrap')
var login = document.querySelector('.login')
var username = document.querySelector('.username')

wrap.onclick = function(ev){
    e = ev || event;
    target = e.target || e.srcElement;
    if (target.className === 'ale-log' || target.className === 'user-log') {
        mask.style.display = 'block';
        login.style.display = 'block';
    }
    if(target.className === 'close' && target.tagName === 'SPAN'){
        mask.style.display = 'none';
        login.style.display = 'none';
    }
    if (target.className === 'logout') {
        localStorage.clear()
        location.href = './index.html';
    }
    if(target.className === 'sub' && target.parentNode.tagName === 'FORM'){
        $(function(){
            if (!form.phone.value || !form.pass.value) {
                alert("用户名或密码不能为空！")
                return false
            }
            $.ajax({
                url: "../data/user.php",
                type:"get",
                data:{
                    "phone":form.phone.value,
                    "pass":form.pass.value,
                    "type":"login"
                },
                dataType:"json",
                success:function(data){
                    if(data.err != 1){
                        alert("用户名或密码错误！")
                        return false
                    }
                    localStorage.setItem('msg',"欢迎您 "+form.phone.value +'<a href="#" class="logout"> 退出</a>')
                    localStorage.setItem('phone',form.phone.value)
                    location.href = './index.html';
                    mask.style.display = 'none';
                    login.style.display = 'none';
                },
                error:function(){
                    console.log('err');
                }
            })
        })
    }
}

// console.log(localStorage.getItem('msg'));
if (localStorage.getItem('msg')) {
    console.log('1111');
    console.log($('.username'));
    $('.username').html(localStorage.getItem('msg'))
}


$(function(){
    $('.footer').load('./footer.html')
})
