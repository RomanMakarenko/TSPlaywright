
  reporter: [
    ['list'],                           // Detailed console output
    ['line'],                           // One-line progress output
    ['dot'],                            // Minimal console output
    ['html', { open: 'always', outputFolder: 'my-reports' }],        // HTML Report
    ['json', { outputFile: 'my-reports/results.json' }], // JSON Report
    ['junit', { outputFile: 'my-reports/results.xml' }]  // JUnit XML Report
    ['./tests/CustomReporter.ts', { customOption: 'some value' }], // Custom reporter
    ['allure-playwright', { outputFolder: 'allure-results' }]  // Allure Report
  ],