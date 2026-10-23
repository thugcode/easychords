// 언어 데이터(eng·kor traineddata)를 eng-data.js / kor-data.js에서 꺼내 주는 작은 연결 파일.
// 인식 엔진이 언어 파일을 요청하면 네트워크 대신 여기서 바로 돌려줘요.
importScripts('eng-data.js', 'kor-data.js');
var _fetch = self.fetch.bind(self);
self.fetch = function (u, opts) {
  var m = String(u).match(/(\w+)\.traineddata/);
  if (m && self.EASYCHORD_DATA && self.EASYCHORD_DATA[m[1]]) {
    var bin = atob(self.EASYCHORD_DATA[m[1]]), d = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) d[i] = bin.charCodeAt(i);
    return Promise.resolve(new Response(d));
  }
  return _fetch(u, opts);
};
importScripts('worker.min.js');
