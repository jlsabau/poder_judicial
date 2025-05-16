"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'
import Link from "next/link"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [setupComplete, setSetupComplete] = useState(false)

  const runSetup = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/setup-database")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)

      // Check if setup was successful
      const hasErrors = Object.values(data.tableChecks).some((check: any) => !check.success || check.count === 0)
      setSetupComplete(!hasErrors)
    } catch (err) {
      console.error("Error setting up database:", err)
      setError(`Error setting up database: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Configuración de la Base de Datos</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Esta página configurará automáticamente su base de datos Supabase para la aplicación de Información Cívica
            Electoral. El proceso incluye:
          </p>
          <ol className="list-decimal pl-5 space-y-2 mb-4">
            <li>Crear las tablas necesarias con la estructura correcta</li>
            <li>Deshabilitar temporalmente Row Level Security (RLS) para facilitar el acceso</li>
            <li>Insertar datos de muestra en todas las tablas</li>
            <li>Verificar que todo esté configurado correctamente</li>
          </ol>
          <div className="flex justify-center">
            <Button onClick={runSetup} disabled={loading} size="lg">
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Configurando...
                </>
              ) : (
                "Configurar Base de Datos"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {setupComplete && (
        <Alert variant="success" className="mb-8 bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Configuración Completada</AlertTitle>
          <AlertDescription className="text-green-700">
            La base de datos se ha configurado correctamente. Ahora puede{" "}
            <Link href="/" className="font-medium underline">
              volver a la página principal
            </Link>{" "}
            para ver los datos.
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resultados de la Configuración</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Creación de Tablas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(result.createTables).map(([tableName, tableResult]: [string, any]) => (
                      <div
                        key={tableName}
                        className={`p-4 rounded-lg border ${
                          tableResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                        }`}
                      >
                        <p className="font-medium">{tableName}</p>
                        {tableResult.success ? (
                          <p className="text-green-600 text-sm">✓ Creada correctamente</p>
                        ) : (
                          <p className="text-red-600 text-sm">✗ Error: {tableResult.error}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Inserción de Datos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(result.insertData).map(([tableName, insertResult]: [string, any]) => (
                      <div
                        key={tableName}
                        className={`p-4 rounded-lg border ${
                          insertResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                        }`}
                      >
                        <p className="font-medium">{tableName}</p>
                        {insertResult.success ? (
                          <p className="text-green-600 text-sm">✓ {insertResult.count} registros insertados</p>
                        ) : (
                          <p className="text-red-600 text-sm">✗ Error: {insertResult.error}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Verificación Final</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(result.tableChecks).map(([tableName, checkResult]: [string, any]) => (
                      <div
                        key={tableName}
                        className={`p-4 rounded-lg border ${
                          checkResult.success && checkResult.count > 0
                            ? "border-green-200 bg-green-50"
                            : checkResult.success
                              ? "border-yellow-200 bg-yellow-50"
                              : "border-red-200 bg-red-50"
                        }`}
                      >
                        <p className="font-medium">{tableName}</p>
                        {checkResult.success ? (
                          checkResult.count > 0 ? (
                            <p className="text-green-600 text-sm">✓ {checkResult.count} registros verificados</p>
                          ) : (
                            <p className="text-yellow-600 text-sm">⚠ Tabla vacía (0 registros)</p>
                          )
                        ) : (
                          <p className="text-red-600 text-sm">✗ Error: {checkResult.error}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles Técnicos</CardTitle>
            </CardHeader>
            <CardContent>
              <details>
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800 mb-2">
                  Ver respuesta completa del servidor
                </summary>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
