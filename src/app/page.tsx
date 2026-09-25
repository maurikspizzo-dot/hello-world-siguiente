'use client';

import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('limpieza');
  const [filter, setFilter] = useState('todos');

  const [sectores, setSectores] = useState([
    { id: 1, nombre: 'Zona Mesas & Salón', flujo: 58, ultimaLimpieza: '10:15 AM', responsable: 'Marta R.' },
    { id: 2, nombre: 'Estación Autoservicio Café', flujo: 35, ultimaLimpieza: '11:00 AM', responsable: 'Carlos G.' },
    { id: 3, nombre: 'Sector Sanitarios / Baños', flujo: 18, ultimaLimpieza: '11:30 AM', responsable: 'Marta R.' },
    { id: 4, nombre: 'Barra Consumo Rápido', flujo: 62, ultimaLimpieza: '09:45 AM', responsable: 'Lucas P.' },
  ]);

  const [insumos, setInsumos] = useState([
    { id: 1, nombre: 'Servilletas de Papel', stock: 85, nivelOptimo: '500 unidades' },
    { id: 2, nombre: 'Azúcar / Edulcorante', stock: 15, nivelOptimo: '200 sobres' },
    { id: 3, nombre: 'Leche Enterprise (Heladera)', stock: 40, nivelOptimo: '20 Litros' },
    { id: 4, nombre: 'Vasos Café Polipapel 240ml', stock: 20, nivelOptimo: '300 unidades' },
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
      color: '#1f2937'
    }}>
      {/* Header Corporativo YPF */}
      <header style={{
        background: 'linear-gradient(135deg, #002b5c 0%, #00529b 100%)',
        color: '#ffffff',
        padding: '24px 32px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              backgroundColor: '#00a3e0',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: '900',
              fontSize: '14px',
              letterSpacing: '1px'
            }}>YPF FULL</span>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Smart Maintenance Dashboard</h1>
          </div>
          <p style={{ margin: '6px 0 0 0', opacity: 0.85, fontSize: '14px' }}>
            Service Design & Mantenimiento Proactivo Operativo
          </p>
        </div>

        {/* Resumen de KPIs en Header */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            backgroundColor: sectoresCriticos > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            border: sectoresCriticos > 0 ? '1px solid #ef4444' : '1px solid #10b981',
            padding: '8px 16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '12px', opacity: 0.8 }}>Alertas Limpieza</span>
            <strong style={{ fontSize: '18px', color: sectoresCriticos > 0 ? '#fca5a5' : '#6ee7b7' }}>
              {sectoresCriticos} Críticos
            </strong>
          </div>
          <div style={{
            backgroundColor: insumosCriticos > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            border: insumosCriticos > 0 ? '1px solid #ef4444' : '1px solid #10b981',
            padding: '8px 16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <span style={{ display: 'block', fontSize: '12px', opacity: 0.8 }}>Alertas Stock</span>
            <strong style={{ fontSize: '18px', color: insumosCriticos > 0 ? '#fca5a5' : '#6ee7b7' }}>
              {insumosCriticos} Críticos
            </strong>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 20px' }}>
        
        {/* Pestañas de Navegación */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '2px solid #e5e7eb',
          marginBottom: '28px'
        }}>
          <button
            onClick={() => setActiveTab('limpieza')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'limpieza' ? '3px solid #00529b' : 'none',
              color: activeTab === 'limpieza' ? '#00529b' : '#6b7280',
              fontWeight: activeTab === 'limpieza' ? '700' : '500',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🧹 Mantenimiento & Limpieza
          </button>
          <button
            onClick={() => setActiveTab('insumos')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'insumos' ? '3px solid #00529b' : 'none',
              color: activeTab === 'insumos' ? '#00529b' : '#6b7280',
              fontWeight: activeTab === 'insumos' ? '700' : '500',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            📦 Control de Insumos
          </button>
        </div>

        {/* Sección Limpieza */}
        {activeTab === 'limpieza' && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#111827' }}>Monitoreo de Flujo de Usuarios por Sector</h2>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                * Alerta automática programada a partir de 50 personas
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {sectores.map(s => {
                const esCritico = s.flujo >= 50;
                return (
                  <div key={s.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    borderTop: esCritico ? '6px solid #ef4444' : '6px solid #10b981',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{s.nombre}</h3>
                        <span style={{
                          backgroundColor: esCritico ? '#fee2e2' : '#d1fae5',
                          color: esCritico ? '#991b1b' : '#065f46',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          {esCritico ? 'CRÍTICO' : 'OK'}
                        </span>
                      </div>

                      <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                          <span style={{ color: '#4b5563' }}>Tráfico acumulado:</span>
                          <strong>{s.flujo} / 50 pers.</strong>
                        </div>
                        {/* Barra de Progreso */}
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${Math.min((s.flujo / 50) * 100, 100)}%`,
                            height: '100%',
                            backgroundColor: esCritico ? '#ef4444' : '#00a3e0',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>

                      <p style={{ margin: '4px 0', fontSize: '13px', color: '#6b7280' }}>
                        🕒 <strong>Última limpieza:</strong> {s.ultimaLimpieza}
                      </p>
                      <p style={{ margin: '4px 0 16px 0', fontSize: '13px', color: '#6b7280' }}>
                        👤 <strong>Asignado a:</strong> {s.responsable}
                      </p>
                    </div>

                    <button
                      onClick={() => resetSector(s.id)}
                      style={{
                        backgroundColor: esCritico ? '#ef4444' : '#00529b',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        width: '100%'
                      }}
                    >
                      {esCritico ? '⚠️ Confirmar Limpieza Realizada' : '✓ Registrar Limpieza Rutinaria'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Sección Insumos */}
        {activeTab === 'insumos' && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#111827' }}>Estado de Stock e Insumos en Mostrador</h2>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                * Umbral de reposición recomendado: &lt; 25%
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {insumos.map(i => {
                const esCritico = i.stock < 25;
                return (
                  <div key={i.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    borderTop: esCritico ? '6px solid #ef4444' : '6px solid #10b981',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{i.nombre}</h3>
                        <span style={{
                          backgroundColor: esCritico ? '#fee2e2' : '#d1fae5',
                          color: esCritico ? '#991b1b' : '#065f46',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>
                          {esCritico ? 'REPOSICIÓN' : 'OK'}
                        </span>
                      </div>

                      <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                          <span style={{ color: '#4b5563' }}>Disponibilidad:</span>
                          <strong>{i.stock}%</strong>
                        </div>
                        {/* Barra de Progreso Stock */}
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${i.stock}%`,
                            height: '100%',
                            backgroundColor: esCritico ? '#ef4444' : '#10b981',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>

                      <p style={{ margin: '4px 0 16px 0', fontSize: '13px', color: '#6b7280' }}>
                        🎯 <strong>Lote sugerido:</strong> {i.nivelOptimo}
                      </p>
                    </div>

                    <button
                      onClick={() => reponerInsumo(i.id)}
                      style={{
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      📦 Marcar Insumo Repuesto (100%)
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