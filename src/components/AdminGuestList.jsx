import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { FaTimes, FaUserFriends, FaLock } from 'react-icons/fa';

export default function AdminGuestList({ onClose }) {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);

  const verificarSenha = () => {
    if (senha === '@Gravina2011') { 
      setAutenticado(true);
      buscarLista();
    } else {
      alert("Senha incorreta!");
    }
  };

  const buscarLista = async () => {
    setLoading(true);
    try {
      // Busca confirmados ordenados por data
      const q = query(collection(db, "confirmados_15anos"), orderBy("data_confirmacao", "desc"));
      const querySnapshot = await getDocs(q);
      const dados = [];
      querySnapshot.forEach((doc) => {
        dados.push({ id: doc.id, ...doc.data() });
      });
      setLista(dados);
    } catch (error) {
      console.error("Erro ao buscar:", error);
      alert("Erro ao buscar lista. Verifique as regras do Firebase.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: 'white', width: '100%', maxWidth: '500px',
        borderRadius: '15px', padding: '20px', position: 'relative',
        height: '80vh', display: 'flex', flexDirection: 'column'
      }}>
        <button onClick={onClose} style={{
            position: 'absolute', top: 15, right: 15, border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer'
        }}><FaTimes /></button>

        {!autenticado ? (
          // TELA DE LOGIN
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <FaLock size={50} color="#5A3E36" style={{ marginBottom: 20 }}/>
            <h2 style={{ color: '#5A3E36' }}>Área Restrita</h2>
            <p style={{ marginBottom: 20 }}>Digite a senha da aniversariante:</p>
            <input 
              type="password" 
              value={senha}
              onChange={e => setSenha(e.target.value)}
              style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc', fontSize: '1rem' }}
            />
            <br/><br/>
            <button onClick={verificarSenha} style={{
                padding: '10px 20px', background: '#5A3E36', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer'
            }}>Entrar</button>
          </div>
        ) : (
          // LISTA DE CONVIDADOS
          <>
            <h2 style={{ color: '#5A3E36', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
              <FaUserFriends style={{marginRight: 10}}/> 
              Lista de Presença ({lista.length})
            </h2>
            
            <div style={{ flex: 1, overflowY: 'auto', marginTop: 10 }}>
              {loading ? <p>Carregando...</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {lista.map((convidado, index) => (
                    <li key={convidado.id} style={{
                        padding: '15px', borderBottom: '1px solid #f0f0f0',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <strong style={{ display: 'block', color: '#333', fontSize: '1.1rem' }}>
                          {index + 1}. {convidado.nome}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: '#999' }}>
                          {new Date(convidado.data_confirmacao).toLocaleDateString('pt-BR')} às {new Date(convidado.data_confirmacao).toLocaleTimeString('pt-BR')}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}