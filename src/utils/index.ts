export function entityForSymbol(unicode: string) {
  var code = unicode.charCodeAt(0);
  var codeHex = code.toString(16).toUpperCase();
  while (codeHex.length < 4) {
    codeHex = "0" + codeHex;
  }

  return codeHex.toLowerCase();
}
