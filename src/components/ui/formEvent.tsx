import { useState } from "react";

interface FormData {
  title: string;
  description: string;
  date: string;
}

interface AppointmentFormProps {
  availableTimes: string[];
  onSuccess: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar compromisso");
      }

      const data = await response.json();
      console.log("Agendamento criado:", data);

      setFormData({ title: "", description: "", date: "" });

      if (onSuccess) onSuccess();
    } catch (error) {
      setError("Erro ao criar compromisso");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow">
      {error && <p className="text-red-500">{error}</p>}
      
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded cursor-pointer"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Criar Agendamento"}
      </button>
    </form>
  );
};

export default AppointmentForm;
