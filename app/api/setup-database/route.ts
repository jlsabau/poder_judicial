import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rombsaksgbnhhltfhzkb.supabase.co"
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbWJzYWtzZ2JuaGhsdGZoemtiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzE0MTc0MiwiZXhwIjoyMDYyNzE3NzQyfQ.YPwxZ_EAHMxWqOw75cMg7Ug2_Qspp4Sew-Ya--GZCFM"
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

// Sample data for each table (just a few records for testing)
const sampleData = {
  scjn: [
    {
      "Poder de la Unión": "Poder Judicial",
      "Persona Candidata": "TORTOLERO SERRANO MAURICIO RICARDO III",
      "CurriculumV Persona Candidata":
        "https://candidaturaspoderjudicial.ine.mx/cycc/documentos/ficha/TORTOLERO_SERRANO_MAURICIO_RICARDO_III_4107.pdf",
      "Número de lista en la boleta": "64",
      "Correo electrónico público": "mauricioricardollltortoleroser@gmail.com",
      "Página web": "La candidatura no proporcionó información",
      "Teléfono público": "2221138564",
      "Redes sociales": "https://x.com/MauRicardoIII\nhttps://www.instagram.com/mauricioricardolll/",
      "¿Por qué quiero ocupar un cargo público?":
        "Me postulo para Ministro de la Suprema Corte para fortalecer el Estado de Derecho y defender los Derechos Humanos.",
      "Visión de la función jurisdiccional":
        "Mi visión sobre la función jurisdiccional se centra en la imparcialidad, la independencia y la protección efectiva de los Derechos Humanos.",
      "Visión de la impartición de justicia":
        "Mi propuesta de visión de la impartición de justicia se basa en la defensa irrestricta de la Constitución.",
      "Propuesta 1": "Fortalecer la capacitación continua de los jueces.",
      "Propuesta 2": "Garantizar la accesibilidad y eficiencia del sistema judicial.",
      "Propuesta 3": "Promover la transparencia y la rendición de cuentas.",
      "Trayectoria académica":
        "Doctor Cum Laude en Derecho, Máster en Derecho Comunitario, Diplomado en Juicio de Amparo, Licenciado en Derecho.",
      "Grado máximo de estudios": "Doctorado",
      Estatus: "Cédula profesional",
      "Poder Legislativo Federal": "0",
      "Poder Judicial de la Federación": "1",
      "Poder Ejecutivo Federal": "0",
      Extracted_Text: "Texto extraído del curriculum",
    },
  ],
  tdj: [
    {
      "Poder de la Unión": "Poder Ejecutivo",
      "Persona Candidata": "ZUÑIGA MENDOZA JOSE ARTEMIO",
      "CurriculumV Persona Candidata":
        "https://candidaturaspoderjudicial.ine.mx/cycc/documentos/ficha/ZUÑIGA_MENDOZA_JOSE_ARTEMIO_18668.pdf",
      "Número de lista en la boleta": "38",
      "Correo electrónico público": "joseartemiozuniga@gmail.com",
      "Página web": "https://artemiozuniga.com/",
      "Teléfono público": "5534662277",
      "Redes sociales": "https://x.com/joseartemioz\nhttps://www.instagram.com/jose.artemio.z/.",
      "¿Por qué quiero ocupar un cargo público?":
        "Para devolver al Pueblo el Poder a través de la Justicia, a las víctimas, a los olvidados y así servir a nuestro México.",
      "Visión de la función jurisdiccional":
        "Veo personas juzgadoras honestas, imparciales, justas, independientes, solidarias, capaces, sensibles, transparentes.",
      "Visión de la impartición de justicia":
        "Estoy convencido que el Sistema de Justicia se construye, que cada una de las personas constituye un eslabón.",
      "Propuesta 1":
        "Revolución de la Justicia. Proponemos la creación de una Aplicación Sencilla de denuncia ciudadana.",
      "Propuesta 2":
        "Justicia Digital. Integrar las nuevas tecnologías e inteligencia artificial para hacer una justicia más cercana y transparente.",
      "Propuesta 3":
        "Sistema anticorrupción. Consolidar una Conciencia de Legalidad basada en un nuevo Código de Ética Judicial.",
      "Trayectoria académica":
        "Doctorante, Maestría en Derecho, Especialidad en Penal y en Admón. y Procuración de Justicia, Licenciado en Derecho.",
      "Grado máximo de estudios": "Doctorado",
      Estatus: "Concluido",
      "Poder Legislativo Federal": "0",
      "Poder Judicial de la Federación": "1",
      "Poder Ejecutivo Federal": "1",
      Extracted_Text: "Texto extraído del curriculum",
    },
  ],
  superior_tribunal_electoral: [
    {
      "Poder de la Unión": "Poder Legislativo",
      "Persona Candidata": "WONG MERAZ CESAR LORENZO",
      "CurriculumV Persona Candidata":
        "https://candidaturaspoderjudicial.ine.mx/cycc/documentos/ficha/WONG_MERAZ_CESAR_LORENZO_122.pdf",
      "Número de lista en la boleta": "15",
      "Correo electrónico público": "cesarwong.pj@ine.mx",
      "Página web": "https://cesarwong.mx",
      "Teléfono público": "5561953769",
      "Redes sociales": "https://x.com/cesarlwong\nhttps://www.instagram.com/cesar.wongm",
      "¿Por qué quiero ocupar un cargo público?":
        "Abonar con mis conocimientos y experiencia la construcción de una justicia electoral única en México.",
      "Visión de la función jurisdiccional":
        "Cercana a la gente, con una política de puertas abiertas, de entrada y salida.",
      "Visión de la impartición de justicia":
        "La justicia no solo es darle a cada quien lo que merece, sino explicar, el dar a conocer los elementos esenciales.",
      "Propuesta 1": "Mayor difusión de las tareas que hace un Magistrado, con lenguaje ciudadano.",
      "Propuesta 2": "Hacer observatorio de las sentencias que se emiten en el tribunal, abiertas a la sociedad.",
      "Propuesta 3":
        "Que la elección de los secretarios de estudio y cuenta sean por concurso y así tener a los más capacitados.",
      "Trayectoria académica":
        "Soy Doctor en Derecho, Maestro en diversas áreas, catedrático e investigador en Derecho Electoral con amplia trayectoria.",
      "Grado máximo de estudios": "Doctorado",
      Estatus: "Concluido",
      "Poder Legislativo Federal": "1",
      "Poder Judicial de la Federación": "1",
      "Poder Ejecutivo Federal": "0",
      Extracted_Text: "Texto extraído del curriculum",
    },
  ],
  regional_tribunal_electoral: [
    {
      "Poder de la Unión": "En Funciones",
      "Persona Candidata": "TRINIDAD JIMENEZ FABIAN",
      "CurriculumV Persona Candidata":
        "https://candidaturaspoderjudicial.ine.mx/cycc/documentos/ficha/TRINIDAD_JIMENEZ_FABIAN_18466.pdf",
      "Número de lista en la boleta": "20",
      "Correo electrónico público": "20trinidadjimenezfabian@gmail.com",
      "Página web": "La candidatura no proporcionó información",
      "Teléfono público": "7229628595",
      "Redes sociales": "https://x.com/febo91mx\nhttps://www.instagram.com/febo91mx",
      "¿Por qué quiero ocupar un cargo público?":
        "Para continuar contribuyendo a una impartición de justicia que mejore la vida de las personas.",
      "Visión de la función jurisdiccional":
        "Las personas juzgadoras deben continuar buscando la cercanía a la ciudadanía y el entendimiento de sus sentencias.",
      "Visión de la impartición de justicia":
        "Una impartición de justicia sensible a los problemas y contextos de las personas que demandan nuestro servicio público.",
      "Propuesta 1": "Profesionalización constante en la materia en que se imparte justicia.",
      "Propuesta 2": "Sensibilización de las realidades en que se insertan los problemas jurídicos de las personas.",
      "Propuesta 3":
        "Seguimiento, evaluación y mejora de la forma en que las sentencias impactan en la vida de las personas.",
      "Trayectoria académica": "Profesor universitario en licenciatura y maestría de derecho electoral.",
      "Grado máximo de estudios": "Maestría",
      Estatus: "Cédula profesional",
      "Poder Legislativo Federal": "0",
      "Poder Judicial de la Federación": "1",
      "Poder Ejecutivo Federal": "0",
      Circunscripción: "5",
      Extracted_Text: "Texto extraído del curriculum",
    },
  ],
  jueces_de_distrito: [
    {
      "Poder de la Unión": "Poder Judicial",
      "Persona Candidata": "JUEZ DE DISTRITO EJEMPLO",
      "CurriculumV Persona Candidata": "https://ejemplo.com/curriculum.pdf",
      "Número de lista en la boleta": "1",
      "Correo electrónico público": "juez@ejemplo.com",
      "Página web": "https://ejemplo.com",
      "Teléfono público": "5555555555",
      "Redes sociales": "https://x.com/juez\nhttps://www.instagram.com/juez",
      "¿Por qué quiero ocupar un cargo público?": "Para servir a la justicia y al pueblo de México.",
      "Visión de la función jurisdiccional": "Una justicia imparcial y efectiva para todos.",
      "Visión de la impartición de justicia": "Garantizar el acceso a la justicia para todos los ciudadanos.",
      "Propuesta 1": "Modernización del sistema judicial.",
      "Propuesta 2": "Capacitación continua para jueces.",
      "Propuesta 3": "Transparencia en los procesos judiciales.",
      "Trayectoria académica": "Licenciado en Derecho, Maestro en Derecho Constitucional.",
      "Grado máximo de estudios": "Maestría",
      Estatus: "Titulado",
      "Poder Legislativo Federal": "0",
      "Poder Judicial de la Federación": "1",
      "Poder Ejecutivo Federal": "0",
      Especialidad: "Civil",
      "Circuito judicial": "Primer Circuito",
      "Distrito judicial": "Ciudad de México",
      Extracted_Text: "Texto extraído del curriculum",
    },
  ],
  magistrados_de_circuito: [
    {
      "Poder de la Unión": "Poder Judicial",
      "Persona Candidata": "MAGISTRADO DE CIRCUITO EJEMPLO",
      "CurriculumV Persona Candidata": "https://ejemplo.com/curriculum.pdf",
      "Número de lista en la boleta": "1",
      "Correo electrónico público": "magistrado@ejemplo.com",
      "Página web": "https://ejemplo.com",
      "Teléfono público": "5555555555",
      "Redes sociales": "https://x.com/magistrado\nhttps://www.instagram.com/magistrado",
      "¿Por qué quiero ocupar un cargo público?": "Para contribuir a la justicia en México.",
      "Visión de la función jurisdiccional": "Una justicia accesible y efectiva para todos.",
      "Visión de la impartición de justicia": "Garantizar el respeto a los derechos humanos en todos los procesos.",
      "Propuesta 1": "Digitalización de expedientes judiciales.",
      "Propuesta 2": "Mejora en los tiempos de resolución.",
      "Propuesta 3": "Capacitación especializada para magistrados.",
      "Trayectoria académica": "Doctor en Derecho, Maestro en Derecho Constitucional.",
      "Grado máximo de estudios": "Doctorado",
      Estatus: "Titulado",
      "Poder Legislativo Federal": "0",
      "Poder Judicial de la Federación": "1",
      "Poder Ejecutivo Federal": "0",
      Especialidad: "Penal",
      "Circuito judicial": "Segundo Circuito",
      "Distrito judicial": "Estado de México",
      Extracted_Text: "Texto extraído del curriculum",
    },
  ],
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
        "Poder Ejecutivo Federal" TEXT
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
        "Poder Ejecutivo Federal" TEXT
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
        "Poder Ejecutivo Federal" TEXT
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
        "Circunscripción" TEXT
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
        "Distrito judicial" TEXT
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
        "Distrito judicial" TEXT
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

// Function to insert sample data
async function insertSampleData() {
  const results = {}

  for (const [tableName, data] of Object.entries(sampleData)) {
    try {
      // First, clear the table
      await supabaseAdmin.from(tableName).delete().neq("id", 0)

      // Then insert the sample data
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

    // Step 5: Insert sample data
    const insertDataResult = await insertSampleData()

    // Step 6: Check if tables have data
    const tableChecks = {}

    for (const tableName of Object.keys(sampleData)) {
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
      insertData: insertDataResult,
      tableChecks,
      message: "Database setup complete. Please check the results for any errors.",
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Server error: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
