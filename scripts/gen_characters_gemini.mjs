import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDCQ6FISIOhlWglI54MUMVfCHYv2WtD9BM" });
const OUT = path.join(process.env.HOME, "Desktop/Claude-Projects/hissan-master/public/characters");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function gen(prompt, filename, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
        config: { responseModalities: ["Text", "Image"] },
      });
      const parts = response.candidates?.[0]?.content?.parts;
      if (!parts) { console.log(filename + ": No response"); return false; }
      for (const part of parts) {
        if (part.inlineData) {
          const filePath = path.join(OUT, filename + ".png");
          fs.writeFileSync(filePath, Buffer.from(part.inlineData.data, "base64"));
          console.log("✅ " + filename);
          return true;
        }
      }
      console.log(filename + ": No image in response");
      return false;
    } catch(e) {
      const msg = e.message || "";
      if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
        const wait = 30 * (i + 1);
        console.log(`⏳ ${filename}: Rate limited, waiting ${wait}s... (attempt ${i+1}/${retries})`);
        await sleep(wait * 1000);
      } else {
        console.log(`❌ ${filename}: ${msg.substring(0, 150)}`);
        if (i < retries - 1) await sleep(5000);
        else return false;
      }
    }
  }
  return false;
}

const BASE_STYLE = "Cute kawaii chibi character, simple flat design, round body, big sparkly eyes, pink cheeks, pastel colors, game card style, centered on solid color background, no text, high quality, clean vector illustration style.";

