import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/system/file/save',params),
    list:(params)=>axios.get('/api/system/file',{params}),
    remove:(id)=>axios.delete('/api/system/file/'+id),
    update:(params)=>axios.post('/api/system/file/update',params),
}