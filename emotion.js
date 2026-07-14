const emotions = {
    happy: [
        "happy",
        "excited",
        "yay",
        "hehe",
        "lol",
        "hahaha",
        "promotion",
        "party",
        "celebrate",
        "best",
        "great",
        "awesome",
        "finally"
    ],

    sad: [
        "sad",
        "cry",
        "miss",
        "alone",
        "hurt",
        "upset",
        "bad",
        "depressed",
        "broken",
        "not good",
        "lonely"
    ],

    angry: [
        "angry",
        "hate",
        "annoying",
        "irritated",
        "leave me",
        "don't talk",
        "ghussa",
        "fight"
    ],

    stressed: [
        "exam",
        "interview",
        "deadline",
        "stress",
        "pressure",
        "tired",
        "busy",
        "assignment",
        "coding"
    ],

    romantic: [
        "love",
        "kiss",
        "hug",
        "miss you",
        "jaan",
        "baby",
        "date",
        "movie"
    ]
};

export function detectEmotion(message) {

    const text = message.toLowerCase();

    for (const emotion in emotions) {

        for (const word of emotions[emotion]) {

            if (text.includes(word)) {

                return emotion;

            }

        }

    }

    return "normal";

}