## How to Build Your Percentile Calculator in Excel

This document will guide you to create an Excel file that automates the calculation of abdominal obesity risk based on waist circumference.

### **Step 1: Set up the 'Reference Tables' Sheet**

1. Create a new sheet in Excel and name it **`Tablas Referencia`**.

2. Copy and paste the following two tables into that sheet.

**Table for Females (Complete):**
| Edad | P10 | P25 | P50 | P75 | P90 |
| :--- | :-- | :-- | :-- | :-- | :-- |
| 2 | 43.8 | 45.0 | 47.1 | 49.5 | 52.2 |
| 3 | 45.4 | 46.7 | 49.1 | 51.9 | 55.3 |
| 4 | 46.9 | 48.4 | 51.1 | 54.3 | 58.3 |
| 5 | 48.5 | 50.1 | 53.0 | 56.7 | 61.4 |
| 6 | 50.1 | 51.8 | 55.0 | 59.1 | 64.4 |
| 7 | 51.6 | 53.5 | 56.9 | 61.5 | 67.5 |
| 8 | 53.2 | 55.2 | 58.9 | 63.9 | 70.5 |
| 9 | 54.8 | 56.9 | 60.8 | 66.3 | 73.6 |
| 10 | 56.3 | 58.6 | 62.8 | 68.7 | 76.6 |
| 11 | 57.9 | 60.3 | 64.8 | 71.1 | 79.7 |
| 12 | 59.5 | 62.0 | 66.7 | 73.5 | 82.7 |
| 13 | 61.0 | 63.7 | 68.7 | 75.9 | 85.8 |
| 14 | 62.6 | 65.4 | 70.6 | 78.3 | 88.8 |
| 15 | 64.2 | 67.1 | 72.6 | 80.7 | 91.9 |
| 16 | 65.7 | 68.8 | 74.6 | 83.1 | 94.9 |
| 17 | 67.3 | 70.5 | 76.5 | 85.5 | 98.0 |
| 18 | 69.9 | 72.2 | 78.5 | 87.9 | 101.0 |

**Table for Males (Complete):**
| Edad | P10 | P25 | P50 | P75 | P90 |
| :--- | :-- | :-- | :-- | :-- | :-- |
| 2 | 43.2 | 45.0 | 47.1 | 48.8 | 50.8 |
| 3 | 44.9 | 46.9 | 49.1 | 51.3 | 54.2 |
| 4 | 46.6 | 48.7 | 51.1 | 53.9 | 57.6 |
| 5 | 48.4 | 50.6 | 53.2 | 56.4 | 61.0 |
| 6 | 50.1 | 52.4 | 55.2 | 59.0 | 64.4 |
| 7 | 51.8 | 54.3 | 57.2 | 61.5 | 67.8 |
| 8 | 53.5 | 56.1 | 59.3 | 64.1 | 71.2 |
| 9 | 55.3 | 58.0 | 61.3 | 66.6 | 74.6 |
| 10 | 57.0 | 59.8 | 63.3 | 69.2 | 78.0 |
| 11 | 58.7 | 61.7 | 65.4 | 71.7 | 81.4 |
| 12 | 60.5 | 63.5 | 67.4 | 74.3 | 84.8 |
| 13 | 62.2 | 65.4 | 69.5 | 76.8 | 88.2 |
| 14 | 63.9 | 67.2 | 71.5 | 79.4 | 91.6 |
| 15 | 65.6 | 69.1 | 73.5 | 81.9 | 95.0 |
| 16 | 67.4 | 70.9 | 75.6 | 84.5 | 98.4 |
| 17 | 69.1 | 72.8 | 77.6 | 87.0 | 101.8 |
| 18 | 70.8 | 74.6 | 79.6 | 89.6 | 105.2 |

3. **Important: Name the data ranges.**

   * Select all the data from the female table (including the headers, from "Edad" to the last number).

   * Go to the name box (top left, next to the formula bar) and type **`Female_Table`** and press Enter.

   * Do the same for the male table, naming it **`Male_Table`**.

### **Step 2: Set up the 'Patient Data' Sheet**

1. Create another sheet and name it **`Datos Pacientes`**.

2. Create the following headers in the first row: `Nombre`, `Edad`, `Sexo`, `Medición (cm)`, `Resultado (0/1)`, `Diagnóstico`.

3. Fill in the first four columns with your patient data. Remember to use **exactly** "Femenino" or "Masculino" in the `Sexo` column.

### **Step 3: Insert the Magic Formulas**

1. **Formula for the "Result (0/1)" column:**

   * In cell **E2**, copy and paste the following formula:

     ```excel
     =SI(D2 > BUSCARV(B2; SI(C2="Masculino"; Male_Table; Female_Table); 6; FALSO); 1; 0)
     ```

2. **Formula for the "Diagnosis" column:**

   * In cell **F2**, copy and paste the following formula:

     ```excel
     =SI(D2 > BUSCARV(B2; SI(C2="Masculino"; Male_Table; Female_Table); 6; FALSO); "Obesidad Abdominal"; SI(D2 > BUSCARV(B2; SI(C2="Masculino"; Male_Table; Female_Table); 5; FALSO); "Riesgo de Obesidad Abdominal"; "Normal"))
     ```

3. **Drag the Formulas:**

   * Select cells E2 and F2 and drag the fill handle down to apply the formulas to the rest of your rows.

Now your Excel file has all the reference information and the correct formulas to work with it.
