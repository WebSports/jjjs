//外部公共变量
var zjshopmoncoffcepb;  //整家店铺当月咖啡排班次数  从考勤里面取 不带参


//实时监测input框输入值
// function OnInput (event) {
//     console.log("The new content: " + event.target.value);
//     var inputchild = event.srcElement;
//     var inputparent = inputchild.parentNode;
//     console.log(inputchild);
//     console.log(inputparent);
//     console.log(inputparent.parentNode.childNodes); 
//     var childlist = inputparent.parentNode.childNodes;
//     var childtwo = document.getElementById("test").childNodes;

//     //    //首先判断输入的值是否>=0  
//     //    var thisval = parseFloat(event.target.value);
//     //    thisval = thisval.replace(/^$|([^\d|.])/g, ''); //除小数点和数字可以 剩下都不行
//     //    var  chengvalue = 0;
//     //    console.log(typeof thisval);
//     //    if(thisval)
//     //    {
//     //      //这种数据太错乱了 不好监视  在下面的话用一个变量存储每个check后面input的值 相加大于1的时候就清空
//     //      var zhiwei = $("#tab1 tr.rowappend"+i).find('td').eq(1).find("input").val();
//     //      if(zhiwei == "区域店经理" && thisval > 0.3 && thisval<1)
//     //      {
//     //          alert("区域店长可填写分配比例不能超过0.3");
//     //          $(this).val("");
//     //      }else if(zhiwei == "店长" && thisval > 0.6 && thisval<1)
//     //      {               
//     //          alert("店长可填写分配比例不能超过0.6");
//     //          $(this).val("");
//     //      }
//     //    }
//     //    //如果为负数
//     //    else  
//     //    {
//     //      $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").val(""); //清空掉它输入的值
//     //    }



// }



// 调用方法：（后面的s为显示小数点后几位，比如s为0时显示整数，2为显示两位小数，比如2.00）

// 加法：bcadd(num1, num2,s) //如：1+2为 bcadd(1, 2,2)

// 减法：bcsub(num1, num2,s) //如：1-2为 bcsub(1, 2,2)

// 乘法：bcmul(num1, num2,s) //如：1*2为 bcmul(1, 2,2)

// 除法：bcdiv(num1, num2,s)  //如：1/2为 bcdiv(1, 2,s)

//浮点数加减乘除计算
function toDecimal2(x,ss) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + ss) {
      s += '0';
    }
    return s;
  }

function bcFixed(num, s) {
  var times = Math.pow(10, s)
  var des = num * times + 0.5
  des = parseInt(des, 10) / times
  return toDecimal2(des,s)+'';
}

