$(document).ready(function() {
  'use strict';

  $('#fileUpload').on('submit', function(e) {
    //capture the film submission and prevent default behavior
    e.preventDefault();

    // get the file input in jQuery
    const $inputFile = $('#file');
    const $input = $inputFile[0];
    const $file = $input.files[0];
    const fileRead = new FileReader();
    fileRead.onloadend = onloadendFn;

    // function to call when the file is done loading
    function onloadendFn() {
      // parse the files contents into JSON format
      const result = JSON.parse(fileRead.result);
      const $output = $('#output');

      // remove the current contents of the output display
      $output.empty();
      for (let i = 0; i < result.length; i++) {
        //loop through the results of th file read
        var rootElement = $(`<${result[i].tag}></${result[i].tag}>`);
        $output.append(rootElement);
        // call the function that does the actual work of the program!
        changeToHTML(result[i].content, rootElement);
      }

      function changeToHTML(input, parent) {
        // check what the type of input is
        if (Array.isArray(input)) {
          // if it's an array then loop through the inputs and recall the function on each
          for (let j = 0; j < input.length; j++) {
            changeToHTML(input[j], parent);
          }
        } else if (Object(input) === input) {
          // if it's an object take the input's tag key and create the newparent for the function recall
          const newParent = $(`<${input.tag}></${input.tag}`);
          parent.append(newParent);
          // recall the function with the content of the input as the new input
          changeToHTML(input.content, newParent);
        } else {
          // if the input is a string then add that as the content to the parent element
          $(parent).html(input);
        }
      }
    }
    // read the file and output a text string
    fileRead.readAsText($file);
  });
});
