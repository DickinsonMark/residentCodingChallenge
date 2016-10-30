$(document).ready(function() {

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
        changeToHTML(result[i]);
      }

      function changeToHTML(input) {
        if (Array.isArray(input.content)) {
          for (let j = 0; j < input.content.length; j++) {
            console.log('array', input.content[j]);
            changeToHTML(input.content[j])
          }
        } else if (Object(input.content) === input.content) {
          console.log('object', input.content.tag);
          changeToHTML(input.content)
        } else {
          console.log('string', input.content);
        }
      }
    }
  });
});
