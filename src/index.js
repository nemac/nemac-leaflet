import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

function helloNpm() {
  return "hello NPM"
}

module.exports = helloNpm;
