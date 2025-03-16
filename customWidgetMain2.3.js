// Code to format given string
(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;

  class MainWebComponent extends HTMLElement {
    // Method to capture the input string from the text box and apply filters
   Function  getFilters(inputString) {
      // Define a regular expression to match the key-value pairs
      const regex = /(\w+\s*\w*)\s*=\s*([^,]+)/g;
      console.log(regex);

      // Initialize an object to store the extracted values
      var filters = {};

      // Use the regular expression to extract key-value pairs
      let match;
      while ((match = regex.exec(inputString)) !== null) {
        // Extract the key
        const key = match[1].trim();

        // Extract the value
        const value = match[2].trim();

        // Store the key-value pair in the filters object
        filters[key] = value;
        console.log(filters);
      }
      // Return the extracted filters
      return JSON.stringify(filters);
    }
  } 

  customElements.define("custom-widget", MainWebComponent);
})();
