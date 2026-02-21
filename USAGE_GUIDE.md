# DiffAgent 演示仓库使用指南

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/huige-org/diffagent-demo.git
cd diffagent-demo
```

### 2. 安装依赖
```bash
npm install
```

### 3. 运行本地测试
```bash
node demo-test.js
```

## 🎯 GitHub Actions 集成

### 1. 在你的仓库中添加工作流
创建 `.github/workflows/diffagent-analysis.yml`:

```yaml
name: DiffAgent Code Analysis
on: [pull_request]

jobs:
  diffagent:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run DiffAgent Analysis
        uses: huige-org/diffagent@feature/smart-recommendations
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          risk-threshold: 0.7
          fail-on-high-risk: true
          include-recommendations: true
```

### 2. 提交 PR 查看效果
当你提交 Pull Request 时，DiffAgent 会自动分析代码变更并生成详细的评论。

## 📊 预期输出

### PR 评论包含：
- **摘要**: 文件数量、风险等级、主要变更类型
- **智能推荐**: 按优先级排序的具体建议
  - 🔴 **高优先级**: 安全问题、测试缺失、bug 相关
  - 🟡 **中优先级**: 性能优化、文档建议  
  - 🟢 **低优先级**: 代码风格、最佳实践

## 🔧 配置选项

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `github-token` | 必需 | GitHub API 访问令牌 |
| `risk-threshold` | `0.7` | 高风险阈值 (0.0-1.0) |
| `fail-on-high-risk` | `true` | 高风险时是否失败工作流 |
| `include-recommendations` | `true` | 是否包含智能推荐 |
| `recommendation-types` | `all` | 指定推荐类型 |

## 🧪 本地开发

### 测试不同的代码变更
修改 `pr-diff.txt` 文件来测试不同的场景：

- **安全漏洞**: 添加硬编码密码
- **性能问题**: 添加 N+1 查询
- **代码质量**: 添加未使用的变量
- **测试覆盖**: 添加新功能但不添加测试

### 自定义配置
修改 `demo-test.js` 中的配置来测试不同的选项：

```javascript
const config = {
  riskThreshold: 0.5,
  includeSecurityRecommendations: true,
  includePerformanceRecommendations: true,
  includeCodeQualityRecommendations: true,
  includeTestCoverageRecommendations: true
};
```

## 🚀 高级用法

### 团队配置
创建团队特定的配置文件 `diffagent.config.js`:

```javascript
module.exports = {
  riskThreshold: 0.6,
  recommendationTypes: ['security', 'test'],
  customRules: {
    // 自定义安全规则
    security: {
      hardcodedSecrets: /password\s*[:=]\s*['"][^'"]{8,}['"]/,
    }
  }
};
```

### 集成到现有工作流
将 DiffAgent 集成到现有的 CI/CD 工作流中：

```yaml
- name: Run Tests
  run: npm test

- name: Run DiffAgent Analysis  
  uses: huige-org/diffagent@feature/smart-recommendations
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}

- name: Deploy if approved
  if: success()
  run: ./deploy.sh
```

## 💡 最佳实践

1. **从宽松配置开始**: 初始设置较低的风险阈值
2. **逐步收紧**: 根据团队反馈调整配置
3. **自定义规则**: 添加团队特定的代码规范
4. **定期回顾**: 定期检查推荐质量并优化

## 📞 支持

如果遇到问题或需要帮助，请查看 [DiffAgent 文档](https://github.com/huige-org/diffagent) 或提交 Issue。