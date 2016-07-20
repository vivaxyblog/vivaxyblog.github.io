---
layout: post
title: 如何在亚马逊 EC2 上搭建 Shadowsocks 服务器
---

以下过程需要代理支持。

新注册的 AWS 用户拥有一年的免费计划。

## 注册亚马逊 AWS

[AWS 地址](https://aws.amazon.com/)

期间要求绑定信用卡和手机号。

绑定信用卡的时候没有要求输入3位密钥。

绑定手机号的时候亚马逊会打电话到你的手机上，你在手机上输入网页上显示的4位验证码即可。

此时会发生验卡操作，信用卡可能会被扣1美元，然后交易未成功。实际不会有支出。

## 创建 EC2 服务器

创建一个实例，选择镜像（AMI），比如 `SUSE Linux Enterprise Server 12 (HVM), SSD Volume Type`。

确定，并且启动实例。具体配置在之后调整。

启动实例后，会生成一个 `pem` 文件，保存到硬盘下 `~/amazon.pem` 。

## 连接服务器

等服务器启动后，可以找到 `Public DNS` 和 `Public IP` ，两者都可以用来连接服务器。

此时服务器应该在 `launch-wizard-1` 这个安全组下，表示任何 ip 用 ssh 方式都可以连接。

打开命令行，比如 mac 上的 terminal ，执行以下命令：`ssh -i ~amazon.pem ec2-user@<% server ip %>` 。

第一次登录时选择信任，之后不需要每次都 `yes` 。

## 安装 shadowsocks

shadowsocks-python 支持 python 2.6 或 2.7 ，可以用 pip 安装。

SUSE 没有自带 pip ，需要单独安装。

`> wget https://bootstrap.pypa.io/get-pip.py`

`> python get-pip.py`

然后安装 shadowsocks

`> pip install shadowsocks`

## 启动和配置

直接运行 `> ssserver -p 443 -k password -m aes-256-cfb`

或者后台运行 `> sudo ssserver -p 443 -k password -m aes-256-cfb --user nobody -d start`

停止 `> sudo ssserver -d stop`

查看日志 `> sudo less /var/log/shadowsocks.log`

或者使用配置文件运行 `> ssserver -c /etc/shadowsocks.json`

## 配置文件

`sudo vim /etc/shadowsocks.json`

```json
{
    "server": "0.0.0.0",
    "server_port": 443,
    "local_address": "127.0.0.1",
    "local_port": 1080,
    "password": "password",
    "timeout": 300,
    "method": "aes-256-cfb",
    "fast_open": false,
    "workers": 1
}
```

## 提高EC2的安全性

选择 `NETWORK & SECURITY` 下的 `Security Groups` 。

找到 `launch-wizard-1` ，在 `Inbound` 标签下，点击 `Edit` 。

修改默认的 `ssh` 规则的来源 ，选择 `My IP` 。

但是这里有个坑，google 和 amazon 定位出来的 ip 都不对，使用百度的 ip 才能正常，这是为什么？

或者选择 `Custom IP` ，填入自己的 ip/32 。

添加一条规则， 类型为 `Custom TCP Rule` ，端口填写为 shadowsocks 的端口，来源设置为 `Anywhere` 。

保存后，只有本机 ip 才能使用 `ssh` 连接机器，任何机器都能使用这台 shadowsocks 服务器。

## 参考文档

- [shadowsocks download](http://shadowsocks.org/en/download/servers.html)

- [shadowsocks github](https://github.com/shadowsocks/shadowsocks/tree/7c08101ce8a673fafb22477e8ad720aa57114a1f)

- [pip document](https://pip.pypa.io/en/stable/installing/#install-pip)

- [Shadowsocks搭建、优化及客户端设置教程](http://aisheji.org/web/centos-build-shadowsocks.html)
