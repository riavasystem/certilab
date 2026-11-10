import { getDomains, createExamAttempt } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default async function ConfigurarExamen() {
  const dominios = await getDomains();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Configurar Práctica</h1>
      <Card>
        <CardHeader>
          <CardTitle>Selecciona los dominios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={createExamAttempt.bind(null, 'practica')} className="space-y-4">
            {dominios.map((d) => (
              <div key={d.id} className="flex items-center space-x-2">
                <Checkbox id={`domain-${d.id}`} name="domains" value={String(d.id)} />
                <Label htmlFor={`domain-${d.id}`}>{d.name}</Label>
              </div>
            ))}
            <Button type="submit" className="w-full">Iniciar Práctica</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
