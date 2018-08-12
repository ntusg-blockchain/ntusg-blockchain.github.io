(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// All ems with platform content should be styled as platform label
function fixPlatformLabels () {
  var ems = document.querySelectorAll('em')
  Array.prototype.forEach.call(ems, function (em) {
    if (em.textContent === 'macOS' || em.textContent === 'Linux' || em.textContent === 'Windows') {
      em.classList.add('platform-label')
    }
  })
}

// Override incorrect styling of string templates and colons in objects
function fixSyntaxHighlighting () {
  var sts = document.querySelectorAll('.err')
  Array.prototype.forEach.call(sts, function (st) {
    if (st.textContent === '`' || st.textContent === ':') {
      st.classList.remove('err')
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  fixPlatformLabels()
  fixSyntaxHighlighting()
})

},{}]},{},[1]);
