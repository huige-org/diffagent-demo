#!/usr/bin/env node

const fs = require('fs');
const DiffAgent = require('../diffagent/src/diffAgent');

console.log('🚀 Starting PR Simulation Test');
console.log('================================');

// Read the test PR diff
const prDiff = fs.readFileSync('./test-pr-diff.txt', 'utf8');

// Initialize DiffAgent
const agent = new DiffAgent({
  // Configuration for PR analysis
  riskThreshold: 0.7,
  includeRecommendations: true,
  recommendationTypes: ['security', 'performance', 'quality', 'test']
});

// Analyze the PR
console.log('🔍 Analyzing PR changes...');
const startTime = Date.now();
const analysis = agent.analyze(prDiff);
const endTime = Date.now();

console.log(`✅ Analysis completed in ${endTime - startTime}ms\n`);

// Generate PR comment
console.log('📝 Generating PR Comment...');
console.log('## 🤖 DiffAgent Code Analysis\n');

if (analysis.success) {
  console.log(`**Pull Request**: #123 - feat: Add actual test file for GitHub Actions\n`);
  
  // Summary
  console.log('### 📊 Summary');
  console.log(`- **Files Changed**: ${analysis.summary.totalFiles || analysis.files.length}`);
  console.log(`- **Risk Level**: ${analysis.summary.riskLevel || 'low'}`);
  console.log(`- **Primary Change Type**: ${analysis.summary.primaryChangeType || 'other'}\n`);
  
  // Recommendations
  if (analysis.recommendations && analysis.recommendations.length > 0) {
    console.log(`### 💡 Recommendations (${analysis.recommendations.length})\n`);
    
    // Group by severity
    const highPriority = analysis.recommendations.filter(r => r.severity === 'high');
    const mediumPriority = analysis.recommendations.filter(r => r.severity === 'medium');
    const lowPriority = analysis.recommendations.filter(r => r.severity === 'low');
    
    if (highPriority.length > 0) {
      console.log('#### 🔴 High Priority (' + highPriority.length + ')\n');
      highPriority.forEach((rec, index) => {
        console.log(`${index + 1}. **${rec.message}**`);
        console.log(`   - ${rec.suggestion}`);
        if (rec.file) console.log(`   - File: \`${rec.file}\``);
        console.log('');
      });
    }
    
    if (mediumPriority.length > 0) {
      console.log('#### 🟡 Medium Priority (' + mediumPriority.length + ')\n');
      mediumPriority.forEach((rec, index) => {
        console.log(`${index + 1}. **${rec.message}**`);
        console.log(`   - ${rec.suggestion}`);
        if (rec.file) console.log(`   - File: \`${rec.file}\``);
        console.log('');
      });
    }
    
    if (lowPriority.length > 0) {
      console.log('#### 🟢 Low Priority (' + lowPriority.length + ')\n');
      lowPriority.forEach((rec, index) => {
        console.log(`${index + 1}. **${rec.message}**`);
        console.log(`   - ${rec.suggestion}`);
        if (rec.file) console.log(`   - File: \`${rec.file}\``);
        console.log('');
      });
    }
  } else {
    console.log('✅ No issues detected. Code looks good!\n');
  }
  
  // Risk assessment
  const riskScore = analysis.riskScore?.riskScore || 0;
  if (riskScore > 0.7) {
    console.log('🚨 **High Risk Detected**: This PR contains high-risk changes that require careful review.\n');
  } else if (riskScore > 0.4) {
    console.log('⚠️ **Medium Risk**: Consider additional testing for these changes.\n');
  } else {
    console.log('✅ **Low Risk**: Changes appear safe to merge.\n');
  }
  
} else {
  console.log('❌ Analysis failed:', analysis.error);
}

console.log('🎉 PR Simulation Test Completed!');