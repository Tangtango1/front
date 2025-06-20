const menu = {
  list() {
    return [
      {
        backMenu: [
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '删除'],
                menu: '管理员管理',
                menuJump: '列表',
                tableName: 'users',
              },
            ],
            menu: '管理员管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '删除'],
                menu: '商家管理',
                menuJump: '列表',
                tableName: 'shangjia',
              },
            ],
            menu: '商家管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '状态', '删除'],
                menu: '用户管理',
                menuJump: '列表',
                tableName: 'yonghu',
              },
            ],
            menu: '用户管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '删除'],
                menu: '食堂管理',
                menuJump: '列表',
                tableName: 'shitang',
              },
            ],
            menu: '食堂管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '报表', '删除'],
                menu: '美食管理',
                menuJump: '列表',
                tableName: 'meishi',
              },
              {
                buttons: ['查看', '修改', '删除'],
                menu: '美食评价管理',
                menuJump: '列表',
                tableName: 'meishiCommentback',
              },
              {
                buttons: ['查看', '删除'],
                menu: '美食收藏管理',
                menuJump: '列表',
                tableName: 'meishiCollection',
              },
              {
                buttons: ['订单', '查看', '报表', '删除'],
                menu: '美食订单管理',
                menuJump: '列表',
                tableName: 'meishiOrder',
              },
            ],
            menu: '美食管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '删除', '修改'],
                menu: '美食类型管理',
                menuJump: '列表',
                tableName: 'dictionaryMeishi',
              },
              {
                buttons: ['查看', '新增', '删除', '修改'],
                menu: '公告类型管理',
                menuJump: '列表',
                tableName: 'dictionaryNews',
              },
              {
                buttons: ['查看', '新增', '删除', '修改'],
                menu: '商家类型管理',
                menuJump: '列表',
                tableName: 'dictionaryShangjia',
              },
              {
                buttons: ['查看', '新增', '删除', '修改'],
                menu: '食堂类型管理',
                menuJump: '列表',
                tableName: 'dictionaryShitang',
              },
            ],
            menu: '基础数据管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '删除'],
                menu: '论坛管理',
                menuJump: '列表',
                tableName: 'forum',
              },
            ],
            menu: '论坛管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '删除'],
                menu: '新闻公告管理',
                menuJump: '列表',
                tableName: 'news',
              },
            ],
            menu: '新闻公告管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '删除'],
                menu: '轮播图管理',
                menuJump: '列表',
                tableName: 'config',
              },
            ],
            menu: '轮播图信息',
          },
          /*,{
			    "child":[
			        {
			            "buttons":[
			                "查看"
			            ],
			            "menu":"数据备份",
			            "menuJump":"列表",
			            "tableName":"beifen"
			        },
					{
					    "buttons":[
					        "查看"
					    ],
					    "menu":"数据还原",
					    "menuJump":"列表",
					    "tableName":"huanyuan"
					}
			    ],
			    "menu":"数据库管理"
			}*/
        ],
        frontMenu: [],
        hasBackLogin: '是',
        hasBackRegister: '否',
        hasFrontLogin: '否',
        hasFrontRegister: '否',
        roleName: '管理员',
        tableName: 'users',
      },
      {
        backMenu: [
          {
            child: [
              {
                buttons: ['查看'],
                menu: '食堂管理',
                menuJump: '列表',
                tableName: 'shitang',
              },
            ],
            menu: '食堂管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '修改', '报表', '删除'],
                menu: '美食管理',
                menuJump: '列表',
                tableName: 'meishi',
              },
              {
                buttons: ['查看', '修改'],
                menu: '美食评价管理',
                menuJump: '列表',
                tableName: 'meishiCommentback',
              },
              {
                buttons: ['查看'],
                menu: '美食收藏管理',
                menuJump: '列表',
                tableName: 'meishiCollection',
              },
              {
                buttons: ['订单', '查看', '报表', '删除'],
                menu: '美食订单管理',
                menuJump: '列表',
                tableName: 'meishiOrder',
              },
            ],
            menu: '美食管理',
          },
          {
            child: [
              {
                buttons: ['查看', '新增', '删除'],
                menu: '论坛管理',
                menuJump: '列表',
                tableName: 'forum',
              },
            ],
            menu: '论坛管理',
          },
          {
            child: [
              {
                buttons: ['查看'],
                menu: '新闻公告管理',
                menuJump: '列表',
                tableName: 'news',
              },
            ],
            menu: '新闻公告管理',
          },
        ],
        frontMenu: [],
        hasBackLogin: '是',
        hasBackRegister: '否',
        hasFrontLogin: '否',
        hasFrontRegister: '否',
        roleName: '商家',
        tableName: 'shangjia',
      },
    ]
  },
}
export default menu
