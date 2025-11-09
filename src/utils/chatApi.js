// Mock API for development - this would be replaced with actual backend
export const chatApi = {
  async sendMessage(message, context) {
    // In a real implementation, this would call your backend
    // For now, we'll simulate the API call with OpenRouter
    return new Promise(resolve => {
      setTimeout(async () => {
        try {
          // In a real backend, you would call OpenRouter API here
          const response = await callOpenRouterAPI(message, context);
          resolve(response);
        } catch (error) {
          console.error('Error calling OpenRouter:', error);
          resolve(
            "I'm having trouble connecting right now. Please try again later!"
          );
        }
      }, 1000);
    });
  },
};

// This would be called from your backend in production
async function callOpenRouterAPI(userMessage, context) {
  // This is a simplified representation of what would happen in a real backend
  // In reality, you'd make the API call to OpenRouter from your backend

  // For demo purposes, we'll return contextual responses
  const lowerInput = userMessage.toLowerCase();

  // Check if query is about portfolio content
  if (lowerInput.includes('experience') || lowerInput.includes('work')) {
    return `Vidya has ${context.experience.length} years of experience in energy sector, with roles at Customized Energy Solutions.`;
  } else if (lowerInput.includes('skill') || lowerInput.includes('technical')) {
    return `Her technical skills include: ${context.skills.technical.join(', ')}.`;
  } else if (
    lowerInput.includes('education') ||
    lowerInput.includes('degree')
  ) {
    return `She's currently pursuing M.Tech in Energy Technology, with a background in Physics and Education.`;
  } else if (lowerInput.includes('contact') || lowerInput.includes('email')) {
    return `You can contact Vidya at ${context.contact.email} or ${context.contact.phone}. Find her on LinkedIn: ${context.contact.linkedin}`;
  } else if (
    lowerInput.includes('project') ||
    lowerInput.includes('research')
  ) {
    return `Vidya has worked on projects including: ${context.projects.join(' and ')}.`;
  }

  // For generic queries, return a default response
  if (
    lowerInput.includes('hello') ||
    lowerInput.includes('hi') ||
    lowerInput.includes('hey')
  ) {
    return `Hello! I'm Vidya Raut's portfolio assistant. I can tell you about her energy market expertise, skills, experience, education, projects, and contact information. What would you like to know?`;
  }

  if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
    return `You're welcome! Feel free to ask me anything else about Vidya's background.`;
  }

  // Default response for unrecognized queries
  return `I'm an AI assistant for Vidya's portfolio. I can provide information about her experience in energy markets, technical skills, education, and contact details. For more specific information, please check her contact section.`;
}
