'use client'
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export function ToastifyProvider({ children }: { children: React.ReactNode }){
    return (
      <div>
        {children}
        <ToastContainer />
      </div>
    );
}