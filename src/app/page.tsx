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
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: '#111827',
      paddingBottom: '80px',
      colorScheme: 'light'
    }}>
      {/* Header Corporativo YPF */}
      <header style={{
        backgroundColor: '#002b5c',
        color: '#ffffff',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            backgroundColor: '#00a3e0',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: '900',
            fontSize: '11px'
          }}>YPF FULL</span>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>Smart Maintenance</h1>
        </div>
        <p style={{ margin: '0 0 12px 0', opacity: 0.9, fontSize: '12px', color: '#e5e7eb' }}>
          Service Design & Tablero Operativo
        </p>

        {/* Resumen KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{
            backgroundColor: sectoresCriticos > 0 ? '#7f1d1d' : '#064e3b',
            border: sectoresCriticos > 0 ? '1px solid #ef4444' : '1px solid #10b981',
            padding: '6px 10px',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '10px', color: '#f3f4f6' }}>Limpieza</span>
            <strong style={{ fontSize: '13px', color: '#ffffff' }}>{sectoresCriticos} Críticos</strong>
          </div>
          <div style={{
            backgroundColor: insumosCriticos > 0 ? '#7f1d1d' : '#064e3b',
            border: insumosCriticos > 0 ? '1px solid #ef4444' : '1px solid #10b981',
            padding: '6px 10px',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '10px', color: '#f3f4f6' }}>Insumos</span>
            <strong style={{ fontSize: '13px', color: '#ffffff' }}>{insumosCriticos} Críticos</strong>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Pestañas de Selección */}
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
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: activeTab === 'limpieza' ? '#00529b' : 'transparent',
              color: activeTab === 'limpieza' ? '#ffffff' : '#374151',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            🧹 Limpieza
          </button>
          <button
            onClick={() => setActiveTab('insumos')}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: activeTab === 'insumos' ? '#00529b' : 'transparent',
              color: activeTab === 'insumos' ? '#ffffff' : '#374151',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            📦 Insumos
          </button>
        </div>

        {/* Mantenimiento / Limpieza */}
        {activeTab === 'limpieza' && (
          <section>
            <h2 style={{ fontSize: '16px', color: '#111827', margin: '0 0 14px 0', fontWeight: '800' }}>
              Sectores de Limpieza (Tráfico)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {sectores.map(s => {
                const esCritico = s.flujo >= 50;
                return (
                  <div key={s.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    borderLeft: esCritico ? '6px solid #dc2626' : '6px solid #16a34a'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>{s.nombre}</h3>
                      <span style={{
                        backgroundColor: esCritico ? '#fee2e2' : '#dcfce7',
                        color: esCritico ? '#991b1b' : '#166534',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '800'
                      }}>
                        {esCritico ? 'CRÍTICO' : 'OK'}
                      </span>
                    </div>

                    <div style={{ backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', color: '#374151' }}>
                        <span>Tráfico acumulado:</span>
                        <strong style={{ color: '#111827' }}>{s.flujo} / 50 pers.</strong>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#d1d5db', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${Math.min((s.flujo / 50) * 100, 100)}%`,
                          height: '100%',
                          backgroundColor: esCritico ? '#dc2626' : '#00a3e0'
                        }}></div>
                      </div>
                    </div>

                    <p style={{ margin: '2px 0', fontSize: '12px', color: '#4b5563' }}>
                      🕒 Última limpieza: <strong style={{ color: '#111827' }}>{s.ultimaLimpieza}</strong>
                    </p>
                    <p style={{ margin: '2px 0 12px 0', fontSize: '12px', color: '#4b5563' }}>
                      👤 Responsable: <strong style={{ color: '#111827' }}>{s.responsable}</strong>
                    </p>

                    <button
                      onClick={() => resetSector(s.id)}
                      style={{
                        backgroundColor: esCritico ? '#dc2626' : '#00529b',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      {esCritico ? '⚠️ Confirmar Limpieza Realizada' : '✓ Registrar Limpieza'}
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
            <h2 style={{ fontSize: '16px', color: '#111827', margin: '0 0 14px 0', fontWeight: '800' }}>
              Control de Insumos
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {insumos.map(i => {
                const esCritico = i.stock < 25;
                return (
                  <div key={i.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    borderLeft: esCritico ? '6px solid #dc2626' : '6px solid #16a34a'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>{i.nombre}</h3>
                      <span style={{
                        backgroundColor: esCritico ? '#fee2e2' : '#dcfce7',
                        color: esCritico ? '#991b1b' : '#166534',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '800'
                      }}>
                        {esCritico ? 'REPOSICIÓN' : 'OK'}
                      </span>
                    </div>

                    <div style={{ backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '6px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', color: '#374151' }}>
                        <span>Disponibilidad:</span>
                        <strong style={{ color: '#111827' }}>{i.stock}%</strong>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#d1d5db', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${i.stock}%`,
                          height: '100%',
                          backgroundColor: esCritico ? '#dc2626' : '#16a34a'
                        }}></div>
                      </div>
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#4b5563' }}>
                      🎯 Lote sugerido: <strong style={{ color: '#111827' }}>{i.nivelOptimo}</strong>
                    </p>

                    <button
                      onClick={() => reponerInsumo(i.id)}
                      style={{
                        backgroundColor: '#16a34a',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        width: '100%'
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