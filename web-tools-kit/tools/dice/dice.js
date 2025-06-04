function rollDice() {
  // 🎲 Unicode dice emojis 1 to 6
  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  
  // Random index 0 to 5
  const randomIndex = Math.floor(Math.random() * 6);
  
  // Set emoji
  document.getElementById("dice").textContent = diceFaces[randomIndex];
}
