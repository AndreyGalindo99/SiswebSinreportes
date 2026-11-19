# Sistema de Gestión de Reportes Negativos

Plataforma web integral diseñada para la administración, visualización, seguimiento y trazabilidad de procesos legales para la eliminación de reportes negativos en centrales de riesgo.

---

## 1. Nombre del Proyecto

**Sistema Web para la Gestión y Seguimiento de Procesos de Eliminación de Reportes Negativos en Centrales de Riesgo**  
*(Áurea Legal / Sistema de Gestión de Reportes)*

---

## 2. Objetivos del Proyecto

### Objetivo General
Diseñar y desarrollar un sistema web para la gestión y seguimiento de procesos de eliminación de reportes negativos en centrales de riesgo, con el fin de mejorar la transparencia, trazabilidad y eficiencia de los trámites realizados por empresas del sector legal-financiero y sus clientes.

### Objetivos Específicos
* **Analizar** los requerimientos funcionales y no funcionales asociados a los procesos de eliminación de reportes en centrales de riesgo mediante la recopilación de información de usuarios y organizaciones del sector legal-financiero.
* **Diseñar** la arquitectura, estructura funcional e interfaces del sistema web de acuerdo con los requerimientos identificados y las necesidades de los actores involucrados.
* **Desarrollar** un prototipo funcional del sistema web que integre mecanismos de autenticación, gestión de procesos, administración documental y seguimiento de trámites legales.
* **Validar** el funcionamiento y la usabilidad del prototipo mediante pruebas piloto realizadas con usuarios potenciales, con el propósito de identificar oportunidades de mejora y verificar el cumplimiento de los requerimientos establecidos.
* **Evaluar** los resultados obtenidos durante la implementación y validación del sistema, mediante indicadores de desempeño relacionados con la eficiencia, trazabilidad y satisfacción de los usuarios.

---

## 3. Descripción del Sistema

El sistema es una solución tecnológica enfocada en optimizar el flujo operativo y de comunicación entre las firmas de asesoría legal-financiera y sus clientes. Proporciona una interfaz unificada, intuitiva y centralizada que aborda las siguientes capacidades principales:

* **Control Procesal por Fases:** Monitoreo detallado del avance jurídico en una línea de tiempo estructurada de 10 etapas procesales con registro de observaciones y fechas de cumplimiento.
* **Gestión Documental y de Evidencias:** Carga, consulta, visualización preliminar y comentarios sobre radicados, respuestas de entidades crediticias, poderes y paz y salvos.
* **Control de Cartera y Pagos:** Registro de abonos, control de cuotas, seguimiento de clientes al día o en mora y soporte para comprobantes bancarios (Bancolombia, Nequi, Daviplata, Efectivo).
* **Administración Multisede y de Personal:** Gestión de oficinas físicas y digitales a nivel nacional, asignación de gerentes y abogados, y administración de usuarios con control de acceso basado en roles (RBAC).

---

## 4. Integrantes

* **Edison Andrey Galindo**

---

## 5. Instrucciones de Uso

### Requisitos Previos
* **Node.js:** Versión 18.0 o superior (recomendado LTS o v20+).
* **Gestor de paquetes:** npm (incluido con Node.js).

### Instalación y Puesta en Marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AndreyGalindo99/SiswebSinreportes.git
   cd "Sistema de Gestión de Reportes"
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación:**
   Abre tu navegador web e ingresa a:
   ```text
   http://localhost:5173/
   ```

### Guía Básica de Navegación por Roles

Al ingresar a la pantalla de inicio de sesión (`Login`), puedes ingresar con cualquier correo y contraseña de prueba y seleccionar el rol que deseas explorar:

| Rol | Módulos y Funciones Disponibles |
| :--- | :--- |
| **Cliente** | • **Inicio:** Red de sedes nacionales y solicitud de consultas.<br>• **Mi caso:** Línea de tiempo interactiva de 10 fases y notificaciones.<br>• **Evidencias:** Consulta de archivos cargados y carga de nuevos soportes.<br>• **Pagos:** Historial de cuotas y medios de pago disponibles.<br>• **Perfil:** Datos de contacto y preferencias. |
| **Abogado** | • **Casos:** Cartera de clientes asignados, buscador por cédula, actualización obligatoria de fases y notas internas.<br>• **Evidencias:** Radicación y asociación de respuestas y documentos a clientes.<br>• **Historial Cliente:** Búsqueda rápida por número de documento. |
| **Gerente** | • **Panel Gerencial:** Métricas operativas, alta de nuevos clientes y asignación de casos a abogados.<br>• **Panel de Pagos:** Monitor de cartera con filtros por estado y sede.<br>• **Cargar Pagos:** Registro de pagos y abonos de clientes con comprobante.<br>• **Historial Cliente:** Auditoría de clientes y estados. |
| **Dueño / Ejecutivo** | • **Panel Ejecutivo:** Indicadores financieros, analítica de casos, satisfacción y cumplimiento de metas por oficina.<br>• **Administrar Usuarios:** Creación, edición, activación/inactivación y eliminación de cuentas.<br>• **Administrar Oficinas:** Gestión de sedes a nivel nacional. |

---

## 
