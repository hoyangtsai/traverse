---
date: 2015-12-12
title: 圖片最佳化
tags: [front-end, homebrew]
description: jpg, png等圖片格式壓縮最佳化
donation: false
---

網頁優化/最佳化，圖片壓縮是不可忽視的一塊。<br>
透過 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) 分析可以為你的網頁打分數。<br>

<!-- more -->

## 圖片壓縮程式

根據 Google PageSpeed Insights 建議對於 JPEG 檔案壓縮可以使用 [jpegtran](http://jpegclub.org/) 或 [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (與 --strip-all 選項一併執行)；對於 PNG 檔案壓縮可以使用 [OptiPNG](http://optipng.sourceforge.net/) 或 [PNGOUT](http://www.advsys.net/ken/util/pngout.htm)。

透過 Homebrew 就可以安裝 jpegoptim 和 OptiPNG，如下

```bash
brew install jpegoptim
brew install optipng
```

### jpegoptim 常用參數

```bash
-m[quality], --max=[quality]
  設定最大的圖片品質因數 (禁止無損最佳化模式，預設是開啟的)
  有效值: 0 - 100
  e.g. jpegoptim -m50 sample.jpg - 用50%質量壓縮圖片

-d[path], --dest=[path]
  指定最佳化檔案的目標路徑 (預設是覆寫原始檔案)
  e.g. jpegoptim -d ./output sample.jpg - 壓縮圖片將匯出到 output 目錄下 (資料夾必須先建立)

-o, --overwrite
  覆寫目標檔案即使它存在 (當使用 -d 選項)

-p, --preserve
  保存檔案修改時間

-n, --noaction
  沒有真正壓縮圖片，只印出壓縮結果

--strip-all
  去除匯出圖片的所有標記

--strip-com
  去除匯出圖片的註解

--strip-exif
  去除匯出圖片的Exif
```

jpegoptim 其他參數使用可以參考 `jpegoptim -h`

### OptiPNG 常用參數

```bash
-backup, -keep
  保留一個修改檔案的備份

-clobber
  覆寫存在檔案

-preserve
  如果可以保留檔案的屬性

-out [filename]
  匯出的檔案名稱

-dir [directory]
  匯出檔案的目錄 (資料夾可以不用先建立)

-strip <objects>
  去除 metadata 物件 (例如 "all")

-o0, -o1 ... -o7
  圖片壓縮等級 (數字越大越慢)
```

optipng 其他參數使用可以參考 `optipng -h`

## 批量執行

先到執行專案目錄下，使用下方組合技

```bash
find . -name "*.jpg" -exec jpegoptim -o -p --strip-all {} \;
find . -name "*.png" -exec optipng -clobber -preserve -strip all {} \;
```

## 參考資料

[PageSpeed Insights - 最佳化圖片](https://developers.google.com/speed/docs/insights/OptimizeImages)
