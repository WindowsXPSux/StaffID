const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

let employees = [];

const csvLoader = document.getElementById('csvLoader');
const recordSelector = document.getElementById('recordSelector');
const templateSelector = document.getElementById('templateSelector');
const badgePreview = document.getElementById('badgePreview');
const printBtn = document.getElementById('printBtn');

csvLoader.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const content = fs.readFileSync(file.path, 'utf8');
  employees = parse(content, { columns: true });

  recordSelector.innerHTML = '';
  employees.forEach((record, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.innerText = `${record['Entry Number']} - ${record['Name']}`;
    recordSelector.appendChild(opt);
  });

  updatePreview();
});

recordSelector.addEventListener('change', updatePreview);
templateSelector.addEventListener('change', updatePreview);

function updatePreview() {
  const selected = recordSelector.value;
  const templatePath = templateSelector.value;
  if (!employees[selected]) return;

  let html = fs.readFileSync(templatePath, 'utf8');
  const record = employees[selected];

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
