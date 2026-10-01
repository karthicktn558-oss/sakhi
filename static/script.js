const form = document.querySelector("#question-form");
const question = document.querySelector("#question");
const submitButton = document.querySelector("#submit-button");
const answerPanel = document.querySelector("#answer-panel");
const answerTitle = document.querySelector("#answer-title");
const answerContent = document.querySelector("#answer-content");
const voiceButton = document.querySelector("#voice-button");
const voiceLabel = document.querySelector("#voice-label");
const voiceStatus = document.querySelector("#voice-status");
const speakButton = document.querySelector("#speak-button");
const languageSelect = document.querySelector("#language-select");
const questionLabel = document.querySelector("#question-label");
let activeLanguage = languageSelect.value;
let languageExplicitlySelected = false;

const LANGUAGE_UI = {
  ta: {
    htmlLang: "ta", selectorLabel: "மொழி", subtitle: "Your multilingual guide to government services",
    introEyebrow: "அரசு சேவைகள் · எளிய தமிழ்", introTitle: "வணக்கம், Namma Seva AI.",
    introCopy: "அரசு சேவைகளைப் புரிந்துகொண்டு அடுத்த படியைத் தெரிந்துகொள்ள நான் உதவுகிறேன்.",
    askTitle: "உங்களுக்கு என்ன உதவி வேண்டும்?", askHint: "உங்கள் கேள்வியைத் தமிழில் எழுதுங்கள் அல்லது சொல்லுங்கள்.",
    questionLabel: "உங்கள் கேள்வி", placeholder: "எனக்கு ரேஷன் கார்டு வேண்டும்", voice: "பேசித் தேடுங்கள்",
    listening: "கேட்கிறேன்...", voicePrompt: "இப்போது உங்கள் கேள்வியைச் சொல்லுங்கள்.",
    voiceFilled: "கேள்வி எழுதப்பட்டுள்ளது. வழிகாட்டுங்கள் என்பதை அழுத்துங்கள்.",
    micDenied: "ஒலிவாங்கி அனுமதி தேவை. அனுமதி அளித்து மீண்டும் முயற்சிக்கவும்.",
    micUnsupported: "இந்த உலாவியில் குரல் உள்ளீடு இல்லை. கேள்வியைத் தட்டச்சு செய்யலாம்.",
    micLanguageFallback: "இந்த மொழியில் குரல் உள்ளீடு இல்லை. தமிழில் பேசிப் பாருங்கள்.",
    micError: "குரலைப் புரிந்துகொள்ள முடியவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது தட்டச்சு செய்யவும்.",
    micStartError: "குரல் உள்ளீட்டைத் தொடங்க முடியவில்லை. தட்டச்சு செய்து முயற்சிக்கவும்.",
    submit: "வழிகாட்டுங்கள்", examplesLabel: "உதாரணம்", answerEyebrow: "உங்களுக்கான வழிகாட்டல்",
    sampleNote: "மாதிரி வழிகாட்டல் · அதிகாரப்பூர்வ அரசு தகவல் அல்ல", speak: "கேளுங்கள்",
    speakAria: "பதிலைச் சத்தமாகப் படிக்கவும்", notice: "இது ஒரு முன்மாதிரி. தகவல்கள் மாதிரி மட்டுமே; தற்போதைய விதிகளை அருகிலுள்ள அரசு அலுவலகத்தில் உறுதிப்படுத்துங்கள்.",
    footer: "உங்கள் கேள்வி இந்தச் சாதனத்தில் இருந்து வழிகாட்டலுக்காக மட்டுமே பயன்படுத்தப்படுகிறது.",
    pending: "ஒரு நிமிடம்...", errorTitle: "தகவலைப் பெற முடியவில்லை", retry: "மீண்டும் முயற்சிக்கவும்.",
    unclearTitle: "எந்த சேவை வேண்டும் என்று சொல்லுங்கள்", clarifyHeading: "நிச்சயமாக உதவுகிறேன்",
    sections: { about: "இது என்ன?", eligibility: "யாருக்கு பயன்படும்?", documents: "பொதுவாக தேவையான ஆவணங்கள்", steps: "எப்படி விண்ணப்பிப்பது?", next: "அடுத்ததாக என்ன செய்ய வேண்டும்?", help: "உதவி தேவைப்பட்டால்?", accuracy: "முக்கிய குறிப்பு", retry: "மீண்டும் முயற்சிக்கவும்" },
    examples: [
      ["ரேஷன் கார்டு", "எனக்கு ரேஷன் கார்டு வேண்டும்"],
      ["விதவை உதவி", "எனக்கு விதவை உதவித்தொகை வேண்டும்"],
      ["கல்வி உதவித்தொகை", "அரசு கல்வி உதவித்தொகை எப்படி பெறுவது?"],
      ["பிறப்பு சான்றிதழ்", "எனக்கு பிறப்பு சான்றிதழ் வேண்டும்"],
      ["ஓய்வூதியம்", "எனக்கு ஓய்வூதியம் வேண்டும்"],
      ["மருத்துவ உதவி", "எனக்கு அரசு மருத்துவ உதவி வேண்டும்"],
    ],
  },
  hi: {
    htmlLang: "hi", selectorLabel: "भाषा", subtitle: "Your multilingual guide to government services",
    introEyebrow: "सरकारी सेवाएँ · सरल भाषा", introTitle: "नमस्ते, Namma Seva AI.",
    introCopy: "सरकारी सेवाओं को समझने और अगला कदम जानने में मैं आपकी मदद करूँगी।",
    askTitle: "आपको किस चीज़ में मदद चाहिए?", askHint: "अपना सवाल लिखें या बोलें।",
    questionLabel: "आपका सवाल", placeholder: "मुझे राशन कार्ड चाहिए", voice: "बोलकर पूछें",
    listening: "सुन रही हूँ...", voicePrompt: "अब अपना सवाल बोलें।",
    voiceFilled: "सवाल लिख दिया गया है। अब मार्गदर्शन लें दबाएँ।",
    micDenied: "माइक्रोफ़ोन की अनुमति दें और फिर कोशिश करें।",
    micUnsupported: "इस ब्राउज़र में आवाज़ से सवाल नहीं लिया जा सकता। आप टाइप कर सकते हैं।",
    micLanguageFallback: "इस भाषा में आवाज़ पहचान उपलब्ध नहीं है। हिंदी में बोलकर देखें।",
    micError: "आवाज़ समझ नहीं आई। फिर कोशिश करें या टाइप करें।",
    micStartError: "आवाज़ पहचान शुरू नहीं हो सकी। टाइप करके कोशिश करें।",
    submit: "मार्गदर्शन लें", examplesLabel: "उदाहरण", answerEyebrow: "आपके लिए जानकारी",
    sampleNote: "नमूना जानकारी · सरकारी सूचना नहीं", speak: "सुनें",
    speakAria: "जवाब ज़ोर से सुनें", notice: "यह एक नमूना है। जानकारी बदल सकती है; मौजूदा नियम सरकारी कार्यालय से जाँचें।",
    footer: "आपका सवाल इसी डिवाइस पर मार्गदर्शन के लिए इस्तेमाल होता है।", pending: "एक पल...",
    errorTitle: "जानकारी नहीं मिल सकी", retry: "फिर कोशिश करें।", unclearTitle: "कौन-सी सेवा चाहिए?",
    clarifyHeading: "मैं मदद करूँगी", sections: { about: "यह क्या है?", eligibility: "यह किसके लिए है?", documents: "आम तौर पर जरूरी दस्तावेज़", steps: "आवेदन कैसे करें?", next: "अब आगे क्या करें?", help: "मदद कहाँ मिलेगी?", accuracy: "जरूरी सूचना", retry: "फिर कोशिश करें" },
    examples: [
      ["राशन कार्ड", "मुझे राशन कार्ड चाहिए"],
      ["विधवा पेंशन", "मुझे विधवा पेंशन चाहिए"],
      ["छात्रवृत्ति", "मुझे सरकारी छात्रवृत्ति चाहिए"],
      ["जन्म प्रमाण पत्र", "मुझे जन्म प्रमाण पत्र चाहिए"],
      ["पेंशन", "मुझे पेंशन चाहिए"],
      ["स्वास्थ्य सहायता", "मुझे सरकारी चिकित्सा सहायता चाहिए"],
    ],
  },
  te: {
    htmlLang: "te", selectorLabel: "భాష", subtitle: "Your multilingual guide to government services",
    introEyebrow: "ప్రభుత్వ సేవలు · సరళమైన భాష", introTitle: "నమస్కారం, Namma Seva AI.",
    introCopy: "ప్రభుత్వ సేవలను అర్థం చేసుకుని తదుపరి అడుగు తెలుసుకోవడంలో సహాయం చేస్తాను.",
    askTitle: "మీకు ఏ సహాయం కావాలి?", askHint: "మీ ప్రశ్నను టైప్ చేయండి లేదా చెప్పండి.",
    questionLabel: "మీ ప్రశ్న", placeholder: "నాకు రేషన్ కార్డు కావాలి", voice: "మాట్లాడి అడగండి",
    listening: "వింటున్నాను...", voicePrompt: "ఇప్పుడు మీ ప్రశ్న చెప్పండి.",
    voiceFilled: "మీ ప్రశ్న రాయబడింది. మార్గదర్శనం పొందండి నొక్కండి.",
    micDenied: "మైక్రోఫోన్ అనుమతి ఇవ్వండి, మళ్లీ ప్రయత్నించండి.",
    micUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ లేదు. టైప్ చేయవచ్చు.",
    micLanguageFallback: "ఈ భాషలో వాయిస్ గుర్తింపు లేదు. తెలుగులో మాట్లాడి చూడండి.",
    micError: "మీ మాట అర్థం కాలేదు. మళ్లీ ప్రయత్నించండి లేదా టైప్ చేయండి.",
    micStartError: "వాయిస్ ఇన్‌పుట్ ప్రారంభం కాలేదు. టైప్ చేసి ప్రయత్నించండి.",
    submit: "మార్గదర్శనం పొందండి", examplesLabel: "ఉదాహరణలు", answerEyebrow: "మీకు కావలసిన సమాచారం",
    sampleNote: "నమూనా సమాచారం · ప్రభుత్వ సమాచారం కాదు", speak: "వినండి",
    speakAria: "సమాధానాన్ని గట్టిగా వినండి", notice: "ఇది నమూనా మాత్రమే. సమాచారం మారవచ్చు; ప్రస్తుత నిబంధనలను ప్రభుత్వ కార్యాలయంలో నిర్ధారించండి.",
    footer: "మీ ప్రశ్న ఈ పరికరంలో మార్గదర్శనం కోసం మాత్రమే ఉపయోగించబడుతుంది.", pending: "ఒక్క క్షణం...",
    errorTitle: "సమాచారం పొందలేకపోయాము", retry: "మళ్లీ ప్రయత్నించండి.", unclearTitle: "మీకు ఏ సేవ కావాలి?",
    clarifyHeading: "తప్పకుండా సహాయం చేస్తాను", sections: { about: "ఇది ఏమిటి?", eligibility: "ఎవరికి ఉపయోగం?", documents: "సాధారణంగా అవసరమైన పత్రాలు", steps: "ఎలా దరఖాస్తు చేయాలి?", next: "తర్వాత ఏమి చేయాలి?", help: "సహాయం ఎక్కడ పొందాలి?", accuracy: "ముఖ్య గమనిక", retry: "మళ్లీ ప్రయత్నించండి" },
    examples: [
      ["రేషన్ కార్డు", "నాకు రేషన్ కార్డు కావాలి"],
      ["వితంతు పెన్షన్", "నాకు వితంతు పెన్షన్ కావాలి"],
      ["విద్యా సహాయం", "నాకు ప్రభుత్వ విద్యా సహాయం కావాలి"],
      ["జనన ధృవీకరణ పత్రం", "నాకు జనన ధృవీకరణ పత్రం కావాలి"],
      ["పెన్షన్", "నాకు పెన్షన్ కావాలి"],
      ["వైద్య సహాయం", "నాకు ప్రభుత్వ వైద్య సహాయం కావాలి"],
    ],
  },
  bn: {
    htmlLang: "bn", selectorLabel: "ভাষা", subtitle: "Your multilingual guide to government services",
    introEyebrow: "সরকারি পরিষেবা · সহজ ভাষা", introTitle: "নমস্কার, Namma Seva AI.",
    introCopy: "সরকারি পরিষেবা বুঝতে এবং পরের ধাপ জানতে আমি সাহায্য করব।",
    askTitle: "আপনার কী সাহায্য দরকার?", askHint: "আপনার প্রশ্ন লিখুন বা বলুন।",
    questionLabel: "আপনার প্রশ্ন", placeholder: "আমার রেশন কার্ড দরকার", voice: "কথা বলে জিজ্ঞাসা করুন",
    listening: "শুনছি...", voicePrompt: "এখন আপনার প্রশ্ন বলুন।",
    voiceFilled: "প্রশ্ন লেখা হয়েছে। এবার নির্দেশনা নিন চাপুন।",
    micDenied: "মাইক্রোফোনের অনুমতি দিন, তারপর আবার চেষ্টা করুন।",
    micUnsupported: "এই ব্রাউজারে কথা বলে প্রশ্ন করা যায় না। আপনি লিখতে পারেন।",
    micLanguageFallback: "এই ভাষায় কথা শনাক্ত করা যাচ্ছে না। বাংলায় বলে দেখুন।",
    micError: "কথা বোঝা যায়নি। আবার চেষ্টা করুন বা লিখুন।",
    micStartError: "কথা শনাক্ত করা শুরু হয়নি। লিখে চেষ্টা করুন।",
    submit: "নির্দেশনা নিন", examplesLabel: "উদাহরণ", answerEyebrow: "আপনার জন্য তথ্য",
    sampleNote: "নমুনা তথ্য · সরকারি তথ্য নয়", speak: "শুনুন",
    speakAria: "উত্তর জোরে শুনুন", notice: "এটি একটি নমুনা। তথ্য বদলাতে পারে; বর্তমান নিয়ম সরকারি দপ্তরে যাচাই করুন।",
    footer: "আপনার প্রশ্ন এই যন্ত্রে শুধু নির্দেশনার জন্য ব্যবহার করা হয়।", pending: "একটু অপেক্ষা করুন...",
    errorTitle: "তথ্য পাওয়া যায়নি", retry: "আবার চেষ্টা করুন।", unclearTitle: "কোন পরিষেবা চান?",
    clarifyHeading: "অবশ্যই সাহায্য করব", sections: { about: "এটি কী?", eligibility: "কার জন্য?", documents: "সাধারণত যে নথি লাগে", steps: "কীভাবে আবেদন করবেন?", next: "এরপর কী করবেন?", help: "কোথায় সাহায্য পাবেন?", accuracy: "গুরুত্বপূর্ণ তথ্য", retry: "আবার চেষ্টা করুন" },
    examples: [
      ["রেশন কার্ড", "আমার রেশন কার্ড দরকার"],
      ["বিধবা পেনশন", "আমার বিধবা পেনশন দরকার"],
      ["সরকারি বৃত্তি", "আমার সরকারি বৃত্তি দরকার"],
      ["জন্ম শংসাপত্র", "আমার জন্ম শংসাপত্র দরকার"],
      ["পেনশন", "আমার পেনশন দরকার"],
      ["চিকিৎসা সহায়তা", "আমার সরকারি চিকিৎসা সহায়তা দরকার"],
    ],
  },
};

