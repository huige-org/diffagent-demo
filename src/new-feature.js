// New feature with potential issues for DiffAgent to detect
function processData(data) {
  // Security issue: hardcoded credentials
  const apiKey = "sk-1234567890abcdef1234567890abcdef";
  
  // Performance issue: N+1 query pattern
  const results = data.map(item => {
    return fetchUserDetails(item.userId).then(user => {
      return { ...item, user };
    });
  });
  
  // Code quality issue: unused variable
  const unusedVar = "this is not used";
  
  // Bug fix: add null check
  if (!data || data.length === 0) {
    return [];
  }
  
  return Promise.all(results);
}

function fetchUserDetails(userId) {
  // Simulate API call
  return Promise.resolve({ id: userId, name: "User " + userId });
}