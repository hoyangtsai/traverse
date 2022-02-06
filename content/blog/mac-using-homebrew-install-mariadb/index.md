---
date: 2015-12-09
title: Mac 用 Homebrew 安裝 MariaDB
description:
published: true
comments: true
tags: [homebrew, mysql, mariadb]
---

最近我在檢查 Mac Mini 的 server 工作是否正常的時候發現 MySQL 資料庫又掛了

不是流量太大或電腦有問題，而是 MySQL 無法啟動

試著打 `mysql.server start`

終端機印出 `ERROR! The server quit without updating PID file (/usr/local/mysql/data/...pid)`

網路搜尋到的方法

像是 `ps -aux | grep 'mysql'` 列出 mysql 程序把它砍掉

或是刪除 `rm /usr/local/mysql/data/*.err` 都無法啟動 MySQL

### 完整移除 MySQL

Mac OS 從 10.9 Mavericks、10.10 Yosemite 到 10.11 El Capitan

MySQL 隨著改版更新，但是安裝檔也不再附 MySQL 控制面板的安裝程式

MySQL GUI Tools 也沒有持續維護，導致使用上越來越不方便，相容性也越來越差

於是決定把整個 MySQL 砍掉重練，完整移除腳本如下

```bash
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
```

### 用 Homebrew 安裝資料庫

使用 Homebrew 安裝函式庫的好處就是不用再做麻煩的環境設定，像是 `export PATH=$PATH:${new_path}` 之類的

因為在 `brew install [library]` 的時候 Homebrew 就會從 /usr/local/Cellar/[library] 的指令庫底下，做個 symbolic 鏈結到 /usr/local/bin/ 

函式庫相關的指令就可以直接使用，未來也只要透過 `brew upgrade` 就可以更新函式庫了

#### 開始安裝 MariaDB

之前用過 `brew install mysql` 安裝 MySQL 資料庫，嘗試很久安裝一直失敗後來就放棄了。<br>

這次我改安裝 MariaDB，順便做了一下調查...<br>

MariaDB 可以說是 MySQL 的表兄弟，它是由 MySQL 的開發元老 Widenius 分支出來開發的專案<br>

如官方的聲明
> MariaDB is a binary drop in replacement for MySQL.

所以主要考慮的點在：

- 資料和表格定義檔 (.frm) 是二進制相容。
- 所有客戶端 APIs、協定和架構的一致性。
- 所有檔案名稱、二進制檔、路徑、port、sockets ... 等應該會一樣。
- 所有 MySQL 連接器 (PHP, Perl, Python, Java, .NET, MyODBC, Ruby, MySQL C connector 等) 與 MariaDB 運行不會改變。
- mysql-client 套件也在 MariaDB server 中運行。
- 共享的客戶端函式庫和 MySQL 客戶端函式庫是二進制相容。

還包含一些 MySQL 沒有的特點，像是 Aria 儲存引擎可以有更快的複雜查詢、多種效能的優化 ... 等等。<br>
更重要的是，MariaDB 有完整的[官方文件](https://mariadb.com/kb/en/mariadb/)<br>
使用 Homebrew 安裝，也有[詳細的說明](https://mariadb.com/kb/en/mariadb/building-mariadb-on-mac-os-x-using-homebrew/)，所以這裡直接提出幾個安裝重點

1. 更新 Homebrew 函式庫

    ```bash
    brew update
    ```

2. 安裝 MariaDB

    ```bash
    brew install mariadb
    ```

3. 安裝資料庫

    ```bash
    unset TMPDIR
    mysql_install_db
    ```

4. 啟動資料庫 (操作指令和使用 MySQL 一樣)

    ```bash
    mysql.server start
    ```

5. 設定 root 登入密碼和其他 configuration 完成安裝

    ```bash
    mysql_secure_installation
    ```

如果想在電腦登入時自動啟動 MariaDB

可以做個 symbolic 鏈結到 ~/Library/LaunchAgents/ 指令如下

```bash
ln -s /usr/local/Cellar/mariadb/10.1.9/homebrew.mxcl.mariadb.plist ~/Library/LaunchAgents/
launchctl load -w homebrew.mxcl.mariadb.plist
```

### 參考

- [OSX How To: Uninstall native MySQL and install MariaDB via Homebrew](https://gist.github.com/brandonsimpson/5204ce8a46f7a20071b5)
- [MariaDB versus MySQL - Compatibility](https://mariadb.com/kb/en/mariadb/mariadb-vs-mysql-compatibility/)
- [MariaDB vs. MySQL: What’s The Difference?](http://www.interworx.com/community/mariadb-vs-mysql-whats-the-difference/)
- [Installing MariaDB 10.0.10 on Mac OS X with Homebrew](https://mariadb.com/blog/installing-mariadb-10010-mac-os-x-homebrew)
- [Building MariaDB on Mac OS X Using Homebrew](https://mariadb.com/kb/en/mariadb/building-mariadb-on-mac-os-x-using-homebrew/)
