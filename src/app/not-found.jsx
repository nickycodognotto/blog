// pages/404.js
import React from 'react';
import Link from 'next/link';
import ErrorComponent from './components/errorComponent/ErrorComponent';

export default function NotFound() {
  return (
    <div>
      <ErrorComponent />
    </div>
  );
}

