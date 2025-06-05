'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PenTool } from 'lucide-react'
import { useTheme } from 'next-themes'


export default function StudentEntryPage() {
  const [uniqueCode, setUniqueCode] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')  
  const [loading, setLoading] = useState(false)
  const { setTheme } = useTheme()
  const router = useRouter()
  
  // Restaurar el tema seleccionado al cargar la página
  useEffect(() => {    
    // Asegurarse de que el código se ejecute solo en el cliente
    if (typeof window === 'undefined') return;
    
    // Restaurar el tema seleccionado al cargar la página
    const savedTheme = localStorage.getItem('selected-theme')
    if (savedTheme) {
      // Si es un tema personalizado, necesitamos manejar el modo oscuro/claro por separado
      if (savedTheme !== 'light' && savedTheme !== 'dark' && savedTheme !== 'system') {
        // Aplicar el tema personalizado
        document.documentElement.classList.add(savedTheme);
        
        // Mantener el modo oscuro/claro actual
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = localStorage.getItem('theme') === 'dark' || 
                      (localStorage.getItem('theme') === 'system' && prefersDark) ||
                      (!localStorage.getItem('theme') && prefersDark);
        
        // Aplicar el modo oscuro/claro según corresponda
        setTheme(isDark ? 'dark' : 'light');
      } else {
        // Si no es un tema personalizado, simplemente aplicar el tema
        setTheme(savedTheme);
      }
    }
  }, [setTheme])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!uniqueCode.trim()) {
      console.error('Por favor, ingresa el código de evaluación')
      return
    }

    if (!email.trim()) {
      console.error('Por favor, ingresa tu correo electrónico')
      return
    }

    if (!firstName.trim()) {
      console.error('Por favor, ingresa tu nombre')
      return
    }

    if (!lastName.trim()) {
      console.error('Por favor, ingresa tu apellido')
      return
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error('Por favor, ingresa un correo electrónico válido')
      return
    }

    setLoading(true)
    
    try {
      // En una implementación real, aquí verificaríamos que el código sea válido
      // y crearíamos una nueva submission en la base de datos
      
      // Convertimos nombre y apellido a mayúsculas
      const firstNameUpper = firstName.toUpperCase();
      const lastNameUpper = lastName.toUpperCase();
      
      // Redirigimos a la página de evaluación con todos los datos del estudiante
      router.push(`/student/evaluation?code=${uniqueCode}&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstNameUpper)}&lastName=${encodeURIComponent(lastNameUpper)}`)
    } catch (error) {
      console.error('Error al iniciar la evaluación:', error)
      console.error('Error al iniciar la evaluación. Por favor, intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background overflow-hidden">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-center gap-2 glow-effect">
            <PenTool className="h-6 w-6 text-primary blur-effect" />
            <CardTitle className="text-2xl font-bold text-center">SEIA</CardTitle>
          </div>
          <CardDescription className="text-center">
            Ingresa el código de evaluación proporcionado por tu profesor y tus datos para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Evaluación</Label>
              <Input
                id="code"
                placeholder="Ingresa el código de 8 caracteres"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                maxLength={8}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                placeholder="Ingresa tu nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                placeholder="Ingresa tu apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full mt-2" 
              disabled={loading}
            >
              {loading ? 'Iniciando...' : 'Comenzar Evaluación'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
    </div>
  )
}