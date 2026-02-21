// This file contains multiple issues for DiffAgent to detect

function processUserData(userData) {
  // XSS vulnerability - using innerHTML with user input
  document.getElementById('user-name').innerHTML = userData.name;
  
  // SQL Injection vulnerability
  const query = `SELECT * FROM users WHERE email = '${userData.email}'`;
  
  // Hardcoded secret
  const apiKey = 'sk_test_1234567890abcdef1234567890abcdef';
  
  // Unused variable
  const unusedVar = 'this is not used';
  
  // Performance issue - large array operation in render
  const processedData = userData.items.map(item => {
    return {
      id: item.id,
      name: item.name,
      price: item.price || 0
    };
  });
  
  // Missing input validation
  return userData.items.reduce((sum, item) => sum + item.price, 0);
}

// No JSDoc documentation
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}