/**
 * ============================================================================
 * MAIN.JSX - ENTRY POINT APLIKASI
 * ============================================================================
 * 
 * File ini adalah titik masuk (entry point) aplikasi React.
 * 
 * Cara kerja:
 * 1. Import React dan ReactDOM
 * 2. Import komponen App (komponen utama)
 * 3. Import file CSS global
 * 4. Render komponen App ke dalam elemen HTML dengan id 'root'
 * 
 * File index.html memiliki elemen <div id="root"></div>
 * yang menjadi wadah untuk seluruh aplikasi React.
 * 
 * ============================================================================
 */

// StrictMode adalah wrapper yang membantu mendeteksi masalah potensial
// dalam aplikasi selama development (tidak berpengaruh di production)
import { StrictMode } from 'react'

// createRoot adalah API React 18 untuk merender aplikasi
import { createRoot } from 'react-dom/client'

// Import file CSS global untuk styling dasar seluruh aplikasi
import './index.css'

// Import komponen App sebagai komponen utama aplikasi
import App from './App.jsx'

/**
 * createRoot(document.getElementById('root'))
 * - Mencari elemen HTML dengan id 'root'
 * - Membuat root React pada elemen tersebut
 * 
 * .render(<StrictMode><App /></StrictMode>)
 * - Merender komponen App ke dalam root
 * - StrictMode membungkus App untuk pengecekan tambahan
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
