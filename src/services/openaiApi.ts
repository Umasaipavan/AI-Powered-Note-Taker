// OpenAI API integration
// Note: In production, this should be handled by a backend service for security
export const generateSummary = async (content: string): Promise<string> => {
  // For demo purposes, we'll simulate the API call
  // In production, replace this with actual OpenAI API integration
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const words = content.split(' ').length;
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      
      // Simulate AI-generated summary
      const summaries = [
        `This note contains ${words} words and ${sentences} sentences. It appears to discuss key concepts and ideas in a structured format.`,
        `A comprehensive note covering important topics with detailed explanations and examples throughout the content.`,
        `This note presents valuable insights and information organized in a clear, readable format for easy reference.`,
        `The content explores various themes and concepts, providing detailed analysis and thoughtful commentary on the subject matter.`
      ];
      
      const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
      resolve(randomSummary);
    }, 2000); // Simulate API delay
  });
};

// To use actual OpenAI API, uncomment and configure:
/*
export const generateSummary = async (content: string): Promise<string> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Please provide a concise summary of the following note content:\n\n${content}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
};
*/