# Documentación del Script Compartido - Calculadora de Perímetro Abdominal

## Descripción General

El archivo `waist-percentile-shared.js` contiene una biblioteca JavaScript que centraliza toda la lógica de cálculo para las evaluaciones de perímetro abdominal en niños y adolescentes de 2 a 18 años. Este script es utilizado por ambas calculadoras (individual y por lotes).

## Características Principales

### 📊 **Base de Datos Completa de Percentiles**
- Incluye todos los percentiles (P10, P25, P50, P75, P90)
- Datos para ambos sexos (Masculino/Femenino)
- Edades de 2 a 18 años
- Compatibilidad con claves en español e inglés

### 🔧 **Funciones Principales**

#### `calculateWaistAssessment(age, sexInput, measurement, useEnglishKeys)`
Función principal para evaluar un paciente individual.

**Parámetros:**
- `age` (number): Edad en años (2-18)
- `sexInput` (string): Sexo ("Masculino"/"Femenino", "male"/"female", "1"/"2")
- `measurement` (number): Medición de cintura en cm
- `useEnglishKeys` (boolean): Usar claves en inglés para compatibilidad

**Retorna:**
```javascript
{
    isValid: true,
    age: 10,
    sex: "Masculino",
    measurement: 75.5,
    result: 1,
    diagnosis: "Obesidad Abdominal",
    percentiles: {
        p10: 57.0,
        p25: 59.8,
        p50: 63.3,
        p75: 69.2,
        p90: 78.0
    }
}
```

#### `processBatchData(csvData, separator)`
Procesa múltiples pacientes desde datos CSV.

**Parámetros:**
- `csvData` (string): Datos en formato CSV
- `separator` (string): Separador CSV (por defecto ';')

**Formato CSV esperado:**
```
edad;medicion;sexo
10;75,5;Masculino
12;68.2;Femenino
```

#### `generateCSVOutput(results, errors, includeAllPercentiles)`
Genera salida CSV formateada.

#### `downloadCSV(csvContent, filename)`
Descarga archivo CSV en el navegador.

### 🔄 **Funciones de Utilidad**

- `normalizeSex(sexInput)`: Normaliza entrada de sexo a formato estándar
- `validateInput(age, sex, measurement)`: Valida datos de entrada
- `getPercentileData(age, sex, useEnglishKeys)`: Obtiene datos de percentiles

## Criterios de Diagnóstico

| Condición | Resultado | Diagnóstico |
|-----------|-----------|-------------|
| Medición > P90 | 1 | "Obesidad Abdominal" |
| P75 < Medición ≤ P90 | 0 | "Riesgo de Obesidad Abdominal" |
| Medición ≤ P75 | 0 | "Normal" |

## Uso en las Calculadoras

### Calculadora Individual (`waist-calculator.html`)
```javascript
const { calculateWaistAssessment } = window.WaistPercentileCalculator;

const assessment = calculateWaistAssessment(age, sexInput, measurement, true);
if (assessment.isValid) {
    // Mostrar resultado
    console.log(assessment.diagnosis);
}
```

### Calculadora por Lotes (`waist-batch-calculator.html`)
```javascript
const { processBatchData, generateCSVOutput, downloadCSV } = window.WaistPercentileCalculator;

const { results, errors } = processBatchData(inputData);
const csvOutput = generateCSVOutput(results, errors, true);
```

## Validaciones y Manejo de Errores

### Validaciones Automáticas:
- ✅ Edad en rango (2-18 años)
- ✅ Sexo válido (múltiples formatos aceptados)
- ✅ Medición numérica válida
- ✅ Formato CSV correcto

### Mensajes de Error en Español:
- "Edad fuera de rango (2-18)"
- "Valor de sexo no válido"
- "Medición no válida"
- "Error de formato"

## Compatibilidad

### Formatos de Sexo Aceptados:
- **Español**: "Masculino", "Femenino"
- **Inglés**: "male", "female" 
- **Numérico**: "1" (Masculino), "2" (Femenino)

### Separadores Decimales:
- Punto (.) - formato estándar
- Coma (,) - se convierte automáticamente

## Estructura de Archivos

```
school-aged_adolescents/
├── waist-percentile-shared.js     # 📚 Biblioteca compartida
├── waist-calculator.html          # 👤 Calculadora individual
├── waist-batch-calculator.html    # 📊 Calculadora por lotes
└── docs/
    └── shared-library-docs.md     # 📖 Esta documentación
```

## Ventajas del Script Compartido

1. **🔄 Mantenimiento Centralizado**: Una sola fuente de verdad para los datos y lógica
2. **📏 Consistencia**: Ambas calculadoras usan exactamente los mismos algoritmos
3. **🛡️ Validación Robusta**: Manejo de errores unificado
4. **🌐 Compatibilidad**: Soporte para múltiples formatos de entrada
5. **📊 Datos Completos**: Todos los percentiles disponibles
6. **🔧 Modularidad**: Fácil de extender y reutilizar

## Actualización de Datos

Para actualizar las tablas de percentiles, modificar únicamente el objeto `WAIST_PERCENTILE_DATA` en `waist-percentile-shared.js`. Los cambios se aplicarán automáticamente a ambas calculadoras.

## Soporte para Node.js

El script también es compatible con Node.js para uso en servidores:

```javascript
const calculator = require('./waist-percentile-shared.js');
const result = calculator.calculateWaistAssessment(10, 'Masculino', 75.5);
```
