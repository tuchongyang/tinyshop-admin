import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/setting',
    component: Layout,
    redirect: '/setting/person',
    children: [
        {
            path: 'person',
            component: ()=>import('./person'),
        },
        {
            path: 'shop',
            component: ()=>import('./shop'),
        },
        {
            path: 'banner',
            component: ()=>import('./banner'),
        },
        {
            path: 'banner/edit',
            component: ()=>import('./banner/edit'),
        },
    ]
}]