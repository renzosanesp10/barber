import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModeToggle } from '@/components/toogleDardMode'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="absolute top-0 right-0 m-4">
        <ModeToggle />
      </div>
      <Card className="w-[350px] shadow-md dark:shadow-md">
        <CardHeader>
          <CardTitle>Iniciar Sesion</CardTitle>
          <CardDescription>Ingresa tu correo y contraseña porfavor</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Correo</Label>
                <Input id="email" placeholder="person@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="*************" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="button" onClick={() => router.push('/admin/dashboard')}>
            Iniciar Sesion
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}
