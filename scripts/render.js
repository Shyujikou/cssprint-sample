var page = require('webpage').create();
var fs = require('fs'),
    system = require('system');

page.open(system.args[1], function() {
  var interval, allDone;

  allDone = page.evaluate(function () {
      if (window.MathJax) {
          MathJax.Hub.Register.StartupHook('End', function () {
              window.allDone = 1;
          });
          return false;
      } else {
          return true;
      }
  });

  interval = setInterval(function () {
      var allDone = page.evaluate(function () {
          return window.allDone;
      });

      if (allDone) {
          clearInterval(interval);
          console.log(page.content);
          phantom.exit();
      }
  }, 100);
});
