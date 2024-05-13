// Define example questions with corresponding IDs and answers
export const exampleQuestions = [
    { id: 1, text: "How can I set my carpool schedule?" },
    { id: 2, text: "What routes are available?" },
    { id: 3, text: "How do I manage payments?" },
    { id: 4, text: "What are the safety measures?" }
  ];
  
  // Function to format suggested questions for display
  export function getSuggestedQuestions() {
    return exampleQuestions.map(q => `${q.id}. ${q.text}`).join('\n');
  }
  
  // Function to provide detailed answers based on question ID
  export function provideAnswer(questionId) {
    switch (questionId) {
      case 1:
        return "To set your carpool schedule, go to the Schedule tab in our app and select 'Add new schedule'.";
      case 2:
        return "You can view available routes by accessing the Routes section in the app. From there, you can also create your own route.";
      case 3:
        return "Payments can be managed through the Payments section. You can add a credit or debit card and view transaction history.";
      case 4:
        return "Safety is our top priority. All drivers are verified and must pass a background check. Read more in our Safety Guidelines section.";
      default:
        return "Sorry, I don't have information on that topic.";
    }
  }
  
  // Update the getResponse Function to handle numbers, full questions, and provide answers
  export function getResponse(message) {
    message = message.trim().toLowerCase();
  
    // Check if the message is a number and map it to a question
    const questionById = exampleQuestions.find(q => q.id === parseInt(message));
    if (questionById) {
      return provideAnswer(questionById.id);  // Get detailed answer based on question ID
    }
  
    // Check if the message matches the full text of a question
    const questionByText = exampleQuestions.find(q => q.text.toLowerCase() === message);
    if (questionByText) {
      return provideAnswer(questionByText.id);  // Get detailed answer based on question ID
    }
  
    // Default response for unrecognized input
    return "I'm not sure how to handle that. Here are some questions you might ask:\n" + getSuggestedQuestions();
  }
  