// Function to generate a random wallet address
function generateRandomWalletAddress() {
  const characters = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += characters[Math.floor(Math.random() * characters.length)];
  }
  return address;
}

// Check if wallet addresses exist in localStorage
let walletAddresses = localStorage.getItem('walletAddresses');
if (walletAddresses) {
  walletAddresses = JSON.parse(walletAddresses);
} else {
  walletAddresses = {};
  // Generate random wallet addresses for demonstration purposes
  walletAddresses["@User1"] = generateRandomWalletAddress();
  walletAddresses["@User2"] = generateRandomWalletAddress();
  walletAddresses["@User3"] = generateRandomWalletAddress();
}

// Function to prompt user for names and wallet addresses
function promptForWalletAddresses() {
  const input = prompt("Enter names and wallet addresses in the format 'Name, Wallet address' separated by a semicolon. Press Enter without any input to skip.");
  if (input) {
    const entries = input.split(";");
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i].trim();
      if (entry !== "") {
        const [name, address] = entry.split(",").map(item => item.trim());
        walletAddresses[name.trim()] = address;
      }
    }
  }
  // Save wallet addresses to localStorage
  localStorage.setItem('walletAddresses', JSON.stringify(walletAddresses));
}

// Function to replace names with wallet addresses
function replaceNamesWithWallets(namesList) {
  const entries = namesList.split(";");
  let result = "";

  // Iterate through the entries and replace with wallet addresses
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i].trim();
    const [name, amountExpr] = entry.split(",").map(item => item.trim());
    const wallet = walletAddresses[name.trim()] || walletAddresses[`@${name.trim()}`];

    if (wallet) {
      let amount;
      try {
        amount = eval(amountExpr);
      } catch (error) {
        amount = NaN;
      }

      result += `${wallet}, ${amount}\n`;
    } else {
      const formattedName = name.startsWith('@') ? name.slice(1) : name;
      result += `${formattedName}, Wallet not found\n`;
    }
  }

  return result;
}

// Prompt user for input
promptForWalletAddresses();

const namesList = prompt("Enter names and amounts in the format 'Name, Amount' separated by a semicolon:");

// Call the function with user input
const result = replaceNamesWithWallets(namesList);
console.log(result);
