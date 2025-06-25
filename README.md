# DJai – Generate Your Music Without Hesitation

> An AI-powered real-time music generation and editing tool, built fully on-chain using Stellar’s payment rails and Passkey authentication.

---

## 1. Project Initialization

### 1.1 Abstract
This documentation outlines the technical and conceptual architecture of DJai, a decentralized AI music editing platform built on the Stellar blockchain. DJai allows users to generate and edit music in real-time without pausing playback, using a chat interface and AI-powered music engine. By leveraging Stellar’s energy-efficient consensus, fast settlement, Passkey authentication, and credit-based micro-payment structure, DJai delivers the first truly on-chain AI music experience.

### 1.2 Motivation
The Narrative is Music.

Music is embedded in every form of digital content: videos, streams, social posts. Creators rely on background music as a foundational layer. AI tools must empower this flow—not interrupt it. DJai was built to support uninterrupted creative expression by merging AI capabilities with decentralized infrastructure.

Stellar makes this possible with low-latency execution, on-chain ownership, and frictionless payments.

### 1.3 Problem & Solution

**Problem:**
- Existing AI music tools require rendering time and break creative flow
- No integration with on-chain identity or payment systems
- Editing music in real time typically requires technical skills or expensive software

**Solution:**
- DJai enables prompt-based audio editing via chat while music plays
- Music never stops; all transformations happen live
- Payments and ownership are handled on Stellar (credits, Passkeys)

### 1.4 Why Stellar
- ✅ **Fast Settlement:** ~5 seconds per transaction
- ✅ **Energy-Efficient:** ~0.22Wh per transaction
- ✅ **Developer Friendly:** SDKs and passkey integration
- ✅ **Decentralized:** Robust, transparent consensus
- ✅ **Perfect for Streaming Credits:** Our revenue model is credit-based, handled via Stellar assets

### 1.5 User Audience
- DJs and producers seeking fast iteration
- Hobbyist musicians with no technical skills
- Audio engineers exploring AI-native workflows
- People who want to generate music with a single click

---

## 2. Onboarding Flow

### 2.1 Connect Your Wallet & Start Creating

1. Visit DJai and connect your Stellar wallet using Passkey login
2. Choose one of the 3 AI-generated baseline genres (more coming)
3. Our AI generates your beat instantly
4. Use the chat interface (e.g., "add drums") to change the music on the fly
5. All audio edits happen in real-time without stopping the music
6. Credits are deducted on-chain per edit; tracked and logged via Stellar

### 2.2 Key Technical Constraints
- 🔁 Real-time audio streaming
- ⚡ Sub-1s response latency
- 🔒 Auth via Passkey (no password flow)
- 🌐 On-chain interaction & transaction logging

### 2.3 Success Metrics
- <1s latency for edits
- 95%+ uptime during session
- 100% successful Stellar tx log rate

---

## 3. Roadmap & Architecture

### 3.1 Architecture Decisions
- AI: LLM-based natural language instruction parser
- Audio: Real-time Web Audio engine
- Stellar: Payment + Logging Layer (Passkeys + Credits)

### 3.2 Development Phases
1. 🎤 MVP: Chat interface with live edits
2. 🎚️ Audio Engine: Layer-based beat system
3. 🌐 Stellar: Revenue logging, credit deduction, IP trace
4. ⚙️ Optimization: Lazy load, frontend speed, inference load

### 3.3 Integration Points
- LLM ↔️ Audio Engine
- Audio Engine ↔️ Playback Layer
- LLM ↔️ Stellar SDK (credit logic, tx logs)

### 3.4 Testing Strategy
- ✅ Unit tests for transformation logic
- ✅ Integration tests: Chat → Edit → Audio
- ✅ E2E: User sends prompt → hears result in <1s

### 3.5 Optimization Checkpoints
- 🧠 Memoized audio buffer
- 🎧 Lazy-loaded models
- 🌐 Stellar transaction bundling

---

## 4. Prompt Engineering Strategy

### 4.1 Standard Prompt Template
> In a Next.js 14 app using TypeScript and Tailwind, create a real-time chat editor that modifies a live audio stream. 
Constraints: sub-500ms response latency, non-blocking edits, full session history stored on Stellar.
**Output:** component tree + chat parser + Stellar logging module.

### 4.2 Prompt Refinement
> Optimize above output for modularity.
Split audio engine and LLM agent.
Memoize audio instructions.
Use suspense fallback on inference loading.
Separate logs for each edit.

---

## 5. Feature Development 

### 5.1 Task: 
- Parse instruction → e.g., "add bass"
- Validate against current tempo/layer
- Apply to AudioEngine
- Update waveform
- Log edit to Stellar

### 5.2 Implementation
- 🧩 Architecture: Modular micro-frontend
- 📡 API: REST (Stellar), WS (playback)
- 📁 Components:
  - `ChatInput`
  - `InstructionParser`
  - `AudioEngineCore`
  - `StellarLogger.ts`

---

## 6. Testing, Performance & Scaling

### 6.1 Tests
- Unit: Instruction transform
- Integration: Chat → Engine → Playback
- E2E: Prompt → Hear update instantly
- Stress: Multi-edit spam resilience

### 6.2 Metrics
- **FCP:** < 1.2s
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **TTI:** < 3s

### 6.3 Scalability Plan
- WebAssembly for AudioEngine
- IPFS storage for past sessions
- Stellar for edit checkpoints & microownership
- Load-balanced inference backend

---

## 7. Team & Credits

| Role                | Name         |
|---------------------|-----------------------------|
| AI Lead             |   Caner Dere
| Frontend & UI       |   Ada Yıldız                     |
| Stellar Integration |   Berke Babaoğul                         |
| Docs & Pitch        |   Dilara Saraçoğlu                          |

---

## 8. Conclusion

DJai merges creativity, speed, and decentralization to create the world’s first live AI music editing tool that runs completely on-chain. No pause. No friction. Just sound — shaped by your words.

> Let’s turn every block into music.

## 9. Resources

https://www.canva.com/design/DAGrDk94_yE/jMndPiaG55JCZpWNUv35Tw/edit?utm_content=DAGrDk94_yE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

### Developed and Maintained By
- **Sami Berke Babaoğlu** ([->GitHub<-](https://github.com/SBerkeB))
- **Ada Yıldız** ([->GitHub<-](https://github.com/adayildizz))

### Major Contributors 💐
- Ali Caner Dere ([->📫<-](mailto:alicaner.dere@outlook.com))
- Dilara Saraçoğlu ([->📫<-](mailto:dlrsaracoglu1@gmail.com))
