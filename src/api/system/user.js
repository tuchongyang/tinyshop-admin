import axios from '@/api';
export default{
    login:(params)=>axios.post('/api/system/user/login',params),
    logout:()=>axios.get('/api/system/user/logout'),
    save:(params)=>axios.post('/api/system/user/save',params),
    info:()=>axios.get('/api/system/user/info'),
    list:(params)=>axios.get('/api/system/user',{params}),
    remove:(id)=>axios.delete('/api/system/user/'+id),
    detail:(id)=>axios.get('/api/system/user/detail/'+id),
    update:(params)=>axios.post('/api/system/user/update',params),
    menu:()=>axios.get('/api/system/user/menu'),
}