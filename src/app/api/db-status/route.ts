import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Endpoint para verificar la conexión a la base de datos
 * GET /api/db-status
 */
export async function GET() {
  try {
    // Intentamos ejecutar una consulta simple para verificar la conexión
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    // Convertir el resultado para manejar BigInt
    const safeResult = JSON.parse(JSON.stringify(result, (_, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));
    
    // Si llegamos aquí, la conexión fue exitosa
    return NextResponse.json({ 
      status: 'success', 
      message: 'Conexión a la base de datos establecida correctamente',
      timestamp: new Date().toISOString(),
      details: safeResult,
      database_url: process.env.DATABASE_URL ? 'Configurada' : 'No configurada'
    }, { status: 200 });
  } catch (error) {
    // Si hay un error, la conexión falló
    console.error('Error al conectar con la base de datos:', error);
    
    // Extraer información más detallada del error
    let errorDetails = {};
    if (error instanceof Error) {
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      };
    }
    
    return NextResponse.json({ 
      status: 'error', 
      message: 'Error al conectar con la base de datos',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
      errorDetails,
      database_url: process.env.DATABASE_URL ? 'Configurada' : 'No configurada',
      database_url_masked: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.split('://')[0]}://*****` : null
    }, { status: 500 });
  }
}