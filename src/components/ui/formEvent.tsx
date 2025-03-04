import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";

export default function FormEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Atualiza os valores do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia os dados para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: formData.date,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar compromisso");
      }

      const data = await response.json();
      console.log("Agendamento criado:", data);

      // Limpar o formulário após o envio
      setFormData({
        title: "",
        description: "",
        date: "",
      });
    } catch (error) {
      setError("Erro ao criar compromisso");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Adicione Compromissos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Serviço</Label>
              <Input
                type="text"
                name="title"
                placeholder="Nome do serviço"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                type="text"
                name="description"
                placeholder="Descrição do compromisso"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
            <Button type="submit" className="bg-blue-500 text-white rounded" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
