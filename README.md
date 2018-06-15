# Scrollon とは
このプラグインは、スクロールをしてウインドウ内表示エリアに入って来た特定の要素に対して、**任意のクラス名を付与することができる** シンプルなプラグインです。

スクロールしてウインドウ内に入って来たときにフェードしながらふわっと出現してくるエフェクトを実現する時に便利です。

# DEMOSITE
http://

# scrollonの読み込み方法
scrollon.min.jsファイルをダウンロードし、scriptタグで読み込みます。

```
<script type="text/javascript" src="./任意のパス/scrollon.min.js"></script>
```

# 使用方法
標準設定のまま使うのであれば、たった1行の記述で済みます。

DOMの読み込み後のタイミングで `new Scrollon();` を呼び出すだけです。

例1：body閉じタグ直前のscriptタグで使用する。

```
<script>
    new Scrollon();
</script>
```

例2：任意のJSファイルにて、DOMContentLoadedイベント時に呼び出して使用する。
```
document.addEventListener("DOMContentLoaded", function(e) {
    new Scrollon();
});
```

#引数について
`new Scrollon();` には引数を2つ指定することができます。

```
new Scrollon('対象とする要素のセレクタ', options);
```

## 第１引数で対象要素を指定する
デフォルトでは `scon_item` というクラス名のついた要素に対し、スクロールに合わせてクラスを付与しますが、対象とする要素のセレクタを好きに設定できます。

jQueryで言うところの `$('ここ')` の内容を記述してください。

例1： `class1` というクラス名を持つ要素を対象にする。

```
new Scrollon('.class1');
```


例2： `id1` というid名を持つ要素、 `class1` というクラス名を持つ要素、`section` タグを対象にする。

```
new Scrollon('#id1, .class1, section');
```

## 第2引数で指定できるオプションとその初期値について

対象とする要素の他、3種類のオプションを指定できます。

- 付与するクラス名
- ウインドウ内に入る瞬間のスクロール値に対するオフセット値
- スクロールイベントの負荷軽減のための setTimeout関数のインターバル

それぞれの初期値は以下です。

```
let = options{
    addClassName = "scon",
    offset = 0,
    interval = 50
};
new Scrollon("",options);
```

オプションのみ指定する場合は上記のように、**第１引数を空文字**（`""`）として下さい。


例：付与するクラス名を "show" にする

```
let = options{
    addClassName = "show"
}
new Scrollon("",options);
```


# 注意事項
現在は上から下への通常のスクロールに対してのみ発動します。

ブラウザ更新時、すでにスクロールされている場合はその位置より上の要素に対しては、全てDOM読み込み時にクラスが付与されます。