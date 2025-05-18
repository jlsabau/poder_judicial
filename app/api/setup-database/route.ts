import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Papa from "papaparse"

// Create a Supabase client with the service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rombsaksgbnhhltfhzkb.supabase.co"
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbWJzYWtzZ2JuaGhsdGZoemtiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzE0MTc0MiwiZXhwIjoyMDYyNzE3NzQyfQ.YPwxZ_EAHMxWqOw75cMg7Ug2_Qspp4Sew-Ya--GZCFM"
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

// Function to fetch CSV data from GitHub
async function fetchCSVData() {
  try {
    // Get the raw content URL for your CSV file
    // This assumes the file is in a public repository
    // You may need to adjust this URL based on your actual GitHub repository
    const csvUrl = "/app/setup/Master_File - Hoja 1 (1).csv"
    
    // Try to fetch the CSV file from the local project first
    let response
    try {
      response = await fetch(csvUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch local CSV: ${response.status}`)
      }
    } catch (localError) {
      console.log("Could not fetch local CSV, trying raw GitHub URL...")
      // If local fetch fails, try to fetch from GitHub raw content
      // Replace with your actual GitHub username and repository name
      const rawGithubUrl = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/app/setup/Master_File%20-%20Hoja%201%20(1).csv"
      response = await fetch(rawGithubUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub CSV: ${response.status}`)
      }
    }

    const csvText = await response.text()
    
    // Parse the CSV data
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    throw error
  }
}

// Function to categorize data by election type
function categorizeDataByElection(data) {
  // Initialize categories
  const categories = {
    scjn: [],
    tdj: [],
    superior_tribunal_electoral: [],
    regional_tribunal_electoral: [],
    jueces_de_distrito: [],
    magistrados_de_circuito: []
  }
  
  // Categorize each row based on the "Tipo de Elección" column
  data.forEach(row => {
    const electionType = row["Tipo de Elección"]?.toLowerCase() || ""
    
    if (electionType.includes("scjn") || electionType.includes("suprema corte")) {
      categories.scjn.push(row)
    } else if (electionType.includes("tdj") || electionType.includes("disciplina judicial")) {
      categories.tdj.push(row)
    } else if (electionType.includes("sala superior") || electionType.includes("tribunal electoral")) {
      categories.superior_tribunal_electoral.push(row)
    } else if (electionType.includes("sala regional") || electionType.includes("regional tribunal")) {
      categories.regional_tribunal_electoral.push(row)
    } else if (electionType.includes("juez") || electionType.includes("jueces") || electionType.includes("distrito")) {
      categories.jueces_de_distrito.push(row)
    } else if (electionType.includes("magistrado") || electionType.includes("circuito")) {
      categories.magistrados_de_circuito.push(row)
    } else {
      // If we can't determine the category, log it for debugging
      console.log("Unknown election type:", electionType, row)
    }
  })
  
  return categories
}

