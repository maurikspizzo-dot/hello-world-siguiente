'use client';

import React, { useState } from 'react';

interface Zone {
  id: string;
  name: string;
  peopleCount: number;
  threshold: number;
  status: 'OK' | 'CRÍTICO';
}

interface Supply {
  id: string;
  name: string;
  stockPercentage: number;
}

export default function SmartFullDashboard() {
  const [activeTab, setActiveTab] = useState<'SECTORES' | 'INSUMOS'>('SECTORES');

  // Estado de monitoreo de zonas en tiempo real
  const [zones, setZones] = useState<Zone[]>([
    { id: '1', name: 'Área Mesas Principal', peopleCount: 52, threshold: 50, status: 'CRÍTICO' },
    { id: '2', name: 'Estación Autoservicio Café', peopleCount: 18, threshold: 40, status: 'OK' },
    { id: '3', name: 'Barra Cajas / Pedidos', peopleCount: 35, threshold: 45, status: 'OK' },
  ]);

  // Estado de stock de insumos
  const [supplies, setSupplies] = useState<Supply[]>([
    { id: '1', name: 'Servilletas', stockPercentage: 85 },
    { id: '2', name: 'Azúcar / Edulcorante', stockPercentage: 15 },
    { id: '3', name: 'Leche (Heladera)', stockPercentage: 40 },
  ]);

  // Simulación de sensor/tráfico de personas
  const simulateTraffic = (zoneId: string, increment: number) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        const newCount = Math.max(0, z.peopleCount + increment);
        return {
          ...z,
          peopleCount: newCount,
          status: newCount >= z.threshold ? 'CRÍTICO' : 'OK'
        };
      }
      return z;
    }));
  };

  // Reset de limpieza realizada
  const resetZone = (zoneId: string) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, peopleCount: 0, status: 'OK' } : z));
  };

  // Actualización manual de stock
  const updateStock = (supplyId: string, delta: number) => {
    setSupplies(prev => prev.map(s => {
      if (s.id === supplyId) {
        const newVal = Math.min(100, Math.max(0, s.stockPercentage + delta));
        return { ...s, stockPercentage: newVal };
      }
      return s;
    }));
  };

  // Lógica de estado de stock
  const getStockStatus = (pct: number) => {
    if (pct < 25) return { status: 'CRÍTICO', action: '⚠️ REPOSICIÓN INMEDIATA', color: '#ef4444' };
    if (pct < 50) return { status: 'MEDIO', action: '⚡ PREPARAR REPOSICIÓN', color: '#f59e0b' };
    return { status: 'OK', action: 'No requiere acción', color: '#22c55e' };
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0f1d',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Header YPF Full */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1e293b',
          padding: '1.25rem 1.5rem',
          borderRadius: '1rem',
          border: '1px solid #334155',
          marginBottom: '1.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.1em' }}>
              YPF FULL • SERVICE DESIGN & UX
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0.25rem 0 0 0' }}>
              Smart-Maintenance Dashboard
            </h1>
          </div>
          <span style={{
            backgroundColor: '#0284c7',
            padding: '0.4rem 0.8rem',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: '700'
          }}>
            Staff App MVP
          </span>
        </header>

        {/* NAVEGACIÓN PESTAÑAS */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('SECTORES')}
            style={{
              flex: 1,
              padding: '0.85rem',
              borderRadius: '0.75rem',
              border: '1px solid #334155',
              backgroundColor: activeTab === 'SECTORES' ? '#0284c7' : '#1e293b',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            🧹 Monitoreo de Sectores (Tráfico)
          </button>
          <button
            onClick={() => setActiveTab('INSUMOS')}
            style={{
              flex: 1,
              padding: '0.85rem',
              borderRadius: '0.75rem',
              border: '1px solid #334155',
              backgroundColor: activeTab === 'INSUMOS' ? '#0284c7' : '#1e293b',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            ☕ Insumos & Stock
          </button>
        </div>

        {/* PESTAÑA 1: SECTORES / ALERTAS DE TRÁFICO */}
        {activeTab === 'SECTORES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                <strong>Lógica del sistema:</strong> Las alertas se activan automáticamente cuando el flujo acumulado de clientes supera el umbral crítico por sector.
              </p>
            </div>

            {zones.map(zone => (
              <div
                key={zone.id}
                style={{
                  backgroundColor: '#1e293b',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '1rem',
                  border: `2px solid ${zone.status === 'CRÍTICO' ? '#ef4444' : '#334155'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{zone.name}</h3>
                    <span style={{
                      backgroundColor: zone.status === 'CRÍTICO' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                      color: zone.status === 'CRÍTICO' ? '#f87171' : '#4ade80',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '800'
                    }}>
                      {zone.status === 'CRÍTICO' ? '⚠️ NECESITA LIMPIEZA' : '✓ OK'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                    Flujo de tráfico: <strong>{zone.peopleCount}</strong> / {zone.threshold} personas
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button
                    onClick={() => simulateTraffic(zone.id, 10)}
                    style={{
                      backgroundColor: '#334155',
                      color: '#cbd5e1',
                      border: 'none',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    +10 Clientes (Simular)
                  </button>
                  {zone.status === 'CRÍTICO' && (
                    <button
                      onClick={() => resetZone(zone.id)}
                      style={{
                        backgroundColor: '#22c55e',
                        color: '#0f172a',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✓ Limpieza Completada
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA 2: INSUMOS_STOCK */}
        {activeTab === 'INSUMOS' && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Estado y Reposición de Insumos</h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8', fontSize: '0.85rem' }}>
                    <th style={{ padding: '0.75rem' }}>Insumo</th>
                    <th style={{ padding: '0.75rem' }}>Stock Estimado %</th>
                    <th style={{ padding: '0.75rem' }}>Estado</th>
                    <th style={{ padding: '0.75rem' }}>Sugerencia</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center' }}>Ajuste</th>
                  </tr>
                </thead>
                <tbody>
                  {supplies.map(supply => {
                    const info = getStockStatus(supply.stockPercentage);
                    return (
                      <tr key={supply.id} style={{ borderBottom: '1px solid #334155', fontSize: '0.9rem' }}>
                        <td style={{ padding: '0.85rem 0.75rem', fontWeight: '600' }}>{supply.name}</td>
                        <td style={{ padding: '0.85rem 0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>{supply.stockPercentage}%</span>
                            <div style={{ width: '60px', height: '6px', backgroundColor: '#334155', borderRadius: '3px' }}>
                              <div style={{ width: `${supply.stockPercentage}%`, height: '100%', backgroundColor: info.color, borderRadius: '3px' }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', fontWeight: '700', color: info.color }}>
                          {info.status}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.85rem' }}>
                          {info.action}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>
                          <button
                            onClick={() => updateStock(supply.id, -20)}
                            style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', marginRight: '0.25rem', cursor: 'pointer' }}
                          >
                            -20%
                          </button>
                          <button
                            onClick={() => updateStock(supply.id, 50)}
                            style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                          >
                            +50%
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}