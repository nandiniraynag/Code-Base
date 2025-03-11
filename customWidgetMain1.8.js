var ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4o-mini",
        messages : [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ],
        "response_format": {
            "type": "json_object"
        },
        max_completion_tokens: 300,
        temperature: 1.00,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

const url = "https://api.openai.com/v1/chat";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(apiKey, endpoint, prompt) {
      try {
            const { response } = await ajaxCall(apiKey, `${url}/${endpoint}`, prompt);
            console.log('Full Response:', response);
            const gptResponse = response.choices[0].text;

           if ( response.choices.length > 0 )
           {
              console.log('GPT-4 Text:', gptResponse);
              console.log("Success, no error");
              return gptResponse;
           } else 
           {
              console.error('Unexpected response structure:', response);
              return null; // Return null if the response structure is unexpected
            }
                   
          }  // end of Try Block 
 	  catch (error) {
        console.error('Error:', error);
        // document.getElementById('response').innerText = 'An error occurred. Please try again.';
        return null; // Return null or an appropriate value in case of an error
       }
         
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
