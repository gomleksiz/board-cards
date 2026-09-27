/*
  BOARD CARDS: THE CARD LIST
  ==========================
  Change the cards in this file.
  Save the file. Then load the web page again.

  Each deck has:
    letter  The letter under the flap on the board.
            (P is for the purple spaces.)
    name    A short name for the deck.
    about   What the cards in the deck do. It shows in "How to play".
    color   The color of the deck.
    cards   The cards in the deck.

  Each card has:
    icon    One emoji picture.
    who     Who the card is for:
              "you"    = only you
              "all"    = all players
              "others" = all the other players
              "pick"   = you pick a player
              "first"  = the player in first place
              "last"   = the player in last place
            You can use a list, for example: ["first", "last"]
    text    What to do. Use \n to start a new line.

  Some words in the text get a color:
    "forward 3 spaces"  green
    "back 3 spaces"     red
    "purple space"      purple
*/

window.DECKS = [
  {
    letter: "A",
    name: "Ahead",
    about: "Move forward",
    color: "#15803d",
    cards: [
      { icon: "🐢", who: "you", text: "Move forward 1 space." },
      { icon: "👟", who: "you", text: "Move forward 2 spaces." },
      { icon: "🚲", who: "you", text: "Move forward 3 spaces." },
      { icon: "🐇", who: "you", text: "Move forward 4 spaces." },
      { icon: "🚀", who: "you", text: "Rocket boost!\nMove forward 5 spaces." },
      { icon: "🌟", who: "you", text: "Super star!\nMove forward 6 spaces." },
      { icon: "💜", who: "you", text: "Move to the next purple space." },
      { icon: "🌈", who: "you", text: "Move forward 3 spaces.\nIf you stop on a purple space, move forward 3 more!" },
      { icon: "🎁", who: "you", text: "Move forward 2 spaces.\nThen roll the dice again and move." },
      { icon: "🧲", who: "you", text: "Move to the space of the player in front of you.\nIf you are in first place, move forward 2 spaces." },
      { icon: "🏃", who: "you", text: "Count the players in front of you.\nMove forward 2 spaces for each one." },
      { icon: "😅", who: "you", text: "Oops, wrong way!\nMove back 1 space." },
    ],
  },
  {
    letter: "B",
    name: "Back",
    about: "Move back",
    color: "#b91c1c",
    cards: [
      { icon: "🐌", who: "you", text: "Move back 1 space." },
      { icon: "🦀", who: "you", text: "Walk like a crab!\nMove back 2 spaces." },
      { icon: "🍌", who: "you", text: "You slip on a banana!\nMove back 3 spaces." },
      { icon: "🎒", who: "you", text: "You forgot your bag!\nMove back 3 spaces." },
      { icon: "🌪️", who: "you", text: "A big wind!\nMove back 4 spaces." },
      { icon: "🕳️", who: "you", text: "Oh no, a hole!\nMove back 5 spaces." },
      { icon: "💜", who: "you", text: "Move back to the purple space behind you." },
      { icon: "🛑", who: "you", text: "Move back 6 spaces.\nIf you come to a purple space, stop there." },
      { icon: "🧲", who: "you", text: "Move back to the space of the player behind you.\nIf you are in last place, stay here." },
      { icon: "😴", who: "you", text: "You fall asleep.\nMiss your next turn." },
      { icon: "🤔", who: "you", text: "Choose one:\nmove back 3 spaces,\nor miss your next turn." },
      { icon: "🍀", who: "you", text: "Lucky you!\nDo not move back.\nMove forward 2 spaces." },
    ],
  },
  {
    letter: "C",
    name: "Change",
    about: "Swap and pick",
    color: "#1d4ed8",
    cards: [
      { icon: "🔄", who: "you", text: "Swap spaces with the player in front of you.\nIf you are in first place, stay here." },
      { icon: "😬", who: "you", text: "Swap spaces with the player behind you.\nIf you are in last place, stay here." },
      { icon: "🐢", who: "you", text: "Swap spaces with the player in last place.\nIf you are in last place, move forward 2 spaces." },
      { icon: "👉", who: "pick", text: "Pick another player.\nSwap spaces with them." },
      { icon: "🧲", who: "pick", text: "Pick another player.\nMove to the same space as them." },
      { icon: "🎁", who: "pick", text: "Pick another player.\nThey move forward 3 spaces." },
      { icon: "🙈", who: "pick", text: "Pick another player.\nThey move back 3 spaces." },
      { icon: "💜", who: "pick", text: "Pick another player.\nThey move back to the purple space behind them." },
      { icon: "🤝", who: "pick", text: "Pick another player.\nYou both move forward 2 spaces." },
      { icon: "🔀", who: ["first", "last"], text: "The players in first place and last place swap spaces!" },
      { icon: "👑", who: "first", text: "The player in first place moves back 3 spaces." },
      { icon: "🙌", who: "last", text: "The player in last place moves forward 3 spaces." },
    ],
  },
  {
    letter: "D",
    name: "Dice",
    about: "Roll the dice",
    color: "#b45309",
    cards: [
      { icon: "🎲", who: "you", text: "Roll the dice again and move." },
      { icon: "🎲", who: "you", text: "Roll the dice.\nMove forward that many spaces." },
      { icon: "🎲", who: "you", text: "Roll the dice.\nMove back that many spaces." },
      { icon: "✌️", who: "you", text: "Roll the dice 2 times.\nMove forward the bigger number." },
      { icon: "🎲", who: "you", text: "Roll the dice.\n1, 2 or 3: move back 2 spaces.\n4, 5 or 6: move forward 4 spaces." },
      { icon: "🎲", who: "you", text: "Roll the dice.\n1 or 2: move back 2 spaces.\n3 or 4: stay here.\n5 or 6: move forward 3 spaces." },
      { icon: "💜", who: "you", text: "Roll the dice.\n5 or 6: move to the next purple space!\n1 to 4: stay here." },
      { icon: "🏆", who: "all", text: "Everyone rolls the dice.\nThe player with the highest number moves forward 3 spaces." },
      { icon: "🐌", who: "all", text: "Everyone rolls the dice.\nThe player with the lowest number moves back 3 spaces." },
      { icon: "🆚", who: "pick", text: "Pick another player.\nYou both roll the dice.\nThe player with the higher number moves forward 3 spaces." },
      { icon: "🎉", who: "all", text: "Roll the dice.\nEveryone moves forward that many spaces." },
      { icon: "😴", who: "you", text: "No dice for you!\nMiss your next turn." },
    ],
  },
  {
    letter: "E",
    name: "Everyone",
    about: "All players",
    color: "#be185d",
    cards: [
      { icon: "🐢", who: "all", text: "Everyone moves forward 1 space." },
      { icon: "🎉", who: "all", text: "Party time!\nEveryone moves forward 2 spaces." },
      { icon: "🎈", who: "all", text: "Everyone moves forward 3 spaces!" },
      { icon: "🌊", who: "all", text: "Big wave!\nEveryone moves back 2 spaces." },
      { icon: "💜", who: "all", text: "Everyone moves to the next purple space!" },
      { icon: "💜", who: "all", text: "Everyone moves back to the purple space behind them." },
      { icon: "🛡️", who: "all", text: "Everyone moves back 3 spaces.\nPlayers on a purple space are safe." },
      { icon: "✨", who: "all", text: "Players on a purple space move forward 3 spaces." },
      { icon: "🌬️", who: "others", text: "Everyone else moves back 2 spaces." },
      { icon: "🏃", who: "others", text: "Everyone else moves forward 2 spaces.\nYou stay here." },
      { icon: "🔔", who: "others", text: "Everyone behind you moves forward 2 spaces." },
      { icon: "🙃", who: "all", text: "Everyone else moves back 1 space.\nYou move forward 1 space." },
    ],
  },
  {
    // Take a card from this deck when you stop on a purple space.
    // Purple is magic: most of these cards help you.
    letter: "P",
    name: "Purple",
    about: "For purple spaces",
    color: "#7e22ce",
    cards: [
      { icon: "✨", who: "you", text: "Magic!\nMove forward 3 spaces." },
      { icon: "🦋", who: "you", text: "Butterfly wings!\nMove forward 5 spaces." },
      { icon: "💜", who: "you", text: "Move to the next purple space." },
      { icon: "🎲", who: "you", text: "Roll the dice again and move." },
      { icon: "🔮", who: "you", text: "Roll the dice.\nMove forward that many spaces." },
      { icon: "🌟", who: "you", text: "Move forward 2 spaces.\nThen roll the dice again and move." },
      { icon: "🎩", who: "pick", text: "Pick another player.\nThey move back 2 spaces." },
      { icon: "🔄", who: "pick", text: "Pick another player.\nSwap spaces with them." },
      { icon: "🍭", who: "all", text: "Everyone else moves forward 1 space.\nYou move forward 3 spaces." },
      { icon: "💜", who: "all", text: "Players on a purple space move forward 2 spaces." },
      { icon: "😴", who: "you", text: "Magic sleep!\nMiss your next turn." },
      { icon: "🌀", who: "you", text: "Oops, magic wind!\nMove back 2 spaces." },
    ],
  },
];
