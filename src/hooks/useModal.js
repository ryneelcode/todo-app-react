import { useState } from "react";
export function useModal() {
  const [isVisible, setVisibility] = useState(false);

  const showModal = () => {
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
  };

  return [isVisible, showModal, closeModal];
}
