$(document).ready(function() {

  $('#fileUpload').on('submit', function(e) {
    e.preventDefault();
    // get the file input in jQuery
    const $inputFile = $('#file');
    const $input = $inputFile[0];
    const $file = $input.files[0];
    const fr = new FileReader();
    fr.onloadend = onloadendFn;

    function onloadendFn() {
      const result = JSON.parse(fr.result);
      const $output = $('#output');

      $output.empty();
      for (let i = 0; i < result.length; i++) {
        var rootElement = $(`<${result[i].tag}></${result[i].tag}>`);
        $output.append(rootElement);
        changeToHTML(result[i].content, rootElement);
      }

      function changeToHTML(input, parent) {
        if (Array.isArray(input)) {
          for (let j = 0; j < input.length; j++) {
            changeToHTML(input[j], parent);
          }
        } else if (Object(input) === input) {
          const newParent = $(`<${input.tag}></${input.tag}`);
          parent.append(newParent);
          changeToHTML(input.content, newParent);
        } else {
          $(parent).html(input);
        }
      }
    }
    fr.readAsText($file);
  });
});
