---
date: 2020-04-11
title: VS Code 多行註解時前面不會插入星號
description: 解決困擾已久多行註解不會自動插入星號
tags: [editor]
donation: true
---

當 VS Code 漸漸取代 Sublime 成爲一些開發者最愛的 coding 編輯器

<!-- more -->

往回看 Sublime 時代有 [DocBlockr](https://packagecontrol.io/packages/DocBlockr) 這種插件可以自動在 function 前面自動插入含傳入和傳出參數的多行註解

再看現在 VS Code 相對 Sublime 需要消耗更多電腦資源，所以希望保持安裝的延伸模組盡可能少，只要能在定義函數 (function) 前面寫註解時按下 enter 可以在前面補上星號就好

但是視乎最平常的功能，不知道從何時開始就不工作了，一開始以為是安裝的延伸模組衝突導致多行註解在換行時不會自動插入星號，最後找到問題是在喜好設定-文字編輯器 Editor: Auto Indent (自動縮排) 設定為 brackets 而導致的

順便在網路上搜尋一下有關 auto indent 的功用，其實 auto indent 可以和 editor.defaultFormatter 做搭配使用。
editor.defaultFormatter 預設為 null，如果要變更格式化工具，建議透過 JSON 檔案編輯喜好設定，因為這樣才可以針對不同的程式語言設定支援的格式化工具。
最新版的 VS Code 已經內建支援很多程式語言的格式化工具，可以打開預設設定 Default Settings (JSON) 搜尋 defaultFormatter 查看支援的程式語言，`vscode` 和 `ms-vscode` 開頭的就是內建的。

現在額外的格式化工具比較流行的有兩個 [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
和 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，從裡面選擇其中一個作為開發 vue 的格式化工具，一樣原則盡量保持少量的延伸模組。

以下 editor.defaultFormatter 設定提供參考

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "vscode.css-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  }
}
```
