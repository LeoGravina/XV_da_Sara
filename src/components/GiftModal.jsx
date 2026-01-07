import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift, FaCheckCircle, FaTimes } from 'react-icons/fa';

export default function GiftModal({ isOpen, onClose, onConfirm, giftName }) {
  const [nomeDoador, setNomeDoador] = useState('');
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!nomeDoador.trim()) return alert("Por favor, digite seu nome! 😊");
    onConfirm(nomeDoador); setNomeDoador('');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      padding: '15px', // Padding seguro
      backdropFilter: 'blur(5px)'
    }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        style={{
          backgroundColor: '#FFFAF0', borderRadius: '20px', 
          width: '100%', maxWidth: '380px', 
          maxHeight: '90vh', overflowY: 'auto', // Scroll se precisar
          position: 'relative', border: '2px solid #D4AF37', 
          boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)', padding: '25px'
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'transparent', 
          border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#5A3E36', opacity: 0.7
        }}><FaTimes /></button>

        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <FaGift size={35} color="#D4AF37" />
          </div>
        </div>
        <h3 style={{ textAlign: 'center', color: '#5A3E36', fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', margin: '0 0 5px 0' }}>Bela Escolha!</h3>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>Você selecionou: <strong style={{ color: '#4A6fa5' }}>{giftName}</strong></p>

        <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#D4AF37', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>QUEM ESTÁ PRESENTEANDO?</label>
            <input 
              type="text" placeholder="Seu nome..." value={nomeDoador} onChange={(e) => setNomeDoador(e.target.value)}
              style={{
                  width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e0d0b0', 
                  backgroundColor: 'white', fontSize: '1rem', color: '#5A3E36', outline: 'none', boxSizing: 'border-box'
              }}
            />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '10px' }}>
          <button onClick={onClose} style={{
              padding: '12px', borderRadius: '50px', border: '1px solid #D4AF37', background: 'transparent', 
              color: '#D4AF37', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem'
            }}>Cancelar</button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleConfirm} style={{
              padding: '12px', borderRadius: '50px', border: 'none', background: 'linear-gradient(45deg, #D4AF37, #F4C430)',
              color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}><FaCheckCircle /> Confirmar</motion.button>
        </div>
      </motion.div>
    </div>
  );
}