import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/setting',
    component: Layout,
    redirect: '/setting/person',
    children: [
        {
            path: 'person',
            component: ()=>import('./views/person'),
        },
        {
            path: 'shop',
            component: ()=>import('./views/shop'),
        },
        {
            path: 'banner',
            component: ()=>import('./views/banner'),
        },
        {
            path: 'banner/edit',
            component: ()=>import('./views/banner/edit'),
        },
    ]
}]