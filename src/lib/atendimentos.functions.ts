import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type Atendimento = Database["public"]["Tables"]["atendimentos"]["Row"];

const SaveInput = z.object({
  id: z.string().uuid().optional(),
  numero_os: z.string().min(1),
  tipo: z.string().min(1),
  cliente_nome: z.string().default(""),
  dados: z.record(z.unknown()),
  data_agenda: z.string().default(""),
  periodo: z.enum(["manha", "tarde", ""]).default(""),
  status: z.enum(["nao_agendado", "agendado", "concluido"]).default("nao_agendado"),
  situacao: z.enum(["em_aberto", "concluido", "realizar_pedido", "cancelado"]).optional(),
});

const UpdateStatusInput = z.object({
  id: z.string().uuid(),
  status: z.enum(["nao_agendado", "agendado", "concluido"]),
  data_agenda: z.string().optional(),
  periodo: z.enum(["manha", "tarde", ""]).optional(),
  situacao: z.enum(["em_aberto", "concluido", "realizar_pedido", "cancelado"]).optional(),
});

const DeleteInput = z.object({ id: z.string().uuid() });

export const listarAtendimentos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("atendimentos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Atendimento[];
  });

export const salvarAtendimento = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SaveInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.id) {
      const { data: result, error } = await supabase
        .from("atendimentos")
        .update({
          numero_os: data.numero_os,
          tipo: data.tipo,
          cliente_nome: data.cliente_nome,
          dados: data.dados as never,
          data_agenda: data.data_agenda || null,
          periodo: data.periodo || null,
          status: data.status,
          ...(data.situacao ? { situacao: data.situacao } : {}),
        } as never)
        .eq("id", data.id)
        .eq("user_id", userId)
        .select()
        .single();
      if (error) throw error;
      return result as Atendimento;
    }
    const { data: result, error } = await supabase
      .from("atendimentos")
      .insert({
        user_id: userId,
        numero_os: data.numero_os,
        tipo: data.tipo,
        cliente_nome: data.cliente_nome,
        dados: data.dados as never,
        data_agenda: data.data_agenda || null,
        periodo: data.periodo || null,
        status: data.status,
        ...(data.situacao ? { situacao: data.situacao } : {}),
      } as never)
      .select()
      .single();
    if (error) throw error;
    return result as Atendimento;
  });

export const atualizarStatusAtendimento = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpdateStatusInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const update: Partial<Atendimento> = { status: data.status };
    if (data.data_agenda !== undefined) update.data_agenda = data.data_agenda || null;
    if (data.periodo !== undefined) update.periodo = data.periodo || null;
    if (data.situacao !== undefined) (update as Record<string, unknown>).situacao = data.situacao;
    const { data: result, error } = await supabase
      .from("atendimentos")
      .update(update)
      .eq("id", data.id)
      .eq("user_id", userId)
      .select()
      .single();
    if (error) throw error;
    return result as Atendimento;
  });

export const deletarAtendimento = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DeleteInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("atendimentos").delete().eq("id", data.id).eq("user_id", userId);
    if (error) throw error;
    return { ok: true };
  });
