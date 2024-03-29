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

## キーの値が空の場合

デフォルトでは、キーの値が空の場合はダミー値で埋めません。<br/>
埋めたい場合は、-sオプションを付与して下さい。

## 出力の整形

デフォルトではオリジナルのインデントを維持するようになっていますが、インデントスペース数を変更したい場合は、-tオプションを利用して下さい。

```
$ node json-masker.js sample.json name -t 4
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

## 特殊ケース

以下のように、行単位で複数のjsonが存在するjsonファイルも対応します。

```
[{"name":"名前1","phone":"0120123456","children":[{"name":"太郎","age":1},{"name":"花子","age":3}]},{"name":"名前2","phone":"0120111222"}]
[{"name":"名前3","phone":"0120123456","children":[{"name":"次郎","age":2},{"name":"三郎","age":2}]},{"name":"名前4","phone":"0120111222"}]
```

この場合は-mオプションをつけます。

```
$ node json-masker.js sample_multiline.json -m name
[{"name":"%%%%%%%%%%%%%%%%%%%%","phone":"0120123456","children":[{"name":"%%%%%%%%%%%%%%%%%%%%","age":1},{"name":"%%%%%%%%%%%%%%%%%%%%","age":3}]},{"name":"%%%%%%%%%%%%%%%%%%%%","phone":"0120111222"}]
[{"name":"%%%%%%%%%%%%%%%%%%%%","phone":"0120123456","children":[{"name":"%%%%%%%%%%%%%%%%%%%%","age":2},{"name":"%%%%%%%%%%%%%%%%%%%%","age":2}]},{"name":"%%%%%%%%%%%%%%%%%%%%","phone":"0120111222"}]
```

## 出力

結果は標準出力に表示されます。<br/>
リダイレクト等でファイルに格納した下さい。

インデントの空白宇数は入力ファイルから自動で検知します。

ユニコードエスケープは行われないため、必要なら外部ツールをパイプして下さい。