/**
* 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
*
* @param num1加数1 | num2加数2
*/
function bcadd(num1, num2,s) {
var baseNum, baseNum1, baseNum2,ret;
try {
baseNum1 = num1.toString().split(".")[1].length;
} catch (e) {
baseNum1 = 0;
}
try {
baseNum2 = num2.toString().split(".")[1].length;
} catch (e) {
baseNum2 = 0;
}
baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  ret=(num1 * baseNum + num2 * baseNum) / baseNum;
return bcFixed(ret,s);
};
/**
* 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
*
* @param num1被减数  |  num2减数
*/
function bcsub(num1, num2,s) {
var baseNum, baseNum1, baseNum2,ret;
var precision;// 精度
try {
baseNum1 = num1.toString().split(".")[1].length;
} catch (e) {
baseNum1 = 0;
}
try {
baseNum2 = num2.toString().split(".")[1].length;
} catch (e) {
baseNum2 = 0;
}
baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
ret=((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
return bcFixed(ret,s);
};
/**
* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
*
* @param num1被乘数 | num2乘数
*/
function bcmul(num1, num2,s) {
var baseNum = 0,ret;
try {
baseNum += num1.toString().split(".")[1].length;
} catch (e) {
}
try {
baseNum += num2.toString().split(".")[1].length;
} catch (e) {
}
ret=Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
return bcFixed(ret,s);
};
/**
* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。 
*
* @param num1被除数 | num2除数
*/
function bcdiv(num1, num2,s) {
var baseNum1 = 0, baseNum2 = 0,ret;
var baseNum3, baseNum4;
try {
baseNum1 = num1.toString().split(".")[1].length;
} catch (e) {
baseNum1 = 0;
}
try {
baseNum2 = num2.toString().split(".")[1].length;
} catch (e) {
baseNum2 = 0;
}
with (Math) {
baseNum3 = Number(num1.toString().replace(".", ""));
baseNum4 = Number(num2.toString().replace(".", ""));
ret=(baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
return bcFixed(ret,s);
}
};



//获取字段值的方法



/**
 * 图书产品达成比例  获取该字段值
 * @param tscpwcje 图书产品完成金额              取POS销售数据
 * @param renxiao1                              导入HR
 */
function bookbol(tscpwcje,renxiao1)
{
    var result;
    result = bcdiv(tscpwcje/renxiao,2);
    return result;
}
/**
 * 餐区达成比例
 * @param cqxsje1 餐区销售金额                  取POS销售数据
 * @param cqqtrx1 餐区前厅人效                  导入HR
 */
function cqdcbl1(cqxsje1,cqqtrx1)
{
    var result;
    result =  bcdiv(cqxsje1,cqqtrx1,2);
    return result;
}

/**
 * 会员卡提成金额
 * @param hyksjwcze 会员卡实际完成总额          取POS销售数据
 * @param hyktcbl   会员卡提成比例              公式02
 */
function hyktcje(hyksjwcze,hyktcbl)
{
    var result;
    result = bcmul(hyksjwcze,hyktcbl,2);
    return result;
}
/**
 * 礼品卡提成金额
 * @param lpksjwcze  礼品卡实际完成总额         取POS销售数据
 */
function lpktcje(lpksjwcze)
{
    var result;
    result = bcmul(lpksjwcze,0.02,2);
    return result;
}


/**
 * 图书产品提成达成比例
 * @param tucpwczje  图书产品完成总金额         取POS销售数据    
 * @param renxiao2   人效                      导入HR
 */
function tucptcdcbl(tucpwczje,renxiao2)
{
   var result; 
   result = bcdiv(tucpwczje,renxiao2,2);
   return result;
}





/**                                    考虑一下新加一个td当中放隐藏域 隐藏域中的value放工号 然后根据这个value去获取个人咖啡出勤时长
 * 获取个人咖啡出勤时长                  要根据工号去取考勤内的数据 获取该字段值  不考虑根据名字来取
 * @param jobnumber                    工号 页面只展示员工姓名 但是个人咖啡时长要通过这个工号获得
 */
function jobcoffcehour(jobnumber)
{
    var result;
    $.ajax({ 
        url: "https://www.easy-mock.com/mock/5c88e30538f33553f9305eab/example/jobcoffcehour",    //后台webservice里的方法名称  
        type: "get",
        async:false,
        cache:false,
        dataType: "json",
        data:{
            "jobid":jobnumber
        },
        success: function (res) {
            result = res.data;
        },
        error: function (msg) {
            alert("出错了！");
        }
    });
    return result;//输出该数组
}
/**
 * 咖啡排班        获取该字段值
 * @param gerensc 个人咖啡出勤时长      根据上面func: jobcoffcehour得出
 */
function coffcepb(gerensc)
{
    var result;
    result = bcdiv(gerensc,7.5,2); //个人咖啡出勤时长/7.5(保留两位小数)
    return result;
}

/**
 * 餐区前厅达成比例
 * @param cqxsje2 餐区销售金额           取POS销售数据
 * @param ctqqrx1 餐厅前区人效           导入HR
 */
function ctqqdcbl(cqxsje,ctqqrx)
{
    var result;
    result = bcdiv(cqxsje2,ctqqrx1,2);
    return result;
}


/**
 * 门店奖金包分配金额
 * @param jjbkfpje  奖金包可分配金额  公式1
 * @param jjbfpbl   奖金包可分配比例  
 */
function mdjjbfpje()
{
    var result;
    jjbkfpje = gongshione(); //4个参数
    result = bcmul(jjbkfpje*jjbfpbl); //奖金包可分配金额 * 奖金包可分配比例
    return result;
}


/**
 * 提成合计计算
 * @param  hyktc1           会员卡提成金额
 * @param  lpktc2           礼品卡提成金额
 * @param  booktc3          图书产品提成金额
 * @param  coffcetc4        咖啡提成金额
 * @param  cqqttc5          餐区前厅提成金额
 * @param  mdjjbfptc6       门店奖金包分配金额
 * @param  bctc7            包场提成金额    
 */
function sumtc(hyktc1,lpktc2,booktc3,coffcetc4,cqqttc5,mdjjbfptc6,bctc7)
{
    var result;
    result = hyktc1+lpktc2+booktc3+coffcetc4+cqqttc5+mdjjbfptc6+bctc7;
    result = result.toFixed(2);
    return result;
}

/**
 * @param rank              分配比例的等级 从后台带出 以限制分配比例的填写  
 */
function fpbljudge(rank)
{
    //店长填写分配比例不能超过百分之6
    if(rank == "店长")
    {

    }
    else if(rank == "区域店经理") 
    {

    }
}




/**
 * 01奖金可包分配金额     ok  通关实测
 * @param mdxjyyemb     门店现金营业额目标值       取POS任务值
 * @param mdxjyyewc     门店现金营业额完成值       取POS销售数据
 * @param mdcwmbsr      门店财务收入目标值         取POS任务值
 * @param mdcwsrmbsjwc  门店财务收入目标实际完成值  取POS销售数据
 */
function gongshione(mdxjyyemb,mdxjyyewc,mdcwmbsr,mdcwsrmbsjwc)
{
    var result;
    var flag = 0;
    // 门店现金营业额目标值 <= 门店现金营业额完成值 && 门店财务收入目标实际完成值 >= 门店财务收入目标值 && 门店现金营业额目标值 >0 
    // && 门店财务收入目标值 > 0
    if(mdxjyyemb <= mdxjyyewc && mdcwsrmbsjwc >= mdcwmbsr && mdxjyyemb > 0 && mdcwmbsr > 0)
    {
        result = bcmul(mdxjyyewc,0.01,2);
        flag = 1;
    }
    // 门店现金营业额完成值  < 门店现金营业额目标值  && 门店财务收入目标实际完成值 >= 门店财务收入目标值 && 门店现金营业额目标值 >0 
    // && 门店财务收入目标值 > 0
    else if(mdxjyyewc < mdxjyyemb && mdcwsrmbsjwc >= mdcwmbsr && mdxjyyemb > 0 && mdcwmbsr > 0)
    {
        result = bcmul(bcmul(mdxjyyewc,0.01,2),0.4,2);
        flag = 1;
    }
    // 门店现金营业额完成值  >= 门店现金营业额目标值  && 门店财务收入目标实际完成值 < 门店财务收入目标值 && 门店现金营业额目标值 >0 
    // && 门店财务收入目标值 > 0
    else if(mdxjyyewc >= mdxjyyemb && mdcwsrmbsjwc < mdcwmbsr &&  mdxjyyemb > 0 && mdcwmbsr >0)
    {
        result = bcmul(bcmul(mdxjyyewc,0.01,2),0.6,2) ;
        flag = 1;
    }
    //不符合以上情况
    else if(flag!= 1)
    {
        result = 0;
    }
    else
    {

    }
    return result;
}
/**
 * 02会员卡提成提成比例 ok  通关实测
 * @param hykwce      会员卡完成额              取POS销售数据
 * @param baifentwo   百分之2提成基数标准       导入HR
 * @param baifenthree 百分之3提成基数标准       导入HR
 */
function gongshitwo(hykwce,baifentwo,baifenthree)
{
    var result;   //输出结果                    
    var flag = 0; //默认为0
    //会员卡完成额 < 百分之2提成基数标准
    if(hykwce < baifentwo)
    {   
        result = 0;  //输出0
        flag = 1;
    }
    //会员卡完成额 >= 百分之2提成基数标准 && 会员卡完成额 <百分之3提成基数标准
    else if(hykwce >= baifentwo && hykwce < baifenthree)
    {   
        result = 0.02;
        flag = 1;
    }
    //不符合以上情况
    else if(flag !=1)
    {
        result = 0.03;
    }
    else
    {

    }
    return result;
}
/**
 * 03图书产品提成金额    ok  通关实测
 * @param bookwcmoney  图书产品完成金额           取pos销售数据
 * @param renxiao      人效                      导入HR
 * @param star         星级                      HR
 * @param bookdcbl     图书产品达成比例           bookwcmoney/renxiao func:bookbol()方法
 */
function gongshithree(bookwcmoney,renxiao,star,bookdcbl)
{   
    var result;
    var flag = 0;
     //如果星级为空
     if(star == null)
     {
         result = "";
         result = 0;
         flag = 1;
     }
    //图书产品完成金额 / 人效 <0.8 && 图书产品完成金额 / 人效 >= 0.5 && 星级 = 0星
    if((bookwcmoney/renxiao) < 0.8 && (bookwcmoney/renxiao) >= 0.5 && star == 0)
    {
        result = ""; //跟上面的判断条件可能会重合,但是结果只输出一个 这里清空result
        //图书产品完成金额 * 0.025 * 图书产品达成比例
        result = bcmul(bcmul(bookwcmoney,0.025,3),bookdcbl,2);
        flag = 1; 
    }
    //如果图书产品完成金额 / 人效 < 0.8 && 图书产品完成金额/人效 >= 0.5 && 星级不等于0星
    else if ((bookwcmoney/renxiao) < 0.8 && (bookwcmoney/renxiao) >= 0.5 && star!= 0)
    {
        result = "";
        result = 0;
        flag = 1; 
    }
    //图书产品达成比例>=0.8 && 图书产品达成比例<=1
    if(bookdcbl >= 0.8 && bookdcbl <= 1)
    {
        result = ""; //跟上面的判断条件可能会重合,但是结果只输出一个 这里清空result
        //图书产品完成金额 * 图书产品达成比例 * 0.025
        result = bcmul(bcmul(bookwcmoney,bookdcbl,2),0.025,2)
        flag = 1; 
    }
    //(图书产品完成金额 - 人效) < 10000 && (图书产品完成金额-人效)>=0 
    if((bookwcmoney-renxiao) < 10000 && (bookwcmoney - renxiao) >=0)
    {
        result = "";
        result = bookwcmoney * 0.025;
        flag = 1;  
    }
    //(图书产品完成金额 - 人效) >= 10000 && (图书产品完成金额-人效) < 20000 
    else if((bookwcmoney-renxiao) >= 10000 && (bookwcmoney-renxiao) < 20000)
    {
        result = "";
        result = bcadd(bcmul(renxiao,0.025,3),bcmul(bcsub(bookwcmoney,renxiao,2),0.035,3),2);   
        flag = 1; 
    }
    //(图书产品完成金额 - 人效) >= 20000 && (图书产品完成金额-人效) < 30000 
    else if((bookwcmoney-renxiao)>=20000 && (bookwcmoney-renxiao) < 30000)
    {
        result = "";
        result = bcadd(bcmul(renxiao,0.025,3),bcmul(bcsub(bookwcmoney,renxiao,2),0.045,3),2); 
        flag = 1; 
    }
    //(图书产品完成金额 - 人效) >= 30000 && (图书产品完成金额-人效) < 40000
    else if((bookwcmoney-renxiao)>=30000 && (bookwcmoney-renxiao) < 40000)
    {
        result = "";
        result = bcadd(bcmul(renxiao,0.025,3),bcmul(bcsub(bookwcmoney,renxiao,2),0.055,3),2); 
        flag = 1; 
    }
    //(图书产品完成金额 - 人效) >= 40000 && (图书产品完成金额-人效) < 50000
    else if((bookwcmoney-renxiao)>=40000 && (bookwcmoney-renxiao) < 50000)
    {
        result = "";
        result = bcadd(bcmul(renxiao,0.025,3),bcmul(bcsub(bookwcmoney,renxiao,2),0.055,3),2); 
        flag = 1; 
    }
    //(图书产品完成金额 - 人效) >= 50000
    if((bookwcmoney-renxiao)>=50000)
    {
        result = "";
        //(图书产品完成金额 - 人效) * 0.075 + 人效 * 0.025
        result =  bcadd(bcmul(bcsub(bookwcmoney,renxiao,2),0.075,3),bcmul(renxiao,0.025,3),2);        
        flag = 1;     
    }
    else if(flag !=1)
    {
        result = 0;
    }
    return result;
}
/**
 * 04咖啡提成(第一个公式标准排班)                
 * @param cfsjb         咖啡师级别                 HR
 * @param cfpaiban      咖啡排班                   HR
 */
function gongshifourpp(cfsjb,cfpaiban)
{
    var result;
    var flag = 1;
    switch(cfsjb)
    {
        case '无级别':
        result = bcmul(cfpaiban,0.6,2);   //标准排班=咖啡排班*0.6
        break;
        case '吧员':
        result = cfpaiban;         //标准排班 = 咖啡排班
        result = result;
        break;
        case '初级咖啡师':          
        result = bcmul(cfpaiban,1.5,2);   //标准排班 = 咖啡排班* 1.5
        break;
        case '中级咖啡师':
        result = bcmul(cfpaiban,2,2);     //标准排班 = 咖啡排班* 2
        break;                      
        case '高级咖啡师':
        result = bcmul(cfpaiban,3,2);     //标准排班 = 咖啡排班 * 3
        break;
        default:
        result = 0;                //标准排班 = 0 
    }
    return result;
}
/**
 * 04咖啡提成(第二个公式提成金额)
 * @param coffwc        咖啡实际完成任务             取POS销售数据
 * @param coffjz        咖啡基准任务                 取POS咖啡基准任务    
 * @param zjdpdycfpb    整家店铺当月咖啡排班次数      取考勤
 * @param coffcebzpb    咖啡标准排班                 公式4排班计算
 */
function gongshifourtc(coffwc,coffjz,zjdpdycfpb,coffcebzpb)
{
    //咖啡实际完成任务 <  咖啡基准任务
    if(coffwc<coffjz)
    {
        result = 0;  //提成金额=0
    }
    else
    {
        //提成金额 = 咖啡实际完成任务*0.03 / 整家店铺当月咖啡排班次数*标准排班
        result =  bcmul(bcdiv(bcmul(coffwc,0.03,3),zjdpdycfpb,2),coffcebzpb,2);      
    }
    return result;
}
/**
 * 05餐区提成金额  ok 通关实测
 * @param cqxsje  餐厅销售金额                      取POS销售数据 
 * @param cqqtrx  餐区前厅人效                      导入HR
 * @param cqdcbl  餐区达成比例                      取上面的func cqdcbl1()
 */
//通过把上半部分if...else if 在下面相同判断时切割开 切成另一个if else 而不是跟着上面if else if 连着下来 判断 在中间将相同的判断验证清空了一次 
function gongshifive(cqxsje,cqqtrx,cqdcbl)
{
    var result;//返回结果
    var flag = 0;  //判断条件
    //餐区达成比例 < 0.5
    if(cqdcbl<0.5 && cqdcbl!=null)
    {
        result = 0; //结果为0
        flag = 1;
    }
    //餐区达成比例大于等于 0.5 并且 餐区达成比例小于0.8
    else if(cqdcbl>=0.5 && cqdcbl<0.8 && cqdcbl!=null)
    {
        result = bcmul(cqxsje,0.03,2); //餐区销售金额 * 0.03 
        flag = 1;
    }
    //餐区达成比例大于等于 0.8 并且 餐区达成比例小于1
    else if(cqdcbl>=0.8 && cqdcbl< 1 && cqdcbl!=null)
    {
        result = bcmul(cqxsje,0.05,2); //餐区销售金额 * 0.05
        flag = 1;
    }
    //(餐区销售金额-餐区前厅人效)>0 and (餐区销售金额-餐区前厅人效)<10000
    if((cqxsje - cqqtrx)> 0 && (cqxsje - cqqtrx) < 10000)
    { 
        result = ""; //因为0.05 这个点可能上面和下面这个同时满足 如果同时满足 从上面下来的数据会在下面拿上面的值进行计算
        result =  bcmul(cqxsje,0.05,2); //餐区销售金额 * 0.05
        flag = 1;
    }
    //(餐区销售金额-餐区前厅人效)>=10000 and (餐区销售金额-餐区前厅人效)<20000
    else if((cqxsje - cqqtrx) >= 10000 && (cqxsje - cqqtrx) < 20000 )
    {
        result = bcadd(bcmul((cqxsje - cqqtrx),0.06,2),bcmul(cqqtrx,0.05,2),2);
        flag = 1;
    }
    //(餐区销售金额-餐区前厅人效)>=20000 and (餐区销售金额-餐区前厅人效)<30000
    else if((cqxsje - cqqtrx) >= 20000 && (cqxsje - cqqtrx) < 30000 )
    {
        result = bcadd(bcmul((cqxsje - cqqtrx),0.07,2),bcmul(cqqtrx,0.05,2),2);
        flag = 1;
    }
    //(餐区销售金额-餐区前厅人效)>=30000 and (餐区销售金额-餐区前厅人效)<40000
    else if((cqxsje - cqqtrx) >= 30000 && (cqxsje - cqqtrx) < 40000 )
    {
        result = bcadd(bcmul((cqxsje - cqqtrx),0.08,2),bcmul(cqqtrx,0.05,2),2);
        flag = 1;
    }
    //(餐区销售金额-餐区前厅人效)>=40000 and (餐区销售金额-餐区前厅人效)<50000
    else if((cqxsje - cqqtrx) >= 40000 && (cqxsje - cqqtrx) < 50000 )
    {
        result = bcadd(bcmul((cqxsje - cqqtrx),0.09,2),bcmul(cqqtrx,0.05,2),2);
        flag = 1;
    }
    // 不符合以上情况
    else if(flag != 1)
    {
        result = bcadd(bcmul(bcsub(cqxsje,cqqtrx,2),0.1,2),bcmul(cqqtrx,0.05,2),2);
    }
    else 
    {

    }
    return result;
}
/**
 * 06包场提成金额 ok  通关实测
 * @param bcsjxse 包场实际销售额                    取POS销售数据
 */
function gongshisix(bcsjxse)
{
    var result;
    var flag = 0;
    if(bcsjxse < 15000)
    {   
       result = bcmul(bcsjxse,0.05,2); 
    }
    else if(bcsjxse >= 15000 && bcsjxse < 50000)
    {
        result = bcmul(bcsjxse,0.07,2);
    }
    else 
    {
        result = bcmul(bcsjxse,0.09,2);
    }
    return result;
}

//前四行的数据
function fourmock()
{
    var result;
    $.ajax({ 
        url: "https://wfhsport.cn/shopjcsj.php",    //前四行中默认加载的数据
        type: "get",
        async:false,
        cache:false,
        dataType: "json",
        success: function (res) {
            let data = res.data[0];
            console.log(data);
            //改变整家店铺当月咖啡排班次数
            zjshopmoncoffcepb = data.zjshopmonpbcs;
            console.log("整家店铺当月咖啡排班次数"+zjshopmoncoffcepb);

            $(".fgs").text(data.fgs);                    //分公司
            $(".md").text(data.md);                      //门店
            $(".tcyf").text(data.tcyf);                  //提成月份   
            $(".renxiao").text(data.rx);                 //人效

            $(".baifentwo").text(data.baifentwo);        //(会员卡)2%提成基数
            $(".baifenthree").text(data.baifenthree);    //(会员卡)3%提成基数
            $(".coffcejz").text(data.coffcejz);          //咖啡基准任务
            $(".coffceshiji").text(data.coffceshiji);    //咖啡实际完成任务

            $(".mdxjyyebz").text(data.mdxjyyebz);        //门店现金营业额标准值
            $(".mdxjyyewc").text(data.mdxjyyewc);        //门店现金营业额完成值
            $(".mdcwsrmb").text(data.mdcwsrmb);          //门店财务收入目标值
            $(".mdcwsrmbwc").text(data.mdcwsrmbwc);      //门店财务收入目标实际完成值

            $(".zjkbfpje").text();                       //公式1
            $(".ctqqrx").text(data.ctqqrx);              //餐厅前区人效
            // $(".cqqtrycount").text(data.cqqtrycount);    //餐区前厅人员数量
            // $(".cqrxzh").text(data.cqrxzh);              //餐区人效总和
        },
        error: function (msg) {
            alert("出错了！");
        }
    });
}


//第七行动态加载开始
function sevenstar(){
    //公共变量
    var mdxjyyebzmr = parseInt($("td.mdxjyyebz").text());         //门店现金营业额目标值
    var mdxjyyewcmr = parseInt($("td.mdxjyyewc").text());         //门店现金营业额完成值
    var mdcwmbsrmr =  parseInt($("td.mdcwsrmb").text());          //门店财务收入目标值
    var mdcwsrmbsjwcmr = parseInt($("td.mdcwsrmbwc").text());     //门店财务收入目标实际完成值

    //公式一计算结果
    var  gongshi1result =  gongshione(mdxjyyebzmr,mdxjyyewcmr,mdcwmbsrmr,mdcwsrmbsjwcmr); 
   
    //设置资金包可分配金额
    $(".zjkbfpje").text(gongshi1result);   


   //第七行开始动态加载中的部分默认数据
    $.ajax({ 
   url: "https://www.easy-mock.com/mock/5c88e30538f33553f9305eab/example/sevenmock",    //  第七行开始动态加载中的部分默认数据
   type: "get",
   async:false,
   cache:false,
   dataType: "json",
   success: function (res) {
       let data = res.data;
       console.log(data);




//动态生成表格以加载数据 加载数据之前先套用公式

//先添加7行 每行25列的数据
for(let i = 0;i<5;i++ )
{



       //在第六行添加动态添加的tr td表格列
       //倒叙的原因应该是最下面的底部蓝色框
       $("#tab1 tr.row9").before("<tr class='rowappend"+i+"'></tr>");
       for(let j=0;j<24;j++)
       {
           //如果等于第一列  序号列
           if(j == 0)
           {
               //那么在第一行的第一列加载这个name  外层循环1次 内层循环25次
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].number+"<input type='hidden' value='"+data[i].hidde+"'></td>");
              
           }
           //如果等于第二列  姓名列
           else if(j == 1)
           {
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].name+"<input type='hidden' value='"+data[i].position+"'></td>");
           }
           //如果等于第三列  咖啡师级别
           else if(j == 2)
           {
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].coffcelevel+"</td>");
           }
           //如果等于第四列  星级
           else if(j == 3)
           {
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].star+"</td>");
           }
             //如果等于第五列  会员卡实际完成总额
             else if(j == 4)
             {
                 $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].hyksjwcze+"</td>");
             }
             //如果等于第六列  会员卡提成比例
             else if(j == 5)
             {
                 //公式二计算
                 var  baifentwo = parseFloat($(".baifentwo").text());            //会员卡完成额
                 var   baifenthree = parseFloat($(".baifenthree").text());       //百分之2提成基数标准
                 //这一列的会员卡实际完成总额是动态生成的 所以需要+j的方式抓取
                 //列不动 固定抓取第4列  行会改变  获取动态变化行下不变的第4列的会员卡实际完成总额
                 var hykwce  = $("#tab1 tr.rowappend"+i).find('td').eq(4).text();         //百分之3提成基数标准
                 var gongshitworesult = gongshitwo(hykwce,baifentwo,baifenthree);   
                 $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+gongshitworesult+"</td>");
             }
             //会员卡提成金额 会员卡完成总额*会员卡提成比例
             else if(j == 6)
             {
                 //这一列的会员卡实际完成总额是动态生成的 所以需要+j的方式抓取
                 //列不动 固定抓取第4列  行会改变  获取动态变化行下不变的第4列的会员卡实际完成总额
                 var hykwce  = $("#tab1 tr.rowappend"+i).find('td').eq(4).text();         //会员卡完成总额
                 var hytcbl  = $("#tab1 tr.rowappend"+i).find('td').eq(5).text();         //会员卡提成比例                                                                      //会员卡提成比例
                 var hyktcje = bcmul(hykwce,hytcbl,2);                                    //会员卡提成金额 
                 
                 // gongshitwo();        
                 $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+hyktcje+"</td>");
             }
             //如果等于第8列  礼品卡实际完成总额
             else if(j == 7)
             {
                 $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].lpksjwcze+"</td>");
             }
             //如果等于第9列 礼品卡提成金额
             else if(j == 8)
             {
                 var lpksjwcje  = $("#tab1 tr.rowappend"+i).find('td').eq(7).text();         //礼品卡完成总额                                                                   //会员卡提成比例
                 var lpktcje = bcmul(lpksjwcje,0.02,2);

                 // gongshitwo();        
                 $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+lpktcje+"</td>");
             }
               //如果等于第十列  图书产品实际完成总额
            else if(j == 9)
            {
                   $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].booksjwcze+"</td>");
            }
            //如果等于第11列  图书产品达成比例  图书产品实际完成总额/人效
            else if(j == 10)
            {
               var tuwcze = $("#tab1 tr.rowappend"+i).find('td').eq(9).text(); //图书产品完成总金额
               var renxia = $(".renxiao").text();                              //人效
               var bookboool = bcdiv(tuwcze,renxia,2);
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+bookboool+"</td>");
            }
           //如果等于第12列  图书产品提成金额
           else if(j == 11)
           {
              var  bookwcmoney1 = $("#tab1 tr.rowappend"+i).find('td').eq(9).text();  //图书产品完成金额
              var  renxiao1 = $(".renxiao").text();                                   //人效
              var  star1 = $("#tab1 tr.rowappend"+i).find('td').eq(3).text();         //星级                                                    //星级
              var  bookdcbl1 = $("#tab1 tr.rowappend"+i).find('td').eq(10).text();    //图书产品达成比例                                                          //图书产品达成比例
              //公式3 计算图书产品达成比例                    
              var  gongshithreeresult = gongshithree(bookwcmoney1,renxiao1,star1,bookdcbl1);     
              //1400 2800 0  14 
              $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+gongshithreeresult+"</td>");
           }




           // 咖啡排班  咖啡出勤时长/7.5保留两位小数  咖啡出勤时长通关工号去取考勤里面的数据
           else if(j == 12)
           {
               var  jobnumber = $("#tab1 tr.rowappend"+i).find('td').eq(0).find("input").val(); //个人工号 这是一个隐藏域 取当中的value
               var  jobcoffcekqsc =  jobcoffcehour(jobnumber);      //根据工号获得个人咖啡出勤时长
               var  coffcepaiban = bcdiv(jobcoffcekqsc[i],7.5,2);   //因为返回的是一个数组 后面应该是返回单个的 后面可以把那个[i]去掉 
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+coffcepaiban+"</td>");
           }


           
           // 咖啡标准排班  公式4
           else if(j == 13)
           {
               var coffcejb1 = $("#tab1 tr.rowappend"+i).find('td').eq(2).text(); //咖啡师级别
               var coffpb = $("#tab1 tr.rowappend"+i).find('td').eq(12).text();   //咖啡排班
               var gongshifouresult =   gongshifourpp(coffcejb1,coffpb);          //公式4排班得出的值
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+coffcepaiban+"</td>");
           }

           // 咖啡提成金额  公式4
           else if(j == 14)
           {
               var coffwc = $(".coffceshiji").text();//咖啡实际完成任务
               var coffjz = $(".coffcejz").text();   //咖啡基准任务 
               var coffcebzpb = $("#tab1 tr.rowappend"+i).find('td').eq(12).text(); //咖啡标准排班
               var coffceresult = gongshifourtc(coffwc,coffjz,zjshopmoncoffcepb,coffcebzpb); //咖啡提成金额
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+coffceresult+"</td>");
           }
            //餐厅前区销售金额
           else if(j == 15)
           {
                   $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].cantingqqtc+"</td>");
           }
             //餐厅前区达成比例
           else if(j == 16)
           {
                   var cantingqqjie = $("#tab1 tr.rowappend"+i).find('td').eq(15).text(); //餐厅前区金额
                   var cantingqqrx = $(".ctqqrx").text();           //餐厅前区人效
                   var cantingqqdcbl = bcdiv(cantingqqjie,cantingqqrx,2);  //餐厅前区达成比例 =餐厅前区金额/餐厅前区人效
                   $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+cantingqqdcbl+"</td>");
           }
             //餐厅前区提成金额
           else if(j == 17)
           {
                     var cantingqqjie = $("#tab1 tr.rowappend"+i).find('td').eq(15).text();    //餐厅前区金额
                     var cantingqqrx = $(".ctqqrx").text();                                    //餐厅前区人效
                     var cantingqqdcbl = $("#tab1 tr.rowappend"+i).find('td').eq(16).text();   //餐厅前区达成比例
                     var gongshifiveresult = gongshifive(cantingqqjie,cantingqqrx,cantingqqdcbl);
                     
                     $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+gongshifiveresult+"</td>");
           }
           else if(j == 21)
           {
                   $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+data[i].bcsjxse+"</td>");
           }
           //为了那一列添加checkbox
           else  if(j == 18)
           {

               $("#tab1 tr.rowappend"+i).append("<td ><input type='checkbox' class='checkbo' style='margin-left:15px' ></td>'"+j+"'</td>");
           }
           //为那一列添加input输入框
           else if(j == 19)
           {


            
            //    $("#tab1 tr.rowappend"+i).append("<td class='inpu"+j+"'><input type='text'     value = '' placeholder='请输入分配比例' style='margin:2px 10px 2px 10px'></td>'"+j+"'</td>");
               
            //    //事实监听每个input框内的值

            //    $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").trigger("propertychange");

            //    $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").bind('input onpropertychange', function() {

            //       console.log($(this).val());
            //       //首先判断输入的值是否>=0  
            //       var thisval = $(this).val().trim();
            //       thisval = thisval.replace(/^$|([^\d|.])/g, ''); //除小数点和数字可以 剩下都不行
            //       var  chengvalue = 0;
            //       console.log(typeof thisval);
            //       if(thisval)
            //       {
            //         //这种数据太错乱了 不好监视  在下面的话用一个变量存储每个check后面input的值 相加大于1的时候就清空
            //         var zhiwei = $("#tab1 tr.rowappend"+i).find('td').eq(1).find("input").val();
            //         if(zhiwei == "区域店经理" && thisval > 0.3 && thisval<1)
            //         {
            //             alert("区域店长可填写分配比例不能超过0.3");
            //             $(this).val("");
            //         }else if(zhiwei == "店长" && thisval > 0.6 && thisval<1)
            //         {               
            //             alert("店长可填写分配比例不能超过0.6");
            //             $(this).val("");
            //         }
            //       }
            //       //如果为负数
            //       else  
            //       {
            //         $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").val(""); //清空掉它输入的值
            //       }
            //    });

            //    //ie版本的实时监听

            
            //测试
                      
            $("#tab1 tr.rowappend"+i).append("<td class='inpu"+j+"'><input type='text'  name='bl'   value = '' placeholder='请输入分配比例' style='margin:2px 10px 2px 10px'></td>'"+j+"'</td>");
               
            //    //事实监听每个input框内的值

            //    $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").trigger("propertychange");

            //    $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").bind('input OnInput', function() {

            //       //首先判断输入的值是否>=0  
            //       var thisval = $(this).val().trim(); //当前输入框内的值
            //       thisval = thisval.replace(/^$|([^\d|.])/g, ''); //除小数点和数字可以 剩下都不行
            //       var  chengvalue = 0;
            //       console.log(thisval);
            //       if(thisval)
            //       {
                  

            //         //这种数据太错乱了 不好监视  在下面的话用一个变量存储每个check后面input的值 相加大于1的时候就清空
            //         // var zhiwei = $("#tab1 tr.rowappend"+i).find('td').eq(1).find("input").val();

            //         //职位 
            //         var zhiwei = $("#tab1 tr.rowappend"+i).find("td").eq(1).find("input").val();
            //         console.log(zhiwei);
            //         if(zhiwei == "区域店经理" && thisval > 0.3 && thisval<1)
            //         {
            //             alert("区域店长可填写分配比例不能超过0.3");
            //             $(this).val("");
            //         }else if(zhiwei == "店长" && thisval > 0.6 && thisval<1)
            //         {               
            //             alert("店长可填写分配比例不能超过0.6");
            //             $(this).val("");
            //         }
            //       }
            //       //如果为负数
            //       else  
            //       {
            //         $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").val(""); //清空掉它输入的值
            //       }
            //    });



           }
           //门店奖金包分配金额
           else if(j == 20)
           {
               var  jjbkfpje = $(".zjkbfpje").text();                                           //奖金包可分配金额
               var  jjbkfpbl = $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").val(); //奖金包可分配比例
               var  mdjjbfpresult = bcmul(jjbkfpje,jjbkfpbl,2);                                 //门店奖金包分配金额
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+mdjjbfpresult+"</td>");
           }
           //包场提成金额
           else if(j == 22)
           {
               var  bcsjxse = $("#tab1 tr.rowappend"+i).find('td').eq(21).text(); //包场实际销售额
               var gongshisixresult = gongshisix(bcsjxse);
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+gongshisixresult+"</td>");
           }
           else if(j == 23)
           {
               var hyktc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(6).text());   //会员卡提成
               
               var lpktc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(8).text());   //礼品卡提成

               var booktc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(11).text());   //图书产品提成

               var coffcetc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(14).text()); //咖啡提成

               var ctqqtc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(17).text());   //餐区前厅提成

               var fptc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(20).text());     //门店分配提成

               var bctc = parseInt($("#tab1 tr.rowappend"+i).find('td').eq(22).text());     //包场提成

               var sumresult = parseInt(hyktc)+parseInt(lpktc)+parseInt(booktc)+parseInt(coffcetc)+parseInt(ctqqtc)+parseInt(fptc)+parseInt(bctc);

               //    console.log(sumresult);
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+sumresult+"</td>");
               
           }
           else
           {
               $("#tab1 tr.rowappend"+i).append("<td class='apptd"+j+"' style='text-align:center'>"+j+"</td>");
           }
       }
}
   },
   error: function (msg) {
       alert("出错了！");
   }
    });

}





