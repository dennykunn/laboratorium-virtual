/**
 * ============================================================================
 * QUIZ-SCREEN.JSX - HALAMAN QUIZ
 * ============================================================================
 * 
 * Halaman quiz berisi 5 soal pilihan ganda tentang magnet.
 * 
 * Fitur:
 * - Soal hanya bisa lanjut jika jawaban BENAR
 * - Jika salah, siswa harus mencoba lagi
 * - Setiap jawaban benar mendapat 20 poin
 * - Total skor maksimal: 100
 * - Setelah semua soal selesai, pindah ke halaman skor
 * 
 * ============================================================================
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'
import ProfileModal from './modals/ProfileModal'
import SettingsModal from './modals/SettingsModal'
import './QuizScreen.css'

function QuizScreen() {
  // Ambil fungsi dari Context
  const { navigateTo, setQuizScore, playSound } = useApp()
  
  // ==========================================================================
  // STATE
  // ==========================================================================
  
  /**
   * currentQuestion - Index soal yang sedang ditampilkan (0-4)
   */
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  /**
   * score - Skor sementara selama mengerjakan quiz
   */
  const [score, setScore] = useState(0)
  
  /**
   * showResult - Menampilkan feedback (benar/salah)
   * Nilai: null, 'correct', atau 'wrong'
   */
  const [showResult, setShowResult] = useState(null)
  
  /**
   * answered - Menandai apakah soal sudah dijawab
   * Untuk mencegah klik ganda
   */
  const [answered, setAnswered] = useState(false)
  
  // State untuk modal
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  /**
   * questions - Array berisi semua soal quiz
   * 
   * Struktur setiap soal:
   * - question: teks pertanyaan
   * - options: array pilihan jawaban
   *   - label: huruf (A, B, C, D)
   *   - text: teks jawaban
   *   - correct: true jika ini jawaban benar
   */
  const questions = [
    {
      question: 'Sebutkan salah satu benda yang dapat ditarik oleh magnet....',
      options: [
        { label: 'A', text: 'Penggaris Besi dan Paku', correct: true },
        { label: 'B', text: 'Pensil dan Kertas', correct: false },
        { label: 'C', text: 'Botol Plastik dan Penghapus', correct: false },
        { label: 'D', text: 'Kertas dan Botol Plastik', correct: false },
      ]
    },
    {
      question: 'Sebutkan salah satu benda yang tidak dapat ditarik oleh magnet....',
      options: [
        { label: 'A', text: 'Penggaris Besi dan Magnet', correct: false },
        { label: 'B', text: 'Paku dan Penghapus', correct: false },
        { label: 'C', text: 'Paku dan Penggaris Besi', correct: false },
        { label: 'D', text: 'Pensil dan Botol Plastik', correct: true },
      ]
    },
    {
      question: 'Benda yang dapat ditarik magnet terbuat dari bahan....',
      options: [
        { label: 'A', text: 'Plastik', correct: false },
        { label: 'B', text: 'Kayu', correct: false },
        { label: 'C', text: 'Besi/Logam', correct: true },
        { label: 'D', text: 'Karet', correct: false },
      ]
    },
    {
      question: 'Gaya tarik magnet terhadap benda disebut....',
      options: [
        { label: 'A', text: 'Gaya Gesek', correct: false },
        { label: 'B', text: 'Gaya Magnet', correct: true },
        { label: 'C', text: 'Gaya Gravitasi', correct: false },
        { label: 'D', text: 'Gaya Dorong', correct: false },
      ]
    },
    {
      question: 'Pada praktikum tersebut, kita bisa menyimpulkan bahwa....',
      options: [
        { label: 'A', text: 'Macam-Macam Gaya', correct: false },
        { label: 'B', text: 'Benda yang bisa ditarik dan tidak bisa ditarik', correct: true },
        { label: 'C', text: 'Jenis-Jenis Magnet', correct: false },
        { label: 'D', text: 'Benda mati dan benda hidup', correct: false },
      ]
    },
  ]

  /**
   * handleAnswer - Menangani saat user memilih jawaban
   * @param {object} option - Objek jawaban yang dipilih
   */
  const handleAnswer = (option) => {
    // Cegah klik ganda jika sudah dijawab
    if (answered) return

    playSound('click')
    setAnswered(true)
    
    // Cek apakah jawaban benar
    const isCorrect = option.correct

    if (isCorrect) {
      // Jawaban BENAR
      setScore(score + 20)       // Tambah skor
      setShowResult('correct')   // Tampilkan feedback benar
      playSound('success')       // Mainkan suara sukses
    } else {
      // Jawaban SALAH
      setShowResult('wrong')     // Tampilkan feedback salah
      playSound('error')         // Mainkan suara error
    }

    // Setelah 1.5 detik, lanjutkan
    setTimeout(() => {
      setShowResult(null)   // Sembunyikan feedback
      setAnswered(false)    // Reset status answered

      if (currentQuestion < questions.length - 1) {
        // Masih ada soal berikutnya
        if (isCorrect) {
          setCurrentQuestion(currentQuestion + 1)  // Pindah ke soal berikutnya
        }
        // Jika salah, tetap di soal yang sama (harus coba lagi)
      } else {
        // Ini soal terakhir
        if (isCorrect) {
          setQuizScore(score + 20)  // Simpan skor ke context
          navigateTo('score')       // Pindah ke halaman skor
        }
        // Jika salah di soal terakhir, tetap harus jawab benar
      }
    }, 1500)
  }

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen quiz-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background - Gambar lab */}
      <div className="quiz-background">
        <img src="/assets/latar-slide/5.jpg" alt="Lab Background" className="quiz-bg-image" />
      </div>

      {/* Tombol kembali ke menu praktikum */}
      <div className="quiz-header-left">
        <motion.img 
          src="/assets/elemen/Balik Menu Utama.png" 
          alt="Menu"
          className="btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('praktikum-menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Header Icons */}
      <div className="header-icons">
        <motion.img 
          src="/assets/elemen/Informasi.png" 
          alt="Info"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowProfile(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        <motion.img 
          src="/assets/elemen/Pengaturan.png" 
          alt="Pengaturan"
          className="btn-icon"
          onClick={() => handleButtonClick(() => setShowSettings(true))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Board Quiz */}
      <motion.div 
        className="quiz-board-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="quiz-board">
          <h2 className="quiz-title">QUIZ TIME!</h2>
          
          {/* Konten soal dengan animasi pergantian */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}  // Key berubah = animasi ulang
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Teks pertanyaan */}
              <p className="quiz-question">
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </p>

              {/* Grid pilihan jawaban */}
              <div className="quiz-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    className={`quiz-option ${answered && option.correct ? 'correct' : ''} ${answered && !option.correct ? 'disabled' : ''}`}
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: answered ? 1 : 1.02 }}
                    whileTap={{ scale: answered ? 1 : 0.98 }}
                  >
                    {/* Lingkaran huruf (A, B, C, D) */}
                    <span className={`option-letter ${option.label.toLowerCase()}`}>
                      {option.label}
                    </span>
                    {/* Teks jawaban */}
                    <span className="option-text">{option.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar dan skor */}
          <div className="quiz-progress">
            <span>Pertanyaan {currentQuestion + 1} dari {questions.length}</span>
            <span>Skor: {score}</span>
          </div>
        </div>
      </motion.div>

      {/* Overlay Hasil (Benar/Salah) */}
      <AnimatePresence>
        {showResult && (
          <motion.div 
            className="quiz-result-overlay"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <img 
              src={showResult === 'correct' ? '/assets/elemen/Benar.png' : '/assets/elemen/Salah.png'} 
              alt={showResult}
              className="quiz-result-icon"
            />
            <p className="quiz-result-text">
              {showResult === 'correct' ? 'Benar!' : 'Salah! Coba lagi'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showProfile && <ProfileModal onClose={() => { playSound('click'); setShowProfile(false) }} />}
        {showSettings && <SettingsModal onClose={() => { playSound('click'); setShowSettings(false) }} />}
      </AnimatePresence>
    </motion.div>
  )
}

export default QuizScreen
