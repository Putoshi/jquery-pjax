
/^\d\.(?:[5-9]|\d{2,})\./.test(env.jquery) &&
suite("SVG", function () {
  this.timeout(5000);

  test("string", function (done) {
    var query = '?jquery=' + env.jquery + '&test=area-string.js';

    var iframe = $('<iframe/>', { 'class': "fixture" }).width(1024).height(960).appendTo('body')[0];
    var url = iframe.src = (window.__karma__ ? "/base/test/" : "./") + "fixture/index.html" + query;

    iframe.onload = function () {
      iframe.onload = null;
      var window, document, $, defer;

      self.$.Deferred().resolve()
      .pipe(function () {
        window = iframe.contentWindow;
        document = window.document;
        $ = window.$;

        assert.equal(document.title, 'pjax demo1', "title");
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary1', "primary");
        assert.equal($('#secondary p:first').text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first').text(), 'tertiary1', "tertiary");

        defer = self.$.Deferred();
        $(window).one('pjax:load', function () { setTimeout(defer.resolve, 0); });
        $('#primary svg a:eq(1)').each(function () { url = this.href.baseVal; }).click();

        return defer;
      })
      .pipe(function () {
        assert.equal(url.split('/').pop(), window.location.href.split('/').pop(), "url");
        assert.equal(document.title, 'pjax demo2', "title");
        assert.equal($('#header p:first').text(), 'header1', "header");
        assert.equal($('#primary p:first').text(), 'primary2', "primary");
        assert.equal($('#secondary p:first').text(), 'secondary1', "secondary");
        assert.equal($('#tertiary p:first').text(), 'tertiary2', "tertiary");
        assert.equal($('#primary div').length, 2, "length");

        done();
      });
    };
  });

});
