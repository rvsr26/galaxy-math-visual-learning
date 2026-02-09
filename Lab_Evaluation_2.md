# Lab Evaluation 2 - Visual Math Learning Portal

## 1. Student Details
**Roll No:** [YOUR_ROLL_NO]  
**Name:** [YOUR_NAME]  

*(Please attach your photo here in the final submission)*

---

## 2. Course Details
**Course Code:** [COURSE_CODE]  
**Course Name:** [COURSE_NAME]  

**Course Teacher:**  
**Dr. T. Senthil Kumar**  
Professor  
Amrita School of Computing  
Amrita Vishwa Vidyapeetham  
Coimbatore - 641112  
Email-t_senthilkumar@cb.amrita.edu  

---

## 3. Product Details
**GitHub Repository:** https://github.com/rvsr26/galaxy-math-visual-learning  

**Collaborators:**  
- **Academic:** [NAME]  
- **Industry:** [NAME]  

---

## 4. Use Case: Visual Math Learning for Autism

### Why is this portal required for autism kids?
Traditional abstract math teaching methods often fail to engage children with autism who may struggle with attention and processing purely symbolic information. This portal leverages visual learning, which is a common strength among individuals with autism, to make mathematical concepts concrete, engaging, and less intimidating.

### Challenges in autism kids addressed by this portal
- **Attention Span:** Gamified elements and interactive visuals maintain focus.
- **Abstract Thinking:** Converting numbers to objects (Apples, Shapes) bridges the gap between concrete and abstract.
- **Repetitive Learning:** The app allows for endless practice without judgment, catering to the preference for routine and repetition.
- **Sensory Overload:** The design uses calming colors and simple interfaces to minimize unnecessary stimuli.

### Highlights and Novelty
- **Gamified Learning Paths:** Different games (Seqence, Memory, Pattern) target specific cognitive skills.
- **Immediate Visual Feedback:** Correct answers are rewarded instantly visually, reinforcing learning.
- **Adaptive Difficulty:** Games like Counting and Math offer Easy/Medium/Hard modes to grow with the learner.

### Importance of Visualisation
Visualization reduces cognitive load by externalizing memory and processing. For autistic learners, seeing "3 apples + 2 apples" is often immediately intuitive, whereas "3 + 2" requires symbolic decoding. This direct mapping bypasses language processing difficulties and taps into visual-spatial strengths.

---

## 5. Operations in the Portal

| Operation Name | Expected Output | ReactJS Concepts Used | How concept improved application |
| :--- | :--- | :--- | :--- |
| **Counting Game** | User selects correct count of objects. Success message on match. | `useState`, `props` | `useState` manages the current count and score dynamically without page reloads. |
| **Math Game** | User solves simple arithmetic. Score updates. | `useEffect`, Conditional Rendering | `useEffect` generates new problems automatically when one is solved. |
| **Pattern Game** | User identifies the next item in a sequence. | `map()`, Component Reusability | `map` allows efficient rendering of repeated pattern elements from data arrays. |
| **Memory Game** | User flips cards to find matching pairs. | `useState`, Grid Layout (CSS) | State tracks card flip status (flipped/matched), enabling interactive gameplay logic. |
| **Sequence Game** | User repeats a sequence of lights/sounds. | `setTimeout`, `useEffect` | `setTimeOut` controls the timing of the sequence display, crucial for game mechanics. |
| **Learning Mode** | Visual representation of numbers 1-10. | Static Components, Routing | component-based architecture keeps the learning module modular and easy to update. |

---

## 6. Improvements for Autism Kids
- **Memory Improvement:** The Memory Game explicitly trains short-term working memory through visual matching.
- **Contextual Learning:** Associating numbers with real-world objects (fruits, shapes) provides context to abstract values.
- **Pattern Recognition:** The Pattern and Sequence games enhance logical thinking and predictive ability.
- **Fine Motor Skills:** Clicking and interacting with specific UI elements helps refine motor control.

---

## 7. Similar Products

| Product Name | URL | Description | Key Features |
| :--- | :--- | :--- | :--- |
| **Khan Academy Kids** | [khanacademy.org/kids](https://learn.khanacademy.org/khan-academy-kids/) | Comprehensive early learning app. | Adaptive path, wide subject range, whimsical characters. |
| **Otsimo** | [otsimo.com](https://otsimo.com/en/) | Special education app for autism. | AAC module, data tracking, specialized games. |
| **Endless Numbers** | [originatorkids.com](https://www.originatorkids.com/) | Interactive animations for numbers. | Monsters teach numbers, animations demonstrate quantity. |

---

## 8. Research Labs (Working in similar area)
- **MIT Media Lab - Affective Computing Group:** Researching technology for autism and emotional recognition.
- **Stanford University - Wall Lab:** Focuses on using AI and machine learning to detect autism and create therapeutic tools.
- **Amrita Vishwa Vidyapeetham - Amrita create:** Researching educational technology and accessible learning solutions.

---

## 9. Algorithms Implemented
1.  **Random Number Generation (`Math.random()`):** Used in Counting and Math games to generate unique problems and object counts every session.
2.  **Fisher-Yates Shuffle:** Used in the Memory Game to randomize the card positions ensuring a new puzzle layout each time.
3.  **Pattern Matching Logic:** Checks the user's input against the generated sequence in Pattern and Sequence games to validate correctness.
4.  **State Management Logic:** Tracks score, current level, streaks, and game over conditions across the application lifecycle.

---

## 10. Feature Enhancements

| Enhancement | Justification |
| :--- | :--- |
| **AI-Based Adaptive Difficulty** | The system currently uses manual difficulty selection. AI could analyze user performance (response time, error rate) to auto-adjust difficulty, keeping the user in the "flow" state. |
| **Voice Interaction** | Adding text-to-speech and speech-to-text would make the app accessible to non-verbal children or those with motor difficulties. |
| **Parent/Teacher Dashboard** | A detailed analytics dashboard (time spent, accuracy per game) would help caregivers track progress and identify struggle areas. |
| **Social Stories Module** | Integrating social stories could expand the app's scope from just IQ/Math to EQ (Emotional Intelligence) and social skills. |

---

## 11. Final Summary
**Lab Name:** [LAB_NAME] (e.g., Web Technologies Lab)  
**Project URL:** [DEPLOYED_URL_IF_ANY] or `http://localhost:3000`  
**Professor:** Dr. T. Senthil Kumar  