let browserSpeechVoices = window.speechSynthesis?.getVoices() || [];

window.speechSynthesis?.addEventListener("voiceschanged", () => {
  browserSpeechVoices = window.speechSynthesis.getVoices();
});

function applyLanguage(language) {
  const copy = LANGUAGE_UI[language] || LANGUAGE_UI.ta;
  activeLanguage = LANGUAGE_UI[language] ? language : "ta";
  document.documentElement.lang = copy.htmlLang;
  document.querySelector("#language-label").textContent = copy.selectorLabel;
  languageSelect.setAttribute("aria-label", copy.selectorLabel);
  document.querySelector("#topbar-note").textContent = copy.subtitle;
  document.querySelector("#intro-eyebrow").textContent = copy.introEyebrow;
  document.querySelector("#page-title").textContent = copy.introTitle;
  document.querySelector("#intro-copy").textContent = copy.introCopy;
  document.querySelector("#ask-title").textContent = copy.askTitle;
  document.querySelector("#ask-hint").textContent = copy.askHint;
  questionLabel.textContent = copy.questionLabel;
  question.placeholder = copy.placeholder;
  voiceLabel.textContent = copy.voice;
  document.querySelector("#submit-label").textContent = copy.submit;
  document.querySelector("#examples-label").textContent = copy.examplesLabel;
  document.querySelector("#examples").setAttribute("aria-label", copy.examplesLabel);
  document.querySelectorAll(".example-button").forEach((button, index) => {
    const example = copy.examples[index];
    if (!example) return;
    button.textContent = example[0];
    button.dataset.question = example[1];
  });
  document.querySelector("#answer-eyebrow").textContent = copy.answerEyebrow;
  document.querySelector("#sample-note").textContent = copy.sampleNote;
  document.querySelector("#speak-label").textContent = copy.speak;
  speakButton.setAttribute("aria-label", copy.speakAria);
  document.querySelector("#notice-copy").textContent = copy.notice;
  document.querySelector("#footer-copy").textContent = copy.footer;
}

