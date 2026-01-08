import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { FaGift, FaCheck } from 'react-icons/fa';
import GiftModal from './GiftModal';

export default function GiftList() {
  const [presentes, setPresentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "lista_presentes"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      lista.sort((a, b) => (a.reservado === b.reservado) ? a.nome.localeCompare(b.nome) : a.reservado ? 1 : -1);
      setPresentes(lista);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleItemClick = (item) => {
    if (item.reservado) return;
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmGift = async (nomeDoDoador) => {
    if (!selectedItem) return;
    try {
      const itemRef = doc(db, "lista_presentes", selectedItem.id);
      await updateDoc(itemRef, { 
        reservado: true,
        reservadoPor: nomeDoDoador,
        dataReserva: new Date().toISOString()
      });
      setModalOpen(false); 
      alert(`Obrigado, ${nomeDoDoador}! 🎁`);
    } catch (error) {
      console.error("Erro", error);
      alert("Erro ao reservar.");
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: 20}}>Carregando...</div>;

  return (
    <>
      {/* MUDANÇA CRUCIAL AQUI: 
          Removemos o height fixo e usamos flex-grow: 1 com min-height: 0.
          Isso força o scroll a aparecer DENTRO deste container. */}
      <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          overflowY: 'auto', // O scroll acontece AQUI
          paddingRight: '5px' // Espaço para não cobrir o scroll
      }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '10px' }}>
            {presentes.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: item.reservado ? '#f5f5f5' : 'white',
                  borderRadius: '12px',
                  border: item.reservado ? '1px solid #eee' : '1px solid #A6D0F3',
                  cursor: item.reservado ? 'default' : 'pointer',
                  opacity: item.reservado ? 0.6 : 1,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1 }}>
                  <div style={{
                    background: item.reservado ? '#ddd' : '#e3effd',
                    padding: '8px', borderRadius: '50%', display: 'flex', flexShrink: 0
                  }}>
                    {item.reservado ? <FaCheck size={14} color="#666" /> : <FaGift size={16} color="#4A6fa5" />}
                  </div>
                  <span style={{ 
                      textDecoration: item.reservado ? 'line-through' : 'none',
                      color: '#5A3E36', fontWeight: '600', fontSize: '0.9rem', lineHeight: '1.1'
                  }}>
                    {item.nome}
                  </span>
                </div>
                {!item.reservado && <span style={{fontSize: '0.75rem', color: '#4A6fa5', fontWeight: 'bold', marginLeft: '8px'}}>ESCOLHER</span>}
              </div>
            ))}
          </div>
      </div>

      <GiftModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        onConfirm={confirmGift}
        giftName={selectedItem?.nome}
      />
    </>
  );
}