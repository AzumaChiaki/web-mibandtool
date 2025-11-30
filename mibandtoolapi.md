# MiBandTool API 详细开发文档
api根域名：https://www.mibandtool.club:9073
## 概述

MiBandTool API 提供了小米手环表盘自定义工具的完整接口，包括表盘列表获取、评论管理、用户登录、文件上传下载等功能。本文档为开发者提供详细的API使用指南。

## 基础信息

- **API版本**: 1.0.0
- **OpenAPI版本**: 3.1.0
- **基础URL**: 根据具体部署环境确定
- **数据格式**: JSON
- **字符编码**: UTF-8
- **认证方式**: 米坛OAuth2认证

## 认证机制

### 米坛OAuth2认证

**认证URL**: 
```
https://www.bandbbs.cn/oauth2/authorize?type=authorization_code&client_id=6253518017122039&redirect_uri=https://api.bandbbs.cn/wftools/bandbbs.html&response_type=code&scope=user:read user:write resource_check:read resource:read&state=web
```

**认证流程**:
1. 用户访问认证URL进行授权
2. 获取授权码(code)
3. 使用授权码调用登录接口获取访问令牌

## API 接口详细说明

### 1. 表盘相关接口

#### 1.1 获取首页作品列表

**接口地址**: `GET /watchface/listbytag/{sort}/{page}/{pageSize}/{unknown}`

**功能描述**: 获取首页作品列表，支持按类型排序

**路径参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| sort | Number | 是 | 排序类型 (0-最新上传, 1-最多下载) | 0 |
| page | Number | 是 | 页码 (从1开始) | 1 |
| pageSize | Number | 是 | 每页数量 | 10 |
| unknown | Number | 是 | 未知参数，默认9999 | 9999 |

**请求头**:
```
type: {{type}} (必需) - 设备类型标识
```

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": 1842050,
      "nickname": "孤伤1",
      "name": "太空战舰",
      "desc": "游戏介绍/目标： 操控战机击败敌机提高分数，躲避陨石保护自己\n\n游戏操作：左滑=左移 右滑=右移 上滑=退出 点击屏幕=发射子弹\n\n售价1.7\n\n购买方式\n\n爱发电https://afdian.com/item/884c6c0c9eb311f096305254001e7c00\n\n复制浏览器http://zy.gs0910.top\n\n客服：kf.gs0910.top",
      "isShare": 1,
      "downloadTimes": 3181,
      "preview": "http://42.192.61.143:8085/userupload_fba0379fcf3c4483a3bedf5fb8c81288/preview.jpg",
      "previewAod": null,
      "filePath": "userupload_fba0379fcf3c4483a3bedf5fb8c81288/preview.jpg",
      "qiniuPath": null,
      "isReview": 1,
      "isMake": 0,
      "createdAt": 1759317337000,
      "updatedAt": 1764460005000,
      "type": "o66",
      "total": null,
      "views": 21926,
      "isRecommend": 1,
      "donation": "1",
      "tagcondition": "",
      "isTag": 1,
      "filesize": 113011,
      "previewstr": null,
      "mitantid": "4298",
      "mitantype": "r"
    }
  ]
}
```

#### 1.2 获取付费资源列表

**接口地址**: `GET /watchface/list/recommendsbytag/{page}/{pageSize}/{unknown}`

**功能描述**: 获取付费推荐资源列表

**路径参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| page | Number | 是 | 页码 (从1开始) | 1 |
| pageSize | Number | 是 | 每页数量 | 10 |
| unknown | Number | 是 | 未知参数，默认9999 | 9999 |

**请求头**:
```
type: {{type}} (可选) - 设备类型标识
```

#### 1.3 增加观看量

**接口地址**: `GET|POST /watchface/add/views`

**功能描述**: 增加表盘的观看量统计

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| id | String | 否 | 表盘ID | 1811628 |

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": ""
}
```

#### 1.4 下载文件

**接口地址**: `POST /watchface/downloadUsr`

