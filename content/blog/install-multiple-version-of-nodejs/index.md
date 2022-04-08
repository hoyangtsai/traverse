---
date: 2016-07-26
title: 安裝多版本 Node.js
tags: [homebrew, nodejs]
description: 使用 nvm 管理多種 nodejs 版本運行在同一台電腦
---

在開始介紹 nvm 管理 node 版本之前先說一下為什麼會有這個需要

> 情境一、工作需求<br>
> 使用較穩定 node 開發工具，但工具要求 node 版本較低 (node4-lts)

> 情境二、個人需求<br>
> 使用 ES6 語法開發 Nodejs 模組、其他 Framework 或 node 工具依賴的模組要求 Node.js 版本要是最新版

<!-- more -->

**此時多種版本 Node.js 切換的需求因應而生**

## 安裝

由 curl 安裝

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
```

或 wget 安裝

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
```

安裝流程大致上為 git clone 遠端的 nvm repository 到本地端的家目錄生成一個命名為 '.nvm' 的資料夾 `~/.nvm`，之後透過 ~/.nvm/nvm.sh 載入 nvm 程序。

> 安裝腳本會自動將 nvm 載入程序設置加到使用者配置文件 (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

如果沒有，可以自行複製貼上到 `~/.bashrc` OR `~/.bash_profile` OR `~/.zshrc`

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

再重新啟動使用者配置文件 `source ~/.bash_profile`

### 驗證安裝

```bash
command -v nvm
```

如果安裝成功會印出 'nvm'

### 手動更新

因為 `~/.nvm` 本身就是一個 git 倉庫，只要在終端機執行下列指令即可

```bash
cd "$NVM_DIR" && git fetch origin && git checkout `git describe --abbrev=0 --tags`
```

更新之後，重新執行 nvm 程序

```bash
. "$NVM_DIR/nvm.sh"
```

## 操作使用

安裝 node 最新釋出版本

```bash
nvm install node
```

安裝 node 其他版本

```bash
nvm ls-remote # 列出遠端可安裝版本
nvm install $VERSION
```

安裝 node4-lts 長期支援 (long-term support) 版本

```bash
nvm install --lts node
```

> --lts 同樣可以使用在 nvm 其他指令，像 `nvm ls-remote --lts`, `nvm use --lts` ... etc.

設定本地端 node 預設版本

```bash
nvm alias default $VERSION
```

> 如果較常使用的是 Nodejs v4，務必要執行這行指令，否則每次開新的終端機都會執行 nvm 預設版本 (最新釋出版本)

## 參考資料

[Github - creationix/nvm](https://github.com/creationix/nvm)

## 附註

npm 有一個工具也可以做 node 版本管理，但我沒使用過。

有興趣可以參考 [管理 node 版本，选择 nvm 还是 n？](http://taobaofed.org/blog/2015/11/17/nvm-or-n/)
