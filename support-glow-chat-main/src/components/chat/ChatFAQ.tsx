const faqQuestions = [
  "How can I track my order?",
  "What's your return policy?", 
  "Do you offer international shipping?",
  "How to reset my password?",
  "Where can I find my invoice?"
];

interface ChatFAQProps {
  onFAQClick: (faqText: string) => void;
}

export const ChatFAQ = ({ onFAQClick }: ChatFAQProps) => {
  return (
    <div className="pb-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {faqQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onFAQClick(question)}
            className="faq-button hover-scale"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};