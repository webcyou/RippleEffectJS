
# RippleEffectJS
- MaterialDesign - RippleEffect JavaScript Library

![](http://webcyou.com/ripple_effect_js/demo/img/screen_shot.png)

### これは何？
Material design対応。クリックまたはタッチで、リップルエフェクトを表示する、JavaScriptライブラリです。


### demo
[デモページ](http://webcyou.com/ripple_effect_js/demo/)

![](http://webcyou.com/ripple_effect_js/demo/img/screen_shot_demo_page.png)

デモページでは、設定を任意で変更可能です。

### Install

#### Bower
```
bower install ripple_effect.js
```

### Basic Usage

```
<script src="ripple_effect.js"></script>
```

### Advanced Usage

```
<script src="ripple_effect.js"></script>
```
```
var rippleEffect = new RippleEffect();
```
Singleton Object

#### Set Options
```
new RippleEffect(Options);
```

### Options
```
new RippleEffect({
  "color": "#ffffff"
});
```

# Options Reference

| OptionName        | DefaultValue         | SetValue                 | OptionDetail|
| --------------- |:---------------:| -------------------- | -------:|
| color | '#64c7eb' | string | RippleEffectの色を指定 |
| width | '50px' | string | RippleEffectの幅を指定。isCircle trueの場合は、width,heightいずれかの最大値と同等となる。 |
| height | null  | string | RippleEffectの高さを指定。isCircle trueの場合は、width,heightいずれかの最大値と同等となる。 |
| time | 500 | number (ms) | RippleEffectのアニメーションの速さを指定。 |
| image | null | string | 背景画像パスを指定。BackGroundImageSizeは、isCircle trueの場合は、width値と同等となる。 |
| isCircle | true | boolean | 円形判定。背景画像指定の際は、false指定。 |
| rippleClass | 'rf-ripple' | string (className) | RippleEffectの大枠のcssクラス名 |
| ripplePictureClass | 'rf-ripple-picture' | string (className) | RippleEffectの中身のcssクラス名 |


### Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


### License
Copyright (c) 2016 Daisuke Takayama
Released under the [MIT license](http://opensource.org/licenses/mit-license.php)


