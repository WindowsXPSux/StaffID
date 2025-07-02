# Badge Printer

This Electron application lets you load staff details from a CSV file and preview ID badges based on HTML templates. Each record can be printed directly from the interface.

## Prerequisites
- Node.js (version 16 or higher recommended)
- npm

## Installation
Clone the repository and install dependencies:

```bash
npm install
```

## Running the App
Start the Electron application with:

```bash
npm start
```

## Folder Structure
- `data/Employee.csv` - Example CSV of employee records
- `templates/` - HTML templates for each badge style
- `photos/` - Place employee photos here
- `output/` - Optional folder if you choose to generate PDF files

## Testing

Run the project's tests with:

```bash
npm test
```

This command prints a message because there are currently no automated tests.
