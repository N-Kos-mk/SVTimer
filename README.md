# SVTimer
SV Timerです。SVの道具プリンターの乱数時刻調整用です。

[ここへアクセス](https://n-kos-mk.github.io/SVTimer/)


## 使い方
スマホとかの比率だと自動でセクションが縦に並びます。

![image](https://github.com/N-Kos-mk/SVTimer/assets/82209854/648bfb77-a878-4424-aa39-58dbc1b197f8)

左上は**チャンス設定**セクションです。
下のボタン部分は通常のストップウォッチです。resetを押すとタイマー実行中でも0に戻ります。
startを押すと、残り時間があらかじめ設定したゲージ移動開始時間になったとき、右側の青いバーが動き始めます。
青バーが緑バーに重なった時にswitchのAを押しておとしもの選択画面に移動するといいタイミングでレアボチャンスが始まります。

レアボチャンスボタンを押すと道具チャンスモードに変わります。
使っているswitchによって時間が若干異なりますが、今のところこの時間を変更する機能がないので気合で修正してください。

![image](https://github.com/N-Kos-mk/SVTimer/assets/82209854/4dfda41f-c094-4014-a51a-0fcaba658de6)

その下は**2倍時間**セクションです。
ストップウォッチ部分は同じです。表示年月日とタイミング時間は後述の設定で変更できます。

![image](https://github.com/N-Kos-mk/SVTimer/assets/82209854/12c5bf9f-13c9-4d08-b8bb-f8d9f22d3bf7)

水色の左上は**ゲージ移動開始時間**設定セクションです。
例えばここを3秒にして決定を押すと、残り3秒になるとゲージが動き始めるようになります(デフォルトは3秒です)。

![image](https://github.com/N-Kos-mk/SVTimer/assets/82209854/b81c29a0-41c1-44b5-8ac7-c3b0845ffc86)

**「データの追加」** ボタンを押すとこのような画面が表示されます。~~ボタンがはみ出てるとか言わない。~~
ここでもろもろの情報を入力して決定を押すと、データを登録することができます。
**「データの削除」** ボタンでは選択中のデータを削除できます。

> [!CAUTION]
> 面倒ですが追加/削除後一回ページをリロードしてください。
> 追加されたときにデータが最適化されない不具合です。
> 作ってからだいぶたってこのmdを書いているのでもう直す気がないんです。

![image](https://github.com/N-Kos-mk/SVTimer/assets/82209854/ee65d6d4-d0ce-42ee-9fe4-133a5167249e)

追加されたデータは水色のセクションに表示されます。
上から順に「名前」「表示名」「メモ」に対応しています。

「表示名」プルダウンから、これまでに保存したデータにアクセスできます。
保存したデータはブラウザに保存しています。キャッシュを削除するなどのことをするとこのデータが消えるので気をつけてください。

保存したデータはダウンロードしてローカルに保存しておくこともできます。
右下のデータをエクスポートボタンを押すとブラウザから名前を入力、OKを押すとjsonファイルがダウンロードされます。
jsonのわかる人は自由に弄ってください。
エクスポートしたjsonデータは右上の **「ファイルを選択」** ボタンからファイルを選ぶことで、再度ブラウザにデータをインポートできます。
このとき、その時点でブラウザに保存してあったデータは、インポートされたデータに上書きされるので気をつけてください。

## いちいちデータ追加するのめんどくさい！
わかる。

html、js、cssをダウンロードして
```html
<!--<div class="tmp">
    <input id="tmpTimeSet">
    <span>秒</span>
    <button class="submit_tmp">決定</button>
</div>-->
```

index.htmlの80-84行目のコメントアウトを解除してください。
下になんか出てくるので、そこに秒を入力して決定すると、データを追加せずに下のタイマーの時間を変更できます。

## その他
エラー起こしたり、ブラウザによってめっちゃ崩れたりするかもしれません。
ゆるしてください。
document.querySelectorをせこせこ使っていた頃の汚いコードです。
もちろんcssもぐちゃってます。~~動けばいいんだよ~~

## LICENSE
あぱっち

