/**
 * supabase-queries.ts
 * Cliente Supabase direto para operações CRUD simples.
 * Segurança via RLS (Row Level Security) no Supabase — user_id é validado pelo banco.
 * Server functions são mantidas apenas para PDF extraction e AI vision.
 */
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type AtendimentoRow = Database["public"]["Tables"]["atendimentos"]["Row"];
export type ParecerRow = Database["public"]["Tables"]["pareceres"]["Row"];

// ─────────────────────────────────────────
// Atendimentos
// ─────────────────────────────────────────

export async function fetchAtendimentos(): Promise<AtendimentoRow[]> {
  const { data, error } = await supabase
    .from("atendimentos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as AtendimentoRow[];
}

export interface SaveAtendimentoInput {
  id?: string;
  numero_os: string;
  tipo: string;
  cliente_nome?: string | null;
  dados: Record<string, unknown>;
  data_agenda?: string | null;
  periodo?: "manha" | "tarde" | "" | null;
  status?: "nao_agendado" | "agendado" | "concluido";
  situacao?: "em_aberto" | "concluido" | "realizar_pedido" | "cancelado";
}

export async function saveAtendimentoCliente(
  input: SaveAtendimentoInput,
): Promise<AtendimentoRow> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Usuário não autenticado");

  const payload = {
    user_id: userData.user.id,
    numero_os: input.numero_os,
    tipo: input.tipo,
    cliente_nome: input.cliente_nome ?? null,
    dados: input.dados as never,
    data_agenda: input.data_agenda || null,
    periodo: input.periodo || null,
    status: input.status ?? "nao_agendado",
    ...(input.situacao ? { situacao: input.situacao } : {}),
  };

  if (input.id) {
    const { data, error } = await supabase
      .from("atendimentos")
      .update(payload as never)
      .eq("id", input.id)
      .select()
      .single();
    if (error) throw error;
    return data as AtendimentoRow;
  }

  const { data, error } = await supabase
    .from("atendimentos")
    .insert(payload as never)
    .select()
    .single();
  if (error) throw error;
  return data as AtendimentoRow;
}

export async function updateAtendimentoStatus(input: {
  id: string;
  status: "nao_agendado" | "agendado" | "concluido";
  data_agenda?: string | null;
  periodo?: "manha" | "tarde" | "" | null;
  situacao?: "em_aberto" | "concluido" | "realizar_pedido" | "cancelado";
}): Promise<AtendimentoRow> {
  const update: Record<string, unknown> = { status: input.status };
  if (input.data_agenda !== undefined) update.data_agenda = input.data_agenda || null;
  if (input.periodo !== undefined) update.periodo = input.periodo || null;
  if (input.situacao !== undefined) update.situacao = input.situacao;

  const { data, error } = await supabase
    .from("atendimentos")
    .update(update as never)
    .eq("id", input.id)
    .select()
    .single();
  if (error) throw error;
  return data as AtendimentoRow;
}

export async function deleteAtendimentoCliente(id: string): Promise<void> {
  const { error } = await supabase.from("atendimentos").delete().eq("id", id);
  if (error) throw error;
}

// ─────────────────────────────────────────
// Pareceres
// ─────────────────────────────────────────

export interface SavedListRow {
  id: string;
  numero_os: string;
  cliente_nome: string | null;
  updated_at: string;
  tipo: string;
  source: "atendimento" | "parecer";
  data_agenda?: string | null;
  periodo?: string | null;
  status?: string | null;
  situacao?: string | null;
  dados?: unknown;
}

export async function fetchSavedList(tipo?: string | null): Promise<SavedListRow[]> {
  let parecerQuery = supabase
    .from("pareceres")
    .select("id, numero_os, cliente_nome, updated_at, tipo, data")
    .order("updated_at", { ascending: false });

  let atendimentoQuery = supabase
    .from("atendimentos")
    .select("id, numero_os, cliente_nome, updated_at, tipo, data_agenda, periodo, status, situacao, dados")
    .order("updated_at", { ascending: false });

  if (tipo) {
    parecerQuery = parecerQuery.eq("tipo", tipo);
    atendimentoQuery = atendimentoQuery.eq("tipo", tipo);
  }

  const [parecerResult, atendimentoResult] = await Promise.all([
    parecerQuery,
    atendimentoQuery,
  ]);

  if (parecerResult.error) {
    console.warn("Erro ao buscar pareceres:", parecerResult.error.message);
  }
  if (atendimentoResult.error) {
    console.warn("Erro ao buscar atendimentos:", atendimentoResult.error.message);
  }

  const parecerRows: SavedListRow[] = (parecerResult.data ?? []).map((row) => ({
    ...row,
    source: "parecer" as const,
  }));
  const atendimentoRows: SavedListRow[] = (atendimentoResult.data ?? []).map((row) => ({
    ...row,
    source: "atendimento" as const,
  }));

  return [...atendimentoRows, ...parecerRows].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export interface SaveParecerInput {
  tipo: string;
  numero_os: string;
  cliente_nome?: string | null;
  data: unknown;
}

export async function saveParecerCliente(input: SaveParecerInput): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Usuário não autenticado");

  const { error } = await supabase.from("pareceres").upsert(
    {
      user_id: userData.user.id,
      numero_os: input.numero_os.trim(),
      cliente_nome: input.cliente_nome ?? null,
      tipo: input.tipo,
      data: input.data as never,
    },
    { onConflict: "user_id,tipo,numero_os" },
  );
  if (error) throw error;
}

export async function deleteParecerCliente(id: string): Promise<void> {
  const { error } = await supabase.from("pareceres").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchParecerById(id: string): Promise<ParecerRow | null> {
  const { data, error } = await supabase
    .from("pareceres")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as ParecerRow | null;
}

export async function fetchAtendimentoById(id: string): Promise<AtendimentoRow | null> {
  const { data, error } = await supabase
    .from("atendimentos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as AtendimentoRow | null;
}