applyLanguage(activeLanguage);

function addSection(title, text, className = "") {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");
  heading.textContent = title;
  paragraph.textContent = text;
  if (className) section.className = className;
  section.append(heading, paragraph);
  answerContent.append(section);
}

function addListSection(title, items) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const list = document.createElement("ol");
  heading.textContent = title;
  items.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  section.append(heading, list);
  answerContent.append(section);
}

function showAnswer(result) {
  if (!languageExplicitlySelected && LANGUAGE_UI[result.language]) {
    languageSelect.value = result.language;
    applyLanguage(result.language);
    setRecognitionLanguage();
  }
  const copy = LANGUAGE_UI[activeLanguage];
  answerContent.replaceChildren();
  if (!result.service) {
    answerTitle.textContent = copy.unclearTitle;
    addSection(copy.clarifyHeading, result.message);
    answerPanel.hidden = false;
    return;
  }

  answerTitle.textContent = result.name;
  addSection(copy.sections.about, result.about);
  addSection(copy.sections.eligibility, result.eligibility);
  addSection(copy.sections.documents, result.documents);
  addListSection(copy.sections.steps, result.steps);
  addSection(copy.sections.next, result.next_steps);
  addSection(copy.sections.help, result.help);
  addSection(copy.sections.accuracy, result.accuracy_note, "accuracy-note");
  answerPanel.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!question.value.trim()) return;

  submitButton.disabled = true;
  answerPanel.hidden = false;
  answerPanel.setAttribute("aria-busy", "true");
  answerTitle.textContent = LANGUAGE_UI[activeLanguage].pending;
  answerContent.replaceChildren();
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: question.value.trim(),
        language: languageSelect.value,
        language_selected: languageExplicitlySelected,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "மீண்டும் முயற்சிக்கவும்.");
    showAnswer(result);
  } catch (error) {
    const copy = LANGUAGE_UI[activeLanguage];
    answerTitle.textContent = copy.errorTitle;
    addSection(copy.sections.retry, error.message || copy.retry);
  } finally {
    answerPanel.setAttribute("aria-busy", "false");
    submitButton.disabled = false;
    answerPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

document.querySelectorAll(".example-button").forEach((button) => {
  button.addEventListener("click", () => {
    question.value = button.dataset.question;
    question.focus();
  });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let recognitionLocale = "ta-IN";

function setRecognitionLanguage() {
  if (!recognition) return;
  const locales = { ta: "ta-IN", hi: "hi-IN", te: "te-IN", bn: "bn-IN" };
  const locale = locales[languageSelect.value] || "ta-IN";
  try {
    recognition.lang = locale;
    recognitionLocale = locale;
  } catch {
    recognition.lang = "ta-IN";
    recognitionLocale = "ta-IN";
    voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micLanguageFallback;
  }
}

function finishRecognition() {
  voiceButton.disabled = false;
  languageSelect.disabled = false;
  voiceButton.setAttribute("aria-pressed", "false");
  voiceLabel.textContent = LANGUAGE_UI[activeLanguage].voice;
}

if (SpeechRecognition) {
  try {
    recognition = new SpeechRecognition();
  } catch {
    recognition = null;
  }
  if (recognition) {
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setRecognitionLanguage();

    voiceButton.addEventListener("click", () => {
      voiceButton.disabled = true;
      languageSelect.disabled = true;
      voiceLabel.textContent = LANGUAGE_UI[activeLanguage].listening;
      voiceButton.setAttribute("aria-pressed", "true");
      voiceStatus.textContent = LANGUAGE_UI[activeLanguage].voicePrompt;
      try {
        recognition.start();
      } catch {
        if (recognitionLocale !== "ta-IN") {
          try {
            recognition.lang = "ta-IN";
            recognitionLocale = "ta-IN";
            voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micLanguageFallback;
            recognition.start();
            return;
          } catch {
            voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micStartError;
          }
        } else {
          voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micStartError;
        }
        finishRecognition();
      }
    });
    recognition.addEventListener("result", (event) => {
      question.value = event.results[0][0].transcript;
      voiceStatus.textContent = LANGUAGE_UI[activeLanguage].voiceFilled;
      question.focus();
    });
    recognition.addEventListener("error", (event) => {
      if (event.error === "language-not-supported" && recognitionLocale !== "ta-IN") {
        try {
          recognition.lang = "ta-IN";
          recognitionLocale = "ta-IN";
          voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micLanguageFallback;
          return;
        } catch {
          voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micError;
          return;
        }
      }
      voiceStatus.textContent = event.error === "not-allowed"
        ? LANGUAGE_UI[activeLanguage].micDenied
        : LANGUAGE_UI[activeLanguage].micError;
    });
    recognition.addEventListener("end", finishRecognition);
  } else {
    voiceButton.disabled = true;
    voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micUnsupported;
  }
} else {
  voiceButton.disabled = true;
  voiceStatus.textContent = LANGUAGE_UI[activeLanguage].micUnsupported;
}

speakButton.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "இந்த உலாவியில் குரல் வாசிப்பு இல்லை.";
    return;
  }

  window.speechSynthesis.cancel();

  const voices = window.speechSynthesis.getVoices();
  if (voices.length) browserSpeechVoices = voices;

  const languageVoiceMap = {
    ta: ["ta-IN"],
    hi: ["hi-IN"],
    te: ["te-IN"],
    bn: ["bn-IN"],
  };

  const currentLanguage = languageSelect.value || "ta";
  const preferredLanguages =
    languageVoiceMap[currentLanguage] || ["ta-IN"];

  const selectedVoice =
    browserSpeechVoices.find((voice) =>
      preferredLanguages.includes(voice.lang)
    ) ||
    browserSpeechVoices.find((voice) =>
      preferredLanguages.some((lang) =>
        voice.lang.toLowerCase().startsWith(lang.split("-")[0].toLowerCase())
      )
    );

  const utterance = new SpeechSynthesisUtterance(
    `${answerTitle.textContent}. ${answerContent.innerText}`,
  );

  if (!selectedVoice) {
    alert(
      `Voice playback is not available for ${languageSelect.value.toUpperCase()} on this device.`,
    );
    return;
  }

  utterance.lang = selectedVoice.lang;
  utterance.voice = selectedVoice;

  window.speechSynthesis.speak(utterance);
});

languageSelect.addEventListener("change", () => {
  languageExplicitlySelected = true;
  applyLanguage(languageSelect.value);
  setRecognitionLanguage();
  if (!answerPanel.hidden && question.value.trim()) form.requestSubmit();
});



languageSelect.addEventListener("change", () => {
  languageExplicitlySelected = true;
  applyLanguage(languageSelect.value);
  setRecognitionLanguage();
  if (!answerPanel.hidden && question.value.trim()) form.requestSubmit();
});