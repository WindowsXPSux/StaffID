const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

let employees = [];

const recordList = document.getElementById('recordList');
const templateSelector = document.getElementById('templateSelector');
const badgePreview = document.getElementById('badgePreview');
const printBtn = document.getElementById('printBtn');

let currentIndex = 0;
templateSelector.addEventListener('change', () => updatePreview(currentIndex));

function updatePreview(index) {
  currentIndex = index;
  const templatePath = templateSelector.value;
  if (!employees[index]) return;

  let html = fs.readFileSync(templatePath, 'utf8');
  const record = employees[index];

  Object.keys(record).forEach((field) => {
    const regex = new RegExp(`{{${field}}}`, 'g');
    html = html.replace(regex, record[field]);
  });

  html = html.replace(/{{Photo}}/g, `<img src="photos/${record['Photo']}" style="height:120px">`);

  badgePreview.innerHTML = html;
}

printBtn.addEventListener('click', () => {
  window.print();
});

// Automatically load the default employee CSV on launch
const defaultCsvPath = path.join(__dirname, 'data', 'Employee.csv');
const content = fs.readFileSync(defaultCsvPath, 'utf8');

const raw = parse(content, { columns: true });
employees = raw.map((record) => {
  const cleaned = {};
  for (const key in record) {
    const cleanKey = key.trim().replace(/^\"|\"$/g, '');
    cleaned[cleanKey] = record[key];
  }
  return cleaned;
});

recordList.innerHTML = '';
employees.forEach((record, idx) => {
  const btn = document.createElement('button');
  btn.innerText = record['Name'] || `Record ${idx + 1}`;
  btn.onclick = () => updatePreview(idx);
  recordList.appendChild(btn);
});

if (employees.length > 0) {
  updatePreview(0);
}