**功能描述**: 下载表盘文件

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| id | String | 否 | 表盘ID | 1846098 |

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": "http://res9.mibandtool.club:8087/userupload_91e2ad281dda4ee890da33033a4d63aa%2F%E4%BF%AE%E4%BB%99.bin?e=1764474761&token=YujWHj0uPk55yOVDu0spSfXfwmNR79_98plad_zG:WqPszHp7WVjWdIatJte0Xk4bNqY="
}
```

### 上传表盘文件

```javascript
async function uploadWatchface(fileData, watchfaceInfo) {
  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('name', watchfaceInfo.name);
  formData.append('desc', watchfaceInfo.desc);
  formData.append('type', watchfaceInfo.type || '');
  formData.append('staticPng', watchfaceInfo.staticPng || false);
  formData.append('previewImg', watchfaceInfo.previewImg || '');
  formData.append('updateId', watchfaceInfo.updateId || '');
  formData.append('mitantid', watchfaceInfo.mitantid || '');
  formData.append('mitantype', watchfaceInfo.mitantype || 'r');
  
  if (watchfaceInfo.previewImgAod) {
    formData.append('previewImgAod', watchfaceInfo.previewImgAod);
  }
  if (watchfaceInfo.previewImgAod2) {
    formData.append('previewImgAod2', watchfaceInfo.previewImgAod2);
  }
  if (watchfaceInfo.previewImgAod3) {
    formData.append('previewImgAod3', watchfaceInfo.previewImgAod3);
  }
  
  try {
    const response = await fetch('/watchface/uploadBinSelfMi7', {
      method: 'POST',
      headers: {
        'openId': localStorage.getItem('openid'),
        'validtoken': localStorage.getItem('validtoken'),
        'type': 'o66'
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('上传成功');
      return true;
    } else {
      console.error('上传失败:', data.msg);
      return false;
    }
  } catch (error) {
    console.error('上传错误:', error);
    return false;
  }
}

// 使用示例
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

const watchfaceInfo = {
  name: '我的表盘',
  desc: '这是一个自定义表盘',
  type: 'o66',
  staticPng: true,
  previewImg: 'userupload_b87cf5fcfff94598aba27c394011c467/preview',
  updateId: '',
  mitantid: '2222',
  mitantype: 'r',
  previewImgAod: 'userupload_e5aef2c5eee0437c958d1582b4080fd2/preview'
};

uploadWatchface(file, watchfaceInfo);
```

#### 1.6 上传预览图片

**接口地址**: `POST /watchface/uploadPreviewImgMi7`

**功能描述**: 上传表盘预览图片（支持小米手环7）

**请求体** (multipart/form-data):
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| file | Binary | 是 | 图片文件 | 屏幕截图 2025-11-30 084558.png |

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": "userupload_4ea6072e5e624d64aeeed004f0c65899/preview"
}
```

### 2. 用户相关接口

#### 2.1 米坛登录

**接口地址**: `POST /watchface/my/loginByMitanTokenNew2`

**功能描述**: 使用米坛Token进行用户登录

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| name | String | 否 | 用户名 | "" |
| password | String | 否 | 密码 | "" |
| code | String | 否 | 授权码 | nW6dVp1mHteTcbvzPsE5wPYr2OH4sSeg |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| version | String | 是 | 版本号 | {{version}} |
| type | String | 否 | 设备类型 | {{type}} |
| did | String | 否 | 设备ID | 4CD7A852D06218A46BD971E90983834A7A5E203C50EBF8492C9FD735A6693FFA0F654497A8DFD1B8C71C9D8D888A3FBAD03D6324DAB6E6913A6878FEC55C9F4C |

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "valid_token2": "token_value",
    "openid": "user_openid",
    "figureurl_qq": "avatar_url",
    "nickname": "user_nickname",
    "valid_token": "token_value",
    "email": "user_email",
    "limitMac": "mac_limit"
  }
}
```

#### 2.2 获取我的资源

**接口地址**: `GET /watchface/my/share/list/{page}/{pageSize}`

**功能描述**: 获取用户已分享的资源列表

**路径参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| page | Number | 是 | 页码 (从1开始) | 1 |
| pageSize | Number | 是 | 每页数量 | 10 |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| openId | String | 否 | 用户OpenID | {{openId}} |
| validtoken | String | 否 | 有效令牌 | {{validtoken}} |

#### 2.3 公开资源

**接口地址**: `POST /watchface/my/share/set`

**功能描述**: 设置资源为公开状态

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| isShare | String | 否 | 0不share 1 share | 1 |
| id | String | 否 | 资源ID | 1847193 |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| openId | String | 否 | 用户OpenID | {{openId}} |
| validtoken | String | 否 | 有效令牌 | {{validtoken}} |

#### 2.4 删除资源

**接口地址**: `POST /watchface/my/share/delete`

**功能描述**: 删除用户已分享的资源

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| id | String | 否 | 资源ID | 1847178 |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| openId | String | 否 | 用户OpenID | {{openId}} |
| validtoken | String | 否 | 有效令牌 | {{validtoken}} |

### 3. 评论相关接口

#### 3.1 获取评论

**接口地址**: `POST /comment/get`

**功能描述**: 获取指定表盘的评论列表

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| relationid | String | 是 | 关联ID(表盘ID) | 1833711 |
| type | String | 是 | 类型(wf-表盘) | wf |
| page | String | 是 | 页码 | 1 |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| openId | Array | 否 | 用户OpenID列表 | ["{{openId}}"] |

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": 203352,
      "relationid": null,
      "type": null,
      "openid": "1219390Mitan",
      "nickname": "PPNdesign",
      "avator": "https://www.bandbbs.cn/data/avatars/s/1219/1219390.jpg?1751431633",
      "content": "test",
      "time": 1764466432000,
      "state": null,
      "delflag": true
    }
  ]
}
```