// 初始化加载
$(function() {    

    //上面四行的默认加载的数据
    fourmock();
    //第七行动态数据开始
    sevenstar();




    //重点    


    //判断check的分配比例相加是否大于0
    var fpblsum = 0;
    //管理组功能   而且在checkbox选中状态发生改变时  后面合计的值也会发生改变
    $(".checkbo").click(function(){  //这是整个td  并不是抓的下面的checkbox  如果想只抓下面的checkbox的话 下面的选项我们都加上par
     
      if($(this).prop("checked")){  //check
         //如果选中状态为选中并且input的框内没有值  那么就将选择状态取消
         if($(this).prop("checked")&&$(this).parent().nextAll().eq(0).find("input").val() == "")
         {
            alert("请输入门店奖金包分配分配比例");
            $(this).prop("checked",false); //将选中状态设置为false
         }
         else //下面有值也选中了  上面是没值想选中
         {  
                //如果选中那么要进行选中的比例相加是否大于1的计算 将选中行中分配比例的的值相加 如果大于1 就清空 店长不超过0.6 区经不超过0.3
                //比例的值要相加都小于1 下面的才可以计算总和
                //首先我们要先判断 店长不超过0.6 区域经理不超过0.3  check的所有行的分配比例相加不大于1
                //我觉得 区域经理 和店长的等级在上面的input中判断 合计是否大于1的在下面checkbox选中的时候进行判断 
                
                fpblsum += parseFloat($(this).parent().nextAll().eq(0).find("input").val());
                if(fpblsum >1)
                {
                    //如果当它大于1后 重置为0
                    fpblsum = 0;
                    alert("当前分配比例合计已大于1");
                    $(this).parent().nextAll().eq(0).find("input").val("");//将该内容清空
                    $(this).prop("checked",false);//将checkbox选择状态设置为false
                }
                else //否则按职位相加 不大于0 可以进行
                {
                    var sefenpeibili;//分配比例
                    //进来先进行一个是否为空的判断  如果为空就赋值 不为空会在下面取值
                    if($(this).parent().nextAll().eq(0).find("input").val() == "") //如果输入框内没有值并且已选中 那么就赋值
                    {
                        $(this).parent().nextAll().eq(0).find("input").val(sefenpeibili);
                    }
                    else
                    {
                        sefenpeibili = "";
                        sefenpeibili = $(this).parent().nextAll().eq(0).find("input").val();
                    }
                    console.log("check");

                    
           
                    //当勾选时进行店铺金额的计算  比例*可包分配金额
                   var fenpeibl = $(this).parent().nextAll().eq(0).find("input").val(); //门店奖金包分配比例
                   
                   var jjbkfpje = parseFloat($(".zjkbfpje").text());           //门店奖金可包分配金额
           
                   var mdjjfpje = bcmul(fenpeibl,jjbkfpje,2);
                   $(this).parent().nextAll().eq(1).text(mdjjfpje);
                   
                    //修改提成合计
                    var hyktc = parseFloat($(this).parent().prevAll().eq(11).text());   //会员卡提成
                    
                   var lpktc = parseFloat($(this).parent().prevAll().eq(9).text());   //礼品卡提成
           
                   var booktc = parseFloat($(this).parent().prevAll().eq(6).text());   //图书产品提成
           
                   var coffcetc = parseFloat($(this).parent().prevAll().eq(3).text()); //咖啡提成
           
                   var ctqqtc = parseFloat($(this).parent().prevAll().eq(0).text());   //餐区前厅提成
           
                   var fptc = parseFloat($(this).parent().nextAll().eq(1).text());     //门店分配提成
           
                   var bctc = parseFloat($(this).parent().nextAll().eq(3).text());     //包场提成
           
                   var tcsum = parseFloat(hyktc) + parseFloat(lpktc) + parseFloat(booktc) + parseFloat(coffcetc) + parseFloat(ctqqtc) + parseFloat(fptc) + parseFloat(bctc);
                   $(this).parent().nextAll().eq(4).text(tcsum);     
                   $(this).prop("checked",true);
                   
                }
          
         }
         }
      else                           //nocheck
      { 
        console.log("nocheck");
        $(this).parent().nextAll().eq(0).find("input").val("");  
        $(this).parent().nextAll().eq(1).text(0.00); 
        //如果未选 将选中状态选中


        //当状态为未选中的时候总计里面会减去包场分配的提成金额
        $(this).prop("checked",false);
              //修改提成合计
              var hyktc = parseFloat($(this).parent().prevAll().eq(11).text());   //会员卡提成
         
              var lpktc = parseFloat($(this).parent().prevAll().eq(9).text());   //礼品卡提成
      
              var booktc = parseFloat($(this).parent().prevAll().eq(6).text());   //图书产品提成
      
              var coffcetc = parseFloat($(this).parent().prevAll().eq(3).text()); //咖啡提成
      
              var ctqqtc = parseFloat($(this).parent().prevAll().eq(0).text());   //餐区前厅提成
      
              var fptc = parseFloat($(this).parent().nextAll().eq(1).text());     //门店分配提成
      
              var bctc = parseFloat($(this).parent().nextAll().eq(3).text());     //包场提成
      
              var tcsum = parseFloat(hyktc) + parseFloat(lpktc) + parseFloat(booktc) + parseFloat(coffcetc) + parseFloat(ctqqtc) + parseFloat(fptc) + parseFloat(bctc);
              $(this).parent().nextAll().eq(4).text(tcsum);   
      }         
    });

    //关于分配比例那一列相加不能超过1的想法
    //每当分配比例input的value的值发生改变的时候 就去检测相加的结果是否大于1 如果大于1禁用下面的input
    //当分配比例发生改变的时候 后面合计的值也要发生改变

    //关于提成合计   然后checkbox和input的值发生改变的时候sum也会发生改变
    

    //分配比例

    $("input[name=bl]").bind('input OnInput',function(){
        var val = $(this).val().trim();
        val = val.replace(/^$|([^\d|.])/g, ''); //回去改下正则表达式 看下数据是否按公式在跑
        console.log(val)
        console.log($(this).parent().parent().find("td").eq(1).find("input").val());

        var  chengvalue = 0;
            if(val)
                  {
                  
                    //这种数据太错乱了 不好监视  在下面的话用一个变量存储每个check后面input的值 相加大于1的时候就清空
                    // var zhiwei = $("#tab1 tr.rowappend"+i).find('td').eq(1).find("input").val();

                    //职位 
                    var  zhiwei = $(this).parent().parent().find("td").eq(1).find("input").val()
                    console.log(zhiwei);
                    if(zhiwei == "区域店经理" && val > 0.3 && val<1)
                    {
                        alert("区域店长可填写分配比例不能超过0.3");
                        $(this).val("");
                    }else if(zhiwei == "店长" && val > 0.6 && val<1)
                    {               
                        alert("店长可填写分配比例不能超过0.6");
                        $(this).val("");
                    }
                  }
                  //如果为负数
                  else  
                  {
                     $(this).parent().parent().find('td').eq(19).find("input").val(""); //清空掉它输入的值
                  }


            //       thisval = thisval.replace(/^$|([^\d|.])/g, ''); //除小数点和数字可以 剩下都不行
            //       var  chengvalue = 0;
            //       console.log(thisval);
            //       if(thisval)
            //       {
                  

            //         //这种数据太错乱了 不好监视  在下面的话用一个变量存储每个check后面input的值 相加大于1的时候就清空
            //         // var zhiwei = $("#tab1 tr.rowappend"+i).find('td').eq(1).find("input").val();

            //         //职位 
            //         var zhiwei = $("#tab1 tr.rowappend"+i).find("td").eq(1).find("input").val();
            //         console.log(zhiwei);
            //         if(zhiwei == "区域店经理" && thisval > 0.3 && thisval<1)
            //         {
            //             alert("区域店长可填写分配比例不能超过0.3");
            //             $(this).val("");
            //         }else if(zhiwei == "店长" && thisval > 0.6 && thisval<1)
            //         {               
            //             alert("店长可填写分配比例不能超过0.6");
            //             $(this).val("");
            //         }
            //       }
            //       //如果为负数
            //       else  
            //       {
            //         $("#tab1 tr.rowappend"+i).find('td').eq(19).find("input").val(""); //清空掉它输入的值
            //       }




    })

     
});






//先要为这每一个请输入分配比例加一个唯一的标识 然后抓取父元素往前抓

// $("table input[placeholder='请输入分配比例']").bind('input OnInput',function (){
//     var val =$(this).val();
//     console.log(val)
//     console.log($(this).parent().parent().find("td").eq(1).find("input").val())
// })
