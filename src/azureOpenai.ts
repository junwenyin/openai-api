const { OpenAIClient } = require("@azure/openai");
const { DefaultAzureCredential } = require("@azure/identity");

// Function to generate a chat completion using Azure OpenAI
export async function getAzureChatCompletion(
  azureEndpoint: string,
  deployment: string,
  prompt: string,
  input: string,
  temperature: number,
  max_tokens: number
): Promise<any> {
  // Use Azure Default Credential to authenticate via Azure AD
  const client = new OpenAIClient(azureEndpoint, new DefaultAzureCredential());

  const messages = [
    { role: "system", content: prompt },
    { role: "user", content: input },
  ];

  // Call the Azure OpenAI API to get a chat completion
  const completion = await client.getCompletions(deploymentId, {
    messages: messages,
    temperature: temperature,
    max_tokens: max_tokens,
  });

  return completion;
}
