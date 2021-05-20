import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/shop/category/save',params),
    select:(params)=>axios.get('/api/shop/category/list',{params}),
    list:(params)=>axios.get('/api/shop/category',{params}),
    tree:(params)=>axios.get('/api/shop/category/tree',{params}),
    remove:(id)=>axios.delete('/api/shop/category/'+id),
    update:(params)=>axios.post('/api/shop/category/update',params),
}