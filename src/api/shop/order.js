import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/shop/order/save',params),
    list:(params)=>axios.get('/api/shop/order',{params}),
    detail:(id)=>axios.get('/api/shop/order/'+id),
    remove:(id)=>axios.delete('/api/shop/order/'+id),
    update:(params)=>axios.post('/api/shop/order/update',params),
}