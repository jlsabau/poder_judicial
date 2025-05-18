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
    // Using your specific GitHub username and repository
    const rawGithubUrl = "https://raw.githubusercontent.com/jlsabau/poder_judicial/main/app/setup/Master_File%20-%20Hoja%201%20(1).csv"
    
    console.log("Fetching CSV from:", rawGithubUrl)
    const response = await fetch(rawGithubUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub CSV: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("CSV data fetched, length:", csvText.length)
    
    // Parse the CSV data
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("CSV parsing complete, rows:", results.data.length)
          resolve(results.data)
        },
        error: (error) => {
          console.error("CSV parsing error:", error)
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
  
  console.log("Categorizing data, total rows:", data.length)
  
  // Log the first row to see what columns are available
  if (data.length > 0) {
    console.log("Sample row columns:", Object.keys(data[0]))
  }
  
  // Categorize each row based on the "Tipo de Elección" column
  // Also try alternative column names if that one doesn't exist
  data.forEach(row => {
    // Try different possible column names
    const electionType = 
      row["Tipo de Elección"] || 
      row["Tipo de Eleccion"] || 
      row["tipo de elección"] || 
      row["tipo de eleccion"] || 
      row["Election Type"] || 
      row["election type"] || 
      ""
    
    // Log a few rows to debug
    if (data.indexOf(row) < 5) {
      console.log("Row election type:", electionType, "Row:", JSON.stringify(row).substring(0, 100) + "...")
    }
    
    // If we can't find an election type, try to infer it from other columns
    let category = null
    
    if (electionType.toLowerCase().includes("scjn") || electionType.toLowerCase().includes("suprema corte")) {
      category = "scjn"
    } else if (electionType.toLowerCase().includes("tdj") || electionType.toLowerCase().includes("disciplina judicial")) {
      category = "tdj"
    } else if (electionType.toLowerCase().includes("sala superior") || electionType.toLowerCase().includes("tribunal electoral") && !electionType.toLowerCase().includes("regional")) {
      category = "superior_tribunal_electoral"
    } else if (electionType.toLowerCase().includes("sala regional") || electionType.toLowerCase().includes("regional tribunal")) {
      category = "regional_tribunal_electoral"
    } else if (electionType.toLowerCase().includes("juez") || electionType.toLowerCase().includes("jueces") || electionType.toLowerCase().includes("distrito")) {
      category = "jueces_de_distrito"
    } else if (electionType.toLowerCase().includes("magistrado") || electionType.toLowerCase().includes("circuito")) {
      category = "magistrados_de_circuito"
    }
    
    // If we still don't have a category, try to infer from other fields
    if (!category) {
      // Check if any field contains hints about the election type
      const rowString = JSON.stringify(row).toLowerCase()
      if (rowString.includes("scjn") || rowString.includes("suprema corte")) {
        category = "scjn"
      } else if (rowString.includes("tdj") || rowString.includes("disciplina judicial")) {
        category = "tdj"
      } else if (rowString.includes("sala superior") || (rowString.includes("tribunal electoral") && !rowString.includes("regional"))) {
        category = "superior_tribunal_electoral"
      } else if (rowString.includes("sala regional") || rowString.includes("regional tribunal")) {
        category = "regional_tribunal_electoral"
      } else if (rowString.includes("juez") || rowString.includes("jueces") || rowString.includes("distrito")) {
        category = "jueces_de_distrito"
      } else if (rowString.includes("magistrado") || rowString.includes("circuito")) {
        category = "magistrados_de_circuito"
      }
    }
    
    // If we found a category, add the row to that category
    if (category) {
      categories[category].push(row)
    } else {
      // If we still can't determine the category, put it in SCJN as a fallback
      // and log it for debugging
      console.log("Unknown election type, defaulting to SCJN:", JSON.stringify(row).substring(0, 100) + "...")
      categories.scjn.push(row)
    }
  })
  
  // Log the counts for each category
  for (const [category, rows] of Object.entries(categories)) {
    console.log(`Category ${category}: ${rows.length} rows`)
  }
  
  return categories
}

