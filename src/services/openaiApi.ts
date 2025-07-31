export const generateSummary = async (content: string): Promise<string> => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDt_6HA2iEgkY1-Fxb97npN7OiNL3vwzj0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Summarize the following note content in 3-4 sentences:\n\n${content}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return summary || "Summary could not be generated.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary.";
  }
};
