import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FaTimes, FaGlassCheers, FaCheckCircle } from 'react-icons/fa';

export default function RsvpModal({ onClose }) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert("Por favor, digite seu nome!");
    setLoading(true);
    try {
      await addDoc(collection(db, "confirmados_15anos"), { nome: nome, data_confirmacao: new Date().toISOString() });
      setSucesso(true);
      setTimeout(() => { onClose(); }, 2500);
    } catch (error) { console.error("Erro:", error); alert("Erro ao confirmar."); }
    setLoading(false);
  };

  return (
    // USANDO AS CLASSES DO CSS
    <div className="modal-overlay">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-box" // CLASSE NOVA AQUI
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'transparent', 
          border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#5A3E36', zIndex: 10
        }}><FaTimes /></button>

        {sucesso ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#5A3E36' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '3rem', color: '#D4AF37', marginBottom: '15px', display:'inline-block' }}><FaCheckCircle /></motion.div>
            <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem' }}>Confirmado!</h2>
            <p>Nos vemos na festa! ✨</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <FaGlassCheers size={30} color="#D4AF37" />
              </div>
            </div>
            
            <h3 style={{ textAlign: 'center', color: '#5A3E36', fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', margin: '0 0 10px 0' }}>Você vem?</h3>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#D4AF37', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>SEU NOME COMPLETO</label>
                <input 
                  type="text" placeholder="Ex: Sara Gravina Bard" value={nome} onChange={(e) => setNome(e.target.value)}
                  style={{
                      width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e0d0b0', 
                      backgroundColor: 'white', fontSize: '1rem', color: '#5A3E36', outline: 'none'
                  }}
                />
            </div>
            <motion.button whileTap={{ scale: 0.95 }} disabled={loading} style={{
                width: '100%', padding: '12px', borderRadius: '50px', border: 'none',
                background: 'linear-gradient(45deg, #D4AF37, #F4C430)', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
                marginTop: '10px'
            }}>
              {loading ? 'Enviando...' : 'Confirmar Presença'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}