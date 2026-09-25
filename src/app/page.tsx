'use client';

import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('limpieza');

  const [sectores, setSectores] = useState([
    { id: 1, nombre: 'Zona Mesas & Salón', flujo: 58, ultimaLimpieza: '10:15 AM', responsable: 'Marta R.' },
    { id: 2, nombre: 'Estación Autoservicio Café', flujo: 35, ultimaLimpieza: '11:00 AM', responsable: 'Carlos G.' },
    { id: 3, nombre: 'Sector Sanitarios / Baños', flujo: 18, ultimaLimpieza: '11:30 AM', responsable: 'Marta R.' },
    { id: 4, nombre: 'Barra Consumo Rápido', flujo: 62, ultimaLimpieza: '09:45 AM', responsable: 'Lucas P.' },
  ]);

  const [insumos, setInsumos] = useState([
    { id: 1, nombre: 'Servilletas de Papel', stock: 85, nivelOptimo: '500 unid.' },
    { id: 2, nombre: 'Azúcar / Edulcorante', stock: 15, nivelOptimo: '200 sobres' },
    { id: 3, nombre: 'Leche Enterprise', stock: 40, nivelOptimo: '20 Litros' },
    { id: 4, nombre: 'Vasos Café Polipapel', stock: 20, nivelOptimo: '300 unid.' },
  ]);

  const resetSector = (id) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSectores(sectores.map(s => s.id === id ? { ...s, flujo: 0, ultimaLimpieza: horaActual } : s));
  };

  const reponerInsumo = (id) => {
    setInsumos(insumos.map(i => i.id === id ? { ...i, stock: 100 } : i));
  };

  const sectoresCriticos = sectores.filter(s => s.flujo >= 50).length;
  const insumosCriticos = insumos.filter(i => i.stock < 25).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#1f2937',
      paddingBottom: '30px'
    }}>
      {/* Header Mobile Adaptativo */}
      <header style={{
        background: 'linear-gradient(135deg, #002b5c 0%, #00529b 100%)',
        color: '#ffffff',
        padding: '16px 16px 20px 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            backgroundColor: '#00a3e0',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '900',
            fontSize: '11px',
            letterSpacing: '0.5px'
          }}>YPF FULL</span>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Smart Maintenance</h1>
        </div>
        <p style={{ margin: '0 0 14px 0', opacity: 0.85, fontSize: '12px' }}>
          Service Design & Tablero Operativo
        </p>

        {/* KPIs compactos para celulares */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{
            backgroundColor: sectoresCriticos > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)',
            border: sectoresCriticos > 0 ? '1px solid #ef4444' : '1px solid #10b981',
            padding: '6px 10px',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '10px', opacity: 0.9 }}>Limpieza</span>
            <strong style={{ fontSize: '14px', color: sectoresCriticos > 0 ? '#fca5a5' : '#6ee7b7' }}>
              {sectoresCriticos} Críticos
            </strong>
          </div>
          <div style={{
            backgroundColor: insumosCriticos > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)',
            border: insumosCriticos > 0 ? '1px solid #ef4444' : '1px solid #10b981',
            padding: '6px 10px',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '10px', opacity: 0.9 }}>Insumos</span>
            <strong style={{ fontSize: '14px', color: insumosCriticos > 0 ? '#fca5a5' : '#6ee7b7' }}>
              {insumosCriticos} Críticos
            </strong>
          </div>
        </div>
      </header>

      {/* Contenedor Adaptable */}
      <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Pestañas Táctiles Rápida Selección */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#e5e7eb',
          borderRadius: '8px',
          padding: '3px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setActiveTab('limpieza')}
            style={{
              padding: '10px 8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: activeTab === 'limpieza' ? '#ffffff' : 'transparent',
              color: activeTab === 'limpieza' ? '#00529b' : '#4b5563',
              fontWeight: activeTab === 'limpieza' ? '700' : '500',
              cursor: 'pointer',
              fontSize: '13px',
              boxShadow: activeTab === 'limpieza' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            🧹 Limpieza
          </button>
          <button
            onClick={() => setActiveTab('insumos')}
            style={{
              padding: '10px 8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: activeTab === 'insumos' ? '#ffffff' : 'transparent',
              color: activeTab === 'insumos' ? '#00529b' : '#4b5563',
              fontWeight: activeTab === 'insumos' ? '700' : '500',
              cursor: 'pointer',
              fontSize: '13px',
              boxShadow: activeTab === 'insumos' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            📦 Insumos
          </button>
        </div>

        {/* Mantenimiento / Limpieza */}
        {activeTab === 'limpieza' && (
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {sectores.map(s => {
                const esCritico = s.flujo >= 50;
                return (
                  <div key={s.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '16px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    borderLeft: esCritico ? '5px solid #ef4444' : '5px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1f2937' }}>{s.nombre}</h3>
                      <span style={{
                        backgroundColor: esCritico ? '#fee2e2' : '#d1fae5',
                        color: esCritico ? '#991b1b' : '#065f46',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '700'
                      }}>
                        {esCritico ? 'CRÍTICO' : 'OK'}
                      </span>
                    </div>

                    <div style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                        <span style={{ color: '#4b5563' }}>Tráfico:</span>
                        <strong>{s.flujo} / 50 pers.</strong>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${Math.min((s.flujo / 50) * 100, 100)}%`,
                          height: '100%',
                          backgroundColor: esCritico ? '#ef4444' : '#00a3e0'
                        }}></div>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                      <p style={{ margin: '2px 0' }}>🕒 Última limpieza: <strong>{s.ultimaLimpieza}</strong></p>
                      <p style={{ margin: '2px 0' }}>👤 Responsable: <strong>{s.responsable}</strong></p>
                    </div>

                    <button
                      onClick={() => resetSector(s.id)}
                      style={{
                        backgroundColor: esCritico ? '#ef4444' : '#00529b',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        width: '100%',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      {esCritico ? '⚠️ Limpieza Realizada' : '✓ Registrar Limpieza'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Control de Insumos */}
        {activeTab === 'insumos' && (
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {insumos.map(i => {
                const esCritico = i.stock < 25;
                return (
                  <div key={i.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '16px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    borderLeft: esCritico ? '5px solid #ef4444' : '5px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1f2937' }}>{i.nombre}</h3>
                      <span style={{
                        backgroundColor: esCritico ? '#fee2e2' : '#d1fae5',
                        color: esCritico ? '#991b1b' : '#065f46',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '700'
                      }}>
                        {esCritico ? 'REPOSICIÓN' : 'OK'}
                      </span>
                    </div>

                    <div style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                        <span style={{ color: '#4b5563' }}>Disponibilidad:</span>
                        <strong>{i.stock}%</strong>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${i.stock}%`,
                          height: '100%',
                          backgroundColor: esCritico ? '#ef4444' : '#10b981'
                        }}></div>
                      </div>
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#6b7280' }}>
                      🎯 Lote sugerido: <strong>{i.nivelOptimo}</strong>
                    </p>

                    <button
                      onClick={() => reponerInsumo(i.id)}
                      style={{
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        width: '100%',
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      📦 Marcar Repuesto (100%)
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}