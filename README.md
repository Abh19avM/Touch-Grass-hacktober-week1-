# 🦚 CanopyRoute Pune — सह्याद्री Trail Running & Nature Audio Companion

> **Built for Hacktoberfest 2026 Open-Source AI Challenge: Week 1 ("Touch Grass")**  
> *Theme: Build something with open-source AI at its core that gets people off the screen and into the world.*  
> **Live Site:** [https://abh19avm.github.io/Touch-Grass-hacktober-week1-/](https://abh19avm.github.io/Touch-Grass-hacktober-week1-/)  
> **Repository:** [https://github.com/Abh19avM/Touch-Grass-hacktober-week1-](https://github.com/Abh19avM/Touch-Grass-hacktober-week1-)

---

## 🌲 What is CanopyRoute Pune?

**CanopyRoute Pune** is an offline-first scenic trail route planner and auditory hill running companion powered by local open-weight AI (`@huggingface/transformers`), built specifically for the tekdis, banyan groves, and mountain crests of **Pune, Maharashtra**.

Modern fitness and mapping apps keep runners glued to glowing screens, constantly staring at digital turn-by-turn prompts, elevation contours, and pace alerts. CanopyRoute is built with the opposite philosophy: **make the screen the shortest part of the experience, put the phone in your pocket, and run by sound.**

---

## ✨ Core Features

1. **Touch Grass Pocket Run Mode**:
   - Select your trail, tap **"Start Pocket Run"**, and slip your phone into your pocket or running shorts.
   - Screen locks to an ultra-low-power dark OLED display while in-browser speech synthesis and haptics guide your route with sensory awareness cues at GPS milestones.
2. **Local Open-Weight AI (`@huggingface/transformers`)**:
   - In-browser vector embedding model (`Xenova/all-MiniLM-L6-v2`) runs via WebAssembly/WebGPU directly on device silicon with **zero data sent to the cloud**.
   - Computes semantic similarity between natural language runner queries (*"Morning 5k loop with peacocks, banyan trees, and soft red murrum dirt"*) and trail conditions.
3. **Interactive Cursor Companion**:
   - Smooth, physics-based flying companion that gracefully follows your cursor across the screen with natural banking and directional rotation.
   - Switch anytime between the **Blue Mormon Butterfly** (Maharashtra's state butterfly with 3D flapping wings) and the **Hill Honeybee** with a golden sparkling pollen trail.
4. **Curated Pune Sahyadri Trails**:
   - **Vetal Tekdi & ARAI Forest Ridge** (5.8 km • Highest natural hill crest in Pune city, red murrum soil, peacocks, wild hares)
   - **Taljai Hills & Peacock Reserve** (4.6 km • Zero-vehicle protected forest reserve with shaded banyan groves and resident dancing peacocks)
   - **Sinhagad Fort Mountain Trail** (8.2 km • Historic mountain steps, cool valley fog, Karvi flower blossoms, panshet reservoir views)
   - **Pashan Lake Bamboo & Wetland Sanctuary** (4.2 km • Golden bamboo groves, lotus water lilies, and kingfishers)
   - **Baner Hill & Windmill Plateau Ridge** (5.2 km • Panoramic 360-degree ridge run overlooking the Baner-Pashan valley)
5. **Accurate Regional Map with Western Ghats Topo**:
   - Map boundaries are strictly focused on Pune and the Sahyadri mountains (`minZoom: 10`, `maxBounds` set to Western Ghats) with high-detail ESRI Topographic and Satellite tile layers.
6. **Pune Botanical & Wildlife Field Guide**:
   - Offline guide to native Western Ghats flora (Banyan aerial prop roots, Gulmohar scarlet blooms, Karvi mass-flowering shrubs, Champa) and wildlife (Indian Peacock, Blue Mormon Butterfly, Black-naped Hare, Hill Honeybee).

---

## 💡 Why Does Open Innovation Matter?

1. **Mountain Trails Have Zero Cell Signal**: In the deep valleys of Sinhagad or on the wooded slopes of Taljai, cloud-based AI APIs (closed proprietary models) instantly timeout and fail. Open weights run locally on device silicon with 100% offline autonomy.
2. **Complete Biometric & Location Privacy**: GPS tracks, running pace, cadence, and schedule never touch external servers or third-party ad networks.
3. **Zero Operating Cost for Community Run Clubs**: Grassroots Pune running clubs and non-profit trail organizations can deploy and use the tool indefinitely with zero per-token cloud billing.
4. **No Vendor Lock-in**: Open-source models can be adapted, fine-tuned, and quantized to match specific regional ecosystems.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/Abh19avM/Touch-Grass-hacktober-week1-.git
cd Touch-Grass-hacktober-week1-

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Open-Source AI:** `@huggingface/transformers` (Xenova/all-MiniLM-L6-v2) via ONNX Runtime Web / WebGPU
- **Cartography:** Leaflet, React-Leaflet, ESRI World Topo Map
- **Sensory Audio:** Web Speech Synthesis API & Web Audio API procedural sound synthesis
- **Vector Illustrations:** Pure custom SVG & CSS 3D transform animations
- **Deployment:** GitHub Pages via GitHub Actions
