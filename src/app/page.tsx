'use client';

import React, { useState } from 'react';

interface Sector {
  id: number;
  nombre: string;
  flujo: number;
  ultimaLimpieza: string;
}

interface Insumo {
  id: number;
  nombre: string;
  stock: number;
}

export default function Home() {
  const [sectores, setSectores] = useState<Sector[]>([
    { id: 1, nombre: 'Zona Mesas', flujo: 55, ultimaLimpieza: '10:15 AM' },
    { id: 2, nombre: 'Estación Autoservicio Café', flujo: 35, ultimaLimpieza: '11:00 AM' },
    { id: 3, nombre: 'Sector Sanitarios / Baños', flujo: 18, ultimaLimpieza: '11:30 AM' },
    { id: 4, nombre: 'Barra Consumo Rápido', flujo: 62, ultimaLimpieza: '09:45 AM' },
  ]);

  const [insumos, setInsumos] = useState<Insumo[]>([
    { id: 1, nombre: 'Servilletas', stock: 85 },
    { id: 2, nombre: 'Azúcar / Edulcorante', stock: 15 },
    { id: 3, nombre: 'Leche (Heladera)', stock: 40 },
    { id: 4, nombre: 'Vasos Café Polipapel', stock: 20 },
  ]);

  const resetSector = (id: number) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSectores(sectores.map(s => s.id === id ? { ...s, flujo: 0, ultimaLimpieza: horaActual } : s));
  };

  const reponerInsumo = (id: number) => {
    setInsumos(insumos.map(i => i.id === id ? { ...i, stock: 100 } : i));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ borderBottom: '3px solid #00529b', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#00529b', margin: 0 }}>☕ YPF Full - Smart Maintenance Dashboard</h1>
        <p style={{ color: '#666', marginTop: '5px' }}>Service Design & Operational Control System</p>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2>🧹 Sectores de Limpieza (Tráfico de Clientes)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {sectores.map(s => {
            const esCritico = s.flujo >= 50;
            return (
              <div key={s.id} style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: esCritico ? '6px solid #d9534f' : '6px solid #5cb85c'
              }}>
                <h3 style={{ marginTop: 0 }}>{s.nombre}</h3>
                <p><strong>Flujo acumulado:</strong> {s.flujo} personas</p>
                <p><strong>Última limpieza:</strong> {s.ultimaLimpieza}</p>
                <p style={{ fontWeight: 'bold', color: esCritico ? '#d9534f' : '#5cb85c' }}>
                  {esCritico ? '⚠️ REQUIERE LIMPIEZA INMEDIATA' : '✅ Estado Óptimo'}
                </p>
                <button 
                  onClick={() => resetSector(s.id)}
                  style={{
                    backgroundColor: '#00529b',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                  Marcar como Limpio
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2>📦 Stock de Insumos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {insumos.map(i => {
            const esCritico = i.stock < 25;
            return (
              <div key={i.id} style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: esCritico ? '6px solid #d9534f' : '6px solid #5cb85c'
              }}>
                <h3 style={{ marginTop: 0 }}>{i.nombre}</h3>
                <p><strong>Stock estimado:</strong> {i.stock}%</p>
                <p style={{ fontWeight: 'bold', color: esCritico ? '#d9534f' : '#5cb85c' }}>
                  {esCritico ? '⚠️ REPOSICIÓN INMEDIATA' : '✅ Stock Saludable'}
                </p>
                <button 
                  onClick={() => reponerInsumo(i.id)}
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                  Reponer Stock (100%)
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}