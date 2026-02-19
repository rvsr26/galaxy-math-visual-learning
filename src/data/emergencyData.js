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
];
