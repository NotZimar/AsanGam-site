// لیست نظرات کاربران
const feedbacks = [
  {
    name: "حسین محمدی",
    message: "استفاده از این سامانه واقعاً فراتر از انتظارم بود. رابط کاربری ساده و خیلی راحت به نتیجه رسیدم. پشتیبانی سریع و کارآمد بود.",
  },
  {
    name: "زهرا احمدی",
    message: "طراحی سایت خیلی جذابه و کار کردن باهاش راحته. ممنون از تیم خوبتون. قیمت‌ها هم مناسبه.",
  },
  {
    name: "علی رضایی",
    message: "خدمات ارائه شده بسیار کامل و حرفه‌ای هستن. پیشنهاد می‌کنم حتما امتحان کنید.",
  }
];

function showFeedback(idx) {
  const feedback = feedbacks[idx];
  document.getElementById('feedback-content').innerHTML = `
    <div class="feedback-avatar">
      <div class="feedback-lines">
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="feedback-text">
      <div class="feedback-name">${feedback.name}</div>
      <div class="feedback-message">${feedback.message}</div>
    </div>
  `;
  document.querySelectorAll('.feedback-dots .dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

let current = 0;
let feedbackInterval;

function startFeedbackSlideshow() {
  feedbackInterval = setInterval(() => {
    current = (current + 1) % feedbacks.length;
    showFeedback(current);
  }, 5000);
}

window.onload = () => {
  showFeedback(0);
  startFeedbackSlideshow();
  document.querySelectorAll('.feedback-dots .dot').forEach((dot, i) => {
    dot.onclick = () => {
      clearInterval(feedbackInterval);
      current = i;
      showFeedback(current);
      startFeedbackSlideshow();
    };
  });
};
