import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/shop/good/save',params),
    list:(params)=>axios.get('/api/shop/good',{params}),
    detail:(id)=>axios.get('/api/shop/good/'+id),
    remove:(id)=>axios.delete('/api/shop/good/'+id),
    update:(params)=>axios.post('/api/shop/good/update',params),
}