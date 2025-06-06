/**
 * Sends a prompt to the OpenAI Chat Completion API and returns the text response.
 * @param {string} apiKey  - OpenAI API key
 * @param {string} url     - OpenAI chat completions endpoint URL
 * @param {string} prompt  - User's prompt/question
 * @returns {Promise<string>}  - Text part of the response
 */
async function sendChatGPTPrompt(apiKey, url, prompt) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
