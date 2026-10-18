import { projects as defaultProjects } from "./data.js";
import { localizedProjectContent } from "./i18n.js";

const COPY = {
  en: {
    name: "Friendly Professor", launcher: "Ask Friendly Professor", chooseTitle: "How would you like to chat?", chooseBody: "Choose a view. Your conversation stays with you as you explore JanDrishti.", fullTitle: "Full-Screen Bot", fullDesc: "A spacious view for detailed project questions.", widgetTitle: "Minimized / Small Floating Widget", widgetDesc: "Keep a small helper beside you while browsing.", close: "Close", minimize: "Minimize", expand: "Full screen", greeting: "Hello! I’m your Friendly Professor.", intro: "Ask about a project’s progress, department, location, budget, updates, or timeline.", demoNote: "Demo assistant · replies use fictional sample records, not a live AI service or government database.", placeholder: "Ask about Jaipur roads, Chomu water, project timelines…", send: "Send", sendAria: "Send question", suggestions: "Try asking", prompts: ["What is happening in Jaipur?", "When will the Chomu water upgrade finish?", "Which sample projects recently ended?"], resultIntro: "Here’s what I found in the sample project records:", noMatch: "I couldn’t match that question to a sample project. Try a district, city, state, project name, or ask about ongoing, new, or recently ended work.", location: "Location", department: "Department", status: "Status", progress: "Reported progress", completion: "Estimated completion", started: "Started on", budget: "Sample budget", latest: "Latest sample update", openDetails: "Open project details", statuses: { ongoing: "Ongoing", new: "New", ended: "Recently ended" }
  },
  hi: {
    name: "मित्रवत प्रोफेसर", launcher: "मित्रवत प्रोफेसर से पूछें", chooseTitle: "आप किस तरह चैट करना चाहेंगे?", chooseBody: "एक दृश्य चुनें। JanDrishti देखते समय आपकी बातचीत बनी रहेगी।", fullTitle: "पूर्ण-स्क्रीन बॉट", fullDesc: "परियोजनाओं पर विस्तार से पूछने के लिए बड़ा दृश्य।", widgetTitle: "छोटी फ़्लोटिंग विंडो", widgetDesc: "ब्राउज़ करते समय छोटा सहायक साथ रखें।", close: "बंद करें", minimize: "छोटा करें", expand: "पूर्ण स्क्रीन", greeting: "नमस्ते! मैं आपका मित्रवत प्रोफेसर हूँ।", intro: "किसी परियोजना की प्रगति, विभाग, स्थान, बजट, अपडेट या समय-सीमा पूछें।", demoNote: "डेमो सहायक · जवाब काल्पनिक नमूना रिकॉर्ड पर आधारित हैं, लाइव AI या सरकारी डेटाबेस पर नहीं।", placeholder: "जयपुर की सड़क, चोमू का पानी या समय-सीमा पूछें…", send: "भेजें", sendAria: "सवाल भेजें", suggestions: "ये सवाल पूछें", prompts: ["जयपुर में क्या काम चल रहा है?", "चोमू जल परियोजना कब पूरी होगी?", "हाल ही में कौन-सी परियोजनाएँ पूरी हुईं?"], resultIntro: "नमूना परियोजना रिकॉर्ड में यह जानकारी मिली:", noMatch: "यह सवाल किसी नमूना परियोजना से नहीं मिला। कोई जिला, शहर, राज्य या परियोजना का नाम लिखें, या जारी, नई अथवा हाल ही में पूरी परियोजनाओं के बारे में पूछें।", location: "स्थान", department: "विभाग", status: "स्थिति", progress: "दर्ज प्रगति", completion: "अनुमानित पूरा होने की तारीख", started: "शुरुआत", budget: "नमूना बजट", latest: "नवीनतम नमूना अपडेट", openDetails: "परियोजना विवरण खोलें", statuses: { ongoing: "जारी", new: "नई", ended: "हाल ही में पूरी" }
  },
  gu: {
    name: "મૈત્રીપૂર્ણ માર્ગદર્શક", launcher: "મૈત્રીપૂર્ણ માર્ગદર્શકને પૂછો", chooseTitle: "તમે કેવી રીતે વાતચીત કરવા માંગો છો?", chooseBody: "એક દૃશ્ય પસંદ કરો. JanDrishti જોતી વખતે તમારી વાતચીત ચાલુ રહેશે.", fullTitle: "પૂર્ણ-સ્ક્રીન બોટ", fullDesc: "પ્રોજેક્ટ વિશે વિગતવાર પ્રશ્નો માટે વિશાળ દૃશ્ય.", widgetTitle: "નાનું ફ્લોટિંગ વિજેટ", widgetDesc: "બ્રાઉઝ કરતી વખતે નાનો સહાયક સાથે રાખો.", close: "બંધ કરો", minimize: "નાનું કરો", expand: "પૂર્ણ સ્ક્રીન", greeting: "નમસ્તે! હું તમારો મૈત્રીપૂર્ણ માર્ગદર્શક છું.", intro: "પ્રોજેક્ટની પ્રગતિ, વિભાગ, સ્થળ, બજેટ, અપડેટ અથવા સમયરેખા વિશે પૂછો.", demoNote: "ડેમો સહાયક · જવાબો કાલ્પનિક નમૂના રેકોર્ડ પરથી છે; લાઇવ AI અથવા સરકારી ડેટાબેઝ નથી.", placeholder: "જયપુરના રસ્તા, ચોમુના પાણી અથવા સમયરેખા વિશે પૂછો…", send: "મોકલો", sendAria: "પ્રશ્ન મોકલો", suggestions: "આ પૂછવાનો પ્રયાસ કરો", prompts: ["જયપુરમાં શું ચાલી રહ્યું છે?", "ચોમુનું પાણીનું કામ ક્યારે પૂરું થશે?", "તાજેતરમાં કયા પ્રોજેક્ટ પૂરા થયા?"], resultIntro: "નમૂના પ્રોજેક્ટ રેકોર્ડમાં આ મળ્યું:", noMatch: "આ પ્રશ્ન કોઈ નમૂના પ્રોજેક્ટ સાથે મેળ ખાતો નથી. જિલ્લો, શહેર, રાજ્ય અથવા પ્રોજેક્ટનું નામ લખો; ચાલુ, નવા અથવા તાજેતરમાં પૂરા થયેલા કામ વિશે પણ પૂછો.", location: "સ્થળ", department: "વિભાગ", status: "સ્થિતિ", progress: "નોંધાયેલી પ્રગતિ", completion: "અંદાજિત પૂર્ણતા", started: "શરૂઆત", budget: "નમૂના બજેટ", latest: "તાજેતરનો નમૂના અપડેટ", openDetails: "પ્રોજેક્ટ વિગતો ખોલો", statuses: { ongoing: "ચાલુ", new: "નવો", ended: "તાજેતરમાં પૂર્ણ" }
  },
  mr: {
    name: "मैत्रीपूर्ण मार्गदर्शक", launcher: "मैत्रीपूर्ण मार्गदर्शकाला विचारा", chooseTitle: "तुम्हाला कशा प्रकारे संवाद साधायचा आहे?", chooseBody: "एक दृश्य निवडा. JanDrishti पाहताना तुमचा संवाद कायम राहील.", fullTitle: "पूर्ण-स्क्रीन बॉट", fullDesc: "प्रकल्पांबद्दल सविस्तर प्रश्न विचारण्यासाठी मोकळी जागा.", widgetTitle: "लहान फ्लोटिंग विजेट", widgetDesc: "ब्राउझ करताना छोटा मदतनीस सोबत ठेवा.", close: "बंद करा", minimize: "लहान करा", expand: "पूर्ण स्क्रीन", greeting: "नमस्कार! मी तुमचा मैत्रीपूर्ण मार्गदर्शक आहे.", intro: "प्रकल्पाची प्रगती, विभाग, ठिकाण, अंदाजपत्रक, अपडेट किंवा कालमर्यादा विचारा.", demoNote: "डेमो सहाय्यक · उत्तरे काल्पनिक नमुना नोंदींवर आधारित आहेत; थेट AI किंवा सरकारी डेटाबेस नाही.", placeholder: "जयपूरचे रस्ते, चोमूचे पाणी किंवा कालमर्यादा विचारा…", send: "पाठवा", sendAria: "प्रश्न पाठवा", suggestions: "असे विचारून पाहा", prompts: ["जयपूरमध्ये कोणते काम सुरू आहे?", "चोमूचे पाणीपुरवठ्याचे काम कधी पूर्ण होईल?", "अलीकडे कोणते प्रकल्प पूर्ण झाले?"], resultIntro: "नमुना प्रकल्प नोंदींमध्ये ही माहिती मिळाली:", noMatch: "हा प्रश्न नमुना प्रकल्पाशी जुळला नाही. जिल्हा, शहर, राज्य किंवा प्रकल्पाचे नाव लिहा; सुरू, नवीन किंवा अलीकडे पूर्ण झालेल्या कामाबद्दलही विचारा.", location: "ठिकाण", department: "विभाग", status: "स्थिती", progress: "नोंदवलेली प्रगती", completion: "अंदाजित पूर्णता", started: "सुरुवात", budget: "नमुना अंदाजपत्रक", latest: "नवीनतम नमुना अपडेट", openDetails: "प्रकल्प तपशील उघडा", statuses: { ongoing: "सुरू", new: "नवीन", ended: "अलीकडे पूर्ण" }
  },
  or: {
    name: "ମିତ୍ରପର ପ୍ରଫେସର", launcher: "ମିତ୍ରପର ପ୍ରଫେସରଙ୍କୁ ପଚାରନ୍ତୁ", chooseTitle: "ଆପଣ କେଉଁଭଳି ଚାଟ୍ କରିବାକୁ ଚାହାଁନ୍ତି?", chooseBody: "ଗୋଟିଏ ଦୃଶ୍ୟ ବାଛନ୍ତୁ। JanDrishti ଦେଖିବା ସମୟରେ ଆପଣଙ୍କ କଥାବାର୍ତ୍ତା ରହିବ।", fullTitle: "ପୂର୍ଣ୍ଣ-ସ୍କ୍ରିନ୍ ବଟ୍", fullDesc: "ପ୍ରକଳ୍ପ ବିଷୟରେ ବିସ୍ତୃତ ପ୍ରଶ୍ନ ପାଇଁ ବଡ଼ ଦୃଶ୍ୟ।", widgetTitle: "ଛୋଟ ଭାସମାନ ୱିଜେଟ୍", widgetDesc: "ବ୍ରାଉଜ୍ କରିବା ସମୟରେ ଛୋଟ ସହାୟକକୁ ପାଖରେ ରଖନ୍ତୁ।", close: "ବନ୍ଦ କରନ୍ତୁ", minimize: "ଛୋଟ କରନ୍ତୁ", expand: "ପୂର୍ଣ୍ଣ ସ୍କ୍ରିନ୍", greeting: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ମିତ୍ରପର ପ୍ରଫେସର।", intro: "ପ୍ରକଳ୍ପର ପ୍ରଗତି, ବିଭାଗ, ସ୍ଥାନ, ବଜେଟ୍, ଅପଡେଟ୍ କିମ୍ବା ସମୟସୀମା ବିଷୟରେ ପଚାରନ୍ତୁ।", demoNote: "ଡେମୋ ସହାୟକ · ଉତ୍ତରଗୁଡ଼ିକ କଳ୍ପିତ ନମୁନା ତଥ୍ୟ ଉପରେ ଆଧାରିତ; ଏହା ଲାଇଭ୍ AI କିମ୍ବା ସରକାରୀ ଡାଟାବେସ୍ ନୁହେଁ।", placeholder: "ଜୟପୁର ରାସ୍ତା, ଚୋମୁ ଜଳ କାମ କିମ୍ବା ସମୟସୀମା ବିଷୟରେ ପଚାରନ୍ତୁ…", send: "ପଠାନ୍ତୁ", sendAria: "ପ୍ରଶ୍ନ ପଠାନ୍ତୁ", suggestions: "ଏହା ପଚାରି ଦେଖନ୍ତୁ", prompts: ["ଜୟପୁରରେ କେଉଁ କାମ ଚାଲିଛି?", "ଚୋମୁର ଜଳ ପ୍ରକଳ୍ପ କେବେ ସରିବ?", "ସମ୍ପ୍ରତି କେଉଁ ପ୍ରକଳ୍ପ ସରିଛି?"], resultIntro: "ନମୁନା ପ୍ରକଳ୍ପ ତଥ୍ୟରୁ ଏହା ମିଳିଲା:", noMatch: "ଏହି ପ୍ରଶ୍ନଟି କୌଣସି ନମୁନା ପ୍ରକଳ୍ପ ସହିତ ମେଳ ହେଲା ନାହିଁ। ଜିଲ୍ଲା, ସହର, ରାଜ୍ୟ କିମ୍ବା ପ୍ରକଳ୍ପର ନାମ ଲେଖନ୍ତୁ; ଚାଲୁ, ନୂତନ କିମ୍ବା ସମ୍ପ୍ରତି ସରିଥିବା କାମ ବିଷୟରେ ପଚାରନ୍ତୁ।", location: "ସ୍ଥାନ", department: "ବିଭାଗ", status: "ସ୍ଥିତି", progress: "ଦର୍ଜ ପ୍ରଗତି", completion: "ଅନୁମାନିତ ସମାପ୍ତି", started: "ଆରମ୍ଭ", budget: "ନମୁନା ବଜେଟ୍", latest: "ନବୀନତମ ନମୁନା ଅପଡେଟ୍", openDetails: "ପ୍ରକଳ୍ପ ବିବରଣୀ ଖୋଲନ୍ତୁ", statuses: { ongoing: "ଚାଲୁ", new: "ନୂତନ", ended: "ସମ୍ପ୍ରତି ସମାପ୍ତ" }
  },
  bn: {
    name: "বন্ধুসুলভ অধ্যাপক", launcher: "বন্ধুসুলভ অধ্যাপককে জিজ্ঞাসা করুন", chooseTitle: "আপনি কীভাবে কথা বলতে চান?", chooseBody: "একটি দৃশ্য বেছে নিন। JanDrishti ঘুরে দেখার সময় কথোপকথন থাকবে।", fullTitle: "পূর্ণ-স্ক্রিন বট", fullDesc: "প্রকল্প নিয়ে বিস্তারিত প্রশ্নের জন্য বড় দৃশ্য।", widgetTitle: "ছোট ভাসমান উইজেট", widgetDesc: "ব্রাউজ করার সময় ছোট সহায়ক পাশে রাখুন।", close: "বন্ধ করুন", minimize: "ছোট করুন", expand: "পূর্ণ স্ক্রিন", greeting: "নমস্কার! আমি আপনার বন্ধুসুলভ অধ্যাপক।", intro: "প্রকল্পের অগ্রগতি, বিভাগ, স্থান, বাজেট, আপডেট বা সময়সীমা সম্পর্কে জিজ্ঞাসা করুন।", demoNote: "ডেমো সহায়ক · উত্তরগুলি কাল্পনিক নমুনা রেকর্ড থেকে; এটি লাইভ AI বা সরকারি ডেটাবেস নয়।", placeholder: "জয়পুরের রাস্তা, চোমুর জল বা সময়সীমা নিয়ে জিজ্ঞাসা করুন…", send: "পাঠান", sendAria: "প্রশ্ন পাঠান", suggestions: "এগুলো জিজ্ঞাসা করে দেখুন", prompts: ["জয়পুরে কী কাজ চলছে?", "চোমুর জল প্রকল্প কবে শেষ হবে?", "সম্প্রতি কোন প্রকল্পগুলি শেষ হয়েছে?"], resultIntro: "নমুনা প্রকল্পের রেকর্ডে এই তথ্য পেলাম:", noMatch: "এই প্রশ্নটি কোনো নমুনা প্রকল্পের সঙ্গে মেলেনি। জেলা, শহর, রাজ্য বা প্রকল্পের নাম দিন, অথবা চলমান, নতুন কিংবা সম্প্রতি শেষ হওয়া কাজ সম্পর্কে জিজ্ঞাসা করুন।", location: "স্থান", department: "বিভাগ", status: "অবস্থা", progress: "নথিভুক্ত অগ্রগতি", completion: "আনুমানিক সমাপ্তি", started: "শুরু", budget: "নমুনা বাজেট", latest: "সাম্প্রতিক নমুনা আপডেট", openDetails: "প্রকল্পের বিবরণ খুলুন", statuses: { ongoing: "চলছে", new: "নতুন", ended: "সম্প্রতি শেষ" }
  },
  te: {
    name: "స్నేహపూర్వక ప్రొఫెసర్", launcher: "స్నేహపూర్వక ప్రొఫెసర్‌ను అడగండి", chooseTitle: "మీరు ఎలా చాట్ చేయాలనుకుంటున్నారు?", chooseBody: "ఒక వీక్షణను ఎంచుకోండి. JanDrishti చూస్తున్నప్పుడు మీ సంభాషణ అలాగే ఉంటుంది.", fullTitle: "పూర్తి-స్క్రీన్ బాట్", fullDesc: "ప్రాజెక్టుల గురించి వివరంగా అడగడానికి విశాలమైన వీక్షణ.", widgetTitle: "చిన్న తేలియాడే విడ్జెట్", widgetDesc: "బ్రౌజ్ చేస్తూ చిన్న సహాయకుడిని పక్కన ఉంచండి.", close: "మూసివేయండి", minimize: "చిన్నదిగా చేయండి", expand: "పూర్తి స్క్రీన్", greeting: "నమస్కారం! నేను మీ స్నేహపూర్వక ప్రొఫెసర్‌ను.", intro: "ప్రాజెక్ట్ పురోగతి, శాఖ, ప్రదేశం, బడ్జెట్, అప్‌డేట్‌లు లేదా గడువు గురించి అడగండి.", demoNote: "డెమో సహాయకుడు · సమాధానాలు కల్పిత నమూనా రికార్డులపై ఆధారితం; ప్రత్యక్ష AI లేదా ప్రభుత్వ డేటాబేస్ కాదు.", placeholder: "జైపూర్ రోడ్లు, చోము నీటి పని లేదా గడువు గురించి అడగండి…", send: "పంపండి", sendAria: "ప్రశ్న పంపండి", suggestions: "ఇలా అడిగి చూడండి", prompts: ["జైపూర్‌లో ఏమి జరుగుతోంది?", "చోము నీటి పనులు ఎప్పుడు పూర్తవుతాయి?", "ఇటీవల పూర్తయిన ప్రాజెక్టులు ఏవి?"], resultIntro: "నమూనా ప్రాజెక్ట్ రికార్డుల్లో ఇది కనిపించింది:", noMatch: "ఈ ప్రశ్నకు సరిపోయే నమూనా ప్రాజెక్ట్ దొరకలేదు. జిల్లా, నగరం, రాష్ట్రం లేదా ప్రాజెక్ట్ పేరు చెప్పండి; కొనసాగుతున్న, కొత్త లేదా ఇటీవల ముగిసిన పనుల గురించి కూడా అడగవచ్చు.", location: "ప్రదేశం", department: "శాఖ", status: "స్థితి", progress: "నమోదైన పురోగతి", completion: "అంచనా పూర్తి తేదీ", started: "ప్రారంభం", budget: "నమూనా బడ్జెట్", latest: "తాజా నమూనా అప్‌డేట్", openDetails: "ప్రాజెక్ట్ వివరాలు తెరవండి", statuses: { ongoing: "కొనసాగుతోంది", new: "కొత్తది", ended: "ఇటీవల ముగిసింది" }
  },
  kn: {
    name: "ಸ್ನೇಹಪರ ಪ್ರಾಧ್ಯಾಪಕ", launcher: "ಸ್ನೇಹಪರ ಪ್ರಾಧ್ಯಾಪಕರನ್ನು ಕೇಳಿ", chooseTitle: "ನೀವು ಹೇಗೆ ಚಾಟ್ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?", chooseBody: "ಒಂದು ನೋಟವನ್ನು ಆರಿಸಿ. JanDrishti ವೀಕ್ಷಿಸುವಾಗ ನಿಮ್ಮ ಸಂಭಾಷಣೆ ಉಳಿಯುತ್ತದೆ.", fullTitle: "ಪೂರ್ಣ-ಪರದೆ ಬಾಟ್", fullDesc: "ಯೋಜನೆಗಳ ಕುರಿತು ವಿವರವಾಗಿ ಕೇಳಲು ವಿಶಾಲ ನೋಟ.", widgetTitle: "ಚಿಕ್ಕ ತೇಲುವ ವಿಜೆಟ್", widgetDesc: "ಬ್ರೌಸ್ ಮಾಡುವಾಗ ಚಿಕ್ಕ ಸಹಾಯಕನನ್ನು ಜೊತೆಯಲ್ಲಿ ಇರಿಸಿ.", close: "ಮುಚ್ಚಿ", minimize: "ಚಿಕ್ಕದಾಗಿಸಿ", expand: "ಪೂರ್ಣ ಪರದೆ", greeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಸ್ನೇಹಪರ ಪ್ರಾಧ್ಯಾಪಕ.", intro: "ಯೋಜನೆಯ ಪ್ರಗತಿ, ಇಲಾಖೆ, ಸ್ಥಳ, ಬಜೆಟ್, ನವೀಕರಣ ಅಥವಾ ಕಾಲಮಿತಿಯ ಬಗ್ಗೆ ಕೇಳಿ.", demoNote: "ಡೆಮೋ ಸಹಾಯಕ · ಉತ್ತರಗಳು ಕಲ್ಪಿತ ಮಾದರಿ ದಾಖಲೆಗಳಿಂದ; ಇದು ಲೈವ್ AI ಅಥವಾ ಸರ್ಕಾರಿ ಡೇಟಾಬೇಸ್ ಅಲ್ಲ.", placeholder: "ಜೈಪುರ ರಸ್ತೆಗಳು, ಚೋಮು ನೀರಿನ ಕೆಲಸ ಅಥವಾ ಕಾಲಮಿತಿ ಕುರಿತು ಕೇಳಿ…", send: "ಕಳುಹಿಸಿ", sendAria: "ಪ್ರಶ್ನೆ ಕಳುಹಿಸಿ", suggestions: "ಇವುಗಳನ್ನು ಕೇಳಿ ನೋಡಿ", prompts: ["ಜೈಪುರದಲ್ಲಿ ಏನು ನಡೆಯುತ್ತಿದೆ?", "ಚೋಮು ನೀರಿನ ಕೆಲಸ ಯಾವಾಗ ಮುಗಿಯುತ್ತದೆ?", "ಇತ್ತೀಚೆಗೆ ಯಾವ ಯೋಜನೆಗಳು ಮುಗಿದಿವೆ?"], resultIntro: "ಮಾದರಿ ಯೋಜನಾ ದಾಖಲೆಗಳಲ್ಲಿ ಇದು ಕಂಡುಬಂದಿದೆ:", noMatch: "ಈ ಪ್ರಶ್ನೆಗೆ ಹೊಂದುವ ಮಾದರಿ ಯೋಜನೆ ಸಿಗಲಿಲ್ಲ. ಜಿಲ್ಲೆ, ನಗರ, ರಾಜ್ಯ ಅಥವಾ ಯೋಜನೆಯ ಹೆಸರನ್ನು ನೀಡಿ; ನಡೆಯುತ್ತಿರುವ, ಹೊಸ ಅಥವಾ ಇತ್ತೀಚೆಗೆ ಮುಗಿದ ಕೆಲಸಗಳ ಬಗ್ಗೆ ಕೇಳಿ.", location: "ಸ್ಥಳ", department: "ಇಲಾಖೆ", status: "ಸ್ಥಿತಿ", progress: "ದಾಖಲಾದ ಪ್ರಗತಿ", completion: "ಅಂದಾಜು ಪೂರ್ಣತೆ", started: "ಪ್ರಾರಂಭ", budget: "ಮಾದರಿ ಬಜೆಟ್", latest: "ಇತ್ತೀಚಿನ ಮಾದರಿ ನವೀಕರಣ", openDetails: "ಯೋಜನೆಯ ವಿವರಗಳನ್ನು ತೆರೆಯಿರಿ", statuses: { ongoing: "ನಡೆಯುತ್ತಿದೆ", new: "ಹೊಸದು", ended: "ಇತ್ತೀಚೆಗೆ ಮುಗಿದಿದೆ" }
  }
};

