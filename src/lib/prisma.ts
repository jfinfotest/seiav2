import { PrismaClient } from "@/app/generated/prisma"

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

// Opciones de conexión optimizadas para producción
const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    // Configuración de conexión para producción
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
  })
  
  // Manejo de errores mediante log
  if (process.env.NODE_ENV === 'production') {
    // En producción, capturamos y registramos errores globalmente
    process.on('unhandledRejection', (e) => {
      console.error('Prisma Client unhandled rejection:', e)
    })
  }
  
  return client
}

const prisma = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
