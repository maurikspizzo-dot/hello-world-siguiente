import streamlit as st
import pandas as pd
import random
import time
from datetime import datetime

# ---------------------------------------------------------
# Page Configuration & Styling
# ---------------------------------------------------------
st.set_page_config(
    page_title="YPF Full - Smart Maintenance Dashboard",
    page_icon="☕",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling for YPF Branding
st.markdown("""
    <style>
    .main {
        background-color: #f8f9fa;
    }
    .metric-card {
        background-color: #ffffff;
        padding: 18px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-left: 5px solid #00529b;
        margin-bottom: 15px;
    }
    .status-ok {
        color: #2e7d32;
        font-weight: bold;
    }
    .status-warning {
        color: #ed6c02;
        font-weight: bold;
    }
    .status-critical {
        color: #d32f2f;
        font-weight: bold;
    }
    </style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# Session State Initialization
# ---------------------------------------------------------
if 'cleaning_data' not in st.session_state:
    st.session_state.cleaning_data = [
        {"Sector": "Zona Mesas", "Trafico_Acumulado": 12, "Ultima_Limpieza": "08:00 AM"},
        {"Sector": "Estación Autoservicio Café", "Trafico_Acumulado": 48, "Ultima_Limpieza": "08:15 AM"},
        {"Sector": "Sanitarios Principal", "Trafico_Acumulado": 35, "Ultima_Limpieza": "07:30 AM"},
        {"Sector": "Mostrador Take Away", "Trafico_Acumulado": 18, "Ultima_Limpieza": "08:30 AM"}
    ]

if 'stock_data' not in st.session_state:
    st.session_state.stock_data = [
        {"Insumo": "Servilletas", "Stock_Pct": 85},
        {"Insumo": "Azúcar / Edulcorante", "Stock_Pct": 15},
        {"Insumo": "Leche (Heladera)", "Stock_Pct": 40},
        {"Insumo": "Vasos Café 240ml", "Stock_Pct": 65}
    ]

if 'shift_logs' not in st.session_state:
    st.session_state.shift_logs = []

# Helper Functions
def get_stock_status(pct):
    if pct < 25:
        return "CRÍTICO", "⚠️ REPOSICIÓN INMEDIATA", "#ffcdd2"
    elif pct < 50:
        return "MEDIO", "⚡ Monitorear / Reponer pronto", "#ffe0b2"
    else:
        return "OK", "✅ Stock Saludable", "#c8e6c9"

def get_cleaning_status(count):
    if count >= 50:
        return "CRÍTICO", "⚠️ REQUERE LIMPIEZA URGENTE", "#ffcdd2"
    elif count >= 35:
        return "MEDIO", "⚡ Revisión Recomendada", "#ffe0b2"
    else:
        return "OK", "✅ Sector Limpio", "#c8e6c9"

# ---------------------------------------------------------
# Sidebar Controls & Simulation Engine
# ---------------------------------------------------------
st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/f/f3/YPF_logo.svg", width=120)
st.sidebar.title("YPF Full - Control Center")
st.sidebar.caption("Service Design & Smart Maintenance Operations")

st.sidebar.markdown("---")
st.sidebar.subheader("🕹️ Simulación de Tráfico en Vivo")

if st.sidebar.button("🎲 Simular Afluencia de Clientes (+10-25 pax)"):
    for item in st.session_state.cleaning_data:
        add_pax = random.randint(5, 20)
        item["Trafico_Acumulado"] += add_pax
    
    for item in st.session_state.stock_data:
        drop_stock = random.randint(5, 18)
        item["Stock_Pct"] = max(0, item["Stock_Pct"] - drop_stock)
        
    st.session_state.shift_logs.append(f"{datetime.now().strftime('%H:%M')} - Incremento de tráfico simulado registrado.")
    st.toast("Tráfico e insumos actualizados en tiempo real.", icon="📊")

if st.sidebar.button("🔄 Resetear Turno / Estado Inicial"):
    for item in st.session_state.cleaning_data:
        item["Trafico_Acumulado"] = random.randint(5, 15)
        item["Ultima_Limpieza"] = datetime.now().strftime("%H:%M %p")
    for item in st.session_state.stock_data:
        item["Stock_Pct"] = random.randint(70, 100)
    st.session_state.shift_logs = []
    st.toast("Panel reiniciado a estado por defecto.", icon="🧹")

# ---------------------------------------------------------
# Main App Header
# ---------------------------------------------------------
st.title("☕ YPF Full - Smart-Maintenance Dashboard")
st.markdown("""
**Panel Operativo de Service Design para Estaciones de Servicio**  
*Optimización proactiva de la higiene y reposición de insumos mediante monitoreo de flujo y stock en tiempo real.*
""")
st.markdown("---")

# Navigation Tabs
tab1, tab2, tab3 = st.tabs(["🧹 1. Alertas de Limpieza (Tráfico)", "📦 2. Stock de Insumos (Semáforo)", "🤖 3. IA Shift Report"])

# ---------------------------------------------------------
# Tab 1: Cleaning Alerts
# ---------------------------------------------------------
with tab1:
    st.subheader("Estado de Higiene y Mantenimiento por Sector")
    st.caption("Umbral de alerta activa: > 50 personas registradas desde la última intervención.")
    
    cols = st.columns(2)
    for idx, item in enumerate(st.session_state.cleaning_data):
        col = cols[idx % 2]
        status, message, bg_color = get_cleaning_status(item["Trafico_Acumulado"])
        
        with col:
            st.markdown(f"""
            <div style="background-color: {bg_color}; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <h4 style="margin:0; color:#111;">{item['Sector']}</h4>
                <p style="margin:5px 0 0 0; color:#333;">Tráfico acumulado: <b>{item['Trafico_Acumulado']} personas</b></p>
                <p style="margin:2px 0 0 0; color:#333;">Última atención: {item['Ultima_Limpieza']}</p>
                <p style="margin:5px 0 0 0; font-size: 1.1em;"><b>{message}</b></p>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button(f"✅ Marcar Limpio ({item['Sector']})", key=f"clean_{idx}"):
                item["Trafico_Acumulado"] = 0
                item["Ultima_Limpieza"] = datetime.now().strftime("%H:%M %p")
                st.session_state.shift_logs.append(f"{datetime.now().strftime('%H:%M')} - Limpieza realizada en: {item['Sector']}")
                st.rerun()

# ---------------------------------------------------------
# Tab 2: Stock Management
# ---------------------------------------------------------
with tab2:
    st.subheader("Control e Indicadores de Reposición de Insumos")
    st.caption("Semáforo Inteligente según la matriz logarítmica de consumo estimada.")
    
    for idx, item in enumerate(st.session_state.stock_data):
        status, action, bg_color = get_stock_status(item["Stock_Pct"])
        c1, c2, c3, c4 = st.columns([2, 3, 2, 2])
        
        with c1:
            st.markdown(f"### {item['Insumo']}")
        with c2:
            st.progress(item["Stock_Pct"] / 100)
            st.caption(f"Nivel actual: {item['Stock_Pct']}%")
        with c3:
            st.markdown(f"<div style='background-color:{bg_color}; padding:8px; border-radius:6px; text-align:center;'><b>{status}</b><br><small>{action}</small></div>", unsafe_allow_html=True)
        with c4:
            if st.button(f"📦 Reponer 100%", key=f"stock_{idx}"):
                item["Stock_Pct"] = 100
                st.session_state.shift_logs.append(f"{datetime.now().strftime('%H:%M')} - Stock repuesto al 100% en: {item['Insumo']}")
                st.rerun()
        st.markdown("---")

# ---------------------------------------------------------
# Tab 3: AI Shift Report
# ---------------------------------------------------------
with tab3:
    st.subheader("🤖 Asistente de Cierre de Turno e Inteligencia Operativa")
    st.markdown("Generación de reporte automatizado para el encargado de la estación YPF Full.")
    
    if st.button("📊 Generar Reporte Resumen del Turno"):
        st.info("Procesando métricas de afluencia, reposiciones e intervenciones...")
        
        # Calculate summary statistics
        critical_stock = [i['Insumo'] for i in st.session_state.stock_data if i['Stock_Pct'] < 25]
        dirty_sectors = [i['Sector'] for i in st.session_state.cleaning_data if i['Trafico_Acumulado'] >= 50]
        
        st.success("✅ Reporte generado exitosamente")
        
        st.markdown(f"""
        ### 📝 Resumen Operativo de Turno
        * **Fecha/Hora:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        * **Estado de Limpieza Global:** {len(dirty_sectors)} sectores requieren atención inmediata.
        * **Puntos Críticos de Insumos:** {', '.join(critical_stock) if critical_stock else 'Todos los insumos en niveles aceptables.'}
        
        #### 🔍 Hallazgos Clave de UX / Service Design:
        1. **Pico de Demanda:** La estación de café autoservicio presenta mayor frecuencia de rotación de insumos.
        2. **Optimización de Tiempos:** El uso de la alerta proactiva eliminó la queja por falta de servilletas/azúcar.
        3. **Recomendación:** Reforzar la verificación visual en sanitized zonas cada 40 clientes acumulados en horas pico (12:00 - 15:00 hs).
        """)
        
        if st.session_state.shift_logs:
            st.markdown("#### ⏱️ Registro de Acciones del Personal (Audit Trail)")
            for log in st.session_state.shift_logs:
                st.text(log)