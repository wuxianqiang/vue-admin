import List from '@/views/list/list.vue'
import Home from '@/views/home/home.vue'
import About from '@/views/about/about.vue'
import Layout from '@/components/layout/layout.vue'
import UserList from '@/views/userList/userList.vue'
import InputList from '@/views/inputList/inputList.vue'
import ShowList from '@/views/showList/showList.vue'
import MessageList from '@/views/messageList/messageList.vue'
import ButtonList from '@/views/buttonList/buttonList.vue'

export const authRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'list',
        name: 'List',
        component: List,
        children: [
          {
            path: 'userList',
            name: 'UserList',
            component: UserList,
            meta: {
              bread: '表格组件'
            }
          },
          {
            path: 'inputList',
            name: 'InputList',
            component: InputList,
            meta: {
              bread: '表单组件'
            }
          },
          {
            path: 'buttonList',
            name: 'ButtonList',
            component: ButtonList,
            meta: {
              bread: '按钮组件'
            }
          },
          {
            path: 'showList',
            name: 'ShowList',
            component: ShowList,
            meta: {
              bread: '折叠面'
            }
          },
          {
            path: 'messageList',
            name: 'MessageList',
            component: MessageList,
            meta: {
              bread: '消息弹窗'
            }
          }
        ],
        meta: {
          bread: '组件列表',
        }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          bread: '关于'
        }
      }
    ],
    meta: {
      bread: '首页',
      url: '/home'
    }
  }
]
