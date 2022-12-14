
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',name:'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login',name:'login', component: () => import('pages/Login.vue') },
      { path: 'register',name:'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation',name:'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password',name:'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password',name:'reset-password', component: () => import('pages/ResetPassword.vue') },


    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'me',name:'me', component: () => import('pages/Me.vue') },
      { path: 'category',name:'category', component: () => import('src/pages/Category/List.vue') },
      { path: 'form-category/:id?',name:'form-category', component: () => import('pages/Category/Form.vue') },
      { path: 'product',name:'product', component: () => import('src/pages/Product/List.vue') },
      { path: 'form-product/:id?',name:'form-product', component: () => import('pages/Product/Form.vue') },
      { path: 'product-public/:id',name:'product-public', component: () => import('pages/Product/Public.vue') },
      { path: 'mycart/:id',name:'mycart', component: () => import('pages/Cart/Cart.vue') },




    ],
    meta : {
      requiresAuth : true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
