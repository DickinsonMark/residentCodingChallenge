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
        var rootElement = $(`<${result[i].tag}></${result[i].tag}>`);
        $('#output').append(rootElement);
        changeToHTML(result[i], rootElement);
      }

      function changeToHTML(input, parent) {
        debugger;
        console.log(parent);
        if (Array.isArray(input.content)) {
          for (let j = 0; j < input.content.length; j++) {
            $(parent).append(`<${input.tag}></${input.tag}>`);
            console.log(parent);
            changeToHTML(input.content[j], parent);
          }
        } else if (Object(input.content) === input.content) {
          if (Array.isArray(input.content.content)) {
            changeToHTML(input.content, parent);
          } else {
            $(parent).append(`<${input.content.tag}>${input.content.content}</${input.tag}`);
          }
        } else {
          $(parent).append(`<${input.tag}>${input.content}</${input.tag}`);
          console.log('string', input.content);
        }
      }
    }
  });
});