#### 3.2 发布评论

**接口地址**: `POST /comment/add`

**功能描述**: 为表盘添加评论

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| relationid | String | 是 | 关联ID(表盘ID) | 1833711 |
| type | String | 是 | 类型(wf-表盘) | wf |
| openid | String | 是 | 用户OpenID | {{openId}} |
| nickname | String | 是 | 用户昵称 | {{nickName}} |
| content | String | 是 | 评论内容 | 测试 |
| avator | String | 是 | 头像URL | https://ts4.tc.mm.bing.net/th/id/OIP-C.lHr00h553pdjCLscweEGdwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3 |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| validtoken | String | 是 | 有效令牌 | {{validtoken}} |

#### 3.3 删除评论

**接口地址**: `POST /comment/del`

**功能描述**: 删除已发布的评论

**查询参数**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| id | String | 是 | 评论ID | 203396 |

**请求头**:
| 参数 | 类型 | 必需 | 说明 | 示例 |
|------|------|------|------|------|
| type | String | 是 | 设备类型 | {{type}} |
| validtoken | String | 是 | 有效令牌 | {{validtoken}} |
| openId | String | 否 | 用户OpenID | {{openId}} |

**响应示例**:
```json
{
  "code": 0,
  "msg": "success",
  "data": "success"
}
```

## 数据字段详细说明

### 表盘信息字段

| 字段名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| id | Number | 表盘唯一标识 | 1842050 |
| limit | Number | 分页限制 | 10 |
| offset | Number | 分页偏移 | 0 |
| sort | String/null | 排序方式 | null |
| order | String/null | 排序顺序 | null |
| cretator | String/null | 创建者 | null |
| createtime | String/null | 创建时间 | null |
| updator | String/null | 更新者 | null |
| updatetime | String/null | 更新时间 | null |
| username | String | 用户名 | "" |
| nickname | String | 作者昵称 | "孤伤1" |
| name | String | 表盘名称 | "太空战舰" |
| desc | String | 表盘描述 | "游戏介绍..." |
| isShare | Number | 是否分享 (1-是, 0-否) | 1 |
| downloadTimes | Number | 下载次数 | 3181 |
| preview | String | 预览图片URL | "http://42.192.61.143:8085/..." |
| previewAod | String/null | 息屏预览图片URL | null |
| filePath | String | 文件路径 | "userupload_fba0379fcf3c4483a3bedf5fb8c81288/preview.jpg" |
| qiniuPath | String/null | 七牛云路径 | null |
| isReview | Number | 是否已审核 (1-是, 0-否) | 1 |
| isMake | Number | 是否自制 (1-是, 0-否) | 0 |
| createdAt | Number | 创建时间戳(毫秒) | 1759317337000 |
| updatedAt | Number | 更新时间戳(毫秒) | 1764460005000 |
| type | String | 设备类型 | "o66" |
| total | Number/null | 总数 | null |
| views | Number | 观看次数 | 21926 |
| isRecommend | Number | 是否推荐 (1-是, 0-否) | 1 |
| donation | String | 捐赠标识 | "1" |
| tagcondition | String | 标签条件 | "" |
| isTag | Number | 标签类型 | 1 |
| filesize | Number | 文件大小(字节) | 113011 |
| previewstr | String/null | 预览字符串 | null |
| mitantid | String | 米坛用户ID | "4298" |
| mitantype | String | 米坛用户类型 | "r" |

