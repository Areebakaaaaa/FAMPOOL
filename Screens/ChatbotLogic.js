// ChatbotLogic.js

const responses = {
    "schedule": "You can set your carpool schedule in the app's Schedule section.",
    "routes": "Find or set your route in the app's Routes section.",
    "payments": "Manage your payments in the Payments section.",
    "safety": "Your safety is our priority. Check our safety guidelines in the app."
  };
  
  export function getResponse(message) {
    message = message.toLowerCase();
    if (message.includes("schedule")) return responses["schedule"];
    if (message.includes("route")) return responses["routes"];
    if (message.includes("payment")) return responses["payments"];
    if (message.includes("safety")) return responses["safety"];
  
    return "Sorry, I'm not sure how to answer that. Can you try asking something else?";
  }
  