"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ valor, duracaoMs = 900 }: { valor: number; duracaoMs?: number }) {
  const [exibido, setExibido] = useState(0);
  const inicioRef = useRef<number | null>(null);

  useEffect(() => {
    inicioRef.current = null;
    let quadro: number;

    function passo(tempo: number) {
      if (inicioRef.current === null) inicioRef.current = tempo;
      const progresso = Math.min(1, (tempo - inicioRef.current) / duracaoMs);
      const facilitado = 1 - Math.pow(1 - progresso, 3);
      setExibido(Math.round(facilitado * valor));
      if (progresso < 1) quadro = requestAnimationFrame(passo);
    }

    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [valor, duracaoMs]);

  return <>{exibido}</>;
}
