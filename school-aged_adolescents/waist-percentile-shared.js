/**
 * Shared Waist Percentile Calculator Library
 * Common functions and data for both individual and batch calculators
 */

// Prevent loading the library multiple times
if (typeof window !== 'undefined' && window.WaistPercentileCalculator) {
    console.warn('WaistPercentileCalculator already loaded, skipping initialization');
} else {

// --- COMPLETE PERCENTILE DATABASE ---
const WAIST_PERCENTILE_DATA = {
    female: { 
        2:{p10:43.8, p25:45.0, p50:47.1, p75:49.5, p90:52.2}, 
        3:{p10:45.4, p25:46.7, p50:49.1, p75:51.9, p90:55.3}, 
        4:{p10:46.9, p25:48.4, p50:51.1, p75:54.3, p90:58.3}, 
        5:{p10:48.5, p25:50.1, p50:53.0, p75:56.7, p90:61.4}, 
        6:{p10:50.1, p25:51.8, p50:55.0, p75:59.1, p90:64.4}, 
        7:{p10:51.6, p25:53.5, p50:56.9, p75:61.5, p90:67.5}, 
        8:{p10:53.2, p25:55.2, p50:58.9, p75:63.9, p90:70.5}, 
        9:{p10:54.8, p25:56.9, p50:60.8, p75:66.3, p90:73.6}, 
        10:{p10:56.3, p25:58.6, p50:62.8, p75:68.7, p90:76.6}, 
        11:{p10:57.9, p25:60.3, p50:64.8, p75:71.1, p90:79.7}, 
        12:{p10:59.5, p25:62.0, p50:66.7, p75:73.5, p90:82.7}, 
        13:{p10:61.0, p25:63.7, p50:68.7, p75:75.9, p90:85.8}, 
        14:{p10:62.6, p25:65.4, p50:70.6, p75:78.3, p90:88.8}, 
        15:{p10:64.2, p25:67.1, p50:72.6, p75:80.7, p90:91.9}, 
        16:{p10:65.7, p25:68.8, p50:74.6, p75:83.1, p90:94.9}, 
        17:{p10:67.3, p25:70.5, p50:76.5, p75:85.5, p90:98.0}, 
        18:{p10:69.9, p25:72.2, p50:78.5, p75:87.9, p90:101.0} 
    },
    male: { 
        2:{p10:43.2, p25:45.0, p50:47.1, p75:48.8, p90:50.8}, 
        3:{p10:44.9, p25:46.9, p50:49.1, p75:51.3, p90:54.2}, 
        4:{p10:46.6, p25:48.7, p50:51.1, p75:53.9, p90:57.6}, 
        5:{p10:48.4, p25:50.6, p50:53.2, p75:56.4, p90:61.0}, 
        6:{p10:50.1, p25:52.4, p50:55.2, p75:59.0, p90:64.4}, 
        7:{p10:51.8, p25:54.3, p50:57.2, p75:61.5, p90:67.8}, 
        8:{p10:53.5, p25:56.1, p50:59.3, p75:64.1, p90:71.2}, 
        9:{p10:55.3, p25:58.0, p50:61.3, p75:66.6, p90:74.6}, 
        10:{p10:57.0, p25:59.8, p50:63.3, p75:69.2, p90:78.0}, 
        11:{p10:58.7, p25:61.7, p50:65.4, p75:71.7, p90:81.4}, 
        12:{p10:60.5, p25:63.5, p50:67.4, p75:74.3, p90:84.8}, 
        13:{p10:62.2, p25:65.4, p50:69.5, p75:76.8, p90:88.2}, 
        14:{p10:63.9, p25:67.2, p50:71.5, p75:79.4, p90:91.6}, 
        15:{p10:65.6, p25:69.1, p50:73.5, p75:81.9, p90:95.0}, 
        16:{p10:67.4, p25:70.9, p50:75.6, p75:84.5, p90:98.4}, 
        17:{p10:69.1, p25:72.8, p50:77.6, p75:87.0, p90:101.8}, 
        18:{p10:70.8, p25:74.6, p50:79.6, p75:89.6, p90:105.2} 
    }
};

/**
 * Normalize sex input to standard format
 * @param {string} sexInput - Input sex value (various formats accepted)
 * @returns {string|null} - Normalized sex ("male", "female") or null if invalid
 */
function normalizeSex(sexInput) {
    if (!sexInput) return null;
    
    const input = sexInput.toString().toLowerCase().trim();
    
    // Spanish format
    if (input === 'masculino' || input === '1') return 'male';
    if (input === 'femenino' || input === '2') return 'female';
    
    // English format
    if (input === 'male') return 'male';
    if (input === 'female') return 'female';
    
    return null;
}

/**
 * Validate input data
 * @param {number} age - Age in years
 * @param {string} sex - Sex value (normalized)
 * @param {number} measurement - Waist measurement in cm
 * @returns {object} - Validation result with isValid boolean and error message
 */
function validateInput(age, sex, measurement) {
    if (isNaN(age) || age < 2 || age > 18) {
        return { isValid: false, error: 'Edad fuera de rango (2-18)' };
    }
    
    if (!sex || (sex !== 'male' && sex !== 'female')) {
        return { isValid: false, error: 'Valor de sexo no válido' };
    }
    
    if (isNaN(measurement) || measurement <= 0) {
        return { isValid: false, error: 'Medición no válida' };
    }
    
    return { isValid: true };
}

/**
 * Get percentile data for specific age and sex
 * @param {number} age - Age in years
 * @param {string} sex - Normalized sex value (male/female)
 * @returns {object|null} - Percentile data object or null if not found
 */
function getPercentileData(age, sex) {
    return WAIST_PERCENTILE_DATA[sex]?.[age] || null;
}

/**
 * Calculate waist circumference assessment
 * @param {number} age - Age in years
 * @param {string} sexInput - Sex input (various formats)
 * @param {number} measurement - Waist measurement in cm
 * @returns {object} - Assessment result with diagnosis, result code, and percentile data
 */
function calculateWaistAssessment(age, sexInput, measurement) {
    const sex = normalizeSex(sexInput);
    
    // Validate inputs
    const validation = validateInput(age, sex, measurement);
    if (!validation.isValid) {
        return {
            isValid: false,
            error: validation.error,
            age,
            sex,
            measurement
        };
    }
    
    // Get percentile data
    const ageData = getPercentileData(age, sex);
    if (!ageData) {
        return {
            isValid: false,
            error: 'Datos de percentiles no encontrados',
            age,
            sex,
            measurement
        };
    }
    
    // Calculate result
    let result, diagnosis;
    
    if (measurement > ageData.p90) {
        result = 1;
        diagnosis = "Obesidad Abdominal";
    } else if (measurement > ageData.p75) {
        result = 0;
        diagnosis = "Riesgo de Obesidad Abdominal";
    } else {
        result = 0;
        diagnosis = "Normal";
    }
    
    return {
        isValid: true,
        age,
        sex,
        measurement,
        result,
        diagnosis,
        percentiles: {
            p10: ageData.p10,
            p25: ageData.p25,
            p50: ageData.p50,
            p75: ageData.p75,
            p90: ageData.p90
        }
    };
}

/**
 * Process batch data from CSV format
 * @param {string} csvData - CSV data string
 * @param {string} separator - CSV separator (default: ';')
 * @returns {object} - Processing result with valid results and errors
 */
function processBatchData(csvData, separator = ';') {
    const lines = csvData.trim().split('\n');
    const results = [];
    const errors = [];
    
    if (!csvData.trim()) {
        return { results, errors: ['No hay datos para procesar'] };
    }
    
    lines.forEach((line, index) => {
        if (!line.trim()) return;
        
        const parts = line.split(separator).map(p => p.trim());
        if (parts.length !== 3) {
            errors.push(`Línea ${index + 1}: Error de formato - ${line}`);
            return;
        }
        
        const age = parseInt(parts[0]);
        const measurementString = parts[1].replace(',', '.');
        const measurement = parseFloat(measurementString);
        const sexInput = parts[2];
        
        const assessment = calculateWaistAssessment(age, sexInput, measurement);
        
        if (!assessment.isValid) {
            errors.push(`Línea ${index + 1}: ${assessment.error} - ${line}`);
            return;
        }
        
        results.push({
            ...assessment,
            originalMeasurement: parts[1], // Keep original format for output
            lineNumber: index + 1
        });
    });
    
    return { results, errors };
}

/**
 * Generate CSV output from batch results
 * @param {Array} results - Array of assessment results
 * @param {Array} errors - Array of error messages
 * @param {boolean} includeAllPercentiles - Whether to include all percentiles in output
 * @returns {string} - CSV formatted output
 */
function generateCSVOutput(results, errors, includeAllPercentiles = true) {
    const outputLines = [];
    
    // Helper function to convert sex to Spanish for display
    const sexToSpanish = (sex) => sex === 'male' ? 'Masculino' : 'Femenino';
    
    // Header
    if (includeAllPercentiles) {
        outputLines.push('Edad;Medicion;Sexo;P10;P25;P50;P75;P90;Resultado;Diagnostico');
    } else {
        outputLines.push('Edad;Medicion;Sexo;Resultado;Diagnostico');
    }
    
    // Results
    results.forEach(result => {
        const spanishSex = sexToSpanish(result.sex);
        if (includeAllPercentiles) {
            const line = `${result.age};${result.originalMeasurement};${spanishSex};${result.percentiles.p10};${result.percentiles.p25};${result.percentiles.p50};${result.percentiles.p75};${result.percentiles.p90};${result.result};${result.diagnosis}`;
            outputLines.push(line);
        } else {
            const line = `${result.age};${result.originalMeasurement};${spanishSex};${result.result};${result.diagnosis}`;
            outputLines.push(line);
        }
    });
    
    // Errors
    if (errors.length > 0) {
        outputLines.push('');
        outputLines.push('--- ERRORES ---');
        errors.forEach(error => outputLines.push(error));
    }
    
    return outputLines.join('\n');
}

/**
 * Download CSV file
 * @param {string} csvContent - CSV content to download
 * @param {string} filename - Filename for download
 */
function downloadCSV(csvContent, filename = 'resultados_percentiles.csv') {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Export functions for use in both calculators
if (typeof window !== 'undefined') {
    // Browser environment
    window.WaistPercentileCalculator = {
        WAIST_PERCENTILE_DATA,
        normalizeSex,
        validateInput,
        getPercentileData,
        calculateWaistAssessment,
        processBatchData,
        generateCSVOutput,
        downloadCSV
    };
}

// Also support Node.js environment if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WAIST_PERCENTILE_DATA,
        normalizeSex,
        validateInput,
        getPercentileData,
        calculateWaistAssessment,
        processBatchData,
        generateCSVOutput,
        downloadCSV
    };
}

} // End of library initialization check
