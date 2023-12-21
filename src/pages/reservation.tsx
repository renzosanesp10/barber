import * as React from "react"
import { Button } from "@/components/ui/button"
import { Controller } from 'react-hook-form';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { ModeToggle } from '@/components/toogleDardMode'
import { format } from "date-fns"
import { useRouter } from 'next/router'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { z } from 'zod';

const formSchema = z.object({
  username: z.string(),
  service: z.string(),
  date: z.date().optional(),
  time: z.string().optional(),
});

export default function Reservation() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      service: "", // Asegúrate de que selectedService tiene un valor
    },
  });
  const { register, setValue } = useForm()

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const selectedService = localStorage.getItem('selectedService') || '';

    form.setValue('service', selectedService);
  }, [])



  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex justify-between items-center w-full px-4">
        <div className="p-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <span className="sr-only">Go back</span>
          </Button>
        </div>
        <div className="p-4">
          <ModeToggle />
        </div>
      </div>
      <div className="pt-20">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6 text-center">
          Reserva de Cita
        </h1>
        <div className="flex justify-center items-center">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input className="w-[240px] shadow-md" placeholder="Gabo p quien mas" {...field} />
                    </FormControl>
                    <FormDescription>
                      Porfavor ingresa tu nombre completo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servicio seleccionado</FormLabel>
                    <FormControl>
                      <Input className="w-[240px] shadow-md" readOnly {...field} />
                    </FormControl>
                    <FormDescription>
                      Este es el servicio que has seleccionado.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div>
                      <FormLabel>Fecha</FormLabel>
                    </div>
                    <div>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] justify-start text-left font-normal shadow-md",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Selecciona la fecha</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </div>
                    <FormDescription>
                      Por favor, selecciona la fecha para la reserva.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Hora</FormLabel>
                    <div className="w-[240px] shadow-md">
                      <FormControl>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una hora" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Horas</SelectLabel>
                              <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                              <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                              <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                              <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                              <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                              <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                              <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormDescription>
                      Este es la hora que has seleccionado.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="mt-5 ">
                <Button type="submit">Programar</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}