import { dateFormat, formatTime } from '@/utils'
import {constantMap} from '@/utils/constant'
import store from "@/store";
/**
 * @description     数字 格式化
 *
 * @param       { num:Number, digits:Number } num为要转化的源数字，digits为保留小数点位数
 * @return      { String }              必反，返回转化后的数字字符串
 *
 * @example     numberFormatter(145678,2)  =>  14.57万
 * */
export function numberFormatter(num, digits) {
    const si = [
        { value: 1E12, symbol: '万亿' },
        { value: 1E8, symbol: '亿' },
        { value: 1E4, symbol: '万' },
        { value: 1E3, symbol: '千' }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}


/**
 * @description     时间 格式化
 *
 * @param       { timeStamp:Number }    timeStamp为时间搓
 * @return      { String }              必反，返回转化后的时间字符串
 *
 * */

 export function time(timeStamp,farmat){
    return timeStamp?dateFormat(timeStamp,farmat) : '--'
 }


/**
 * @description     空白占位符
 *
 * @return      { String }              数据为空时显示 --
 *
 * */
 export function emptyFilter(val){
    return (val===''||val===null||val==undefined)?'--':val;
 }

/**
 * @description     枚举类型（常量转换）
 *
 * */

export function constant(input,name){
    var ref = constantMap[name];
    try {
        if(typeof input == null || typeof input == "undefined" || input === ""){
            return '--'
        }{
            for (var i = 0; i < ref.length; i++) {
                if (ref[i].value == input) {
                    break ;
                }
            }
            return ref[i] && ref[i].displayName||ref[i].label || input;
        }
    }catch (e){
       return input
    }
}


export function castFilter(num,digit) {
    if(!digit){
        digit = 2;
    }
    if(!num){
        return '0.'+new Array(digit).fill('0').join('');
    }
    num = parseFloat(num).toFixed(digit);//-0.0005返回仍然是-0.00
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if(num == '-0' || num=='-0.00'){parts[0] = 0;}
    return parts.join(".");
}


/*
* 为邮箱和电话号码打掩码
*
* 格式：12****23
* */

export function maskSecret(val){
    let maskSecret = store.getters.maskSecret;
    let isSecret = maskSecret.value;// 返回值："true"
    if(!val) {
        return '--'
    }
    let str = val+'';
    if(isSecret){
        str = val.substr(0,2)+'****'+val.substr(val.length-2,2)
    }else {
        str = val;
    }
    return str;
}
