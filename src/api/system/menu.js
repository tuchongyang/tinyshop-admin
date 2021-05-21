import axios from '@/api';
export default{
    tree:(params)=>axios.get('/api/system/menu/tree',{params}),
    list:(params)=>axios.get('/api/system/menu',{params}),
    select:(params)=>axios.get('/api/system/menu/list',{params}),
    save:(opt)=>axios.post('/api/system/menu/save',opt),
    remove:(id)=>axios.delete('/api/system/menu/'+id),
}