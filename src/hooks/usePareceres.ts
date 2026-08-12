import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  saveParecerCliente,
  deleteParecerCliente,
  fetchSavedList,
  type SaveParecerInput,
} from "@/lib/supabase-queries";

export const SAVED_LIST_KEY = ["saved-list"] as const;

/**
 * Hook para gerenciar pareceres via Supabase cliente direto.
 */
export function usePareceres() {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: saveParecerCliente,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SAVED_LIST_KEY });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar parecer.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteParecerCliente,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SAVED_LIST_KEY });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir parecer.");
    },
  });

  return {
    save: (input: SaveParecerInput) => saveMutation.mutateAsync(input),
    isSaving: saveMutation.isPending,
    remove: (id: string) => deleteMutation.mutateAsync(id),
    isDeleting: deleteMutation.isPending,
    fetchList: (tipo?: string | null) => fetchSavedList(tipo),
    invalidateList: () => queryClient.invalidateQueries({ queryKey: SAVED_LIST_KEY }),
  };
}
