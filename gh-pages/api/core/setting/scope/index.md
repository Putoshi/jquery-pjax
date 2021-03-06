---
layout: bootstrap
title: scope
type: page
nav: nav
class: style-api style-api-detail
---

# scope
ページ遷移にpjaxを使用するURLを設定します。設定はサブディレクトリにも適用されます。初期値は`null`です。

<a href="{{ site.basepath }}demo/scope/" target="_blank" class="btn btn-primary" role="button">demo</a>

* aboutディレクトリ下はprimaryのみ更新される
* blogディレクトリ下と外部とのページ遷移はprimaryとsecondaryが更新される
* blogディレクトリ下のページ遷移はprimaryのみ更新される
* contactディレクトリ下はpjax無効

<pre class="sh brush: js;">
$.pjax({
  area: '#primary',
  scope: {
    '/': ['/', '#blog', '#contact'],
    '/jquery-pjax/demo/scope/blog/': ['/jquery-pjax/demo/scope/blog/', 'inherit'],
    blog: ['/jquery-pjax/demo/scope/blog/'],
    $blog: { area: '#primary, #secondary' },
    contact: ['!/jquery-pjax/demo/scope/contact/']
  }
});
</pre>

## scope: object
ルートパスをキーとするハッシュテーブルによりURLごとの動作を設定します。キーは遷移元のURLが使用されます。値に遷移元および遷移先に前方一致するURLを設定します。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    '/': ['/about/', '/blog/']
  }
});
</pre>

文字列を値に設定するとその文字列をキーとする値を使用します。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    'pattern': ['/about/', '/blog/'],
    '/': 'pattern'
  }
});
</pre>

`'#'`接頭辞により配列内部で値を展開できます。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    'pattern': ['/about/', '/blog/'],
    '/': ['#pattern']
  }
});
</pre>

`'$'`接頭辞によりpjax設定を上書きできます。遷移元または遷移先のURLに一致する最後のパターンが使用されます。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/search/`ディレクトリ下ではGET送信フォームでpjaxを使用する。
    search: ['/search/'],
    $search: {form: 'form:not([method])'},
    '/': ['/', '#search']
  }
});
</pre>

`'*'`接頭辞により正規表現を使用できます。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/about/`と`/blog/`ディレクトリ下でのみpjaxを使用する。
    '/': ['*/(about|blog)/']
  }
});
</pre>

`'!'`接頭辞により否定表現を使用できます。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/board/`と`/contact/`ディレクトリ下を除くすべてのページでpjaxを使用する。
    '/': ['/', '!*/(board|contact)/']
  }
});
</pre>

`'inherit'`キーワードを指定すると直近のハッシュキーで動作が確定しなかった場合に、さらに上位のディレクトリのハッシュキーを適用します。

<pre class="sh brush: js;">
$.pjax({
  scope: {
    // `/contact/*.php`を除くすべてのページでpjaxを使用する。
    '/': ['/', '!*/contact/.+\.php'],
    '/contact/': ['!*/contact/.+\.php', 'inherit']
  }
});
</pre>