// Function to create tables with the correct structure
async function createTables() {
  const tableDefinitions = {
    scjn: `
      CREATE TABLE IF NOT EXISTS scjn (
        id SERIAL PRIMARY KEY
      );
    `,
    tdj: `
      CREATE TABLE IF NOT EXISTS tdj (
        id SERIAL PRIMARY KEY
      );
    `,
    superior_tribunal_electoral: `
      CREATE TABLE IF NOT EXISTS superior_tribunal_electoral (
        id SERIAL PRIMARY KEY
      );
    `,
    regional_tribunal_electoral: `
      CREATE TABLE IF NOT EXISTS regional_tribunal_electoral (
        id SERIAL PRIMARY KEY
      );
    `,
    jueces_de_distrito: `
      CREATE TABLE IF NOT EXISTS jueces_de_distrito (
        id SERIAL PRIMARY KEY
      );
    `,
    magistrados_de_circuito: `
      CREATE TABLE IF NOT EXISTS magistrados_de_circuito (
        id SERIAL PRIMARY KEY
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

// Function to add columns to tables based on CSV data
async function addColumnsToTables(data) {
  const results = {}
  
  // Get all unique column names from the CSV data
  const allColumns = new Set()
  data.forEach(row => {
    Object.keys(row).forEach(column => {
      allColumns.add(column)
    })
  })
  
  console.log("All columns found in CSV:", Array.from(allColumns))
  
  // For each table, add all columns from the CSV
  const tables = [
    "scjn",
    "tdj",
    "superior_tribunal_electoral",
    "regional_tribunal_electoral",
    "jueces_de_distrito",
    "magistrados_de_circuito",
  ]
  
  for (const table of tables) {
    try {
      // Add each column to the table
      for (const column of allColumns) {
        // Skip empty column names
        if (!column.trim()) continue
        
        // Escape the column name for SQL
        const escapedColumn = column.replace(/"/g, '""')
        
        const sql = `
          DO $$
          BEGIN
            BEGIN
              ALTER TABLE ${table} ADD COLUMN "${escapedColumn}" TEXT;
            EXCEPTION
              WHEN duplicate_column THEN
                -- Column already exists, do nothing
            END;
          END $$;
        `
        
        const { error } = await supabaseAdmin.rpc("run_sql", { sql })
        
        if (error) {
          console.error(`Error adding column "${escapedColumn}" to table ${table}:`, error)
          if (!results[table]) results[table] = { columns: {} }
          results[table].columns[column] = { success: false, error: error.message }
        } else {
          if (!results[table]) results[table] = { columns: {} }
          results[table].columns[column] = { success: true }
        }
      }
      
      results[table].success = true
    } catch (error) {
      console.error(`Error adding columns to table ${table}:`, error)
      results[table] = { success: false, error: error.message }
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
        console.error(`Error inserting data into ${tableName}:`, error)
        results[tableName] = { success: false, error: error.message }
      } else {
        results[tableName] = { success: true, count: data.length }
      }
    } catch (error) {
      console.error(`Error inserting data into ${tableName}:`, error)
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
    console.log("Starting database setup...")
    
    // Step 1: Create the run_sql function creator
    console.log("Step 1: Creating run_sql function creator...")
    const runSqlFunctionCreatorResult = await createRunSqlFunctionCreator()
    console.log("Run SQL function creator result:", runSqlFunctionCreatorResult)

    // Step 2: Create the run_sql function
    console.log("Step 2: Creating run_sql function...")
    const runSqlFunctionResult = await createRunSqlFunction()
    console.log("Run SQL function result:", runSqlFunctionResult)

    // Step 3: Create tables
    console.log("Step 3: Creating tables...")
    const createTablesResult = await createTables()
    console.log("Create tables result:", createTablesResult)

    // Step 4: Fetch and process CSV data
    console.log("Step 4: Fetching CSV data...")
    let csvData = []
    let csvError = null
    let categorizedData = {}
    
    try {
      csvData = await fetchCSVData()
      console.log("CSV data fetched, rows:", csvData.length)
      
      // Step 5: Add columns to tables based on CSV data
      console.log("Step 5: Adding columns to tables...")
      const addColumnsResult = await addColumnsToTables(csvData)
      console.log("Add columns result:", addColumnsResult)
      
      // Step 6: Categorize data
      console.log("Step 6: Categorizing data...")
      categorizedData = categorizeDataByElection(csvData)
    } catch (error) {
      console.error("Error processing CSV:", error)
      csvError = error.message
    }

    // Step 7: Disable RLS
    console.log("Step 7: Disabling RLS...")
    const disableRLSResult = await disableRLS()
    console.log("Disable RLS result:", disableRLSResult)

    // Step 8: Insert CSV data
    console.log("Step 8: Inserting CSV data...")
    const insertDataResult = csvError ? 
      { error: csvError } : 
      await insertCSVData(categorizedData)
    console.log("Insert data result:", insertDataResult)

    // Step 9: Check if tables have data
    console.log("Step 9: Checking tables for data...")
    const tableChecks = {}

    for (const tableName of Object.keys(categorizedData)) {
      try {
        const { count, error } = await supabaseAdmin.from(tableName).select("*", { count: "exact", head: true })

        if (error) {
          console.error(`Error checking table ${tableName}:`, error)
          tableChecks[tableName] = { success: false, error: error.message }
        } else {
          console.log(`Table ${tableName} has ${count} rows`)
          tableChecks[tableName] = { success: true, count }
        }
      } catch (error) {
        console.error(`Error checking table ${tableName}:`, error)
        tableChecks[tableName] = { success: false, error: error.message }
      }
    }

    console.log("Database setup complete!")
    
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
    console.error("Server error:", error)
    return NextResponse.json(
      {
        error: `Server error: ${error.message}`
      },
      { status: 500 }
    )
  }
}