### 评论信息字段

| 字段名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| id | Number | 评论唯一标识 | 203352 |
| relationid | String/null | 关联ID | null |
| type | String/null | 类型 | null |
| openid | String | 用户OpenID | "1219390Mitan" |
| nickname | String | 用户昵称 | "PPNdesign" |
| avator | String | 头像URL | "https://www.bandbbs.cn/data/avatars/s/1219/1219390.jpg?1751431633" |
| content | String | 评论内容 | "test" |
| time | Number | 评论时间戳(毫秒) | 1764466432000 |
| state | String/null | 状态 | null |
| delflag | Boolean | 删除标记 | true |

### 用户信息字段

| 字段名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| valid_token2 | String | 二级验证令牌 | "token_value" |
| openid | String | 用户OpenID | "user_openid" |
| figureurl_qq | String | QQ头像URL | "avatar_url" |
| nickname | String | 用户昵称 | "user_nickname" |
| valid_token | String | 验证令牌 | "token_value" |
| email | String | 用户邮箱 | "user_email" |
| limitMac | String | MAC限制 | "mac_limit" |

## 响应格式

所有API接口均采用统一的响应格式：

```json
{
  "code": 0,        // 状态码，0表示成功
  "msg": "success", // 响应消息
  "data": {}        // 响应数据
}
```

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 0 | 成功 |
| 非0 | 失败，具体错误信息见msg字段 |

## 设备类型代码

| 代码 | 设备型号 |
|------|----------|
| o66 | 小米手环10 |
| N66 | 小米手环9 Pro |
| 其他 | 其他设备型号 |

## 标签类型说明

| 代码 | 说明 |
|------|------|
| 1 | 游戏类 |
| 2 | 工具类 |
| 4 | 动态类 |
| 6 | 表盘类 |
| 其他 | 其他类型 |

## 米坛用户类型

| 代码 | 说明 |
|------|------|
| r | 普通用户 |
| t | 高级用户 |
| 其他 | 其他类型 |

## 开发示例

### 获取最新表盘列表

```javascript
// 获取第一页最新上传的表盘，每页10个
async function getWatchfaceList(page = 1, pageSize = 10) {
  try {
    const response = await fetch(`/watchface/listbytag/0/${page}/${pageSize}/9999`, {
      headers: {
        'type': 'o66' // 小米手环10
      }
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('表盘列表:', data.data);
      return data.data;
    } else {
      console.error('获取失败:', data.msg);
      return null;
    }
  } catch (error) {
    console.error('请求错误:', error);
    return null;
  }
}

// 使用示例
getWatchfaceList(1, 10);
```

### 用户登录

```javascript
async function loginWithMitan(code) {
  try {
    const response = await fetch('/watchface/my/loginByMitanTokenNew2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'version': '1.0.0',
        'type': 'o66'
      },
      body: new URLSearchParams({
        'code': code
      })
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('登录成功:', data.data);
      // 保存用户信息
      localStorage.setItem('openid', data.data.openid);
      localStorage.setItem('validtoken', data.data.valid_token);
      localStorage.setItem('nickname', data.data.nickname);
      return data.data;
    } else {
      console.error('登录失败:', data.msg);
      return null;
    }
  } catch (error) {
    console.error('登录错误:', error);
    return null;
  }
}

// 使用示例
loginWithMitan('your_authorization_code');
```

### 发布评论

```javascript
async function addComment(watchfaceId, content) {
  const openid = localStorage.getItem('openid');
  const nickname = localStorage.getItem('nickname');
  const validtoken = localStorage.getItem('validtoken');
  
  if (!openid || !validtoken) {
    console.error('用户未登录');
    return null;
  }
  
  try {
    const response = await fetch('/comment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'validtoken': validtoken
      },
      body: new URLSearchParams({
        'relationid': watchfaceId,
        'type': 'wf',
        'openid': openid,
        'nickname': nickname,
        'content': content,
        'avator': 'https://example.com/avatar.jpg'
      })
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('评论发布成功');
      return true;
    } else {
      console.error('评论发布失败:', data.msg);
      return false;
    }
  } catch (error) {
    console.error('评论发布错误:', error);
    return false;
  }
}

// 使用示例
addComment('1842050', '这个表盘很棒！');
```

