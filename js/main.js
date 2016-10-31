$(document).ready(function() {
  'use strict';

  $('#fileUpload').on('submit', function(e) {

    // Capture the form submission and prevent the default behavior
    e.preventDefault();

    // Get the file input in jQuery
    const $inputFile = $('#file');
    const $input = $inputFile[0];
    const $file = $input.files[0];
    const fileRead = new FileReader();
    fileRead.onloadend = onloadendFn;

    // Function to call when the file is done loading
    function onloadendFn() {

      // Parse the files contents into JSON format
      const result = JSON.parse(fileRead.result);
      const $output = $('#output');

      // Remove the current contents of the output display
      $output.empty();
      for (let i = 0; i < result.length; i++) {

        // Loop through the results of th file read
        var rootElement = $(`<${result[i].tag}></${result[i].tag}>`);
        $output.append(rootElement);

        // Call the function that does the actual work of the program!
        changeToHTML(result[i].content, rootElement);
      }

      function changeToHTML(input, parent) {

        // Check what the type of input is
        if (Array.isArray(input)) {

          // If it's an array then loop through the inputs and recall the function on each
          for (let j = 0; j < input.length; j++) {
            changeToHTML(input[j], parent);
          }
        } else if (Object(input) === input) {

          // If it's an object take the input's tag key and create the newparent for the function recall
          const newParent = $(`<${input.tag}></${input.tag}`);
          parent.append(newParent);

          // Recall the function with the content of the input as the new input
          changeToHTML(input.content, newParent);
        } else {

          // If the input is a string then add that as the content to the parent element
          $(parent).html(input);
        }
      }
    }

    // Read the file and output a text string
    fileRead.readAsText($file);
  });
});
