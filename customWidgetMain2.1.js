var ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        model: "gpt-4o",
        messages : [
          { role: 'system', content:'You are a helpful assistant'},
          { role: 'developer', content:'Interpret this input data by user to figure out the changes required in Dashboard filter or KPI using data after this line : Input Data - what would happen if we increase Net Income by 2% for Alpha Company ./using the context data here : Context Data - A Dashboard has 3 filters - Date ( Year ) , Company Code, Jurisdiction /n/n Dashboard has 2 KPIs Net Income and Net Tax Expense /n/n Return the response as given in  the example response here example1 : user :  what would happen if we increase Net Income for Alpha Company by 5%, /nAssistant : Filters = [ Year = NA, Company Code = Alpha Company, Jurisdiction = NA ], KPI = [ Net Income = 0.05, Net Tax Expense = NA], example2 : user :  what would happen if we increase Net Tax expense  for Beta Company by 2% in year = 2021 , /nAssistant : Filters = [ Year = 2021, Company Code = Beta Company, Jurisdiction = NA ] KPI = [  Net Tax = NA, Net Tax Expense = 0.02].Important information : keep the response as example response , do not give extra information, just stick to response format/n '},
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
      try {
            const { response } = await ajaxCall(apiKey, `${url}/${endpoint}`, prompt);
            console.log('Full Response:', response);
            console.log(response.choices[0].text);
            const gptResponse =  response.choices[0].message.content;
            return gptResponse;
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
