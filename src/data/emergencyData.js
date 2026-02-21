export const emergencyData = [
  {
    id: 1,
    type: "fire",
    title: "Fire Emergency",
    icon: "🔥",
    severity: "high",
    color: "red",
    emergencyNumber: "101",

    voiceIntro:
      "This is a fire emergency. Stay calm and follow the steps carefully.",

    calmTip:
      "Take a deep breath. Help is available. You are safe if you follow the steps.",

    steps: [
      "Stay calm",
      "Move away from fire and smoke",
      "Call the fire service immediately",
      "Use stairs, do not use elevators",
      "Help others only if it is safe",
    ],
    stepImages: [
      "/emergency_assets/step1fire.png",
      "/emergency_assets/step2fire.png",
      "/emergency_assets/step3fire.png",
      "/emergency_assets/step4fire.png",
      "/emergency_assets/step5fire.png"
    ],

    do: [
      "Cover your mouth with a cloth",
      "Stay low if there is smoke",
      "Follow exit signs",
    ],

    dont: [
      "Do not panic",
      "Do not hide",
      "Do not re-enter the building",
    ],

    offlineAvailable: true,
  },

  {
    id: 2,
    type: "medical",
    title: "Medical Emergency",
    icon: "🚑",
    severity: "high",
    color: "green",
    emergencyNumber: "108",

    voiceIntro:
      "This is a medical emergency. Please listen carefully and stay calm.",

    calmTip:
      "Help is on the way. Stay with the person and remain calm.",

    steps: [
      "Check if the person is conscious",
      "Call an ambulance immediately",
      "Do not move the person unless necessary",
      "Provide basic first aid if trained",
      "Stay until help arrives",
    ],
    stepImages: [
      "/emergency_assets/step1medical.png",
      "/emergency_assets/step2medical.png",
      "/emergency_assets/step3medical.png",
      "/emergency_assets/step4medical.png",
      "/emergency_assets/step5medical.png"
    ],

    do: [
      "Speak calmly to the person",
      "Keep the person comfortable",
    ],

    dont: [
      "Do not give food or water",
      "Do not leave the person alone",
    ],

    offlineAvailable: true,
  },

  {
    id: 3,
    type: "stranger",
    title: "Stranger Danger",
    icon: "⚠️",
    severity: "medium",
    color: "yellow",
    emergencyNumber: "100",

    voiceIntro:
      "This is a safety alert. Follow these steps to stay safe.",

    calmTip:
      "You are not alone. Move to a safe place and ask for help.",

    steps: [
      "Do not talk to strangers",
      "Move to a crowded or safe place",
      "Call the police or emergency number",
      "Inform a trusted adult immediately",
    ],
    stepImages: [
      "/emergency_assets/step1stranger.png",
      "/emergency_assets/step2stranger.png",
      "/emergency_assets/step3stranger.png",
      "/emergency_assets/step4stranger.png"
    ],

    do: [
      "Trust your instincts",
      "Stay where other people are present",
    ],

    dont: [
      "Do not share personal information",
      "Do not go anywhere with strangers",
    ],

    offlineAvailable: true,
  },

  {
    id: 4,
    type: "earthquake",
    title: "Earthquake Safety",
    icon: "🌍",
    severity: "high",
    color: "amber",
    emergencyNumber: "108",

    voiceIntro:
      "The ground is shaking. It is an earthquake. Stay calm and follow these steps.",

    calmTip:
      "The shaking will stop soon. You are doing great. Stay under cover.",

    steps: [
      "Drop down onto your hands and knees",
      "Cover your head and neck with your arms",
      "Get under a sturdy table or desk if possible",
      "Hold on until the shaking stops",
      "Stay away from windows and glass",
    ],
    stepImages: [
      "/emergency_assets/step1earthquake.png",
      "/emergency_assets/step2earthquake.png",
      "/emergency_assets/step3earthquake.png",
      "/emergency_assets/step4earthquake.png",
      "/emergency_assets/step5earthquake.png"
    ],

    do: [
      "Stay exactly where you are",
      "Protect your head",
      "Count slowly to 10 if you feel scared",
    ],

    dont: [
      "Do not run outside",
      "Do not use elevators",
      "Do not stand near heavy furniture",
    ],

    offlineAvailable: true,
  },

  {
    id: 5,
    type: "lost",
    title: "Getting Lost",
    icon: "📍",
    severity: "medium",
    color: "blue",
    emergencyNumber: "100",

    voiceIntro:
      "If you cannot find your family, do not worry. Follow these steps to get help.",

    calmTip:
      "Stay where you are. Your family is looking for you and will find you.",

    steps: [
      "Freeze! Stay exactly where you are",
      "Look for a safe helper like a police officer or someone in a uniform",
      "Show your emergency ID card if you have one",
      "Wait for a trusted adult to find you",
    ],
    stepImages: [
      "/emergency_assets/step1lost.png",
      "/emergency_assets/step2lost.png",
      "/emergency_assets/step3lost.png",
      "/emergency_assets/step4lost.png"
    ],

    do: [
      "Stay in a bright, visible spot",
      "Keep your hands in your pockets to stay calm",
    ],

    dont: [
      "Do not go looking for your family alone",
      "Do not hide in small or dark places",
    ],

    offlineAvailable: true,
  },

  {
    id: 6,
    type: "anxiety",
    title: "Feeling Overwhelmed",
    icon: "🧘‍♂️",
    severity: "low",
    color: "cyan",
    emergencyNumber: "Help is Here",

    voiceIntro:
      "If things feel too loud or too much, we can help you feel better.",

    calmTip:
      "You are safe. Let's take a moment together to breathe.",

    steps: [
      "Find a quiet corner or a peaceful spot",
      "Close your eyes or look at something you like",
      "Take five deep, slow breaths",
      "Listen to your favorite soft music if you have it",
      "Tell a teacher or adult you need a break",
    ],
    stepImages: [
      "/emergency_assets/step1anxiety.png",
      "/emergency_assets/step2anxiety.png",
      "/emergency_assets/step3anxiety.png",
      "/emergency_assets/step4anxiety.png",
      "/emergency_assets/step5anxiety.png"
    ],

    do: [
      "Use your noise-canceling headphones",
      "Hold a fidget toy or something soft",
    ],

    dont: [
      "Do not try to push through the noise",
      "Do not be afraid to walk away to a quiet place",
    ],

    offlineAvailable: true,
  },
];
