import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const openModal = (event?: any) => {
    if (event) setSelectedEvent(event);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  return { isOpen, openModal, closeModal, selectedEvent };
}
