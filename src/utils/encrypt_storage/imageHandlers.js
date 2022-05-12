export function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
export function loadImagePreview(file, id) {
  var output = document.getElementById(id);
  output.src = URL.createObjectURL(file);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
}
