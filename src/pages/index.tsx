import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/toogleDardMode'
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

interface Service {
  id: string
  name: string
  image: string
  created_at: string
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceSelection = (serviceName: string) => {
    setSelectedService(serviceName);
    localStorage.setItem('selectedService', serviceName);
  }

  const handleReservation = () => {
    if (selectedService) {
      router.push('/reservation');
    } else {
      alert('Por favor, selecciona un servicio antes de reservar.');
    }
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')

        if (error) {
          console.error('Error fetching services:', error);
          return;
        }
        console.log('Data from Supabase:', data);
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:');
      }
    }
    fetchServices()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 self-end">
        <ModeToggle />
      </div>

      <div className="flex-1 flex flex-col  items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-snug">
          ¡Bienvenido Sobrino!
        </h1>

        {/* Lista de Servicios */}
        <div className="w-full">
          <h3 className="text-lg md:text-2xl font-semibold tracking-tight ml-8 mb-4">
            Nuestros Servicios
          </h3>
          <section className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-2 rounded-lg shadow-lg flex flex-col items-center ${service.name === selectedService ? 'dark:bg-blue-900 bg-blue-300' : ''}`}
                onClick={() => handleServiceSelection(service.name)}
              >
                <a href="#" className="focus:outline-none">
                  <Image
                    src={service.image}
                    width={100}
                    height={100}
                    alt={service.name}
                    className="rounded object-cover"
                  />
                  <p className="text-sm md:text-base mt-2 text-center">{service.name}</p>
                </a>
              </div>
            ))}
          </section>
        </div>
        <div className="mt-8">
          <Link href="/reservation">
            <Button variant="default" size="lg" onClick={handleReservation}>
              Reservar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
