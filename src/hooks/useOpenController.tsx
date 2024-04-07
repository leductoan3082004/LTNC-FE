import { useCallback, useState } from "react";

interface UseOpenControllerProps {
  initialState: boolean;
}

export default function useOpenController({ initialState }: UseOpenControllerProps) {
  const [isOpen, setOpenState] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setOpenState((state: boolean) => !state);
  }, [setOpenState]);

  return { isOpen, toggle };
}
