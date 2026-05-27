import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDCQ6FISIOhlWglI54MUMVfCHYv2WtD9BM" });
const OUT = path.join(process.env.HOME, "Desktop/Claude-Projects/sns-hub/reels/diabetes-symptoms");

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function gen(prompt, filename, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`⏳ ${filename}...`);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
        config: { responseModalities: ["Text", "Image"] },
      });
      const parts = response.candidates?.[0]?.content?.parts;
      if (!parts) { console.log(filename + ": No response"); return false; }
      for (const part of parts) {
        if (part.inlineData) {
          fs.writeFileSync(path.join(OUT, filename + ".png"), Buffer.from(part.inlineData.data, "base64"));
          console.log("✅ " + filename);
          return true;
        }
      }
      console.log(filename + ": No image"); return false;
    } catch(e) {
      const msg = e.message || "";
      if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
        const wait = 30 * (i + 1);
        console.log(`⏳ ${filename}: Rate limited, waiting ${wait}s...`);
        await sleep(wait * 1000);
      } else {
        console.log(`❌ ${filename}: ${msg.substring(0, 150)}`);
        if (i < retries - 1) await sleep(5000);
        else return false;
      }
    }
  }
}

const style = "Simple cute kawaii flat icon illustration, clean design, soft pastel colors on solid dark navy blue background (#16213e), single centered object, no text, no humans, medical health theme, round friendly shapes, high quality.";

const icons = [
  ["icon_1_thirst", `${style} A large cute glass of cold water overflowing with water droplets splashing around it, condensation on the glass, showing extreme thirst. Ice cubes visible.`],
  ["icon_2_toilet", `${style} A cute kawaii toilet with a small clock showing late night time, water droplets around, frequent bathroom visits concept.`],
  ["icon_3_weight", `${style} A cute bathroom weighing scale with a big red downward arrow on the display, showing sudden weight loss concept.`],
  ["icon_4_wound", `${style} A cute adhesive bandage (bandaid) with a sad kawaii face on it, placed on skin, with small slow-healing sparkles around it.`],
  ["icon_5_eye", `${style} A cute kawaii cartoon eye with blurry wavy lines and fog around it, representing blurred vision, slightly unfocused look.`],
];

for (const [name, prompt] of icons) {
  await gen(prompt, name);
  await sleep(12000); // rate limit
}
console.log("All done!");
