import axios from '@/api';
export default{
    list:(params)=>axios.get('/api/system/role',{params}),
    select:(params)=>axios.get('/api/system/role/list',{params}),
    detail:(id)=>axios.get('/api/system/role/'+id),
    save:(opt)=>axios.post('/api/system/role/save',opt),
    remove:(id)=>axios.delete('/api/system/role/'+id),
    //角色菜单保存
    menuSave:(id,opt)=>axios.post('/api/system/role/'+id+'/menu',opt),
    //角色菜单列表
    menuList:(id)=>axios.get('/api/system/role/'+id+'/menu'),
    //角色权限列表
    authList:(id)=>axios.get('/api/system/role/'+id+'/permission'),
    //角色权限保存
    authSave:(id,opt)=>axios.post('/api/system/role/'+id+'/permission',opt),
}