// This file contains various issues for DiffAgent to detect

function processData(data) {
  // XSS vulnerability - using innerHTML with user input
  document.getElementById('output').innerHTML = data.userInput;
  
  // SQL Injection vulnerability
  const query = `SELECT * FROM users WHERE id = '${data.userId}'`;
  
  // Hardcoded secret
  const apiKey = 'sk_test_1234567890abcdef';
  
  // Unused variable
  const unusedVar = 'this is not used';
  
  // Large array operation in render path
  const processedData = data.items.map(item => {
    return item.value * 2;
  });
  
  return processedData;
}

// No JSDoc comments
function calculateTotal(items) {
  if (!items || items.length === 0) {
    return 0;
  }
  return items.reduce((sum, item) => sum + (item.price || 0), 0);
}