import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Function to generate a chat completion using Azure OpenAI
export async function getAzureChatCompletion(
  endpoint: string,
  deployment: string,
  prompt: string,
  input: string,
  temperature: number,
  max_tokens: number
): Promise<any> {
  // Use Azure Default Credential to authenticate via Azure AD
  const credential = new DefaultAzureCredential();
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);

  const apiVersion = "2024-04-01-preview";
  const options = { azureADTokenProvider, deployment, apiVersion }
  const client = new AzureOpenAI(endpoint, options);

  const messages = [
    { role: "system", content: prompt },
    { role: "user", content: input },
  ];

  // Call the Azure OpenAI API to get a chat completion
  const completion = await client.chat.completions.create({
    messages: messages,
    temperature: temperature,
    max_tokens: max_tokens,
  });

  return completion;
}
