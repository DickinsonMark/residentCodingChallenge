$(document).ready(function() {
  console.log('sanity check');

  $('#fileUpload').on('submit', function(e) {
    e.preventDefault();
    // get the file input in jQuery
    const $inputFile = $('#file');
    const $input = $inputFile[0];
    const $file = $input.files[0];
    const fr = new FileReader();
    fr.onloadend = onloadendFn;
    fr.readAsText($file);

    function onloadendFn() {
      const result = JSON.parse(fr.result);
      for (let i = 0; i < result.length; i++) {
        if (Array.isArray(result[i].content)) {
          console.log(result);
        }
      }
      console.log(result[0]);
    }
  });
});
