import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchAtendimentos,
  saveAtendimentoCliente,
  deleteAtendimentoCliente,
  updateAtendimentoStatus,
  type SaveAtendimentoInput,
} from "@/lib/supabase-queries";

export const ATENDIMENTOS_KEY = ["atendimentos"] as const;

/**
 * Hook React Query para gerenciar atendimentos via Supabase cliente direto.
 * Elimina a necessidade de server functions para CRUD simples.
 */
export function useAtendimentos(enabled = true) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ATENDIMENTOS_KEY,
    queryFn: fetchAtendimentos,
    enabled,
    staleTime: 30_000, // 30s — evita re-fetches desnecessários
  });

  const saveMutation = useMutation({
    mutationFn: saveAtendimentoCliente,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar atendimento.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAtendimentoCliente,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir atendimento.");
    },
  });

  const statusMutation = useMutation({
    mutationFn: updateAtendimentoStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Erro ao atualizar status.");
    },
  });

  return {
    atendimentos: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    save: (input: SaveAtendimentoInput) => saveMutation.mutateAsync(input),
    isSaving: saveMutation.isPending,
    remove: (id: string) => deleteMutation.mutateAsync(id),
    isDeleting: deleteMutation.isPending,
    updateStatus: (input: Parameters<typeof updateAtendimentoStatus>[0]) =>
      statusMutation.mutateAsync(input),
    invalidate: () => queryClient.invalidateQueries({ queryKey: ATENDIMENTOS_KEY }),
  };
}
