var ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4-0613",
        messages : [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ],
        max_tokens: 3000,
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
      ajaxCall(apiKey,`${url}/${endpoint}`,prompt)
       .then(({ response }) => {
        const gptResponse = response.choices[0].message.content;
        console.log('GPT-4 Response:', gptResponse);
        // Display the response in your widget or handle it as needed
        //document.getElementById('response').innerText = gptResponse;
       })
 	 .catch(error => {
    	  console.error('Error:', error);
        //document.getElementById('response').innerText = 'An error occurred. Please try again.';
  	 }); 
             
      	console.log(response.choices[0].text);
      	return gptResponse;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
