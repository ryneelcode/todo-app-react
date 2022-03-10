import { useState } from "react";
export function useModal(initialValue = false) {
  const [isVisible, setVisibility] = useState(initialValue);

  const showModal = () => {
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
  };

  return [isVisible, showModal, closeModal];
}
