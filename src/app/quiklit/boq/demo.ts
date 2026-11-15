import type { Run } from "@/lib/boq";

// The guided walkthrough. Wording follows the QuikLit team's own demo script, in three languages.
export type Lang = "en" | "hi" | "hg";
type R = Omit<Run, "id">;
const base: R = { place: "Wardrobe", room: "", profile: "1707", cct: "3K", length: 0, unit: "mm", units: 1, linesEach: 1, corners: 0, sensor: "" };
const A1: R = { ...base, room: "Master bedroom wardrobe" };
const A2: R = { ...A1, profile: "1010", cct: "3K" };
const A3: R = { ...A2, length: 2100, unit: "mm" };
const A4: R = { ...A3, units: 3, linesEach: 2 };
const B1: R = { ...base, room: "Kids room wardrobe", profile: "0809", cct: "4K" };
const B2: R = { ...B1, length: 6, unit: "ft", units: 2 };
const C1: R = { ...base, place: "Kitchen under-cabinet", room: "Kitchen", profile: "0809", cct: "4K", length: 3.6, unit: "m" };
const C2: R = { ...C1, corners: 2 };
const A5: R = { ...A4, sensor: "QUIKSENS-TWIN DOOR" };
const ALL = [A5, B2, C2];

export const DEMO: { title: string; hot: string; runs: R[]; say: Record<Lang, string> }[] = [
  { title: "Welcome", hot: "", runs: [base], say: {
    en: "Welcome to the QuikLit calculator. QuikLit is furniture lighting: wardrobes, kitchens, shelves and displays. I will fill in an example, step by step, so you can see how it works.",
    hi: "नमस्ते, QuikLit calculator में आपका स्वागत है। QuikLit furniture lighting है: wardrobe, kitchen, shelf और display के लिए। मैं एक example step by step fill करूँगा, जिससे आपको समझ आए कि यह कैसे काम करता है।",
    hg: "Namaste, QuikLit calculator mein aapka swagat hai. QuikLit furniture lighting hai: wardrobe, kitchen, shelf aur display ke liye. Main ek example step by step fill karunga, jisse aapko samajh aaye ki yeh kaise kaam karta hai." } },
  { title: "Where the light goes", hot: "r0-place", runs: [A1], say: {
    en: "Start with where the light goes. Here it is a wardrobe, and we name it Master bedroom wardrobe.",
    hi: "सबसे पहले चुनिए कि light कहाँ लगानी है। इस example में wardrobe है, और इसका नाम Master bedroom wardrobe रखते हैं।",
    hg: "Sabse pehle choose kijiye ki light kahan lagani hai. Is example mein wardrobe hai, aur iska naam Master bedroom wardrobe rakhte hain." } },
  { title: "Profile and colour", hot: "r0-profile", runs: [A2], say: {
    en: "Next, choose the profile and the light colour. I am choosing QuikLit 1010 in 3000K warm white.",
    hi: "अब profile और light का colour select कीजिए। मैं QuikLit 1010 और 3000K warm white select कर रहा हूँ।",
    hg: "Ab profile aur light ka colour select kijiye. Main QuikLit 1010 aur 3000K warm white select kar raha hoon." } },
  { title: "Length", hot: "r0-len", runs: [A3], say: {
    en: "Now enter the length of one line of light. Here it is 2,100 millimetres. You can also work in centimetres, metres, inches or feet.",
    hi: "अब एक line की actual length enter कीजिए। इस example में length 2100 millimetres है। आप centimetre, metre, inch या feet में भी काम कर सकते हैं।",
    hg: "Ab ek line ki actual length enter kijiye. Is example mein length 2100 millimetres hai. Aap centimetre, metre, inch ya feet mein bhi kaam kar sakte hain." } },
  { title: "How many", hot: "r0-qty", runs: [A4], say: {
    en: "There are three identical wardrobes, and each needs light on the left and the right. So: three of these, with two lines of light in each.",
    hi: "Master bedroom में तीन identical wardrobes हैं, और हर wardrobe के left और right दोनों तरफ़ light चाहिए। इसलिए quantity 3, और हर एक में 2 lines।",
    hg: "Master bedroom mein teen identical wardrobes hain, aur har wardrobe ke left aur right dono taraf light chahiye. Isliye quantity 3, aur har ek mein 2 lines." } },
  { title: "Second room", hot: "r1-profile", runs: [A4, B1], say: {
    en: "Now the second room. Add another line for the kids' room wardrobe, with profile 0809 in 4000K natural white.",
    hi: "अब दूसरा room add करते हैं: kids room की wardrobe। Profile 0809 select कीजिए और light colour 4000K natural white रखिए।",
    hg: "Ab doosra room add karte hain: kids room ki wardrobe. Profile 0809 select kijiye aur light colour 4000K natural white rakhiye." } },
  { title: "Feet or metres", hot: "r1-len", runs: [A4, B2], say: {
    en: "Its length is 6 feet, so choose feet as the unit. There are two of these wardrobes.",
    hi: "Length 6 feet enter कीजिए और unit feet select करें। इस example में 2 wardrobes हैं।",
    hg: "Length 6 feet enter kijiye aur unit feet select karein. Is example mein 2 wardrobes hain." } },
  { title: "Kitchen", hot: "r2-len", runs: [A4, B2, C1], say: {
    en: "The third area is the kitchen, under the wall cabinets. Profile 0809 again, 4000K, and the line is 3.6 metres long.",
    hi: "तीसरा area kitchen है, wall cabinet के नीचे। यहाँ भी profile 0809 और 4000K, और line की length 3.6 metres है।",
    hg: "Teesra area kitchen hai, wall cabinet ke neeche. Yahan bhi profile 0809 aur 4000K, aur line ki length 3.6 metres hai." } },
  { title: "Corners", hot: "r2-corners", runs: [A4, B2, C2], say: {
    en: "That kitchen line turns two corners. Enter 2, and the calculator adds the corner connectors.",
    hi: "इस kitchen line में 2 corners हैं। Corners में 2 enter कीजिए; calculator ज़रूरी corner connectors add कर देगा।",
    hg: "Is kitchen line mein 2 corners hain. Corners mein 2 enter kijiye; calculator zaroori corner connectors add kar dega." } },
  { title: "Sensor", hot: "r0-sensor", runs: ALL, say: {
    en: "A sensor is optional. The master wardrobes have double doors, so choose the twin door sensor: the light comes on when either door opens.",
    hi: "Sensor लगाना optional है। Master wardrobe में double doors हैं, इसलिए twin door sensor select कीजिए: कोई भी door खुलते ही light on हो जाएगी।",
    hg: "Sensor lagana optional hai. Master wardrobe mein double doors hain, isliye twin door sensor select kijiye: koi bhi door khulte hi light on ho jayegi." } },
  { title: "Your order list", hot: "out", runs: ALL, say: {
    en: "This is your order list: profiles, accessory sets, connectors, sensors, power supplies and packing, each with its order code.",
    hi: "यह आपकी order list है: profiles, accessory sets, connectors, sensors, power supplies और packing, हर एक अपने order code के साथ।",
    hg: "Yeh aapki order list hai: profiles, accessory sets, connectors, sensors, power supplies aur packing, har ek apne order code ke saath." } },
  { title: "Packs and spare", hot: "spare", runs: ALL, say: {
    en: "Profiles are made in 3-metre lengths and packed two to a pack. Anything left after cutting is spare, not waste: use it in a drawer, a shelf or a niche.",
    hi: "Profile 3-metre lengths में बनता है और एक pack में दो lengths आती हैं। Cutting के बाद जो बचता है उसे waste न समझें: उसे drawer, shelf या छोटी cabinet में इस्तेमाल कर सकते हैं।",
    hg: "Profile 3-metre lengths mein banta hai aur ek pack mein do lengths aati hain. Cutting ke baad jo bachta hai use waste na samjhein: use drawer, shelf ya chhoti cabinet mein use kar sakte hain." } },
  { title: "Send it", hot: "send", runs: ALL, say: {
    en: "Add your name and mobile number and send the list to us, or share it on WhatsApp, by email, or save it as a PDF. We check every list before quoting.",
    hi: "अपना नाम और mobile number लिखिए और list हमें भेज दीजिए, या WhatsApp, email या PDF से share कीजिए। Quote से पहले हम हर list check करते हैं।",
    hg: "Apna naam aur mobile number likhiye aur list humein bhej dijiye, ya WhatsApp, email ya PDF se share kijiye. Quote se pehle hum har list check karte hain." } },
  { title: "Done", hot: "", runs: ALL, say: {
    en: "That is the whole calculator. Clear the demo and enter your own project. Thank you.",
    hi: "बस, calculator का demo यहीं पूरा होता है। Demo clear कीजिए और अपना project enter करना शुरू कीजिए। धन्यवाद!",
    hg: "Bas, calculator ka demo yahin complete hota hai. Demo clear kijiye aur apna project enter karna shuru kijiye. Dhanyavaad!" } },
];