const PLACE_ALIASES = {
  "raja-park-road": ["जयपुर", "જયપુર", "जयपूर", "ଜୟପୁର", "জয়পুর", "జైపూర్", "ಜೈಪುರ"],
  "chomu-water-network": ["चोमू", "ચોમુ", "चोमू", "ଚୋମୁ", "চোমু", "చోము", "ಚೋಮು"],
  "bikaner-solar-health": ["बीकानेर", "બિકાનેર", "बीकानेर", "ବିକାନେର", "বিকানের", "బికానెర్", "ಬಿಕಾನೇರ್"],
  "ahmedabad-water-reuse": ["अहमदाबाद", "અમદાવાદ", "अहमदाबाद", "ଅହମଦାବାଦ", "আহমেদাবাদ", "అహ్మదాబాద్", "ಅಹಮದಾಬಾದ್"],
  "pune-elevated-corridor": ["पुणे", "પુણે", "पुणे", "ପୁଣେ", "পুনে", "పుణె", "ಪುಣೆ"],
  "bengaluru-pipeline": ["ಬೆಂಗಳೂರು", "বেঙ্গালুরু", "బెంగళూరు", "बेंगळुरू", "ବେଙ୍ଗାଲୁରୁ"],
  "kolkata-school-upgrade": ["कोलकाता", "কলকাতা", "కోల్‌కతా", "ಕೋಲ್ಕತಾ", "କୋଲକାତା"],
  "hyderabad-bus-priority": ["हैदराबाद", "હૈદરાબાદ", "ഹൈദരാബാദ്", "ହାଇଦ୍ରାବାଦ", "హైదరాబాద్", "ಹೈದರಾಬಾದ್", "হায়দরাবাদ"]
};
const STATUS_TERMS = {
  ongoing: ["ongoing", "in progress", "still working", "जारी", "चल रहा", "ચાલુ", "સુરુ", "सुरू", "चालू", "ଚାଲୁ", "চলছে", "కొనసాగుతోంది", "ನಡೆಯುತ್ತಿದೆ"],
  new: ["new", "नया", "नई", "નવો", "નવા", "नवीन", "नवीन", "ନୂଆ", "ନୂତନ", "নতুন", "కొత్త", "ಹೊಸ"],
  ended: ["ended", "finished", "completed", "complete", "recently ended", "সম্পন্ন", "শেষ হয়েছে", "শেষ", "పూర్తయింది", "ముగిసిన", "ಪೂರ್ಣ", "ಮುಗಿದ", "પૂર્ણ", "ପୂର୍ଣ୍ଣ", "ସମାପ୍ତ", "पूरी", "पूर्ण", "પૂર્ણ", "पूर्ण", "पूर्ण"]
};
const GENERIC_TERMS = new Set([
  "project", "projects", "work", "update", "updates", "status", "progress", "tell", "show", "find", "about", "what", "when", "where", "which", "how", "please", "latest", "all", "the", "a", "an", "in", "on", "for", "of", "is", "are", "was", "were", "my", "me", "to", "and", "or", "can", "you", "give", "details", "information", "budget", "department", "timeline", "date", "finished", "ongoing", "new", "recently", "completed", "क्या", "कौन", "कब", "कहाँ", "कैसे", "बारे", "बताएं", "बताइए", "परियोजना", "परियोजनाएँ", "काम", "क्या", "છે", "શું", "ક્યારે", "પ્રોજેક્ટ", "કામ", "काय", "कधी", "प्रकल्प", "କଣ", "କେବେ", "ପ୍ରକଳ୍ପ", "କାମ", "কি", "কবে", "প্রকল্প", "কাজ", "ఏమి", "ఎప్పుడు", "ప్రాజెక్ట్", "ಕೆಲಸ", "ಯೋಜನೆ", "ಯೋಜನೆಗಳು", "ಏನು", "ಯಾವಾಗ"
]);
const LOCALES = { en: "en-IN", hi: "hi-IN", gu: "gu-IN", mr: "mr-IN", or: "or-IN", bn: "bn-IN", te: "te-IN", kn: "kn-IN" };
const STORAGE_KEY = "jandrishti.friendlyProfessor.messages";

