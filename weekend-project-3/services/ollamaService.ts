// services/ollamaService.ts

export async function generateStoryWithOllama(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral:latest',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Ollama API Error (Status):", response.status);
      console.error("Ollama API Error (Body):", errorData);
      throw new Error(`HTTP error! status: ${response.status}: ${errorData?.error || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Ollama API Response:", JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else if (data.message && data.message.content) {
      return data.message.content;
    } else {
      console.error("Unexpected Ollama API response:", data);
      throw new Error("Unexpected Ollama API response format");
    }
  } catch (error) {
    console.error("Error generating story with Ollama:", error);
    throw error;
  }
}

