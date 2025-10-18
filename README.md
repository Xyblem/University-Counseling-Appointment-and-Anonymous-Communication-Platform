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

学生、心理咨询老师、管理员的注册、登录、<font color=Grey>心理学知识内容发布等</font>。
<font color=Grey>匿名倾诉区（学生可发帖求助，避免身份暴露）</font>。
<font color=Grey>心理咨询预约与时间管理</font>。
<font color=Grey>咨询师可以在线回复、一对一在线辅导或线下辅导，并在系统中进行记录</font>。
<font color=Grey>管理员对敏感内容的审核与干预</font>。

**高级功能（可选）：**

<font color=Grey>心理问题标签分类与相关内容智能化推荐（如“焦虑”，“人际关系”，“学业压力”）</font>。
<font color=Grey>同伴互助机制（有经验的同学（如设置积分等级）并匿名分享应对方法）</font>。
<font color=Grey>心理问卷与数据分析，帮助咨询师了解学生群体关注点</font>。

---
## 实现功能
- 用户登录
- 用户注册
- 退出登录
- <font color=Grey>修改信息（待实现）</font>
- <font color=Grey>修改密码（待实现）</font>
- <font color=Grey>注销账号（待实现）</font>
---
## 项目部署

开发环境：`Intellij IDEA 2024.2.4`

数据库：`MySQL 8.0.39`

Java：`Java 17`

NodeJS：`NodeJs 22.19.0` `Npm 10.9.3`

Git：`Git 2.45.2`

### 数据库部署
1、下载并安装`MySQL`，不会的网上找教程

2、在`MySQL WorkBench`中新建名为`ucaacp`的数据库

3、在`backend/src/main/resources/application.properties`中配置你的数据库

```properties
#SQL
spring.datasource.url=jdbc:mysql://localhost:3306/ucaacp?useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=root
```

4、在IDEA上配置好数据库
![数据库配置入口.png](readme%2Fimages%2F%E6%95%B0%E6%8D%AE%E5%BA%93%E9%85%8D%E7%BD%AE%E5%85%A5%E5%8F%A3.png)
![新建数据库连接.png](readme%2Fimages%2F%E6%96%B0%E5%BB%BA%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5.png)
![找到MySQL.png](readme%2Fimages%2F%E6%89%BE%E5%88%B0MySQL.png)
![配置数据源和驱动程序.png](readme%2Fimages%2F%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E6%BA%90%E5%92%8C%E9%A9%B1%E5%8A%A8%E7%A8%8B%E5%BA%8F.png)

5、运行`database/tables.sql`创建各种表

6、运行`database/datas.sql`添加初始数据

### 后端部署
![当前文件.png](readme%2Fimages%2F%E5%BD%93%E5%89%8D%E6%96%87%E4%BB%B6.png)
![编辑配置.png](readme%2Fimages%2F%E7%BC%96%E8%BE%91%E9%85%8D%E7%BD%AE.png)
![添加新配置.png](readme%2Fimages%2F%E6%B7%BB%E5%8A%A0%E6%96%B0%E9%85%8D%E7%BD%AE.png)
![添加新配置（后端）.png](readme%2Fimages%2F%E6%B7%BB%E5%8A%A0%E6%96%B0%E9%85%8D%E7%BD%AE%EF%BC%88%E5%90%8E%E7%AB%AF%EF%BC%89.png)
![配置后端.png](readme%2Fimages%2F%E9%85%8D%E7%BD%AE%E5%90%8E%E7%AB%AF.png)
如图

**注意事项：**`backend/src/main/resources/libs/easy-captcha-1.6.2.jar`要添加为库，否则Java编译时可能会报错`找不到com.wf.captcha`

### 前端部署

不会，研究出来了在群里发一下，最好带图片和文字解说

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