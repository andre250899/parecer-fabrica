export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      atendimentos: {
        Row: {
          cliente_nome: string | null
          created_at: string
          dados: Json
          data_agenda: string | null
          id: string
          numero_os: string
          periodo: string | null
          situacao: string
          status: string
          tipo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cliente_nome?: string | null
          created_at?: string
          dados?: Json
          data_agenda?: string | null
          id?: string
          numero_os: string
          periodo?: string | null
          situacao?: string
          status?: string
          tipo?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cliente_nome?: string | null
          created_at?: string
          dados?: Json
          data_agenda?: string | null
          id?: string
          numero_os?: string
          periodo?: string | null
          situacao?: string
          status?: string
          tipo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      estoque_itens: {
        Row: {
          categoria: string | null
          codigo: string
          codigo_barras: string | null
          created_at: string
          criado_por: string | null
          descricao: string
          fonte: string | null
          foto: string | null
          id: string
          localizacao: string
          marca: string | null
          modelos_aplicados: string[]
          quantidade: number
          updated_at: string
        }
        Insert: {
          categoria?: string | null
          codigo: string
          codigo_barras?: string | null
          created_at?: string
          criado_por?: string | null
          descricao?: string
          fonte?: string | null
          foto?: string | null
          id?: string
          localizacao?: string
          marca?: string | null
          modelos_aplicados?: string[]
          quantidade?: number
          updated_at?: string
        }
        Update: {
          categoria?: string | null
          codigo?: string
          codigo_barras?: string | null
          created_at?: string
          criado_por?: string | null
          descricao?: string
          fonte?: string | null
          foto?: string | null
          id?: string
          localizacao?: string
          marca?: string | null
          modelos_aplicados?: string[]
          quantidade?: number
          updated_at?: string
        }
        Relationships: []
      }
      estoque_movimentos: {
        Row: {
          codigo: string
          created_at: string
          criado_por: string | null
          data: string
          descricao: string
          id: string
          item_id: string | null
          os: string
          quantidade: number
          tecnico: string
        }
        Insert: {
          codigo: string
          created_at?: string
          criado_por?: string | null
          data?: string
          descricao?: string
          id?: string
          item_id?: string | null
          os?: string
          quantidade: number
          tecnico?: string
        }
        Update: {
          codigo?: string
          created_at?: string
          criado_por?: string | null
          data?: string
          descricao?: string
          id?: string
          item_id?: string | null
          os?: string
          quantidade?: number
          tecnico?: string
        }
        Relationships: [
          {
            foreignKeyName: "estoque_movimentos_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "estoque_itens"
            referencedColumns: ["id"]
          },
        ]
      }
      pareceres: {
        Row: {
          cliente_nome: string | null
          created_at: string
          data: Json
          id: string
          numero_os: string
          tipo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cliente_nome?: string | null
          created_at?: string
          data: Json
          id?: string
          numero_os: string
          tipo?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cliente_nome?: string | null
          created_at?: string
          data?: Json
          id?: string
          numero_os?: string
          tipo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