### 上传预览图片

```javascript
async function uploadPreviewImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  try {
    const response = await fetch('/watchface/uploadPreviewImgMi7', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('图片上传成功:', data.data);
      return data.data;
    } else {
      console.error('图片上传失败:', data.msg);
      return null;
    }
  } catch (error) {
    console.error('图片上传错误:', error);
    return null;
  }
}

// 使用示例
const imageInput = document.getElementById('imageInput');
const imageFile = imageInput.files[0];
uploadPreviewImage(imageFile);
```

### 下载表盘文件

```javascript
async function downloadWatchface(watchfaceId) {
  try {
    const response = await fetch('/watchface/downloadUsr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'id': watchfaceId
      })
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('下载链接:', data.data);
      // 可以创建一个隐藏的a标签来触发下载
      const link = document.createElement('a');
      link.href = data.data;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return data.data;
    } else {
      console.error('获取下载链接失败:', data.msg);
      return null;
    }
  } catch (error) {
    console.error('下载错误:', error);
    return null;
  }
}

// 使用示例
downloadWatchface('1846098');
```

### 设置资源公开状态

```javascript
async function setResourceShareStatus(resourceId, isShare) {
  try {
    const response = await fetch('/watchface/my/share/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'openId': localStorage.getItem('openid'),
        'validtoken': localStorage.getItem('validtoken')
      },
      body: new URLSearchParams({
        'id': resourceId,
        'isShare': isShare ? '1' : '0'
      })
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('设置成功');
      return true;
    } else {
      console.error('设置失败:', data.msg);
      return false;
    }
  } catch (error) {
    console.error('设置错误:', error);
    return false;
  }
}

// 使用示例 - 设置为公开
setResourceShareStatus('1847193', true);
```

### 删除资源

```javascript
async function deleteResource(resourceId) {
  try {
    const response = await fetch('/watchface/my/share/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'openId': localStorage.getItem('openid'),
        'validtoken': localStorage.getItem('validtoken')
      },
      body: new URLSearchParams({
        'id': resourceId
      })
    });
    
    const data = await response.json();
    
    if (data.code === 0) {
      console.log('删除成功');
      return true;
    } else {
      console.error('删除失败:', data.msg);
      return false;
    }
  } catch (error) {
    console.error('删除错误:', error);
    return false;
  }
}

// 使用示例
deleteResource('1847178');
```

## 错误处理

### 常见错误码及处理

```javascript
function handleApiError(response) {
  switch (response.code) {
    case 0:
      // 成功
      return true;
    case 401:
      // 未授权，需要重新登录
      console.log('用户未授权，请重新登录');
      // 跳转到登录页面
      window.location.href = '/login';
      return false;
    case 403:
      // 权限不足
      console.log('权限不足');
      return false;
    case 404:
      // 资源不存在
      console.log('资源不存在');
      return false;
    case 500:
      // 服务器错误
      console.log('服务器错误，请稍后重试');
      return false;
    default:
      // 其他错误
      console.log('未知错误:', response.msg);
      return false;
  }
}
```

## 最佳实践

1. **请求拦截**: 建议使用axios等库的拦截器统一处理认证和错误
2. **缓存策略**: 对于表盘列表等不常变化的数据，可以适当缓存
3. **分页加载**: 大量数据时使用分页加载，避免一次性请求过多数据
4. **错误重试**: 网络请求失败时，可以实现自动重试机制
5. **用户状态管理**: 合理管理用户登录状态，及时更新token

## 注意事项

1. 所有时间戳均为毫秒级Unix时间戳
2. 文件上传接口需要特定的权限和格式要求
3. 部分接口需要用户登录后才能访问
4. 预览图片URL可能存在多个服务器地址
5. 建议在生产环境中添加适当的错误处理和重试机制
6. 注意保护用户的敏感信息，如token等
7. 遵守API使用频率限制，避免频繁请求

## 更新日志

- **v1.0.0** (2025-11-30): 初始版本，包含完整的表盘管理、用户认证、评论系统功能