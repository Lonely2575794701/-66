$(function () {
    // 入口函数
    // --------------------------  切换登录和注册的盒子 -------------
    // 点击去注册
    $('.login a').click(function () {
        $('.login').hide().next().show();
    });

    // 点击去登录
    $('.register a').click(function () {
        $('.register').hide().prev().show();
    });
});

// --------------------- 完成注册功能 ---------------------

// 注册表单提交功能
$("#regForm").on("submit", function (e) {
    // 阻止表单的默认行为
    e.preventDefault();

    // 获取表单中的数据 ==> serialize是根据表单各项的name属性获取值的，所以要检查表单各项的name属性
    let data = $(this).serialize();

    // 发送ajax请求到接口，完成注册
    $.ajax({
        url: "http://ajax.frontend.itheima.net/api/reguser",
        type: "POST",
        data,
        success: function (res) {
            console.log(res);
        },
    });
});

// -----------------------------   表单验证  --------------
// 1. 加载表单（form）模块
let form = layui.form;

// 2. 使用form.verify()方法实现表单验证
form.verify({
    // 第一个验证规则，验证密码长度必须是6~12位
    // key: value
    // 验证规则: array|function
    // pwd: ['正则', '验证不通过时的提示'],

    // pwd: [/^\S{6,12}$/, '密码长度必须是6~12位，并且不能有空格']

    pwd: function (value) {
        // value表示使用验证规则的输入框的值
        if (!/^\S{6,12}$/.test(value)) {
            return '密码长度必须是6~12位，并且不能有空格';
        }
    },

    // 验证两次密码
    repwd: function (value) {
        // value 表示确认密码
        let pwd = $(".register input[name=password]").val(); // 获取密码

        if (value !== pwd) {
            return '两次密码不一致';
        }
    }
});