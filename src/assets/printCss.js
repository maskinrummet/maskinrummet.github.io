export const printBoWCss = `
body {
  font-family: Inter var, sans-serif !important;
}

#guide {
  display: block;
}

.page {
  width: 190mm;
  height: 277mm;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1cm;
  justify-content: center;
  page-break-after: avoid;
}

.page table {
  margin: 0;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

.page td {
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ccc;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
}

.page:before,
.pivot::after,
.pivot::before {
  position: absolute;
  font-size: 3mm;
}

.pivot td {
  border: none;
  border-top: 1mm dashed orange;
  border-right: 1mm dashed yellow;
}

.pivot {
  border-bottom: 1mm dashed purple;
  border-left: 1mm dashed indigo;
}

.page::before {
  transform: translateY(137.5mm);
  width: 188mm;
  height: 0;
  border-top: 1mm dotted red;
  color: red;
  content: "(1)";
}

.pivot::before {
  transform: translateY(-5mm);
  width: 94mm;
  height: 0;
  border-top: 1mm dotted green;
  color: green;
  content: "(3)";
}

.pivot::after {
  width: 0;
  height: 137.5mm;
  border-left: 1mm dotted blue;
  transform: translateX(94mm) translateY(-137.5mm);
  color: blue;
  content: "(2)";
}
`;
