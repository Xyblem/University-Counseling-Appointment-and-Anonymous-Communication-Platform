# 软件工程综合实践课程项目：高校心理咨询预约与匿名交流平台
英文名称：University Counseling Appointment and Anonymous Communication Platform

---
## 项目选题
**高校心理咨询预约与匿名交流平台**

高校心理咨询中心为学生提供心理辅导，但学生常因隐私顾虑或流程繁琐而不愿主动求助，导致心理问题被延误。
本课题拟开发一个心理咨询预约与匿名交流平台，实现线上预约、匿名倾诉与同伴互助等，降低心理求助门槛，提升心理服务的可达性。

**系统适用对象：**

学生：在线预约心理咨询，匿名发表困惑，参与互助交流。
心理咨询教师：接收预约信息，安排咨询时间，在线回复学生问题。
学校心理中心管理员：管理咨询资源，审核匿名社区内容。

**系统基本功能：**

学生、心理咨询老师、管理员的注册、登录、心理学知识内容发布等。
匿名倾诉区（学生可发帖求助，避免身份暴露）。
心理咨询预约与时间管理。
<font color=Grey>咨询师可以在线回复、一对一在线辅导或线下辅导，并在系统中进行记录</font>。
管理员对敏感内容的审核与干预。

**高级功能（可选）：**

<font color=Grey>心理问题标签分类与相关内容智能化推荐（如“焦虑”，“人际关系”，“学业压力”）</font>。
<font color=Grey>同伴互助机制（有经验的同学（如设置积分等级）并匿名分享应对方法）</font>。
心理问卷与数据分析，<font color=Grey>帮助咨询师了解学生群体关注点</font>。

---
## 实现功能
- 用户登录
- 用户注册
- 退出登录
- 修改密码
- 注销账号
- 修改信息
- 心理测试
- 用户浏览倾述
- 用户发布倾述
- 用户回复倾述
- 用户举报倾述
- 管理员审核举报倾述
- 学生申请预约
- 教师处理预约
- 管理员查看所有预约
- 用户浏览科普
- 学生用户科普推荐
- 用户举报科普
- 教师发布科普
- 教师管理自己的科普
- 管理员查看自己审核的科普
- 管理员审核科普
- 管理员审核举报科普
- 管理员查看所有的用户信息

---
## 项目部署

项目部署文档：[DEPLOY.md](DEPLOY.md)

## 其他

### GitHub访问加速

**修改`Hosts`文件**

获取最新的`GitHub IP`地址： 使用`GitHub520`提供的`hosts`文件。 或访问`Fetch GitHub Hosts`获取最新**IP**。

获取`GitHub IP` [https://hosts.gitcdn.top/hosts.txt](https://hosts.gitcdn.top/hosts.txt)

修改本地 hosts 文件： 
- **Windows**: 编辑 C:\Windows\System32\drivers\etc\hosts。 
- **macOS**/**Linux**: 编辑 /etc/hosts。

添加以下内容（示例）：
```host
140.82.113.3 github.com
185.199.108.153 assets-cdn.github.com
...
```

保存文件并刷新 DNS 缓存：
```shell
ipconfig /flushdns # Windows
```
```shell
sudo dscacheutil -flushcache # macOS
```
**使用`FastGithub`工具**

下载并安装`FastGithub`，[https://github.com/creazyboyone/FastGithub/releases](https://github.com/creazyboyone/FastGithub/releases)

启动工具后，它会自动优化`GitHub`的访问速度，包括克隆、下载等操作。

支持`Windows`、`macOS` 和 `Linux`。