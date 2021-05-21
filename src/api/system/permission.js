import axios from '@/api';
export default{
    list:(params)=>axios.get('/api/system/permission',{params}),
    select:(params)=>axios.get('/api/system/permission/list',{params}),
    save:(opt)=>axios.post('/api/system/permission/save',opt),
    remove:(id)=>axios.delete('/api/system/permission/'+id),
}