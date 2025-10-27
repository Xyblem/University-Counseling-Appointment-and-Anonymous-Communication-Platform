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
匿名倾诉区（学生可发帖求助，避免身份暴露）。
心理咨询预约与时间管理。
<font color=Grey>咨询师可以在线回复、一对一在线辅导或线下辅导，并在系统中进行记录</font>。
<font color=Grey>管理员对敏感内容的审核与干预</font>。

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
- 用户浏览科普（待完成）
- 教师发布科普（待完成）
- 管理员审核科普（待完成）
- 用户举报科普（待完成）

---
## 项目部署

开发环境：`Intellij IDEA 2024.2.4`

数据库：`MySQL 8.0.39`

Java：`Java 17`

NodeJS：`NodeJs 22.19.0` `Npm 10.9.3`

Git：`Git 2.45.2`



### 下载Git

**下载地址：**`Git - Downloading Package (git-scm.com)`

**不懂可看：** [https://www.bilibili.com/video/BV1FE411P7B3/?share_source=copy_web&vd_source=a47337438b0319bed538b5c9401a02fc](https://www.bilibili.com/video/BV1FE411P7B3/?share_source=copy_web&vd_source=a47337438b0319bed538b5c9401a02fc)

**安装git**

![img.png](readme/images/git/img.png)
![img_1.png](readme/images/git/img_1.png)
![img_2.png](readme/images/git/img_2.png)
![img_3.png](readme/images/git/img_3.png)
![img_4.png](readme/images/git/img_4.png)
![img_5.png](readme/images/git/img_5.png)
![img_6.png](readme/images/git/img_6.png)
![img_7.png](readme/images/git/img_7.png)
![img_8.png](readme/images/git/img_8.png)
![img_9.png](readme/images/git/img_9.png)
![img_10.png](readme/images/git/img_10.png)
![img_11.png](readme/images/git/img_11.png)
![img_12.png](readme/images/git/img_12.png)
![img_13.png](readme/images/git/img_13.png)
![img_14.png](readme/images/git/img_14.png)
![img_15.png](readme/images/git/img_15.png)
![img_16.png](readme/images/git/img_16.png)
![img_17.png](readme/images/git/img_17.png)

**配置用户名和密码**

```shell
git config --global user.name "注册名"
git config --global user.email "邮箱"
```

**常用指令**

`git config --global user.name xxx`：设置全局用户名，信息记录在`~/.gitconfig`文件中

`git config --global user.email xxx@xxx.com`：设置全局邮箱地址，信息记录在`~/.gitconfig`文件中

`git init：`将当前目录配置成`git`仓库，信息记录在隐藏的`.git`文件夹中

`git add XX：`将`XX`文件添加到暂存区

`git add .：`将所有待加入暂存区的文件加入暂存区

`git rm --cached XX：`将文件从仓库索引目录中删掉

`git commit -m `“给自己看的备注信息”：将暂存区的内容提交到当前分支

`git status：`查看仓库状态

`git diff XX：`查看XX文件相对于暂存区修改了哪些内容

`git log：`查看当前分支的所有版本

`git reflog：`查看HEAD指针的移动历史（包括被回滚的版本）

`git reset --hard HEAD^ `或` git reset --hard HEAD~：`将代码库回滚到上一个版本

`git reset --hard HEAD^^：`往上回滚两次，以此类推

`git reset --hard HEAD~100：`往上回滚100个版本

`git reset --hard 版本号：`回滚到某一特定版本

`git checkout — XX或git restore XX：`将XX文件尚未加入暂存区的修改全部撤销

`git remote add origin git@git.acwing.com:xxx/XXX.git：`将本地仓库关联到远程仓库

`git push -u (第一次需要-u以后不需要)：`将当前分支推送到远程仓库

`git push origin branch_name：`将本地的某个分支推送到远程仓库

`git clone git@git.acwing.com:xxx/XXX.git：`将远程仓库XXX下载到当前目录下

`git checkout -b branch_name：`创建并切换到branch_name这个分支

`git branch：`查看所有分支和当前所处分支

`git checkout branch_name：`切换到branch_name这个分支

`git merge branch_name：`将分支branch_name合并到当前分支上

`git branch -d branch_name：`删除本地仓库的branch_name分支

`git branch branch_name：`创建新分支

`git push --set-upstream origin branch_name：`设置本地的branch_name分支对应远程仓库的branch_name分支

`git push -d origin branch_name：`删除远程仓库的branch_name分支

`git pull：`将远程仓库的当前分支与本地仓库的当前分支合并

`git pull origin branch_name：`将远程仓库的branch_name分支与本地仓库的当前分支合并

`git branch --set-upstream-to=origin/branch_name1 branch_name2：`将远程的branch_name1分支与本地的branch_name2分支对应

`git checkout -t origin/branch_name `将远程的branch_name分支拉取到本地

`git stash：`将工作区和暂存区中尚未提交的修改存入栈中

`git stash apply：`将栈顶存储的修改恢复到当前分支，但不删除栈顶元素

`git stash drop：`删除栈顶存储的修改

`git stash pop：`将栈顶存储的修改恢复到当前分支，同时删除栈顶元素

`git stash list：`查看栈中所有元素

**一般的上传操作：**

`git add .`

`git commit -m "内容"`

`git push`

**对于本地新创建的分支上传**

`git add .`

`git commit -m "内容"`

`git push`

三步之后，会有提示使用`git push --set-upstream origin branch_name。`将远程仓库的`branch_name`分支与本地仓库的当前分支合并

关于各个人版本操作系统不同而导致的代码不同的部分，每次上传不要选择这个部分上传。


**初始化仓库**

现创建一个文件夹

在当前目录下执行

`git init`

![img_18.png](readme/images/git/img_18.png)

文件夹中多了一个.git的隐藏文件，仓库就创建好了

通过一系列实操熟悉指令

在当前目录下新建一个`readme.md`文件

![img_19.png](readme/images/git/img_19.png)

**git status**

查看当前仓库状态，上面说有一个文件没有加入到我们的暂存区中

`git add XX：`将XX文件添加到暂存区

`git add .：`将所有待加入暂存区的文件加入暂存区

![img_20.png](readme/images/git/img_20.png)

这时，暂存区中已经有一个文件了

`git commit -m `"给自己看的备注信息"：将暂存区的内容提交到当前分支

现在就是将当前版本添加到了主分支里面（该版本只有`readme.md`）

修改一下readme.md文件

![img_21.png](readme/images/git/img_21.png)

在`readme,md中`添加了一行`"222"`
`git status`查看仓库状态如上图所示，当前有一个文件发生了变化

![img_22.png](readme/images/git/img_22.png)

又将修改后的内容放到了暂存区中

如果我们再进行修改，增加一行`“333”`

`git diff XX，`查看XX文件相对于暂存区修改了哪些内容

![img_23.png](readme/images/git/img_23.png)

最后执行`git commit -m "add 222 333`

当前分支状态

![img_24.png](readme/images/git/img_24.png)

`git restore --staged readme.md`

将暂存区中的文件取出来

![img_25.png](readme/images/git/img_25.png)

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
![数据库配置入口.png](readme/images/数据库配置入口.png)
![新建数据库连接.png](readme/images/新建数据库连接.png)
![找到MySQL.png](readme/images/找到MySQL.png)
![配置数据源和驱动程序.png](readme/images/配置数据源和驱动程序.png)

5、运行`database/tables.sql`创建各种表

6、运行`database/datas.sql`添加初始数据

### 后端部署
![当前文件.png](readme/images/当前文件.png)
![编辑配置.png](readme/images/编辑配置.png)
![添加新配置.png](readme/images/添加新配置.png)
![添加新配置（后端）.png](readme/images/添加新配置（后端）.png)
![配置后端.png](readme/images/配置后端.png)
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