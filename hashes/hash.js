app.controller('HashController', function($q) {
  var hashStuff = this;

  function toHash(digestType, str) {
    var buffer = new TextEncoder("utf-8").encode(str);
    return crypto.subtle.digest(digestType, buffer).then(function(hash) {
      return toHex(hash);
    });
  }

  function toBase64(str) {
    return btoa(String.fromCharCode.apply(null, str
      .replace(/\r|\n/g, '')
      .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
      .replace(/ +$/, '')
      .split(' ')));
  }

  function toHex(buffer) {
    var dataView = new DataView(buffer), hexCodes = '', i;
    for (i = 0; i < dataView.byteLength; i += 4) {
      hexCodes += ('00000000' + dataView.getUint32(i).toString(16)).slice(-8);
    }
    return hexCodes;
  }

  hashStuff.calc = function (str) {
    $q.all({ // like ES6 Promise.all()
      sha1: toHash('SHA-1', str),
      sha256: toHash('SHA-256', str),
      sha384: toHash('SHA-384', str),
      sha512: toHash('SHA-512', str)
    }).then(function(result){
      hashStuff.sha1 = result.sha1;
      hashStuff.sha1base64 = toBase64(result.sha1);

      hashStuff.sha256 = result.sha256;
      hashStuff.sha256base64 = toBase64(result.sha256);

      hashStuff.sha384 = result.sha384;
      hashStuff.sha384base64 = toBase64(result.sha384);

      hashStuff.sha512 = result.sha512;
      hashStuff.sha512base64 = toBase64(result.sha512);
    });
  }

});
