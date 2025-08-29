type Props = {
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
};

export default function LoadingOrErrorOverlay({
  isLoading,
  error,
  onClose,
}: Props) {
  // Nada a mostrar?
  if (!isLoading && !error) return null;

  return (
    /* Camada que cobre tudo --------------- */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm"
    >
      {/* Cartão central ---------------------- */}
      <div
        className="w-80 max-w-full rounded-xl bg-white p-6 shadow-lg
                      flex flex-col items-center gap-4 relative"
      >
        {/* Botão X só em caso de erro -------- */}
        {error && (
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 text-gray-500 hover:text-pink-800"
          >
            ×
          </button>
        )}

        {/* Conteúdo para loading ou erro ----- */}
        {isLoading ? (
          <>
            {/* Throbber */}
            <div
              className="w-10 h-10 border-4 border-blue-600
                            border-t-transparent rounded-full animate-spin"
            />
            <p className="text-lg font-medium text-gray-700">Loading data…</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-red-600">Erro</h2>
            <p className="text-center text-gray-700">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}