const CHARACTERS = [
  // ★ ノーマル (1-30)
  [1, "An adorable chibi cat with orange and white fur, triangle ears, whiskers, curled tail. Light pink background."],
  [2, "An adorable chibi Shiba Inu dog with tan fur, pointy ears, happy face, wagging tail. Light orange background."],
  [3, "An adorable chibi white rabbit with long floppy ears, pink inner ears, fluffy cotton tail. Light pink background."],
  [4, "An adorable chibi green frog with big round eyes on top of head, sitting pose, wide smile. Light green background."],
  [5, "An adorable chibi yellow baby chick, tiny wings, fluffy round body, small orange beak. Light yellow background."],
  [6, "An adorable chibi pink piglet, curly tail, round snout with nostrils, floppy ears. Light pink background."],
  [7, "An adorable chibi gray mouse with big round ears, long thin tail, tiny paws. Light gray background."],
  [8, "An adorable chibi hamster with puffy cheeks, tiny ears, orange and white fur, holding a seed. Light orange background."],
  [9, "An adorable chibi brown bear cub, round ears, holding a honey pot, friendly smile. Light brown background."],
  [10, "An adorable chibi penguin, black and white body, orange beak and feet, waddling pose. Light blue background."],
  [11, "An adorable chibi baby chick hatching from an egg shell, fluffy yellow, surprised face. Light yellow background."],
  [12, "An adorable chibi cow with black and white patches, small horns, bell around neck. Light cream background."],
  [13, "An adorable chibi sheep with fluffy white wool body, small face peeking out, tiny legs. Light gray background."],
  [14, "An adorable chibi rooster with red comb, colorful tail feathers, proud pose. Light red background."],
  [15, "An adorable chibi hedgehog with spiky back, small face, curled up slightly. Light brown background."],
  [16, "An adorable chibi squirrel with fluffy big tail, holding an acorn, bushy ears. Light orange background."],
  [17, "An adorable chibi red crab with big claws held up, 6 legs, round eyes on stalks. Light red background."],
  [18, "An adorable chibi green turtle with patterned shell, wise old eyes, slow walking pose. Light green background."],
  [19, "An adorable chibi bee with black and yellow stripes, tiny transparent wings, holding a flower. Light yellow background."],
  [20, "An adorable chibi red ladybug with black spots, small legs, smiling face. Light red background."],
  [21, "An adorable chibi yellow duck, orange beak and feet, swimming pose with ripples. Light yellow background."],
  [22, "An adorable chibi mole popping out of a dirt hole, squinting eyes, big digging paws. Light brown background."],
  [23, "An adorable chibi tanuki (raccoon dog) with round belly, leaf on head, mischievous smile. Light brown background."],
  [24, "An adorable chibi green parakeet/budgie on a perch, colorful feathers, tilted head. Light green background."],
  [25, "An adorable chibi goldfish with flowing fins and tail, orange and white, bubbles around. Light orange background."],
  [26, "An adorable chibi snail with colorful spiral shell, two eye stalks, leaving a sparkly trail. Light purple background."],
  [27, "An adorable chibi koala clinging to a small branch, fluffy ears, sleepy eyes, gray fur. Light gray background."],
  [28, "An adorable chibi rabbit with orange-brown fur, upright ears, holding a carrot. Light orange background."],
  [29, "An adorable chibi panda with black and white fur, eating bamboo, round body. Light gray background."],
  [30, "An adorable chibi baby deer (fawn) with spotted back, big eyes, small antler buds. Light brown background."],

  // ★★ レア (31-60) - slightly more detailed, accessories
  [31, "An adorable chibi fox with orange fur, white chest, fluffy big tail, wearing a small red scarf. Light orange background with small stars."],
  [32, "An adorable chibi panda wearing a tiny blue prince cape and small golden crown. Light blue background with sparkles."],
  [33, "An adorable chibi koala princess wearing a pink tiara and small pink dress. Light purple background with sparkles."],
  [34, "An adorable chibi lion cub with fluffy golden mane, wearing a small red bow tie, proud pose. Light yellow background with stars."],
  [35, "An adorable chibi dolphin jumping out of water with splash effects, happy expression. Light blue background with bubbles."],
  [36, "An adorable chibi butterfly with large colorful wings (purple, pink, blue), antennae with stars. Light purple background with sparkles."],
  [37, "An adorable chibi red octopus wearing a tiny pirate hat, 8 curly tentacles, one eye winking. Light red background with stars."],
  [38, "An adorable chibi owl wearing tiny round glasses and a graduation cap, wise expression. Light brown background with stars."],
  [39, "An adorable chibi flamingo standing on one leg, pink feathers, wearing a small flower crown. Light pink background with sparkles."],
  [40, "An adorable chibi tropical fish with vibrant orange, blue and yellow stripes, fancy fins. Light orange background with bubbles."],
  [41, "An adorable chibi sea otter floating on its back, holding a shell on its belly, relaxed. Light brown background with stars."],
  [42, "An adorable chibi green parrot wearing a tiny pirate eyepatch, on a small treasure chest. Light green background with sparkles."],
  [43, "An adorable chibi chameleon with swirly eyes, curly tail, changing colors (green to purple gradient). Light green background with stars."],
  [44, "An adorable chibi pelican with a big pouch beak, carrying a small letter, mail carrier hat. Light blue background with stars."],
  [45, "An adorable chibi baby seal with big round eyes, white fluffy fur, sparkly ice crystals around. Light blue background with sparkles."],
  [46, "An adorable chibi red panda with striped tail, wearing a tiny explorer hat and backpack. Light orange background with stars."],
  [47, "An adorable chibi sea turtle with flowery shell pattern, wearing tiny sunglasses, surfing pose. Light green background with stars."],
  [48, "An adorable chibi otter holding a bouquet of tiny flowers, wearing a small ribbon. Light pink background with sparkles."],
  [49, "An adorable chibi manta ray with wide flat body, gentle smile, deep blue spots. Light blue background with bubbles."],
  [50, "An adorable chibi hummingbird with iridescent green feathers, hovering near a flower, tiny size. Light green background with sparkles."],
  [51, "An adorable chibi jellyfish with translucent dome, trailing sparkly tentacles, gentle glow. Light purple background with stars."],
  [52, "An adorable chibi gecko wearing a tiny ninja headband, sticking to a wall, spotted green. Light green background with stars."],
  [53, "An adorable chibi axolotl (pink) with feathery gills, wide smile, holding a tiny magic wand. Light pink background with sparkles."],
  [54, "An adorable chibi white swan with elegant curved neck, wearing a tiny silver tiara. Light white/blue background with sparkles."],
  [55, "An adorable chibi ermine (white winter coat) with tiny paws, surrounded by snowflakes. Light gray background with sparkles."],
  [56, "An adorable chibi capybara relaxing in a tiny hot spring, steam rising, orange on head. Light orange background with stars."],
  [57, "An adorable chibi meerkat standing upright on lookout, wearing tiny binoculars around neck. Light yellow background with stars."],
  [58, "An adorable chibi long-tailed tit (shima-enaga), extremely fluffy round white body, tiny eyes. Light pink background with sparkles."],
  [59, "An adorable chibi hermit crab in a sparkly gem-encrusted shell, peeking out shyly. Light purple background with stars."],
  [60, "An adorable chibi firefly glowing yellow-green, carrying a tiny lantern, night sparkles. Light yellow background with stars."],

  // ★★★ スーパーレア (61-90) - fantasy, elaborate
  [61, "A majestic chibi unicorn with rainbow mane and tail, golden horn, sparkling aura, wings spread. Purple background with magical particles and stars."],
  [62, "A fierce chibi dragon knight with red scales, small wings, wearing golden armor, breathing tiny flames. Red background with fire particles and stars."],
  [63, "A majestic chibi peacock with fully spread iridescent tail feathers (green, blue, gold), wearing tiny crown. Green background with golden sparkles."],
  [64, "A majestic chibi whale king wearing a golden crown, swimming through starry water, blue glow. Deep blue background with golden stars."],
  [65, "A heroic chibi eagle warrior wearing golden armor, spread wings with golden tips, fierce eyes. Gold background with sparkle effects."],
  [66, "A wise chibi wolf sage sitting under a crescent moon, wearing a scholar's robe, holding a book. Gray/indigo background with moon and stars."],
  [67, "A majestic chibi white tiger with golden stripes, glowing eyes, wearing battle armor. White/gold background with lightning sparks."],
  [68, "A legendary chibi phoenix bird with magnificent fire wings spread wide, feathers of red, orange and gold flames. Red/orange background with fire particles."],
  [69, "A mystical chibi nine-tailed fox with flowing orange-red tails, each tip glowing, mysterious aura. Orange/red background with flame particles."],
  [70, "A royal chibi ice penguin prince wearing an ice crystal crown, surrounded by snowflakes and ice shards. Ice blue background with crystal sparkles."],
  [71, "A magical chibi star rabbit princess wearing a dress made of starlight, stars orbiting around. Purple/gold background with star particles."],
  [72, "A guardian chibi forest deer with antlers covered in green leaves and flowers, forest spirit aura. Green background with leaf particles."],
  [73, "A magical chibi rainbow chameleon wizard with swirling rainbow body, wearing wizard hat with stars. Rainbow gradient background with sparkles."],
  [74, "A beautiful chibi sakura cat princess with cherry blossom petals floating around, pink kimono. Pink background with cherry blossom petals."],
  [75, "A powerful chibi lightning cheetah with electric yellow spots, sparking with electricity, speed lines. Yellow background with lightning bolts."],
  [76, "A royal chibi seahorse king with ornate fins like a crown, jeweled body, ocean kingdom. Blue/purple background with jewel sparkles."],
  [77, "A magnificent chibi butterfly queen with enormous rainbow wings, wearing a flower crown. Pink background with flower petals and sparkles."],
  [78, "A legendary chibi sun lion king with mane made of golden sunrays, radiating warm light. Gold/orange background with sun rays."],
  [79, "A stealthy chibi moon rabbit ninja with crescent moon shuriken, wearing dark purple ninja outfit. Dark purple background with moon and stars."],
  [80, "A swift chibi wind falcon with emerald feathers, wind swirls around wings, soaring pose. Green/teal background with wind effects."],
  [81, "A mighty chibi elephant knight wearing stone armor with gem inlays, trunk raised triumphantly. Brown/amber background with earth crystals."],
  [82, "A ethereal chibi snow fox fairy with ice crystal fur, translucent fairy wings, snowflakes. Ice blue/white background with crystal sparkles."],
  [83, "A wise chibi gem turtle sage with shell made of colorful precious gems, glowing runes. Purple/green background with gem sparkles."],
  [84, "A melodious chibi nightingale with golden feathers, playing a tiny golden harp, music notes floating. Blue/pink background with music note sparkles."],
  [85, "A mysterious chibi time butterfly with clock-patterned wings, hourglass on body, time particles. Purple/gold background with clock sparkles."],
  [86, "A magical chibi snow leopard with starry night pattern fur, glowing purple eyes, crystal ball. Dark blue background with star constellations."],
  [87, "A divine chibi pegasus with golden wings, rainbow trail, flying through clouds. Pink/gold background with cloud and rainbow effects."],
  [88, "A enchanting chibi mermaid cat with fish tail, wearing pearl crown, underwater bubbles. Purple/blue background with pearl sparkles."],
  [89, "A legendary chibi twin dragon (fire red and ice blue intertwined), two heads, yin-yang style. Red and blue split background with elemental particles."],
  [90, "The ultimate legendary chibi phoenix with golden and crimson feathers, enormous fire wings, divine halo, radiating legendary power. Gold/red background with intense magical particles and stars."],
];

// Check existing
const existing = new Set(fs.readdirSync(OUT).filter(f => f.startsWith("char_") && f.endsWith(".png")).map(f => {
  const m = f.match(/char_(\d+)/);
  return m ? parseInt(m[1]) : 0;
}));

const todo = CHARACTERS.filter(([id]) => !existing.has(id));
console.log(`Total: ${CHARACTERS.length}, Already done: ${existing.size}, Todo: ${todo.length}`);

for (const [id, description] of todo) {
  const prompt = `${BASE_STYLE} ${description} Square 1:1 aspect ratio.`;
  const filename = `char_${id}`;
  await gen(prompt, filename);
  await sleep(12000); // 12s between requests to avoid rate limiting
}

console.log("\n=== Done ===");
const final = fs.readdirSync(OUT).filter(f => f.startsWith("char_")).length;
console.log(`Generated: ${final}/90 character images`);
