---
date: 2021-06-13
title: Excel 取得一列中最後一個非空的值
description: Excel 取得一列中最後一個非空的值
tags: [excel]
donation: false
---

在網路上找到一個公式是可以將一個單元 (cell) 的值設定成某一列的數據中最後一個非空的值

在這之前先了解一下 LOOKUP 公式

<!-- more -->

如果想知道一個值在一列數據中落在哪一個單元 (cell) 就可以用到 LOOKUP

```excel
=LOOKUP(查找值, 查找陣列, [結果陣列])
```

結果陣列的長度必須和查找陣列長度相等

如果沒傳入第三個參數-結果陣列，就會基於查找陣列返回一個最接近的結果，查找值和查找陣列的邏輯是大於或等於

如果傳入結果陣列就會回傳與查找陣列映射相同位置的值

應用場景如分數級距評語

<div class="table-container">
<table>
  <thead>
    <tr>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>欠佳</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>6</td>
      <td>尚可</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>9</td>
      <td>很好</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>得分</td>
      <td>級別</td>
      <td>評語</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td><code class="language-plaintext highlighter-rouge"> =LOOKUP(C5,A1:A3)</code></td>
      <td><code class="language-plaintext highlighter-rouge"> =LOOKUP(C5,A1:A3,B1:B3)</code></td>
    </tr>
  </tbody>
</table>
</div>

如果我們在得分下面 C5 輸入 1~5 分，級別會是 1，評語會是欠佳

輸入 6~8 分，級別會是 6，評語會是尚可

輸入 9 分以上，級別會是 9，評語會是很好

回到主題

取得一列中最後一個非空的值的公式

```excel
=LOOKUP(1,1/(A:A<>""),A:A)
```

如果是表格，可以指定某一列名稱

```excel
=LOOKUP(1,1/(表格1[合計股]<>""),表格1[合計股])
```

這公式的意思是

  1. A:A<>"" 回傳的是一組 {FALSE, TRUE, TRUE, FALSE, FASLE... }，有值的單元為 TRUE 空的為 FALSE
  2. 數字 1 除以 A:A<>"" 的陣列回傳另外一個新的陣列，其中包含一連串的 TRUE 或 #DIV/0! (1 / TRUE = TRUE, 1 / FALSE = #DIV/0!)
  3. LOOKUP 公式說明中的備註
     - 如果 LOOKUP 函數找不到 lookup_value，就會比對 lookup_vector 中小於或等於 lookup_value 的最大值。
     - 如果 lookup_value 小於 lookup_vector 中的最小值，LOOKUP 函數會傳回 #N/A 的錯誤值。
  4. 在上面公式中，查找值是 2 ，但是查找陣列中最大的值是 1 (TRUE 也表示 1)，所以 lookup 回傳陣列中最後一個匹配
  5. 最後 LOOKUP 會回傳相對於結果陣列位置的值

應用場景如記錄股票的交易

可以做像這樣的表

<div class="table-container">
<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
      <th>F</th>
      <th>G</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>總成本</td>
      <td><code class="language-plaintext highlighter-rouge">=SUM(表格1[成本])</code></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>2</td>
      <td>總計股</td>
      <td style="width: 20%;"><code class="language-plaintext highlighter-rouge">=LOOKUP(2,1/(表格1[合計股]<>""),表格1[合計股])</code></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>3</td>
      <td>平均成本</td>
      <td><code class="language-plaintext highlighter-rouge">=(B1/B2)</code></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>4</td>
      <td>日期</td>
      <td>成交價</td>
      <td>買入</td>
      <td>賣出</td>
      <td>手續費</td>
      <td>成本</td>
      <td>合計股</td>
    </tr>
    <tr>
      <td>5</td>
      <td>02/10</td>
      <td>100</td>
      <td>10</td>
      <td>&nbsp;</td>
      <td>1.99</td>
      <td>-1101.99</td>
      <td>10</td>
    </tr>
    <tr>
      <td>6</td>
      <td>03/11</td>
      <td>90</td>
      <td>20</td>
      <td>&nbsp;</td>
      <td>1.99</td>
      <td>-1801.99</td>
      <td>30</td>
    </tr>
    <tr>
      <td>7</td>
      <td>03/25</td>
      <td>150</td>
      <td>&nbsp;</td>
      <td>10</td>
      <td>3.99</td>
      <td>1496.01</td>
      <td>20</td>
    </tr>
    <tr>
      <td>8</td>
      <td>04/17</td>
      <td>100</td>
      <td>30</td>
      <td>&nbsp;</td>
      <td>1.99</td>
      <td>-3001.99</td>
      <td>50</td>
    </tr>
  </tbody>
</table>
</div>

當然也可以直接 `=SUM(表格1[買入]) - SUM(表格1[賣出])`

但是當股票有配發股利（新增欄位）就必須修改總計股公式

此公式目的是希望**統計數據**到表格某一欄中再取該欄最後一行的值

## Reference

- [Get value of last non-empty cell](https://exceljet.net/formula/get-value-of-last-non-empty-cell)
- [LOOKUP 函數](https://support.office.com/zh-tw/f1/topic/csh?HelpId=xlmain11.chm60076&NS=MACEXCEL&Version=90&Lcid=1028&UiLcid=1028&EntryPoint=True&testtransaction=0&feedback=0)
