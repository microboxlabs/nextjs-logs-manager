

export const notifyServer = async () => {
    try {
      await fetch("/api/logsInRealTime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Nuevo log añadido" }),
      });
    } catch (error) {
      console.error("Error al enviar logs al servidor:", error);
      throw new Error("Error al notificar al servidor");
    }
  };