// Function to create tables with the correct structure
async function createTables() {
  const tableDefinitions = {
    scjn: `
      CREATE TABLE IF NOT EXISTS scjn (
        id SERIAL PRIMARY KEY,
        "Poder de la Unión" TEXT,
        "Persona Candidata" TEXT,
        "CurriculumV Persona Candidata" TEXT,
        "Extracted_Text" TEXT,
        "Número de lista en la boleta" TEXT,
        "Correo electrónico público" TEXT,
        "Página web" TEXT,
        "Teléfono público" TEXT,
        "Redes sociales" TEXT,
        "¿Por qué quiero ocupar un cargo público?" TEXT,
        "Visión de la función jurisdiccional" TEXT,
        "Visión de la impartición de justicia" TEXT,
        "Propuesta 1" TEXT,
        "Propuesta 2" TEXT,
        "Propuesta 3" TEXT,
        "Trayectoria académica" TEXT,
        "Grado máximo de estudios" TEXT,
        "Estatus" TEXT,
        "Poder Legislativo Federal" TEXT,
        "Poder Judicial de la Federación" TEXT,
        "Poder Ejecutivo Federal" TEXT,
        "Tipo de Elección" TEXT
      );
    `,
    tdj: `
      CREATE TABLE IF NOT EXISTS tdj (
        id SERIAL PRIMARY KEY,
        "Poder de la Unión" TEXT,
        "Persona Candidata" TEXT,
        "CurriculumV Persona Candidata" TEXT,
        "Extracted_Text" TEXT,
        "Número de lista en la boleta" TEXT,
        "Correo electrónico público" TEXT,
        "Página web" TEXT,
        "Teléfono público" TEXT,
        "Redes sociales" TEXT,
        "¿Por qué quiero ocupar un cargo público?" TEXT,
        "Visión de la función jurisdiccional" TEXT,
        "Visión de la impartición de justicia" TEXT,
        "Propuesta 1" TEXT,
        "Propuesta 2" TEXT,
        "Propuesta 3" TEXT,
        "Trayectoria académica" TEXT,
        "Grado máximo de estudios" TEXT,
        "Estatus" TEXT,
        "Poder Legislativo Federal" TEXT,
        "Poder Judicial de la Federación" TEXT,
        "Poder Ejecutivo Federal" TEXT,
        "Tipo de Elección" TEXT
      );
    `,
    superior_tribunal_electoral: `
      CREATE TABLE IF NOT EXISTS superior_tribunal_electoral (
        id SERIAL PRIMARY KEY,
        "Poder de la Unión" TEXT,
        "Persona Candidata" TEXT,
        "CurriculumV Persona Candidata" TEXT,
        "Extracted_Text" TEXT,
        "Número de lista en la boleta" TEXT,
        "Correo electrónico público" TEXT,
        "Página web" TEXT,
        "Teléfono público" TEXT,
        "Redes sociales" TEXT,
        "¿Por qué quiero ocupar un cargo público?" TEXT,
        "Visión de la función jurisdiccional" TEXT,
        "Visión de la impartición de justicia" TEXT,
        "Propuesta 1" TEXT,
        "Propuesta 2" TEXT,
        "Propuesta 3" TEXT,
        "Trayectoria académica" TEXT,
        "Grado máximo de estudios" TEXT,
        "Estatus" TEXT,
        "Poder Legislativo Federal" TEXT,
        "Poder Judicial de la Federación" TEXT,
        "Poder Ejecutivo Federal" TEXT,
        "Tipo de Elección" TEXT
      );
    `,
    regional_tribunal_electoral: `
      CREATE TABLE IF NOT EXISTS regional_tribunal_electoral (
        id SERIAL PRIMARY KEY,
        "Poder de la Unión" TEXT,
        "Persona Candidata" TEXT,
        "CurriculumV Persona Candidata" TEXT,
        "Extracted_Text" TEXT,
        "Número de lista en la boleta" TEXT,
        "Correo electrónico público" TEXT,
        "Página web" TEXT,
        "Teléfono público" TEXT,
        "Redes sociales" TEXT,
        "¿Por qué quiero ocupar un cargo público?" TEXT,
        "Visión de la función jurisdiccional" TEXT,
        "Visión de la impartición de justicia" TEXT,
        "Propuesta 1" TEXT,
        "Propuesta 2" TEXT,
        "Propuesta 3" TEXT,
        "Trayectoria académica" TEXT,
        "Grado máximo de estudios" TEXT,
        "Estatus" TEXT,
        "Poder Legislativo Federal" TEXT,
        "Poder Judicial de la Federación" TEXT,
        "Poder Ejecutivo Federal" TEXT,
        "Circunscripción" TEXT,
        "Tipo de Elección" TEXT
      );
    `,
    jueces_de_distrito: `
      CREATE TABLE IF NOT EXISTS jueces_de_distrito (
        id SERIAL PRIMARY KEY,
        "Poder de la Unión" TEXT,
        "Persona Candidata" TEXT,
        "CurriculumV Persona Candidata" TEXT,
        "Extracted_Text" TEXT,
        "Número de lista en la boleta" TEXT,
        "Correo electrónico público" TEXT,
        "Página web" TEXT,
        "Teléfono público" TEXT,
        "Redes sociales" TEXT,
        "¿Por qué quiero ocupar un cargo público?" TEXT,
        "Visión de la función jurisdiccional" TEXT,
        "Visión de la impartición de justicia" TEXT,
        "Propuesta 1" TEXT,
        "Propuesta 2" TEXT,
        "Propuesta 3" TEXT,
        "Trayectoria académica" TEXT,
        "Grado máximo de estudios" TEXT,
        "Estatus" TEXT,
        "Poder Legislativo Federal" TEXT,
        "Poder Judicial de la Federación" TEXT,
        "Poder Ejecutivo Federal" TEXT,
        "Especialidad" TEXT,
        "Circuito judicial" TEXT,
        "Distrito judicial" TEXT,
        "Tipo de Elección" TEXT
      );
    `,
    magistrados_de_circuito: `
      CREATE TABLE IF NOT EXISTS magistrados_de_circuito (
        id SERIAL PRIMARY KEY,
        "Poder de la Unión" TEXT,
        "Persona Candidata" TEXT,
        "CurriculumV Persona Candidata" TEXT,
        "Extracted_Text" TEXT,
        "Número de lista en la boleta" TEXT,
        "Correo electrónico público" TEXT,
        "Página web" TEXT,
        "Teléfono público" TEXT,
        "Redes sociales" TEXT,
        "¿Por qué quiero ocupar un cargo público?" TEXT,
        "Visión de la función jurisdiccional" TEXT,
        "Visión de la impartición de justicia" TEXT,
        "Propuesta 1" TEXT,
        "Propuesta 2" TEXT,
        "Propuesta 3" TEXT,
        "Trayectoria académica" TEXT,
        "Grado máximo de estudios" TEXT,
        "Estatus" TEXT,
        "Poder Legislativo Federal" TEXT,
        "Poder Judicial de la Federación" TEXT,
        "Poder Ejecutivo Federal" TEXT,
        "Especialidad" TEXT,
        "Circuito judicial" TEXT,
        "Distrito judicial" TEXT,
        "Tipo de Elección" TEXT
      );
    `,
  }

  const results = {}

  for (const [tableName, tableDefinition] of Object.entries(tableDefinitions)) {
    try {
      const { error } = await supabaseAdmin.rpc("run_sql", { sql: tableDefinition })

      if (error) {
        results[tableName] = { success: false, error: error.message }
      } else {
        results[tableName] = { success: true }
      }
    } catch (error) {
      results[tableName] = { success: false, error: error.message }
    }
  }

  return results
}

