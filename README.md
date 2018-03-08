# json-masker

指定されたjsonファイル中の特定のキーの値をダミーで埋めます。

ダミー値は

> %%%%%%%%%%%%%%%%%%%%

決めうちです。

## 使い方

```
$ node json-masker <ファイル名> <キー名> [<キー名> ...]
```

引数は以下の通りです。

|引数|内容|
|:--|:--|
|ファイル名|読み込むjsonファイルを指定します。<br/>拡張子を省略した場合は.jsonが自動的に付与されます。|
|キー名|ダミー値で埋めるキー名を指定します。<br/>複数指定可能です。|

## 実行例

jsonファイル

```
[
  {
    "name": "名前1",
    "phone": "0120123456",
    "children": [
      {
        "name": "太郎",
        "age": 1
      },
      {
        "name": "花子",
        "age": 3
      }
    ]
  },
  {
    "name": "名前2",
    "phone": "0120111222"
  }
]
```

例1)

```
$ node json-masker.js sample.json name
[
  {
    "name": "%%%%%%%%%%%%%%%%%%%%",
    "phone": "0120123456",
    "children": [
      {
        "name": "%%%%%%%%%%%%%%%%%%%%",
        "age": 1
      },
      {
        "name": "%%%%%%%%%%%%%%%%%%%%",
        "age": 3
      }
    ]
  },
  {
    "name": "%%%%%%%%%%%%%%%%%%%%",
    "phone": "0120111222"
  }
]
```

例2)

```
$ node json-masker.js sample age phone
[
  {
    "name": "名前1",
    "phone": "%%%%%%%%%%%%%%%%%%%%",
    "children": [
      {
        "name": "太郎",
        "age": "%%%%%%%%%%%%%%%%%%%%"
      },
      {
        "name": "花子",
        "age": "%%%%%%%%%%%%%%%%%%%%"
      }
    ]
  },
  {
    "name": "名前2",
    "phone": "%%%%%%%%%%%%%%%%%%%%"
  }
]
```


## 出力

結果は標準出力に表示されます。<br/>
リダイレクト等でファイルに格納した下さい。

インデントの空白宇数は入力ファイルから自動で検知します。

ユニコードエスケープは行われないため、必要なら外部ツールをパイプして下さい。
