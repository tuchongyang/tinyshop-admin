import axios from '@/api'
export default{
    list:(params)=>axios.get('/shop/banner'),
    save:(params)=>axios.post('/shop/banner/save',params),
    remove:(id)=>axios.delete('/shop/banner/'+id),
    detail:(id)=>axios.get('/shop/banner/'+id),
}