// Function to disable RLS on tables
async function disableRLS() {
  const tables = [
    "scjn",
    "tdj",
    "superior_tribunal_electoral",
    "regional_tribunal_electoral",
    "jueces_de_distrito",
    "magistrados_de_circuito",
  ]

  const results = {}

  for (const table of tables) {
    try {
      const { error } = await supabaseAdmin.rpc("run_sql", {
        sql: `ALTER TABLE ${table} DISABLE ROW LEVEL SECURITY;`,
      })

      if (error) {
        results[table] = { success: false, error: error.message }
      } else {
        results[table] = { success: true }
      }
    } catch (error) {
      results[table] = { success: false, error: error.message }
    }
  }

  return results
}

// Function to insert data from CSV
async function insertCSVData(categorizedData) {
  const results = {}

  for (const [tableName, data] of Object.entries(categorizedData)) {
    if (data.length === 0) {
      results[tableName] = { success: true, count: 0, message: "No data to insert" }
      continue
    }
    
    try {
      // First, clear the table
      await supabaseAdmin.from(tableName).delete().neq("id", 0)

      // Then insert the data
      const { error } = await supabaseAdmin.from(tableName).insert(data)

      if (error) {
        results[tableName] = { success: false, error: error.message }
      } else {
        results[tableName] = { success: true, count: data.length }
      }
    } catch (error) {
      results[tableName] = { success: false, error: error.message }
    }
  }

  return results
}

// Function to create the run_sql function if it doesn't exist
async function createRunSqlFunction() {
  try {
    const sql = `
      CREATE OR REPLACE FUNCTION run_sql(sql text)
      RETURNS void
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$;
    `

    const { error } = await supabaseAdmin.rpc("run_sql", { sql })

    if (error && error.message.includes("function run_sql(text) does not exist")) {
      // Function doesn't exist, create it directly
      const { error: createError } = await supabaseAdmin.rpc("create_run_sql_function")

      if (createError) {
        return { success: false, error: createError.message }
      }

      return { success: true }
    } else if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Function to create the create_run_sql_function function
async function createRunSqlFunctionCreator() {
  try {
    const { error } = await supabaseAdmin.rpc("create_run_sql_function")

    if (error && !error.message.includes("already exists")) {
      // Try to create it directly with raw SQL
      const { error: rawError } = await supabaseAdmin.from("_rpc").select("*").limit(1)

      if (rawError) {
        return { success: false, error: rawError.message }
      }

      return { success: true, note: "Created via raw SQL" }
    } else if (error && error.message.includes("already exists")) {
      return { success: true, note: "Function already exists" }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function GET() {
  try {
    // Step 1: Create the run_sql function creator
    const runSqlFunctionCreatorResult = await createRunSqlFunctionCreator()

    // Step 2: Create the run_sql function
    const runSqlFunctionResult = await createRunSqlFunction()

    // Step 3: Create tables
    const createTablesResult = await createTables()

    // Step 4: Disable RLS
    const disableRLSResult = await disableRLS()

    // Step 5: Fetch and process CSV data
    let csvData = []
    let csvError = null
    let categorizedData = {}
    
    try {
      csvData = await fetchCSVData()
      categorizedData = categorizeDataByElection(csvData)
    } catch (error) {
      csvError = error.message
    }

    // Step 6: Insert CSV data
    const insertDataResult = csvError ? 
      { error: csvError } : 
      await insertCSVData(categorizedData)

    // Step 7: Check if tables have data
    const tableChecks = {}

    for (const tableName of Object.keys(categorizedData)) {
      try {
        const { count, error } = await supabaseAdmin.from(tableName).select("*", { count: "exact", head: true })

        if (error) {
          tableChecks[tableName] = { success: false, error: error.message }
        } else {
          tableChecks[tableName] = { success: true, count }
        }
      } catch (error) {
        tableChecks[tableName] = { success: false, error: error.message }
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      runSqlFunctionCreator: runSqlFunctionCreatorResult,
      runSqlFunction: runSqlFunctionResult,
      createTables: createTablesResult,
      disableRLS: disableRLSResult,
      csvData: {
        success: !csvError,
        error: csvError,
        count: csvData.length,
        categoryCounts: Object.fromEntries(
          Object.entries(categorizedData).map(([key, value]) => [key, value.length])
        )
      },
      insertData: insertDataResult,
      tableChecks,
      message: "Database setup complete. Please check the results for any errors."
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Server error: ${error.message}`
      },
      { status: 500 }
    )
  }
}
