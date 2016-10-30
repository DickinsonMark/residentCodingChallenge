$(document).ready(function() {
  console.log('sanity check');

  $('#fileUpload').on('submit', function(e) {
    e.preventDefault();
    // get the file input in jQuery
    const $inputFile = $('#file');
    const $input = $inputFile[0];
    const $file = $input.files[0];
    const fr = new FileReader();
    console.log(fr);
    fr.onloadend = function() {
      $('.output').text(fr.result);
      console.log(fr.result);
      const result = eval(fr.result);

      for (let i = 0; i < result.length; i++;){
        
        if (result.tag && Array.isArray(result.content)) {

        }
      }
      console.log(result[0]);
    };
    fr.readAsText($file);
  });
});
