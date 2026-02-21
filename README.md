# DiffAgent Demo Repository

This repository demonstrates the capabilities of DiffAgent with smart recommendations.

## Features

- ✅ **Multi-language support**: JavaScript, Python, Java, Go
- ✅ **Smart classification**: Bug fixes, features, refactoring detection
- ✅ **Intelligent recommendations**: Security, performance, code quality, test coverage
- ✅ **GitHub Actions integration**: Automatic PR analysis and commenting
- ✅ **Configurable options**: Risk thresholds, recommendation types, failure conditions

## Getting Started

1. Fork this repository
2. Create a pull request with code changes
3. Watch DiffAgent automatically analyze your changes and provide recommendations
4. Use the recommendations to improve your code quality

## Example Changes

Try making these types of changes to see different recommendations:

- **Bug Fix**: Add null checks, boundary condition handling
- **Feature**: Add new functions or methods  
- **Security**: Add input validation, remove hardcoded secrets
- **Performance**: Optimize algorithms, add caching
- **Code Quality**: Fix ESLint/PEP8 violations
- **Test Coverage**: Add missing test files

## Configuration

The GitHub Actions workflow is configured in `.github/workflows/diffagent-analysis.yml`.

You can customize the behavior by modifying the action inputs:

```yaml
- name: Run DiffAgent Analysis
  uses: huige-org/diffagent@feature/smart-recommendations
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    risk-threshold: 0.7
    fail-on-high-risk: true
    include-recommendations: true
```

## License

MIT License