function copyFor(language) { return COPY[language] || COPY.en; }
function normalize(value = "") {
  return String(value).normalize("NFKC").toLocaleLowerCase().replace(/[^\p{L}\p{M}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();
}
function safeReadMessages() {
  try {
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(messages)) return [];
    return messages.filter(message => message && (message.role === "user" || message.role === "assistant")).slice(-40).map(message => message.role === "user"
      ? { role: "user", text: String(message.text || "").slice(0, 1200) }
      : { role: "assistant", projectIds: Array.isArray(message.projectIds) ? message.projectIds.filter(id => defaultProjects.some(project => project.id === id)).slice(0, 3) : [] });
  } catch { return []; }
}
function safeWriteMessages(messages) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40))); } catch { /* Private browsing may disable storage. */ }
}
function newestFirst(a, b) { return b.updatedAt.localeCompare(a.updatedAt); }

export function findProjectsForQuestion(question, language = "en", sourceProjects = defaultProjects) {
  const query = normalize(question);
  if (!query) return [];
  const status = Object.entries(STATUS_TERMS).find(([, terms]) => terms.some(term => query.includes(normalize(term))))?.[0];
  const candidates = status ? sourceProjects.filter(project => project.status === status) : sourceProjects;
  const words = query.split(" ").filter(word => word.length > 2 && !GENERIC_TERMS.has(word));
  const ranked = candidates.map(project => {
    let score = 0;
    const searchable = [project.title, project.department, project.state, project.district, project.location, project.description].map(normalize);
    for (const field of searchable) {
      if (field.length > 2 && query.includes(field)) score += field === normalize(project.district) || field === normalize(project.state) ? 12 : 7;
    }
    if ((PLACE_ALIASES[project.id] || []).some(alias => query.includes(normalize(alias)))) score += 14;
    const fieldWords = new Set(searchable.join(" ").split(" "));
    score += words.filter(word => fieldWords.has(word)).length * 1.5;
    if (status && project.status === status) score += 3;
    return { project, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || newestFirst(a.project, b.project));

  if (ranked.length) return ranked.slice(0, 3).map(item => item.project);
  if (status) return candidates.slice().sort(newestFirst).slice(0, 3);
  const broad = /\b(all|every|latest|recent|projects?|updates?)\b/u.test(query) || ["सभी", "सब", "બધા", "सर्व", "ସମସ୍ତ", "সব", "అన్ని", "ಎಲ್ಲಾ"].some(term => query.includes(term));
  return broad ? sourceProjects.slice().sort(newestFirst).slice(0, 3) : [];
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
function formatDate(value, language) {
  if (!value) return "—";
  try { return new Intl.DateTimeFormat(LOCALES[language] || LOCALES.en, { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`)); }
  catch { return value; }
}
function statusLabel(project, copy) { return copy.statuses[project.status] || project.status; }
function renderProjectAnswer(message, language, copy, sourceProjects) {
  const matched = (message.projectIds || []).map(id => sourceProjects.find(project => project.id === id)).filter(Boolean);
  if (!matched.length) return `<p class="fp-no-match">${copy.noMatch}</p>`;
  return `<p class="fp-result-intro">${copy.resultIntro}</p>${matched.map(project => {
    const update = project.updates.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
    const content = localizedProjectContent(project, language);
    return `<article class="fp-project-result"><div class="fp-project-result-top"><h3>${escapeHtml(project.title)}</h3><span class="fp-status-pill">${escapeHtml(statusLabel(project, copy))}</span></div><p class="fp-project-location">${escapeHtml(project.location)}</p><div class="fp-project-facts"><div><span>${copy.department}</span><strong>${escapeHtml(project.department)}</strong></div><div><span>${copy.completion}</span><strong>${formatDate(project.completion, language)}</strong></div><div><span>${copy.started}</span><strong>${formatDate(project.startDate, language)}</strong></div><div><span>${copy.budget}</span><strong>${escapeHtml(project.budget)}</strong></div><div><span>${copy.progress}</span><strong>${project.progress}%</strong></div></div><p class="fp-project-description">${escapeHtml(content.description)}</p>${update ? `<p class="fp-project-update"><strong>${copy.latest} · ${formatDate(update.date, language)}:</strong> ${escapeHtml(content.latestUpdate)}</p>` : ""}<button class="fp-open-project" type="button" data-assistant-project="${escapeHtml(project.id)}">${copy.openDetails}<span aria-hidden="true">↗</span></button></article>`;
  }).join("")}`;
}
function renderMessage(message, language, copy, sourceProjects) {
  if (message.role === "user") return `<div class="fp-message fp-message-user"><div class="fp-bubble">${escapeHtml(message.text)}</div></div>`;
  return `<div class="fp-message fp-message-assistant"><div class="fp-assistant-avatar" aria-hidden="true">✦</div><div class="fp-bubble">${renderProjectAnswer(message, language, copy, sourceProjects)}</div></div>`;
}
function renderWelcome(copy) {
  return `<div class="fp-message fp-message-assistant"><div class="fp-assistant-avatar" aria-hidden="true">✦</div><div class="fp-bubble"><strong class="fp-greeting">${copy.greeting}</strong><p>${copy.intro}</p><p class="fp-demo-note">${copy.demoNote}</p></div></div><div class="fp-suggestions"><span>${copy.suggestions}</span>${copy.prompts.map(prompt => `<button type="button" data-assistant-prompt="${escapeHtml(prompt)}">${escapeHtml(prompt)}</button>`).join("")}</div>`;
}
function chatIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2v-6a7.5 7.5 0 1 1 17-3.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>`;
}
function closeIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>`; }
function renderLauncher(copy) {
  return `<button class="fp-launcher" type="button" data-assistant-action="choose" aria-label="${escapeHtml(copy.launcher)}" title="${escapeHtml(copy.launcher)}"><span class="fp-launcher-icon">${chatIcon()}</span><span>${escapeHtml(copy.name)}</span><i aria-hidden="true"></i></button>`;
}
function renderChooser(copy) {
  return `<section class="fp-chooser" role="dialog" aria-modal="false" aria-labelledby="fp-choice-title"><header class="fp-choice-head"><span class="fp-mini-mark">✦</span><div><span class="fp-eyebrow">JAN DRISHTI · ${escapeHtml(copy.name)}</span><h2 id="fp-choice-title">${escapeHtml(copy.chooseTitle)}</h2></div><button class="fp-icon-action" type="button" data-assistant-action="close" aria-label="${escapeHtml(copy.close)}">${closeIcon()}</button></header><p class="fp-choice-copy">${escapeHtml(copy.chooseBody)}</p><div class="fp-choice-options"><button type="button" class="fp-choice-option" data-assistant-action="full"><span class="fp-choice-option-icon">↗</span><strong>${escapeHtml(copy.fullTitle)}</strong><small>${escapeHtml(copy.fullDesc)}</small></button><button type="button" class="fp-choice-option" data-assistant-action="widget"><span class="fp-choice-option-icon">▢</span><strong>${escapeHtml(copy.widgetTitle)}</strong><small>${escapeHtml(copy.widgetDesc)}</small></button></div><p class="fp-choice-note">${escapeHtml(copy.demoNote)}</p></section>`;
}
function renderComposer(copy, draft) {
  return `<form class="fp-composer" id="fp-form"><label class="sr-only" for="fp-input">${escapeHtml(copy.placeholder)}</label><textarea id="fp-input" rows="2" maxlength="1200" placeholder="${escapeHtml(copy.placeholder)}">${escapeHtml(draft)}</textarea><button type="submit" aria-label="${escapeHtml(copy.sendAria)}" title="${escapeHtml(copy.send)}">${escapeHtml(copy.send)}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 16-8-5 16-3.2-6.2L4 12Z"/><path d="m11.8 13.8 4.7-5.1"/></svg></button></form>`;
}
function renderChat(copy, mode, messages, draft, sourceProjects, language) {
  const full = mode === "full";
  const thread = messages.length ? messages.map(message => renderMessage(message, language, copy, sourceProjects)).join("") : renderWelcome(copy);
  return `${full ? `<div class="fp-fullscreen" data-assistant-backdrop><section class="fp-window fp-window-full" role="dialog" aria-modal="true" aria-labelledby="fp-chat-title">` : `<section class="fp-window fp-window-widget" role="dialog" aria-modal="false" aria-labelledby="fp-chat-title">`}<header class="fp-window-head"><span class="fp-mini-mark">✦</span><div class="fp-window-title"><strong id="fp-chat-title">${escapeHtml(copy.name)}</strong><small>${escapeHtml(copy.demoNote)}</small></div><div class="fp-window-actions"><button class="fp-icon-action" type="button" data-assistant-action="${full ? "widget" : "full"}" aria-label="${escapeHtml(full ? copy.minimize : copy.expand)}" title="${escapeHtml(full ? copy.minimize : copy.expand)}">${full ? "⤢" : "⛶"}</button><button class="fp-icon-action" type="button" data-assistant-action="close" aria-label="${escapeHtml(copy.close)}" title="${escapeHtml(copy.close)}">${closeIcon()}</button></div></header><div class="fp-thread" id="fp-thread" aria-live="polite" aria-relevant="additions">${thread}</div>${renderComposer(copy, draft)}</section>${full ? `</div>` : ""}`;
}

function trapAssistantFocus(event, dialog) {
  if (event.key !== "Tab") return;
  const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(element => !element.hidden && element.getClientRects().length);
  if (!focusable.length) { event.preventDefault(); dialog.focus(); return; }
  const first = focusable[0], last = focusable.at(-1);
  if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
}

export function initializeAssistant({ root, getLanguage = () => "en", onProjectOpen = () => {}, sourceProjects = defaultProjects }) {
  if (!root) return;
  let mode = "closed";
  let messages = safeReadMessages();
  let draft = "";

  function render({ focusInput = false, scroll = false } = {}) {
    const language = getLanguage();
    const copy = copyFor(language);
    const hadInputFocus = root.contains(document.activeElement) && document.activeElement?.id === "fp-input";
    root.innerHTML = mode === "closed" ? renderLauncher(copy)
      : mode === "chooser" ? renderChooser(copy)
      : renderChat(copy, mode, messages, draft, sourceProjects, language);
    document.body.classList.toggle("fp-fullscreen-active", mode === "full");
    if (focusInput || hadInputFocus) root.querySelector("#fp-input")?.focus();
    if (scroll) requestAnimationFrame(() => { const thread = root.querySelector("#fp-thread"); if (thread) thread.scrollTop = thread.scrollHeight; });
    if (mode === "chooser") requestAnimationFrame(() => root.querySelector('[data-assistant-action="full"]')?.focus());
  }

  function setMode(next) {
    mode = next;
    render({ focusInput: next === "widget" || next === "full", scroll: true });
    if (next === "closed") requestAnimationFrame(() => root.querySelector(".fp-launcher")?.focus());
  }

  function send(question) {
    const text = String(question || draft).trim().slice(0, 1200);
    if (!text) return;
    messages.push({ role: "user", text });
    const results = findProjectsForQuestion(text, getLanguage(), sourceProjects);
    messages.push({ role: "assistant", projectIds: results.map(project => project.id) });
    messages = messages.slice(-40);
    draft = "";
    safeWriteMessages(messages);
    render({ focusInput: true, scroll: true });
  }

  root.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const action = target?.closest("[data-assistant-action]");
    const prompt = target?.closest("[data-assistant-prompt]");
    const project = target?.closest("[data-assistant-project]");
    if (action) {
      event.preventDefault();
      event.stopPropagation();
      const next = action.dataset.assistantAction;
      if (next === "choose") setMode("chooser");
      else if (next === "full" || next === "widget") setMode(next);
      else if (next === "close") setMode("closed");
      return;
    }
    if (prompt) { event.preventDefault(); event.stopPropagation(); send(prompt.dataset.assistantPrompt); return; }
    if (project) { event.preventDefault(); event.stopPropagation(); onProjectOpen(project.dataset.assistantProject); }
  });

  root.addEventListener("input", event => {
    if (event.target?.id === "fp-input") draft = event.target.value;
  });
  root.addEventListener("submit", event => {
    if (event.target?.id !== "fp-form") return;
    event.preventDefault();
    send(draft);
  });
  document.addEventListener("click", event => {
    if (mode === "chooser" && !root.contains(event.target)) setMode("closed");
  });
  document.addEventListener("keydown", event => {
    if (mode === "full" && event.key === "Tab") {
      const dialog = root.querySelector(".fp-window-full");
      if (dialog) trapAssistantFocus(event, dialog);
    }
    if (event.key === "Escape" && mode !== "closed") setMode("closed");
  });
  document.addEventListener("jandrishti:language-change", () => render());

  render();
}
