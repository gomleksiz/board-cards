# Board Cards

A web page for our board game.
Tap a letter. You get a random card.

## How to play

1. Roll the dice. Move your piece.
2. If you stop on a flap, lift the flap. Look at the letter.
3. Open the web page. Tap the same letter.
4. Do what the card tells you.

## The letters

| Letter | Name     | The cards      |
| ------ | -------- | -------------- |
| A      | Ahead    | Move forward   |
| B      | Back     | Move back      |
| C      | Change   | Swap and pick  |
| D      | Dice     | Roll the dice  |
| E      | Everyone | All players    |

Each letter has 12 cards.
The page shows all 12 cards of a letter before a card comes back.

## Purple spaces

Purple spaces are magic spaces. Many cards use them.

- **Next purple space** = the first purple space in front of you.
- **Purple space behind you** = the first purple space behind you.

## Good to know

- You cannot move back past space 1.
- If a card moves you to a letter space, do not take a new card.
- If you cannot do what the card says, stay where you are.

## Page features

- **Read**: the page reads the card out loud.
- **Read cards out loud**: turn this on. The page reads every new card.
- **Last card**: tap it to see the last card again.
- **Keys A to E**: on a computer, press a letter key to take a card.

## Put the page on GitHub Pages

1. Merge this branch into `main`.
2. On GitHub, open the repository.
3. Click **Settings**. Then click **Pages**.
4. For **Source**, select **Deploy from a branch**.
5. For **Branch**, select `main` and `/ (root)`.
6. Click **Save**.
7. Wait 1 or 2 minutes. The page is at:
   <https://gomleksiz.github.io/board-cards/>

## Change the cards

1. Open the file `cards.js`.
2. Change the text of a card, or add a new card.
3. Save the file. Load the page again.

A card looks like this:

```js
{ icon: "🚀", who: "you", text: "Rocket boost!\nMove forward 5 spaces." },
```

- `icon` is one emoji picture.
- `who` is who the card is for: `"you"`, `"all"`, `"others"`, `"pick"`, `"first"` or `"last"`.
- `text` is what to do. `\n` starts a new line.

## Files

- `index.html`: the page
- `cards.js`: the cards (change them here)
- `app.js`: the logic
- `style.css`: the colors and the layout

## Test on your computer

Open `index.html` in a web browser. You do not need a server.
