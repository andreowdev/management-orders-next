import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 200); 
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 
      ${isOpen ? "opacity-100 bg-black/50" : "opacity-0 bg-transparent"}`}
    >
      <Card
        className={`p-6 rounded-lg shadow-lg w-full sm:w-96 bg-white transition-transform duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer">
            Fechar
          </Button>
        </div>
      </Card>
    </div>
  );
}
