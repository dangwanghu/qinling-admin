var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CUNZHUANG_BASE_URL: '"cunzhuangapi"',
  DICT_BASE_URL: '"dictapi"',
  JINGDIAN_BASE_URL: '"jingdianapi"',
  SHANFENG_BASE_URL: '"shanfengapi"',
  YUKOU_BASE_URL: '"yukouapi"',
  ZONGJIAO_BASE_URL: '"zongjiaoapi"',
  MANAGER_BASE_URL: '"managerapi"',
  ROLE_BASE_URL: '"roleapi"'
})
