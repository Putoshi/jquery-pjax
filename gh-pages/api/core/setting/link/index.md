---
layout: bootstrap
title: link
type: page
nav: nav
class: style-api style-api-detail
---

# link
ページ遷移にpjaxを使用するアンカーリンクを設定します。初期値は`'a:not([target])'`です。

<a href="{{ site.basepath }}demo/link/" target="_blank" class="btn btn-primary" role="button">demo</a>

## link: string
jQueryセレクタによりアンカーリンクを設定します。

<pre class="sh brush: js;">
$.pjax({
  link: '.pjax a:not([target])'
});
</pre>
